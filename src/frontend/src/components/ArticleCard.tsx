import { Calendar, Lock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export type AccessLevel = "free" | "basic" | "premium" | "vip";
export type TopicLabel = "Crypto projects" | "Market & microeconomy" | "AI";
export type TypeLabel = "Video" | "Text" | "Tabelle";

export interface Article {
  id: string;
  title: string;
  summary: string;
  publishDate: string;
  accessLevel: AccessLevel;
  category: "AI" | "Crypto" | "General";
  gradient: string;
  isArabicOriginal?: boolean;
  topicLabels: TopicLabel[];
  typeLabel: TypeLabel;
}

const BADGE_STYLES: Record<AccessLevel, string> = {
  free: "badge-free",
  basic: "badge-basic",
  premium: "badge-premium",
  vip: "badge-vip",
};

const LEVEL_LABELS: Record<AccessLevel, string> = {
  free: "FREE",
  basic: "BASIC",
  premium: "PREMIUM",
  vip: "VIP",
};

interface ArticleCardProps {
  article: Article;
  isAccessGranted: boolean;
  displayTitle?: string;
  displaySummary?: string;
}

export function ArticleCard({
  article,
  isAccessGranted,
  displayTitle,
  displaySummary,
}: ArticleCardProps) {
  const { t } = useLanguage();
  const title = displayTitle || article.title;
  const summary = displaySummary || article.summary;

  return (
    <article className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-300">
      {/* Thumbnail */}
      <div
        className={`h-44 w-full ${article.gradient} relative overflow-hidden`}
      >
        {!isAccessGranted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2 text-white/80">
              <Lock size={28} />
              <span className="text-xs font-medium">
                {t("upgrade_to")} {LEVEL_LABELS[article.accessLevel]}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${BADGE_STYLES[article.accessLevel]}`}
          >
            {LEVEL_LABELS[article.accessLevel]}
          </span>
          <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">
            {article.category}
          </span>
        </div>

        <h3
          className={`font-semibold text-base mb-2 line-clamp-2 transition-colors group-hover:text-primary ${
            isAccessGranted ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {isAccessGranted ? (
            title
          ) : (
            <span className="blur-sm select-none">{title}</span>
          )}
        </h3>

        {isAccessGranted ? (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {summary}
          </p>
        ) : (
          <div className="space-y-1.5">
            <div className="h-3 rounded bg-muted w-full" />
            <div className="h-3 rounded bg-muted w-4/5" />
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar size={12} />
          <span>{article.publishDate}</span>
          <span className="text-border">·</span>
          {article.topicLabels.map((label) => (
            <span
              key={label}
              className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium"
            >
              {label}
            </span>
          ))}
          <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium border border-border">
            {article.typeLabel}
          </span>
        </div>
      </div>
    </article>
  );
}
