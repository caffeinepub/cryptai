import { Calendar, Lock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

export type AccessLevel = "free" | "basic" | "premium" | "vip";
export type TopicLabel = "Crypto projects" | "Market & microeconomy" | "AI";
export type TypeLabel = "Video" | "Article" | "Table" | "Graphic" | "Text";

export interface Article {
  id: string;
  title: string;
  summary: string;
  publishDate: string;
  accessLevel: AccessLevel;
  category: "AI" | "Crypto" | "General";
  gradient: string;
  isArabicOriginal?: boolean;
  arabic_only?: boolean;
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
  free: "Uncreamed",
  basic: "Creamed",
  premium: "Extra Creamed",
  vip: "Creamy",
};

const PLAN_COLORS: Record<
  AccessLevel,
  { border: string; shadow: string; bg: string }
> = {
  free: { border: "#4ade80", shadow: "rgba(74,222,128,0.45)", bg: "#4ade80" },
  basic: { border: "#b87333", shadow: "rgba(184,115,51,0.45)", bg: "#b87333" },
  premium: {
    border: "#94a3b8",
    shadow: "rgba(148,163,184,0.45)",
    bg: "#94a3b8",
  },
  vip: { border: "#D4AF37", shadow: "rgba(212,175,55,0.45)", bg: "#D4AF37" },
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
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const title = displayTitle || article.title;
  const summary = displaySummary || article.summary;
  const colors = PLAN_COLORS[article.accessLevel];

  const cardBg = isDark ? "#18181b" : "#ffffff";
  const topBarBg = isDark ? "#2a2a2d" : "#e4e4e7";
  const topBarText = isDark ? "#ffffff" : "#18181b";
  const defaultBorder = isDark ? "rgba(63,63,70,0.5)" : "rgba(228,228,231,0.8)";
  const titleColor = isDark ? "#ffffff" : "#18181b";
  const mutedColor = isDark ? "#a1a1aa" : "#71717a";
  const chipBg = isDark ? "#27272a" : "#f4f4f5";

  return (
    <article
      className="group rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        border: `1px solid ${defaultBorder}`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.border = `1px solid ${colors.border}`;
        el.style.boxShadow = `0 0 0 1px ${colors.border}, 0 4px 24px ${colors.shadow}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.border = `1px solid ${defaultBorder}`;
        el.style.boxShadow = "none";
      }}
    >
      {/* Top bar */}
      <div
        style={{ backgroundColor: topBarBg, height: "38px" }}
        className="w-full flex items-center justify-center px-3"
      >
        {!isAccessGranted ? (
          <span
            className="flex items-center gap-1.5 text-xs font-semibold"
            style={{ color: topBarText }}
          >
            <Lock size={12} />
            {t("upgrade_to")} {LEVEL_LABELS[article.accessLevel]}
          </span>
        ) : (
          <span className="text-xs font-semibold" style={{ color: topBarText }}>
            {LEVEL_LABELS[article.accessLevel]}
          </span>
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
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{ backgroundColor: chipBg, color: mutedColor }}
          >
            {article.category}
          </span>
        </div>

        {/* Topic labels: always visible, even when access is not granted */}
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          {article.topicLabels.map((label) => (
            <span
              key={label}
              className="px-1.5 py-0.5 rounded text-xs font-medium"
              style={{ backgroundColor: chipBg, color: mutedColor }}
            >
              {label}
            </span>
          ))}
          <span
            className="px-1.5 py-0.5 rounded text-xs font-medium"
            style={{
              backgroundColor: chipBg,
              color: mutedColor,
              border: `1px solid ${defaultBorder}`,
            }}
          >
            {article.typeLabel}
          </span>
        </div>

        <h3
          className="font-semibold text-base mb-2 line-clamp-2 transition-colors"
          style={{ color: isAccessGranted ? titleColor : mutedColor }}
        >
          {isAccessGranted ? (
            title
          ) : (
            <span className="blur-sm select-none">{title}</span>
          )}
        </h3>

        {isAccessGranted ? (
          <p className="text-sm line-clamp-2" style={{ color: mutedColor }}>
            {summary}
          </p>
        ) : (
          <div className="space-y-1.5">
            <div
              className="h-3 rounded w-full"
              style={{ backgroundColor: chipBg }}
            />
            <div
              className="h-3 rounded w-4/5"
              style={{ backgroundColor: chipBg }}
            />
          </div>
        )}

        <div
          className="mt-4 flex flex-wrap items-center gap-1.5 text-xs"
          style={{ color: mutedColor }}
        >
          <Calendar size={12} />
          <span>{article.publishDate}</span>
        </div>
      </div>
    </article>
  );
}
