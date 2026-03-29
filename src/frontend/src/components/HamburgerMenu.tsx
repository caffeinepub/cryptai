import { X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const MENU_PAGES = [
  { label: "About CryptoAI.org", path: "/page-1" },
  { label: "AI Tools", path: "/page-2" },
  { label: "Market Analysis", path: "/page-3" },
  { label: "Trading Signals", path: "/page-4" },
  { label: "DeFi Hub", path: "/page-5" },
  { label: "NFT Marketplace", path: "/page-6" },
  { label: "Tokenomics", path: "/page-7" },
  { label: "Research Papers", path: "/page-8" },
  { label: "Community", path: "/page-9" },
  { label: "Contact", path: "/page-10" },
];

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
}

export function HamburgerMenu({
  isOpen,
  onClose,
  navigate,
}: HamburgerMenuProps) {
  const { t } = useLanguage();

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        data-ocid="nav.backdrop"
        aria-label="Close menu"
      />
      {/* Menu Panel */}
      <nav
        className="fixed top-0 left-0 h-full w-72 bg-black border-r border-zinc-800 z-50 slide-in-left"
        data-ocid="nav.panel"
      >
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <span className="font-bold text-lg text-white">
            CryptoAI<span className="text-primary">.org</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            data-ocid="nav.close_button"
          >
            <X size={20} />
          </button>
        </div>

        <div className="py-4">
          {/* Main nav */}
          <div className="px-3 space-y-1">
            <button
              type="button"
              onClick={() => handleNav("/")}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-900 text-white hover:text-primary transition-colors font-medium"
              data-ocid="nav.home.link"
            >
              {t("nav_home")}
            </button>
            <button
              type="button"
              onClick={() => handleNav("/ai")}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-900 text-white hover:text-primary transition-colors font-medium"
              data-ocid="nav.ai.link"
            >
              {t("nav_ai")}
            </button>
            <button
              type="button"
              onClick={() => handleNav("/cryptoandmarket")}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-900 text-white hover:text-primary transition-colors font-medium"
              data-ocid="nav.crypto.link"
            >
              {t("nav_crypto")}
            </button>
          </div>

          {/* Divider */}
          <div className="my-4 mx-3 border-t border-zinc-800" />

          {/* Placeholder pages */}
          <div className="px-3 space-y-1">
            {MENU_PAGES.map((page, idx) => (
              <button
                type="button"
                key={page.path}
                onClick={() => handleNav(page.path)}
                className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors text-sm"
                data-ocid={`nav.page.link.${idx + 1}`}
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
