import { createContext, useContext, useEffect, useState } from "react";
import { COIN_THRESHOLDS, CONTRACT_ADDRESSES } from "../config/contracts";
import { useAuth } from "./AuthContext";
import { useWallet } from "./WalletContext";

export type MembershipLevel =
  | "uncreamed"
  | "creamed"
  | "extracreamed"
  | "creamy";

const LEVEL_ORDER: Record<MembershipLevel, number> = {
  uncreamed: 0,
  creamed: 1,
  extracreamed: 2,
  creamy: 3,
};

// Map old content-level labels to new plan IDs for canAccess
const CONTENT_LEVEL_MAP: Record<string, MembershipLevel> = {
  free: "uncreamed",
  basic: "creamed",
  premium: "extracreamed",
  vip: "creamy",
  uncreamed: "uncreamed",
  creamed: "creamed",
  extracreamed: "extracreamed",
  creamy: "creamy",
};

interface MembershipContextValue {
  membershipLevel: MembershipLevel;
  canAccess: (level: string) => boolean;
  isChecking: boolean;
}

const MembershipContext = createContext<MembershipContextValue>({
  membershipLevel: "uncreamed",
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
    useState<MembershipLevel>("uncreamed");
  const [isChecking, setIsChecking] = useState(false);

  const adminPlanOverride = currentUser?.adminPlan as
    | MembershipLevel
    | undefined;

  // React to admin plan changes
  useEffect(() => {
    if (adminPlanOverride) {
      setMembershipLevel(adminPlanOverride);
    } else if (!isConnected) {
      setMembershipLevel("uncreamed");
    }
  }, [adminPlanOverride, isConnected]);

  // Wallet-based membership check
  useEffect(() => {
    if (adminPlanOverride) {
      setMembershipLevel(adminPlanOverride);
      return;
    }

    if (!isConnected || !connectedAddress) {
      setMembershipLevel("uncreamed");
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
          setMembershipLevel("creamy");
        } else if (premiumNFT || coinBalance >= COIN_THRESHOLDS.premium) {
          setMembershipLevel("extracreamed");
        } else if (basicNFT || coinBalance >= COIN_THRESHOLDS.basic) {
          setMembershipLevel("creamed");
        } else {
          setMembershipLevel("uncreamed");
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
    const mappedLevel = CONTENT_LEVEL_MAP[level];
    const required = mappedLevel ? LEVEL_ORDER[mappedLevel] : 0;
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
