import { useEffect, useState } from "react";
import type { PlanId } from "../config/plans";

interface CurrencyEntry {
  symbol: string;
  currency: string;
  creamed: number;
  extracreamed: number;
  creamy: number;
}

interface CurrenciesData {
  default: CurrencyEntry;
  [countryCode: string]: CurrencyEntry | string;
}

let cachedData: CurrenciesData | null = null;
let cachedCountry: string | null = null;

async function loadCurrencyData(): Promise<CurrenciesData> {
  if (cachedData) return cachedData;
  try {
    const res = await fetch("/CurrenciesPreices.json");
    cachedData = await res.json();
    return cachedData!;
  } catch {
    return {
      default: {
        symbol: "$",
        currency: "USD",
        creamed: 4.89,
        extracreamed: 8.89,
        creamy: 29,
      },
    };
  }
}

async function detectCountryFromIP(): Promise<string> {
  if (cachedCountry) return cachedCountry;
  try {
    const res = await fetch("https://ip-api.com/json/?fields=countryCode");
    const data = await res.json();
    cachedCountry = data.countryCode || "";
    return cachedCountry!;
  } catch {
    // Fallback: try to infer from browser locale
    const locale = navigator.language || "en-US";
    const parts = locale.split("-");
    cachedCountry = (parts[1] || "").toUpperCase();
    return cachedCountry!;
  }
}

const DEFAULT_ENTRY: CurrencyEntry = {
  symbol: "$",
  currency: "USD",
  creamed: 4.89,
  extracreamed: 8.89,
  creamy: 29,
};

export function useCurrency() {
  const [entry, setEntry] = useState<CurrencyEntry>(DEFAULT_ENTRY);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [data, country] = await Promise.all([
        loadCurrencyData(),
        detectCountryFromIP(),
      ]);
      if (cancelled) return;
      const found = data[country] as CurrencyEntry | undefined;
      setEntry(found ?? (data.default as CurrencyEntry));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function formatPrice(amount: number): string {
    const isInteger = Number.isInteger(amount);
    return entry.symbol + (isInteger ? amount.toFixed(0) : amount.toFixed(2));
  }

  function getPlanPrice(planId: PlanId): number {
    if (planId === "uncreamed") return 0;
    return entry[planId] ?? 0;
  }

  return {
    symbol: entry.symbol,
    currency: entry.currency,
    formatPrice,
    getPlanPrice,
  };
}
