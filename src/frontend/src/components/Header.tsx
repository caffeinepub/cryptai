import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleDot, Info, Menu, User, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { triggerPlayerOpen } from "../contexts/MusicPlayerContext";
import { useReadingTimer } from "../contexts/ReadingTimerContext";
import { useTheme } from "../contexts/ThemeContext";
import { useWallet } from "../contexts/WalletContext";
import { setRegisterCallback } from "../utils/registerTrigger";
import { AccountSettingsModal } from "./AccountSettingsModal";
import { HamburgerMenu } from "./HamburgerMenu";
import { LoginRegisterModal } from "./LoginRegisterModal";
import { triggerSticker } from "./StickerOverlay";
import { WalletModal } from "./WalletModal";

const BANGERS: React.CSSProperties = {
  fontFamily: "'Bangers', cursive",
  letterSpacing: "0.04em",
};
const GOLD = "#D4AF37";

interface HeaderProps {
  navigate: (path: string) => void;
}

export function Header({ navigate }: HeaderProps) {
  const { theme } = useTheme();
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

  // suppress unused warning – theme kept for potential future use
  void theme;

  const shortAddr = connectedAddress
    ? `${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}`
    : null;

  useEffect(() => {
    setRegisterCallback(() => {
      setAuthTab("register");
      setAuthModalOpen(true);
    });
  }, []);

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

  const handleLogoClick = () => {
    triggerSticker();
    triggerPlayerOpen();
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-border bg-background backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* ── Single row on desktop (md+), two rows on mobile ── */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 py-2 md:flex-nowrap md:py-0 md:h-[80px]">
            {/* LEFT: Hamburger — always first */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-md hover:bg-accent transition-colors flex-shrink-0"
              style={{ color: GOLD }}
              aria-label="Open menu"
              data-ocid="nav.open_modal_button"
            >
              <Menu size={22} />
            </button>

            {/* BRAND */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex flex-col items-start gap-0.5 font-bold tracking-tight flex-1 min-w-0"
              style={BANGERS}
              data-ocid="nav.home.link"
            >
              <span
                className="text-lg sm:text-xl leading-tight truncate"
                style={{ color: GOLD }}
              >
                {t("researchers_community")}
              </span>
              <span
                className="font-normal leading-tight"
                style={{ fontSize: "0.85em", color: GOLD }}
              >
                {t("smarter_research")}
              </span>
            </button>

            {/* LOGO/MUSTACHE */}
            <button
              type="button"
              onClick={handleLogoClick}
              className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="cREAMY cOMMUNITY – Open Creamy Vibes Player"
              title="Open Creamy Vibes Player"
            >
              <img
                src="/assets/uploads/e6149769-dde7-4cf9-a544-1cede158fbd1-019d3653-1931-72e3-9b25-c3751a055916-1.png"
                alt="CryptAI Logo"
                className="h-[64px] w-[64px] md:h-[72px] md:w-[72px] object-contain rounded-full"
              />
            </button>

            {/* SPACER */}
            <div className="hidden md:block flex-1" />

            {/* RIGHT CONTROLS */}
            <div className="w-full md:w-auto flex items-center justify-end flex-wrap gap-1.5 sm:gap-2 order-last md:order-none">
              {/* Language selector */}
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-xs border border-border rounded-md px-1.5 py-1 transition-colors cursor-pointer flex-shrink-0"
                style={{ ...BANGERS, color: GOLD }}
                data-ocid="nav.language.select"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-card">
                    {lang.label}
                  </option>
                ))}
              </select>

              {/* Login/Register or User menu */}
              {isLoggedIn && currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-accent hover:bg-muted text-xs sm:text-sm font-medium transition-colors flex-shrink-0"
                      style={{ ...BANGERS, color: GOLD }}
                      data-ocid="nav.user.button"
                    >
                      <User size={14} />
                      <span className="max-w-[80px] truncate">
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
                      style={{ ...BANGERS, color: GOLD }}
                      data-ocid="nav.account_settings.button"
                    >
                      {t("account_settings")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer text-destructive"
                      style={BANGERS}
                      data-ocid="nav.logout.button"
                    >
                      {t("logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {!isLoggedIn && !timeExpired && (
                    <span
                      className="hidden sm:flex items-center text-xs font-mono bg-muted px-2 py-0.5 rounded-full"
                      style={{ color: GOLD }}
                      data-ocid="nav.timer.badge"
                    >
                      ⏱ {formatTimer(secondsLeft)}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={openLogin}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background hover:bg-accent text-xs font-medium transition-colors"
                    style={{ ...BANGERS, color: GOLD }}
                    data-ocid="nav.login_register.button"
                  >
                    <User size={14} />
                    <span>{t("login_register")}</span>
                  </button>
                </div>
              )}

              {/* Connect Wallet button */}
              <div className="relative flex-shrink-0">
                {isConnected ? (
                  <button
                    type="button"
                    onClick={disconnectWallet}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-accent hover:bg-muted text-xs font-medium transition-colors"
                    style={{ ...BANGERS, color: GOLD }}
                    data-ocid="nav.wallet.button"
                  >
                    <CircleDot size={14} className="text-success" />
                    <span>{shortAddr}</span>
                    <img
                      src={
                        walletType === "metamask"
                          ? "/assets/generated/wallet-metamask-transparent.dim_200x200.png"
                          : "/assets/uploads/download-019d36f9-e872-744d-8815-caf0b78f05f2-1.png"
                      }
                      alt={walletType ?? "wallet"}
                      className={`h-4 w-4 object-contain${walletType === "phantom" ? " rounded-md" : ""}`}
                    />
                  </button>
                ) : (
                  <div
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setWalletModalOpen(true)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity shadow-glow"
                      style={BANGERS}
                      data-ocid="nav.wallet.button"
                    >
                      <Wallet size={14} />
                      <span>{t("connect_wallet")}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowTooltip((v) => !v)}
                      className="absolute -top-1 -right-1 md:hidden text-muted-foreground"
                      aria-label="Wallet info"
                      data-ocid="nav.wallet.info"
                    >
                      <Info size={14} />
                    </button>

                    {showTooltip && (
                      <div
                        className="absolute right-0 top-full mt-2 w-64 sm:w-72 p-3 dark:bg-zinc-900 bg-white border border-border rounded-lg shadow-lg text-xs z-50"
                        style={{ ...BANGERS, color: GOLD }}
                      >
                        {t("wallet_disclaimer")}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* end right controls */}
          </div>
          {/* end flex row */}
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
