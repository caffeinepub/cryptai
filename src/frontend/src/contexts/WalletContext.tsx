import { createContext, useContext, useState } from "react";

type WalletType = "metamask" | "phantom" | null;

interface WalletContextValue {
  connectedAddress: string | null;
  walletType: WalletType;
  isConnecting: boolean;
  isConnected: boolean;
  connectWallet: (type: "metamask" | "phantom") => Promise<void>;
  disconnectWallet: () => void;
  checkNFTOwnership: (
    contractAddress: string,
    walletAddress: string,
  ) => Promise<boolean>;
  checkCoinXBalance: (
    contractAddress: string,
    walletAddress: string,
  ) => Promise<number>;
}

const WalletContext = createContext<WalletContextValue>({
  connectedAddress: null,
  walletType: null,
  isConnecting: false,
  isConnected: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  checkNFTOwnership: async () => false,
  checkCoinXBalance: async () => 0,
});

function generateEthAddress(): string {
  const chars = "0123456789abcdef";
  let addr = "0x";
  for (let i = 0; i < 40; i++) {
    addr += chars[Math.floor(Math.random() * 16)];
  }
  return addr;
}

function generateSolAddress(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let addr = "";
  for (let i = 0; i < 44; i++) {
    addr += chars[Math.floor(Math.random() * chars.length)];
  }
  return addr;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<WalletType>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async (type: "metamask" | "phantom") => {
    setIsConnecting(true);
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const address =
      type === "metamask" ? generateEthAddress() : generateSolAddress();
    setConnectedAddress(address);
    setWalletType(type);
    setIsConnecting(false);
  };

  const disconnectWallet = () => {
    setConnectedAddress(null);
    setWalletType(null);
  };

  // Simulation: always returns true for demo
  const checkNFTOwnership = async (
    _contractAddress: string,
    _walletAddress: string,
  ): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return true;
  };

  // Simulation: returns 999999 for demo
  const checkCoinXBalance = async (
    _contractAddress: string,
    _walletAddress: string,
  ): Promise<number> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return 999999;
  };

  return (
    <WalletContext.Provider
      value={{
        connectedAddress,
        walletType,
        isConnecting,
        isConnected: !!connectedAddress,
        connectWallet,
        disconnectWallet,
        checkNFTOwnership,
        checkCoinXBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
