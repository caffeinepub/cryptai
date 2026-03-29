// TODO: integrate exchange rate API for local currency conversion
// Currently shows the same numeric value for all non-EUR/USD regions

const EURO_ZONE_LOCALES = [
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "nl",
  "be",
  "at",
  "fi",
  "ie",
  "el",
  "sk",
  "si",
  "ee",
  "lv",
  "lt",
  "lu",
  "mt",
  "cy",
];

function detectCurrency(): { symbol: string; currency: string } {
  const lang = navigator.language || "en";
  const localeLower = lang.toLowerCase();
  const primaryTag = localeLower.split("-")[0];
  const regionTag = localeLower.split("-")[1] || "";

  // US detection
  if (localeLower === "en-us" || regionTag === "us") {
    return { symbol: "$", currency: "USD" };
  }

  // Euro zone detection
  if (EURO_ZONE_LOCALES.includes(primaryTag)) {
    return { symbol: "€", currency: "EUR" };
  }

  // Additional euro-zone country codes in locale region tags
  const euroRegions = [
    "de",
    "fr",
    "es",
    "it",
    "pt",
    "nl",
    "be",
    "at",
    "fi",
    "ie",
    "gr",
    "sk",
    "si",
    "ee",
    "lv",
    "lt",
    "lu",
    "mt",
    "cy",
  ];
  if (euroRegions.includes(regionTag)) {
    return { symbol: "€", currency: "EUR" };
  }

  // All others → USD for now (TODO: exchange rate API)
  return { symbol: "$", currency: "USD" };
}

export function useCurrency() {
  const { symbol, currency } = detectCurrency();

  function formatPrice(eurAmount: number): string {
    // TODO: When exchange rate API is available, convert eurAmount to local currency
    return symbol + eurAmount.toFixed(2);
  }

  return { symbol, currency, formatPrice };
}
