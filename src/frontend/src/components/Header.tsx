import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleDot, Info, Menu, Moon, Sun, User, Wallet } from "lucide-react";
import { useState } from "react";
import { SOCIAL_LINKS } from "../config/app.config";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useReadingTimer } from "../contexts/ReadingTimerContext";
import { useTheme } from "../contexts/ThemeContext";
import { useWallet } from "../contexts/WalletContext";
import { AccountSettingsModal } from "./AccountSettingsModal";
import { HamburgerMenu } from "./HamburgerMenu";
import { LoginRegisterModal } from "./LoginRegisterModal";
import { triggerSticker } from "./StickerOverlay";
import { WalletModal } from "./WalletModal";

interface HeaderProps {
  navigate: (path: string) => void;
}

export function Header({ navigate }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { t, currentLanguage, availableLanguages, setLanguage } = useLanguage();
  const { isConnected, connectedAddress, walletType, disconnectWallet } =
    useWallet();
  const { isLoggedIn, currentUser, logout } = useAuth();
  const { secondsLeft, timeExpired } = useReadingTimer();
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [accountOpen, setAccountOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const shortAddr = connectedAddress
    ? `${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}`
    : null;

  const openLogin = () => {
    setAuthTab("login");
    setAuthModalOpen(true);
  };

  const formatTimer = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0)
      return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Header logo: only triggers animation, does NOT open any website
  const handleLogoClick = () => {
    triggerSticker();
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-border bg-background backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[140px] flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            aria-label="Open menu"
            data-ocid="nav.open_modal_button"
          >
            <Menu size={22} />
          </button>

          {/* Brand: text + logo on right of text */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-1 font-display font-bold text-xl tracking-tight"
              data-ocid="nav.home.link"
            >
              <span className="text-foreground">Crypt</span>
              <span className="text-primary">AI</span>
            </button>
            {/* Logo: header only triggers animation, no website opens */}
            <button
              type="button"
              onClick={handleLogoClick}
              className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="cREAMY cOMMUNITY"
              title="cREAMY cOMMUNITY"
            >
              <img
                src="/assets/uploads/e6149769-dde7-4cf9-a544-1cede158fbd1-019d3653-1931-72e3-9b25-c3751a055916-1.png"
                alt="CryptAI Logo"
                className="h-[120px] w-[120px] object-contain rounded-full"
              />
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Language selector — always visible */}
          <select
            value={currentLanguage}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-muted-foreground text-xs sm:text-sm border border-border rounded-md px-1.5 sm:px-2 py-1 hover:text-foreground transition-colors cursor-pointer flex-shrink-0"
            data-ocid="nav.language.select"
          >
            {availableLanguages.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-card">
                {lang.label}
              </option>
            ))}
          </select>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            aria-label={theme === "dark" ? t("light_mode") : t("dark_mode")}
            data-ocid="nav.theme.toggle"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Login/Register or User menu */}
          {isLoggedIn && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-accent hover:bg-muted text-sm font-medium text-foreground transition-colors flex-shrink-0"
                  data-ocid="nav.user.button"
                >
                  <User size={14} />
                  <span className="hidden sm:inline max-w-[80px] truncate">
                    {currentUser.username.slice(0, 10)}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-card border-border"
              >
                <DropdownMenuItem
                  onClick={() => setAccountOpen(true)}
                  className="cursor-pointer"
                  data-ocid="nav.account_settings.button"
                >
                  {t("account_settings")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive"
                  data-ocid="nav.logout.button"
                >
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Timer badge — show for all unregistered users while timer is active */}
              {!isLoggedIn && !timeExpired && (
                <span
                  className="hidden sm:flex items-center text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full"
                  data-ocid="nav.timer.badge"
                >
                  ⏱ {formatTimer(secondsLeft)}
                </span>
              )}
              <button
                type="button"
                onClick={openLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background hover:bg-accent text-xs sm:text-sm font-medium text-foreground transition-colors"
                data-ocid="nav.login_register.button"
              >
                <User size={14} />
                <span className="hidden sm:inline">{t("login_register")}</span>
                <span className="sm:hidden">{t("login")}</span>
              </button>
            </div>
          )}

          {/* Connect Wallet button */}
          <div className="relative flex-shrink-0">
            {isConnected ? (
              <button
                type="button"
                onClick={disconnectWallet}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-border bg-accent hover:bg-muted text-sm font-medium text-foreground transition-colors"
                data-ocid="nav.wallet.button"
              >
                <CircleDot size={14} className="text-success" />
                <span className="hidden sm:inline">{shortAddr}</span>
                <span className="text-xs text-muted-foreground hidden md:inline">
                  <img
                    src={
                      walletType === "metamask"
                        ? "/assets/generated/wallet-metamask-transparent.dim_200x200.png"
                        : "/assets/uploads/download-019d36f9-e872-744d-8815-caf0b78f05f2-1.png"
                    }
                    alt={walletType ?? "wallet"}
                    className={`h-5 w-5 object-contain${walletType === "phantom" ? " rounded-md" : ""}`}
                  />
                </span>
              </button>
            ) : (
              <div
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <button
                  type="button"
                  onClick={() => setWalletModalOpen(true)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity shadow-glow"
                  data-ocid="nav.wallet.button"
                >
                  <Wallet size={15} />
                  <span className="hidden sm:inline">
                    {t("connect_wallet")}
                  </span>
                  <span className="sm:hidden">Wallet</span>
                </button>

                {/* Mobile info icon */}
                <button
                  type="button"
                  onClick={() => setShowTooltip((v) => !v)}
                  className="absolute -top-1 -right-1 sm:hidden text-muted-foreground"
                  aria-label="Wallet info"
                  data-ocid="nav.wallet.info"
                >
                  <Info size={14} />
                </button>

                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute right-0 top-full mt-2 w-72 p-3 dark:bg-zinc-900 bg-white border border-border rounded-lg shadow-lg text-xs text-muted-foreground z-50">
                    {t("wallet_disclaimer")}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        navigate={navigate}
      />
      <WalletModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />
      <LoginRegisterModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authTab}
      />
      <AccountSettingsModal
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
      />
    </>
  );
}
