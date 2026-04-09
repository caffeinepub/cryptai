import { PLAN_PRICES } from "./app.config";

export type PlanId = "uncreamed" | "creamed" | "extracreamed" | "creamy";

export interface PlanConfig {
  id: PlanId;
  labelKey: string;
  tokenAmount?: string;
  coinBuyUrl?: string;
  borderClass: string;
  labelColor: string;
  isFree?: boolean;
  benefitKeys: [string, string, string, string, string];
}

export const PLANS: PlanConfig[] = [
  {
    id: "uncreamed",
    labelKey: "plan_uncreamed",
    borderClass: "plan-free",
    labelColor: "#4ade80",
    isFree: true,
    benefitKeys: [
      "uncreamed_benefit_1",
      "uncreamed_benefit_2",
      "uncreamed_benefit_3",
      "uncreamed_benefit_4",
      "uncreamed_benefit_5",
    ],
  },
  {
    id: "creamed",
    labelKey: "plan_creamed",
    tokenAmount: PLAN_PRICES.creamed.tokens,
    coinBuyUrl: PLAN_PRICES.creamed.coinBuyUrl,
    borderClass: "plan-copper",
    labelColor: "#B87333",
    benefitKeys: [
      "creamed_benefit_1",
      "creamed_benefit_2",
      "creamed_benefit_3",
      "creamed_benefit_4",
      "creamed_benefit_5",
    ],
  },
  {
    id: "extracreamed",
    labelKey: "plan_extracreamed",
    tokenAmount: PLAN_PRICES.extracreamed.tokens,
    coinBuyUrl: PLAN_PRICES.extracreamed.coinBuyUrl,
    borderClass: "plan-silver",
    labelColor: "#9CA3AF",
    benefitKeys: [
      "extracreamed_benefit_1",
      "extracreamed_benefit_2",
      "extracreamed_benefit_3",
      "extracreamed_benefit_4",
      "extracreamed_benefit_5",
    ],
  },
  {
    id: "creamy",
    labelKey: "plan_creamy",
    tokenAmount: PLAN_PRICES.creamy.tokens,
    coinBuyUrl: PLAN_PRICES.creamy.coinBuyUrl,
    borderClass: "plan-gold",
    labelColor: "#D4AF37",
    benefitKeys: [
      "creamy_benefit_1",
      "creamy_benefit_2",
      "creamy_benefit_3",
      "creamy_benefit_4",
      "creamy_benefit_5",
    ],
  },
];
