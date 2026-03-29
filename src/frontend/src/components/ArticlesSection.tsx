import { ARTICLE_TRANSLATIONS } from "../config/articleTranslations";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useMembership } from "../contexts/MembershipContext";
import { type Article, ArticleCard } from "./ArticleCard";

const ARTICLES: Article[] = [
  // Free articles
  {
    id: "f1",
    title: "The Rise of Large Language Models in 2025",
    summary:
      "How GPT-5, Gemini Ultra, and open-source models are reshaping the AI landscape and what it means for developers.",
    publishDate: "2025-03-20",
    accessLevel: "free",
    category: "AI",
    gradient: "bg-gradient-to-br from-blue-900 to-indigo-900",
    topicLabels: ["AI"],
    typeLabel: "Text",
  },
  {
    id: "f2",
    title: "Bitcoin's Halving Cycle: What History Tells Us",
    summary:
      "An analysis of Bitcoin's historical price behavior around halving events and what the data suggests for 2025.",
    publishDate: "2025-03-18",
    accessLevel: "free",
    category: "Crypto",
    gradient: "bg-gradient-to-br from-orange-900 to-yellow-900",
    topicLabels: ["Crypto projects", "Market & microeconomy"],
    typeLabel: "Tabelle",
  },
  {
    id: "f3",
    title: "Understanding Blockchain Consensus Mechanisms",
    summary:
      "A beginner-friendly breakdown of Proof of Work, Proof of Stake, and newer consensus models.",
    publishDate: "2025-03-15",
    accessLevel: "free",
    category: "Crypto",
    gradient: "bg-gradient-to-br from-purple-900 to-pink-900",
    topicLabels: ["Crypto projects"],
    typeLabel: "Video",
  },
  {
    id: "f4",
    title: "AI Ethics: The Challenges of Responsible Development",
    summary:
      "Exploring the ethical considerations shaping AI development, from bias to privacy and accountability.",
    publishDate: "2025-03-10",
    accessLevel: "free",
    category: "AI",
    gradient: "bg-gradient-to-br from-teal-900 to-cyan-900",
    topicLabels: ["AI"],
    typeLabel: "Text",
  },
  // Basic articles
  {
    id: "b1",
    title: "DeFi Yield Strategies for 2025: A Practical Guide",
    summary:
      "Advanced yield farming strategies across major DeFi protocols with risk assessment and ROI analysis.",
    publishDate: "2025-03-22",
    accessLevel: "basic",
    category: "Crypto",
    gradient: "bg-gradient-to-br from-amber-800 to-orange-800",
    topicLabels: ["Crypto projects", "Market & microeconomy"],
    typeLabel: "Text",
  },
  {
    id: "b2",
    title: "Fine-Tuning LLMs: Cost vs Performance Trade-offs",
    summary:
      "A technical comparison of LoRA, QLoRA, and full fine-tuning approaches for production AI deployments.",
    publishDate: "2025-03-19",
    accessLevel: "basic",
    category: "AI",
    gradient: "bg-gradient-to-br from-blue-800 to-violet-800",
    topicLabels: ["AI"],
    typeLabel: "Text",
  },
  {
    id: "b3",
    title: "Altcoin Season Indicators: Reading the Signals",
    summary:
      "Key on-chain metrics and market indicators that historically precede altcoin bull markets.",
    publishDate: "2025-03-16",
    accessLevel: "basic",
    category: "Crypto",
    gradient: "bg-gradient-to-br from-green-900 to-emerald-800",
    topicLabels: ["Market & microeconomy"],
    typeLabel: "Tabelle",
  },
  {
    id: "b4",
    title: "Building RAG Pipelines with Open Source Tools",
    summary:
      "Step-by-step guide to building production-ready Retrieval Augmented Generation systems.",
    publishDate: "2025-03-12",
    accessLevel: "basic",
    category: "AI",
    gradient: "bg-gradient-to-br from-indigo-900 to-blue-800",
    topicLabels: ["AI"],
    typeLabel: "Video",
  },
  // Premium articles
  {
    id: "p1",
    title: "Institutional Crypto Accumulation: On-Chain Evidence",
    summary:
      "Analyzing whale wallet movements and exchange outflows to track institutional accumulation patterns.",
    publishDate: "2025-03-23",
    accessLevel: "premium",
    category: "Crypto",
    gradient: "bg-gradient-to-br from-slate-700 to-gray-700",
    topicLabels: ["Crypto projects", "Market & microeconomy"],
    typeLabel: "Tabelle",
  },
  {
    id: "p2",
    title: "Multi-Agent AI Systems: Architecture Deep Dive",
    summary:
      "How leading organizations are deploying multi-agent frameworks for complex reasoning and task automation.",
    publishDate: "2025-03-21",
    accessLevel: "premium",
    category: "AI",
    gradient: "bg-gradient-to-br from-violet-800 to-purple-900",
    topicLabels: ["AI"],
    typeLabel: "Video",
  },
  {
    id: "p3",
    title: "Cross-Chain Arbitrage: Advanced Strategies",
    summary:
      "Exploiting price inefficiencies across chains with MEV bots and bridge optimization techniques.",
    publishDate: "2025-03-17",
    accessLevel: "premium",
    category: "Crypto",
    gradient: "bg-gradient-to-br from-rose-900 to-red-800",
    topicLabels: ["Crypto projects"],
    typeLabel: "Text",
  },
  {
    id: "p4",
    title: "AI-Powered Trading: Backtesting Methodologies",
    summary:
      "How to properly backtest ML trading strategies to avoid overfitting and data snooping biases.",
    publishDate: "2025-03-13",
    accessLevel: "premium",
    category: "AI",
    gradient: "bg-gradient-to-br from-cyan-900 to-teal-800",
    topicLabels: ["AI", "Market & microeconomy"],
    typeLabel: "Text",
  },
  // VIP articles
  {
    id: "v1",
    title: "Exclusive: Q2 2025 Crypto Market Outlook",
    summary:
      "Our proprietary model's forecast for major assets through Q2 2025, with actionable entry/exit signals.",
    publishDate: "2025-03-25",
    accessLevel: "vip",
    category: "Crypto",
    gradient: "bg-gradient-to-br from-yellow-800 to-amber-700",
    topicLabels: ["Market & microeconomy", "Crypto projects"],
    typeLabel: "Tabelle",
  },
  {
    id: "v2",
    title: "AI Alpha: Proprietary Model Predictions for Tech Stocks",
    summary:
      "Our ensemble ML models' predictions for AI-sector equities with confidence intervals and risk scores.",
    publishDate: "2025-03-24",
    accessLevel: "vip",
    category: "AI",
    gradient: "bg-gradient-to-br from-yellow-700 to-amber-700",
    topicLabels: ["AI", "Market & microeconomy"],
    typeLabel: "Text",
  },
  {
    id: "v3",
    title: "Private Deal Flow: Seed-Stage AI Startups to Watch",
    summary:
      "Curated list of pre-public AI companies with strong fundamentals and upcoming funding rounds.",
    publishDate: "2025-03-20",
    accessLevel: "vip",
    category: "AI",
    gradient: "bg-gradient-to-br from-amber-900 to-orange-800",
    topicLabels: ["AI"],
    typeLabel: "Video",
  },
  {
    id: "v4",
    title: "Regulatory Arbitrage in Crypto: 2025 Landscape",
    summary:
      "Jurisdiction-by-jurisdiction analysis of crypto regulatory developments and optimal structuring strategies.",
    publishDate: "2025-03-14",
    accessLevel: "vip",
    category: "Crypto",
    gradient: "bg-gradient-to-br from-yellow-900 to-amber-800",
    topicLabels: ["Crypto projects", "Market & microeconomy"],
    typeLabel: "Text",
  },
];

