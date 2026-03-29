import { BarChart3, Coins, Shield, TrendingUp } from "lucide-react";
import { MarketTicker } from "../components/MarketTicker";

const CRYPTO_SECTIONS = [
  {
    icon: TrendingUp,
    title: "Market Overview",
    desc: "Real-time prices, charts, and market cap rankings across all major assets.",
    color: "text-green-400",
  },
  {
    icon: BarChart3,
    title: "Technical Analysis",
    desc: "Chart patterns, indicators, and expert technical analysis for traders.",
    color: "text-blue-400",
  },
  {
    icon: Coins,
    title: "DeFi Hub",
    desc: "Yield farming, liquidity pools, and decentralized protocol insights.",
    color: "text-yellow-400",
  },
  {
    icon: Shield,
    title: "On-Chain Analytics",
    desc: "Whale tracking, exchange flows, and blockchain intelligence.",
    color: "text-violet-400",
  },
];

export function CryptoPage() {
  return (
    <main>
      <MarketTicker />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5">
            <TrendingUp size={32} />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Crypto & Market
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time market intelligence, DeFi analytics, and expert crypto
            insights to stay ahead of the market.
          </p>
        </div>

        {/* Sub-sections grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {CRYPTO_SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className={`mb-4 ${section.color}`}>
                <section.icon size={28} />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                {section.title}
              </h3>
              <p className="text-muted-foreground text-sm">{section.desc}</p>
            </div>
          ))}
        </div>

        {/* Coming soon */}
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
            Coming Soon
          </p>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Live Market Data
          </h2>
          <p className="text-muted-foreground">
            Real-time charts, portfolio tracking, and AI-powered market signals
            are in development.
          </p>
        </div>
      </div>
    </main>
  );
}
