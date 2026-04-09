import { ArrowRight, Brain, TrendingUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface MainTilesProps {
  navigate: (path: string) => void;
}

export function MainTiles({ navigate }: MainTilesProps) {
  const { t } = useLanguage();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* AI Tile */}
      <button
        type="button"
        onClick={() => navigate("/ai")}
        className="group relative overflow-hidden rounded-2xl border border-[#D4AF37] bg-card p-8 text-left transition-all duration-300 hover:border-primary/50 hover:scale-[1.01] hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary/50"
        data-ocid="main.ai.button"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Brain size={28} />
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground mb-3">
            {t("nav_ai")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("ai_desc")}
          </p>
          <div className="mt-6 flex items-center gap-2 text-primary text-sm font-semibold">
            <span>Explore AI</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </button>

      {/* Crypto Tile */}
      <button
        type="button"
        onClick={() => navigate("/cryptoandmarket")}
        className="group relative overflow-hidden rounded-2xl border border-[#D4AF37] bg-card p-8 text-left transition-all duration-300 hover:border-primary/50 hover:scale-[1.01] hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary/50"
        data-ocid="main.crypto.button"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <TrendingUp size={28} />
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground mb-3">
            {t("nav_crypto")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("crypto_desc")}
          </p>
          <div className="mt-6 flex items-center gap-2 text-primary text-sm font-semibold">
            <span>Explore Markets</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </button>
    </section>
  );
}
