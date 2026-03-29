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
import { useLanguage } from "../contexts/LanguageContext";
import { useMembership } from "../contexts/MembershipContext";
import { useTheme } from "../contexts/ThemeContext";
import { useCurrency } from "../hooks/useCurrency";

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
        <span className="text-sm text-foreground">{t("fiat_label")}</span>
        <ChevronDown
          size={12}
          className={`ml-auto text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-52 rounded-xl border border-border shadow-lg"
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
  const { formatPrice } = useCurrency();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const tierOrder = ["free", "basic", "premium", "vip"];
  const userTierIdx = tierOrder.indexOf(membershipLevel);

  function getPrice(eurMonthly: number) {
    if (billing === "yearly") {
      const yearly = eurMonthly * 12 * 0.75;
      return formatPrice(Math.ceil(yearly));
    }
    return formatPrice(eurMonthly);
  }

  function getFullYearlyPrice(eurMonthly: number) {
    return formatPrice(Math.ceil(eurMonthly * 12));
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-3xl font-display font-bold text-foreground mb-6 text-center">
        {t("plans_title")}
      </h2>

      {/* Billing toggle */}
      <div className="flex justify-center mb-8" data-ocid="plans.toggle">
        <div className="inline-flex rounded-full border border-border bg-muted p-1 gap-1">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
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
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
              billing === "yearly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="plans.yearly.toggle"
          >
            {t("yearly_label")}
            <span className="ml-1.5 text-[10px] font-semibold text-emerald-500">
              −25%
            </span>
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan, idx) => {
          const isActive = membershipLevel === plan.id;
          const planTierIdx = tierOrder.indexOf(plan.id);
          const isOwned =
            userTierIdx >= planTierIdx && membershipLevel !== "free";
          const isPremium = plan.id === "premium";

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border-2 bg-card p-6 ${
                plan.borderClass
              } transition-transform hover:scale-[1.01]`}
              data-ocid={`plans.card.${idx + 1}`}
            >
              {/* Active badge */}
              {isOwned && (
                <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check size={10} />
                  {t("active_badge")}
                </div>
              )}

              {/* Best Plan badge for Premium */}
              {isPremium && !isOwned && (
                <div className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {t("best_plan")}
                </div>
              )}

              {/* Plan label */}
              <div className="mb-4">
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    color: plan.labelColor,
                    backgroundColor: `${plan.labelColor}22`,
                  }}
                >
                  {plan.label}
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {getPrice(plan.eurMonthly)}
                  </span>
                  <span className="text-sm text-muted-foreground mb-1">
                    /{billing === "yearly" ? t("year_label") : t("month_label")}
                  </span>
                </div>
                {billing === "yearly" && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground line-through">
                      {getFullYearlyPrice(plan.eurMonthly)}/yr
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      {t("save_25")}
                    </span>
                  </div>
                )}
              </div>

              <hr className="border-border/40 mb-4" />

              {/* Payment options */}
              <div className="flex-1 flex flex-col gap-0">
                {/* Fiat payment with dropdown */}
                <FiatDropdown color={plan.labelColor} />

                <OrDivider />

                {/* Coin option */}
                <div className="flex items-center gap-2 py-2">
                  <Coins size={14} style={{ color: plan.labelColor }} />
                  <span className="text-sm text-foreground">
                    {plan.coinXAmount}
                  </span>
                  <a
                    href={plan.coinBuyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs font-semibold px-3 py-1 rounded-full border transition-colors hover:opacity-80"
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
                <div className="flex items-center gap-2 py-2">
                  <ImageIcon size={14} style={{ color: plan.labelColor }} />
                  <span className="text-sm text-foreground">
                    {plan.nftType}
                  </span>
                  <a
                    href={plan.nftBuyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs font-semibold px-3 py-1 rounded-full border transition-colors hover:opacity-80"
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

              {isActive && (
                <div
                  className="mt-4 text-center text-xs font-medium"
                  style={{ color: plan.labelColor }}
                >
                  ✓ {t("your_current_plan")}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
