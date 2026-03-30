import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LoginRegisterModal } from "./components/LoginRegisterModal";
import { MusicPlayer, MusicPlayerCollapsedBar } from "./components/MusicPlayer";
import { RegisterPrompt } from "./components/RegisterPrompt";
import { SEOHead } from "./components/SEOHead";
import { StickerOverlay } from "./components/StickerOverlay";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { MembershipProvider } from "./contexts/MembershipContext";
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext";
import {
  ReadingTimerProvider,
  useReadingTimer,
} from "./contexts/ReadingTimerContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WalletProvider } from "./contexts/WalletContext";
import { useActor } from "./hooks/useActor";
import { AIPage } from "./pages/AIPage";
import { CryptoPage } from "./pages/CryptoPage";
import { HomePage } from "./pages/HomePage";
import { PlaceholderPage } from "./pages/PlaceholderPage";

const PAGE_NAMES: Record<string, string> = {
  "/page-1": "About CreamyCryptoAI.org",
  "/page-2": "AI Tools",
  "/page-3": "Market Analysis",
  "/page-4": "Trading Signals",
  "/page-5": "DeFi Hub",
  "/page-6": "NFT Marketplace",
  "/page-7": "Tokenomics",
  "/page-8": "Research Papers",
  "/page-9": "Community",
  "/page-10": "Contact",
};

function AppContent() {
  const [currentPath, setCurrentPath] = useState(() => {
    const hash = window.location.hash.replace("#", "") || "/";
    return hash;
  });
  const { actor } = useActor();
  const { isLoggedIn } = useAuth();
  const { timeExpired } = useReadingTimer();
  const [promptModalOpen, setPromptModalOpen] = useState(false);
  const [promptTab, setPromptTab] = useState<"login" | "register">("register");

  useEffect(() => {
    if (actor) {
      actor.seedPlaceholderPages().catch(() => {});
    }
  }, [actor]);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "/";
      setCurrentPath(hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderPage = () => {
    if (currentPath === "/" || currentPath === "")
      return <HomePage navigate={navigate} />;
    if (currentPath === "/ai") return <AIPage />;
    if (currentPath === "/cryptoandmarket") return <CryptoPage />;
    if (PAGE_NAMES[currentPath])
      return <PlaceholderPage name={PAGE_NAMES[currentPath]} />;
    return <HomePage navigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Dynamic SEO meta tags -- updates per language */}
      <SEOHead />
      <Header navigate={navigate} />
      {/* Music player — persists across route changes, appears directly below header */}
      <MusicPlayer />
      <MusicPlayerCollapsedBar />
      <div className="flex-1">{renderPage()}</div>
      <Footer />
      <Toaster />
      <StickerOverlay />

      {/* Reading timer expired prompt */}
      {timeExpired && !isLoggedIn && (
        <RegisterPrompt
          onRegister={() => {
            setPromptTab("register");
            setPromptModalOpen(true);
          }}
          onLogin={() => {
            setPromptTab("login");
            setPromptModalOpen(true);
          }}
        />
      )}
      <LoginRegisterModal
        open={promptModalOpen}
        onClose={() => setPromptModalOpen(false)}
        defaultTab={promptTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ReadingTimerProvider>
            <WalletProvider>
              <MembershipProvider>
                <MusicPlayerProvider>
                  <AppContent />
                </MusicPlayerProvider>
              </MembershipProvider>
            </WalletProvider>
          </ReadingTimerProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
