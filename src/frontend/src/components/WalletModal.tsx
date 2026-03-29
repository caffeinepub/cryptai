import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useWallet } from "../contexts/WalletContext";

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
}

export function WalletModal({ open, onClose }: WalletModalProps) {
  const { connectWallet, isConnecting } = useWallet();

  const handleConnect = async (type: "metamask" | "phantom") => {
    await connectWallet(type);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md dark:bg-zinc-900 bg-white dark:border-zinc-700 border-zinc-200"
        data-ocid="wallet.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl font-bold">
            Connect Wallet
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 pt-2">
          <p className="text-muted-foreground text-sm">
            Connect your wallet to verify NFT and CoinX holdings. No
            transactions will be executed.
          </p>
          <div className="space-y-3 pt-2">
            <Button
              variant="outline"
              className="w-full h-14 border-border hover:border-primary/50 justify-start gap-3 text-base"
              onClick={() => handleConnect("metamask")}
              disabled={isConnecting}
              data-ocid="wallet.metamask_button"
            >
              {isConnecting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <img
                  src="/assets/generated/wallet-metamask-transparent.dim_200x200.png"
                  alt="MetaMask"
                  className="h-8 w-8 object-contain"
                />
              )}
              <span>MetaMask</span>
              <span className="ml-auto text-xs text-muted-foreground">
                Ethereum
              </span>
            </Button>
            <Button
              variant="outline"
              className="w-full h-14 border-border hover:border-primary/50 justify-start gap-3 text-base"
              onClick={() => handleConnect("phantom")}
              disabled={isConnecting}
              data-ocid="wallet.phantom_button"
            >
              {isConnecting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <img
                  src="/assets/uploads/download-019d36f9-e872-744d-8815-caf0b78f05f2-1.png"
                  alt="Phantom"
                  className="h-8 w-8 object-contain rounded-md"
                />
              )}
              <span>Phantom</span>
              <span className="ml-auto text-xs text-muted-foreground">
                Solana
              </span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground pt-2 border-t border-border">
            ⚠️ Read-only verification only. No transfers or signatures will be
            requested.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
