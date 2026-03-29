import { createContext, useContext, useEffect, useState } from "react";
import { COIN_THRESHOLDS, CONTRACT_ADDRESSES } from "../config/contracts";
import { useAuth } from "./AuthContext";
import { useWallet } from "./WalletContext";

export type MembershipLevel = "free" | "basic" | "premium" | "vip";

const LEVEL_ORDER: Record<MembershipLevel, number> = {
  free: 0,
  basic: 1,
  premium: 2,
  vip: 3,
};

interface MembershipContextValue {
  membershipLevel: MembershipLevel;
  canAccess: (level: string) => boolean;
  isChecking: boolean;
}

const MembershipContext = createContext<MembershipContextValue>({
  membershipLevel: "free",
  canAccess: () => false,
  isChecking: false,
});

export function MembershipProvider({
  children,
}: { children: React.ReactNode }) {
  const {
    isConnected,
    connectedAddress,
    checkNFTOwnership,
    checkCoinXBalance,
  } = useWallet();
  const { currentUser } = useAuth();
  const [membershipLevel, setMembershipLevel] =
    useState<MembershipLevel>("free");
  const [isChecking, setIsChecking] = useState(false);

  const adminPlanOverride = currentUser?.adminPlan as
    | MembershipLevel
    | undefined;

  // React to admin plan changes
  useEffect(() => {
    if (adminPlanOverride) {
      setMembershipLevel(adminPlanOverride);
    } else if (!isConnected) {
      setMembershipLevel("free");
    }
  }, [adminPlanOverride, isConnected]);

  // Wallet-based membership check
  useEffect(() => {
    if (adminPlanOverride) {
      setMembershipLevel(adminPlanOverride);
      return;
    }

    if (!isConnected || !connectedAddress) {
      setMembershipLevel("free");
      return;
    }

    const checkMembership = async () => {
      setIsChecking(true);
      try {
        const [vipNFT, premiumNFT, basicNFT, coinBalance] = await Promise.all([
          checkNFTOwnership(CONTRACT_ADDRESSES.nftVip, connectedAddress),
          checkNFTOwnership(CONTRACT_ADDRESSES.nftPremium, connectedAddress),
          checkNFTOwnership(CONTRACT_ADDRESSES.nftBasic, connectedAddress),
          checkCoinXBalance(CONTRACT_ADDRESSES.coinX, connectedAddress),
        ]);

        if (vipNFT || coinBalance >= COIN_THRESHOLDS.vip) {
          setMembershipLevel("vip");
        } else if (premiumNFT || coinBalance >= COIN_THRESHOLDS.premium) {
          setMembershipLevel("premium");
        } else if (basicNFT || coinBalance >= COIN_THRESHOLDS.basic) {
          setMembershipLevel("basic");
        } else {
          setMembershipLevel("free");
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkMembership();
  }, [
    isConnected,
    connectedAddress,
    checkNFTOwnership,
    checkCoinXBalance,
    adminPlanOverride,
  ]);

  const canAccess = (level: string): boolean => {
    const required = LEVEL_ORDER[level as MembershipLevel] ?? 0;
    return LEVEL_ORDER[membershipLevel] >= required;
  };

  return (
    <MembershipContext.Provider
      value={{ membershipLevel, canAccess, isChecking }}
    >
      {children}
    </MembershipContext.Provider>
  );
}

export function useMembership() {
  return useContext(MembershipContext);
}
