import { Check, Coins } from "lucide-react";
import { PLANS } from "../config/plans";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useMembership } from "../contexts/MembershipContext";
import { triggerRegister } from "../utils/registerTrigger";

const GOLD = "#D4AF37";

export function PlanCards() {
  const { t } = useLanguage();
  const { membershipLevel } = useMembership();
  const { isLoggedIn } = useAuth();

  const tierOrder = ["uncreamed", "creamed", "extracreamed", "creamy"];
  const userTierIdx = tierOrder.indexOf(membershipLevel);

  return (
    <section className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
      <h2
        className="text-2xl font-display font-bold mb-6 text-center"
        style={{
          color: GOLD,
          fontFamily: "'Bangers', cursive",
          letterSpacing: "0.04em",
        }}
      >
        {t("plans_title")}
      </h2>

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
              className={`relative flex flex-col rounded-2xl border-2 bg-card p-3 ${
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
              <div className="mb-2">
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

              <hr className="border-border/40 mb-2" />

              {/* Payment section */}
              {plan.isFree ? (
                <div className="flex flex-col gap-2 mb-2">
                  {/* Register for free button — only shown when NOT logged in */}
                  {!isLoggedIn && (
                    <button
                      type="button"
                      onClick={triggerRegister}
                      className="flex items-center gap-2 w-full py-1.5 px-3 rounded-full font-semibold text-xs transition-all hover:opacity-80 active:scale-95"
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
                <div className="flex items-center gap-2 py-1.5 mb-2">
                  <Coins
                    size={13}
                    style={{ color: plan.labelColor, flexShrink: 0 }}
                  />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: GOLD }}
                  >
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
              )}

              {isActive && (
                <div
                  className="mb-2 text-center text-xs font-medium"
                  style={{ color: plan.labelColor }}
                >
                  ✓ {t("your_current_plan")}
                </div>
              )}

              {/* Benefits list */}
              <hr className="border-border/40 mb-2" />
              <div className="flex flex-col gap-1">
                {plan.benefitKeys.map((key, benefitIdx) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 py-0.5"
                    data-ocid={`plans.benefit.${idx + 1}.item.${benefitIdx + 1}`}
                  >
                    <Check
                      size={12}
                      style={{ color: plan.labelColor, flexShrink: 0 }}
                    />
                    <span className="text-xs" style={{ color: GOLD }}>
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
