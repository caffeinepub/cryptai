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

  useEffect(() => {
    if (adminPlanOverride) {
      setMembershipLevel(adminPlanOverride);
    } else if (!isConnected) {
      setMembershipLevel("uncreamed");
    }
  }, [adminPlanOverride, isConnected]);

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
        const [creamyNFT, extracreamedNFT, creamedNFT, coinBalance] =
          await Promise.all([
            checkNFTOwnership(CONTRACT_ADDRESSES.nftCreamy, connectedAddress),
            checkNFTOwnership(
              CONTRACT_ADDRESSES.nftExtracreamed,
              connectedAddress,
            ),
            checkNFTOwnership(CONTRACT_ADDRESSES.nftCreamed, connectedAddress),
            checkCoinXBalance(CONTRACT_ADDRESSES.coin, connectedAddress),
          ]);

        if (creamyNFT || coinBalance >= COIN_THRESHOLDS.creamy) {
          setMembershipLevel("creamy");
        } else if (
          extracreamedNFT ||
          coinBalance >= COIN_THRESHOLDS.extracreamed
        ) {
          setMembershipLevel("extracreamed");
        } else if (creamedNFT || coinBalance >= COIN_THRESHOLDS.creamed) {
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
    const normalised = level as MembershipLevel;
    const required = LEVEL_ORDER[normalised] ?? 0;
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
