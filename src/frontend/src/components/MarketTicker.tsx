import {
  ARTICLE_TICKER_DATA,
  NEWS_TICKER_DATA,
  TICKER_DATA,
} from "../config/ticker";

const ACCESS_BADGE: Record<string, { label: string; className: string }> = {
  free: {
    label: "FREE",
    className: "text-green-400 bg-green-400/15 border border-green-400/30",
  },
  basic: {
    label: "BASIC",
    className: "text-amber-400 bg-amber-400/15 border border-amber-400/30",
  },
  premium: {
    label: "PREMIUM",
    className: "text-slate-300 bg-slate-300/15 border border-slate-300/30",
  },
  vip: {
    label: "VIP",
    className: "text-yellow-400 bg-yellow-400/15 border border-yellow-400/30",
  },
};

function PriceItem({
  symbol,
  price,
  change,
}: { symbol: string; price: number; change: number }) {
  const isPositive = change >= 0;
  const formatted =
    price >= 1000
      ? `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : price >= 1
        ? `$${price.toFixed(2)}`
        : `$${price.toFixed(4)}`;

  return (
    <span className="inline-flex items-center gap-2 px-4 whitespace-nowrap">
      <span className="font-semibold text-foreground text-sm">{symbol}</span>
      <span className="text-muted-foreground text-sm">{formatted}</span>
      <span
        className={`text-xs font-medium px-1.5 py-0.5 rounded ${
          isPositive
            ? "text-green-400 bg-green-400/10"
            : "text-red-400 bg-red-400/10"
        }`}
      >
        {isPositive ? "+" : ""}
        {change}%
      </span>
      <span className="text-border mx-2">•</span>
    </span>
  );
}

function NewsItem({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 whitespace-nowrap">
      <span className="text-xs font-bold px-1.5 py-0.5 rounded text-blue-400 bg-blue-400/15 border border-blue-400/30 uppercase tracking-wide">
        NEWS
      </span>
      <span className="text-muted-foreground text-sm">{text}</span>
      <span className="text-border mx-2">•</span>
    </span>
  );
}

function ArticleItem({
  title,
  accessLevel,
}: { title: string; accessLevel: "free" | "basic" | "premium" | "vip" }) {
  const badge = ACCESS_BADGE[accessLevel];
  return (
    <span className="inline-flex items-center gap-2 px-4 whitespace-nowrap">
      <span
        className={`text-xs font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${badge.className}`}
      >
        {badge.label}
      </span>
      <span className="text-muted-foreground text-sm max-w-[280px] truncate">
        {title}
      </span>
      <span className="text-border mx-2">•</span>
    </span>
  );
}

export function MarketTicker() {
  const priceItems = TICKER_DATA.map((item) => ({
    kind: "price" as const,
    uid: `price-${item.symbol}`,
    ...item,
  }));
  const newsItems = NEWS_TICKER_DATA.map((item, i) => ({
    kind: "news" as const,
    uid: `news-${i}`,
    ...item,
  }));
  const articleItems = ARTICLE_TICKER_DATA.map((item, i) => ({
    kind: "article" as const,
    uid: `article-${i}`,
    ...item,
  }));

  const allItems = [...priceItems, ...newsItems, ...articleItems];
  // Duplicate for seamless scroll loop, add suffix to uid for uniqueness
  const doubled = [
    ...allItems,
    ...allItems.map((item) => ({ ...item, uid: `${item.uid}-b` })),
  ];

  return (
    <div className="w-full overflow-hidden border-b border-border bg-[oklch(0.11_0.006_245)] dark:bg-[oklch(0.095_0.006_245)]">
      <div className="flex ticker-scroll py-2.5">
        {doubled.map((item) => {
          if (item.kind === "price") {
            return (
              <PriceItem
                key={item.uid}
                symbol={item.symbol}
                price={item.price}
                change={item.change}
              />
            );
          }
          if (item.kind === "news") {
            return <NewsItem key={item.uid} text={item.text} />;
          }
          return (
            <ArticleItem
              key={item.uid}
              title={item.title}
              accessLevel={item.accessLevel}
            />
          );
        })}
      </div>
    </div>
  );
}
