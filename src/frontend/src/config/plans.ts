import { PLAN_PRICES } from "./app.config";

export interface PlanConfig {
  id: "basic" | "premium" | "vip";
  label: string;
  eurMonthly: number;
  coinXAmount: string;
  coinBuyUrl: string;
  nftType: string;
  nftBuyUrl: string;
  borderClass: string;
  labelColor: string;
}

export const PLANS: PlanConfig[] = [
  {
    id: "basic",
    label: "BASIC",
    eurMonthly: PLAN_PRICES.basic.eur,
    coinXAmount: "500 Tokens",
    coinBuyUrl: PLAN_PRICES.basic.coinBuyUrl,
    nftType: "NFT Basic",
    nftBuyUrl: PLAN_PRICES.basic.nftBuyUrl,
    borderClass: "plan-copper",
    labelColor: "#B87333",
  },
  {
    id: "premium",
    label: "PREMIUM",
    eurMonthly: PLAN_PRICES.premium.eur,
    coinXAmount: "1000 Tokens",
    coinBuyUrl: PLAN_PRICES.premium.coinBuyUrl,
    nftType: "NFT Premium",
    nftBuyUrl: PLAN_PRICES.premium.nftBuyUrl,
    borderClass: "plan-silver",
    labelColor: "#9CA3AF",
  },
  {
    id: "vip",
    label: "VIP",
    eurMonthly: PLAN_PRICES.vip.eur,
    coinXAmount: "5000 Tokens",
    coinBuyUrl: PLAN_PRICES.vip.coinBuyUrl,
    nftType: "NFT VIP",
    nftBuyUrl: PLAN_PRICES.vip.nftBuyUrl,
    borderClass: "plan-gold",
    labelColor: "#D4AF37",
  },
];
