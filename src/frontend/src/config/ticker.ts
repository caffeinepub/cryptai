export interface TickerItem {
  symbol: string;
  price: number;
  change: number;
}

export const TICKER_DATA: TickerItem[] = [
  { symbol: "BTC", price: 67234.5, change: 2.3 },
  { symbol: "ETH", price: 3512.8, change: 1.8 },
  { symbol: "SOL", price: 172.4, change: 4.2 },
  { symbol: "BNB", price: 412.2, change: -0.5 },
  { symbol: "ADA", price: 0.52, change: 1.1 },
  { symbol: "DOGE", price: 0.18, change: -1.3 },
  { symbol: "MATIC", price: 0.89, change: 2.7 },
  { symbol: "LINK", price: 18.3, change: 3.1 },
  { symbol: "DOT", price: 9.15, change: -0.8 },
  { symbol: "AVAX", price: 38.9, change: 1.5 },
];

export interface NewsTickerItem {
  type: "news";
  text: string;
}

export const NEWS_TICKER_DATA: NewsTickerItem[] = [
  {
    type: "news",
    text: "Bitcoin hits new monthly high as institutional inflows surge",
  },
  { type: "news", text: "Ethereum ETF net inflows reach $200M in 24 hours" },
  { type: "news", text: "SEC approves new crypto custody rules for 2025" },
  { type: "news", text: "Solana surpasses 5,000 TPS milestone" },
  {
    type: "news",
    text: "AI-driven trading bots account for 40% of crypto volume",
  },
  { type: "news", text: "DeFi total locked value crosses $120 billion" },
];

export interface ArticleTickerItem {
  type: "article";
  title: string;
  accessLevel: "free" | "basic" | "premium" | "vip";
}

export const ARTICLE_TICKER_DATA: ArticleTickerItem[] = [
  // Latest per access level
  {
    type: "article",
    title: "The Rise of Large Language Models in 2025",
    accessLevel: "free",
  },
  {
    type: "article",
    title: "DeFi Yield Strategies for 2025: A Practical Guide",
    accessLevel: "basic",
  },
  {
    type: "article",
    title: "Institutional Crypto Accumulation: On-Chain Evidence",
    accessLevel: "premium",
  },
  {
    type: "article",
    title: "Exclusive: Q2 2025 Crypto Market Outlook",
    accessLevel: "vip",
  },
  {
    type: "article",
    title: "Bitcoin's Halving Cycle: What History Tells Us",
    accessLevel: "free",
  },
  {
    type: "article",
    title: "Multi-Agent AI Systems: Architecture Deep Dive",
    accessLevel: "premium",
  },
];