function sortByDate(articles: Article[]): Article[] {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );
}

export function ArticlesSection() {
  const { t, isArabicRegion, currentLanguage } = useLanguage();
  const { isLoggedIn } = useAuth();
  const { membershipLevel } = useMembership();

  const filtered = (level: Article["accessLevel"]) =>
    sortByDate(
      ARTICLES.filter((a) => {
        if (a.isArabicOriginal && !isArabicRegion) return false;
        return a.accessLevel === level;
      }),
    ).slice(0, 2);

  const freeArticles = filtered("free");
  const basicArticles = filtered("basic");
  const premiumArticles = filtered("premium");
  const vipArticles = filtered("vip");

  const allShown = [
    ...freeArticles,
    ...basicArticles,
    ...premiumArticles,
    ...vipArticles,
  ];

  // Determine access per article
  const getAccess = (article: Article, indexInLevel: number): boolean => {
    const level = membershipLevel;

    if (level === "vip") return true;
    if (level === "premium") {
      return article.accessLevel !== "vip";
    }
    if (level === "basic") {
      return article.accessLevel === "free" || article.accessLevel === "basic";
    }

    // free / not logged in
    if (article.accessLevel === "free") {
      if (!isLoggedIn) {
        // Only first free article
        const freeIdx = freeArticles.findIndex((a) => a.id === article.id);
        return freeIdx === 0;
      }
      // Logged in (registered): all free articles
      return true;
    }

    if (article.accessLevel === "basic") {
      if (!isLoggedIn) return false;
      // Registered user: only first basic article
      return indexInLevel === 0;
    }

    return false;
  };

  let basicCounter = 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
        {t("articles_title")}
      </h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-ocid="articles.list"
      >
        {allShown.map((article, idx) => {
          let indexInLevel = 0;
          if (article.accessLevel === "basic") {
            indexInLevel = basicCounter;
            basicCounter++;
          }
          const access = getAccess(article, indexInLevel);
          // Get translated title/summary
          const trans =
            ARTICLE_TRANSLATIONS[article.id]?.[currentLanguage] ||
            ARTICLE_TRANSLATIONS[article.id]?.en;
          const displayTitle = trans?.title || article.title;
          const displaySummary = trans?.summary || article.summary;
          return (
            <div key={article.id} data-ocid={`articles.item.${idx + 1}`}>
              <ArticleCard
                article={article}
                isAccessGranted={access}
                displayTitle={displayTitle}
                displaySummary={displaySummary}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { ARTICLES };
