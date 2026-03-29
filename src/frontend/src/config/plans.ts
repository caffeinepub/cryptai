import { PLAN_PRICES } from "./app.config";

export type PlanId = "uncreamed" | "creamed" | "extracreamed" | "creamy";

export interface PlanConfig {
  id: PlanId;
  labelKey: string;
  eurMonthly: number;
  coinXAmount?: string;
  coinBuyUrl?: string;
  nftType?: string;
  nftBuyUrl?: string;
  borderClass: string;
  labelColor: string;
  isFree?: boolean;
  benefitKeys: [string, string, string, string, string];
}

export const PLANS: PlanConfig[] = [
  {
    id: "uncreamed",
    labelKey: "plan_uncreamed",
    eurMonthly: 0,
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
    eurMonthly: PLAN_PRICES.basic.eur,
    coinXAmount: "500 Tokens",
    coinBuyUrl: PLAN_PRICES.basic.coinBuyUrl,
    nftType: "NFT Basic",
    nftBuyUrl: PLAN_PRICES.basic.nftBuyUrl,
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
    eurMonthly: PLAN_PRICES.premium.eur,
    coinXAmount: "1000 Tokens",
    coinBuyUrl: PLAN_PRICES.premium.coinBuyUrl,
    nftType: "NFT Premium",
    nftBuyUrl: PLAN_PRICES.premium.nftBuyUrl,
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
    eurMonthly: PLAN_PRICES.vip.eur,
    coinXAmount: "5000 Tokens",
    coinBuyUrl: PLAN_PRICES.vip.coinBuyUrl,
    nftType: "NFT VIP",
    nftBuyUrl: PLAN_PRICES.vip.nftBuyUrl,
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
