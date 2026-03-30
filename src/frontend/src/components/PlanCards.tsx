import {
  CreditCard as CardIcon,
  Check,
  ChevronDown,
  Coins,
  CreditCard,
  ImageIcon,
  Wallet,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PLANS } from "../config/plans";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useMembership } from "../contexts/MembershipContext";
import { useTheme } from "../contexts/ThemeContext";
import { useCurrency } from "../hooks/useCurrency";
import { triggerRegister } from "../utils/registerTrigger";

function OrDivider() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="flex-1 h-px bg-border/40" />
      <span className="text-base font-bold tracking-widest text-muted-foreground/50 uppercase">
        {t("or_label")}
      </span>
      <div className="flex-1 h-px bg-border/40" />
    </div>
  );
}

function FiatDropdown({ color }: { color: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const dropdownBg = theme === "dark" ? "#111111" : "#ffffff";
  const dropdownColor = theme === "dark" ? "#ffffff" : "#111111";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 py-2 w-full hover:opacity-80 transition-opacity"
        data-ocid="plans.fiat.button"
      >
        <CreditCard size={14} style={{ color }} />
        <span className="text-xs text-foreground">{t("fiat_label")}</span>
        <ChevronDown
          size={12}
          className={`ml-auto text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-48 rounded-xl border border-border shadow-lg"
          style={{ backgroundColor: dropdownBg, color: dropdownColor }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:opacity-70 transition-opacity rounded-t-xl"
            style={{ color: dropdownColor }}
          >
            <Wallet size={14} style={{ color }} />
            PayPal
          </button>
          <div className="h-px bg-border/40" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:opacity-70 transition-opacity rounded-b-xl"
            style={{ color: dropdownColor }}
          >
            <CardIcon size={14} style={{ color }} />
            Card
          </button>
        </div>
      )}
    </div>
  );
}

export function PlanCards() {
  const { t } = useLanguage();
  const { membershipLevel } = useMembership();
  const { isLoggedIn } = useAuth();
  const { formatPrice, getPlanPrice } = useCurrency();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const tierOrder = ["uncreamed", "creamed", "extracreamed", "creamy"];
  const userTierIdx = tierOrder.indexOf(membershipLevel);

  function getPrice(plan: {
    id: string;
    eurMonthly: number;
    isFree?: boolean;
  }) {
    if (plan.isFree) return "0$";
    const planId = plan.id as "creamed" | "extracreamed" | "creamy";
    const basePrice = getPlanPrice(planId);
    if (billing === "yearly") {
      return formatPrice(Math.ceil(basePrice * 12 * 0.75));
    }
    return formatPrice(basePrice);
  }

  function getFullYearlyPrice(plan: {
    id: string;
    eurMonthly: number;
    isFree?: boolean;
  }) {
    if (plan.isFree) return "0$";
    const planId = plan.id as "creamed" | "extracreamed" | "creamy";
    const basePrice = getPlanPrice(planId);
    return formatPrice(Math.ceil(basePrice * 12));
  }

  return (
    <section className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
      <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
        {t("plans_title")}
      </h2>

      {/* Billing toggle */}
      <div className="flex justify-center mb-6" data-ocid="plans.toggle">
        <div className="inline-flex rounded-full border border-border bg-muted p-1 gap-1">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              billing === "monthly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="plans.monthly.toggle"
          >
            {t("monthly_label")}
          </button>
          <button
            type="button"
            onClick={() => setBilling("yearly")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              billing === "yearly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="plans.yearly.toggle"
          >
            {t("yearly_label")}
            <span className="ml-1 text-[10px] font-semibold text-emerald-500">
              −25%
            </span>
          </button>
        </div>
      </div>

      {/* Plan cards — 1 col mobile, 2 col tablet, 4 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PLANS.map((plan, idx) => {
          const isActive = membershipLevel === plan.id;
          const planTierIdx = tierOrder.indexOf(plan.id);
          const isOwned =
            userTierIdx >= planTierIdx && membershipLevel !== "uncreamed";
          const isExtraCreamed = plan.id === "extracreamed";

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border-2 bg-card p-4 ${
                plan.borderClass
              } transition-transform hover:scale-[1.01]`}
              data-ocid={`plans.card.${idx + 1}`}
            >
              {/* Active badge */}
              {isOwned && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check size={10} />
                  {t("active_badge")}
                </div>
              )}

              {/* Best Plan badge for Extra Creamed */}
              {isExtraCreamed && !isOwned && (
                <div className="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {t("best_plan")}
                </div>
              )}

              {/* Plan label */}
              <div className="mb-3">
                <span
                  className="text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    color: plan.labelColor,
                    backgroundColor: `${plan.labelColor}22`,
                  }}
                >
                  {t(plan.labelKey as Parameters<typeof t>[0])}
                </span>
              </div>

              {/* Price */}
              <div className="mb-3">
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold text-foreground">
                    {getPrice(plan)}
                  </span>
                  {!plan.isFree && (
                    <span className="text-xs text-muted-foreground mb-1">
                      /
                      {billing === "yearly"
                        ? t("year_label")
                        : t("month_label")}
                    </span>
                  )}
                </div>
                {billing === "yearly" && !plan.isFree && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground line-through">
                      {getFullYearlyPrice(plan)}/yr
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      {t("save_25")}
                    </span>
                  </div>
                )}
              </div>

              <hr className="border-border/40 mb-3" />

              {/* Payment options — only for paid plans */}
              {plan.isFree ? (
                <div className="flex flex-col gap-3">
                  {/* Register for free button — only shown when NOT logged in */}
                  {!isLoggedIn && (
                    <button
                      type="button"
                      onClick={triggerRegister}
                      className="flex items-center gap-2 w-full py-2 px-3 rounded-full font-semibold text-xs transition-all hover:opacity-80 active:scale-95"
                      style={{
                        color: plan.labelColor,
                        backgroundColor: `${plan.labelColor}22`,
                        border: `1.5px solid ${plan.labelColor}55`,
                      }}
                      data-ocid="plans.register.button"
                    >
                      <Check size={13} style={{ color: plan.labelColor }} />
                      {t("register_for_free")}
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-0">
                  {/* Fiat payment with dropdown */}
                  <FiatDropdown color={plan.labelColor} />

                  <OrDivider />

                  {/* Coin option */}
                  <div className="flex items-center gap-2 py-1.5">
                    <Coins size={13} style={{ color: plan.labelColor }} />
                    <span className="text-xs text-foreground">
                      {plan.tokenAmount}
                    </span>
                    <a
                      href={plan.coinBuyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors hover:opacity-80"
                      style={{
                        color: plan.labelColor,
                        borderColor: plan.labelColor,
                      }}
                      data-ocid={`plans.coin.link.${idx + 1}`}
                    >
                      Buy &amp; Hold
                    </a>
                  </div>

                  <OrDivider />

                  {/* NFT option */}
                  <div className="flex items-center gap-2 py-1.5">
                    <ImageIcon size={13} style={{ color: plan.labelColor }} />
                    <span className="text-xs text-foreground">
                      {plan.nftType}
                    </span>
                    <a
                      href={plan.nftBuyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors hover:opacity-80"
                      style={{
                        color: plan.labelColor,
                        borderColor: plan.labelColor,
                      }}
                      data-ocid={`plans.nft.link.${idx + 1}`}
                    >
                      Buy &amp; Hold
                    </a>
                  </div>
                </div>
              )}

              {isActive && (
                <div
                  className="mt-3 text-center text-xs font-medium"
                  style={{ color: plan.labelColor }}
                >
                  ✓ {t("your_current_plan")}
                </div>
              )}

              {/* Benefits list */}
              <hr className="border-border/40 my-3" />
              <div className="flex flex-col gap-1.5">
                {plan.benefitKeys.map((key, benefitIdx) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 py-0.5"
                    data-ocid={`plans.benefit.${idx + 1}.item.${benefitIdx + 1}`}
                  >
                    <Check
                      size={13}
                      style={{ color: plan.labelColor, flexShrink: 0 }}
                    />
                    <span className="text-xs text-foreground">
                      {t(key as Parameters<typeof t>[0])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
