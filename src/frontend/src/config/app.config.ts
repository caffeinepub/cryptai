// =============================================================================
// ZENTRALE KONFIGURATIONSDATEI -- CryptAI
// Hier alle wichtigen Werte einmalig ändern, alles andere passt sich an.
// =============================================================================

// ---------------------------------------------------------------------------
// FREE READING TIMER
// Wert in Minuten. Für Entwickler-Tests: höher setzen.
// Für Live-Betrieb: auf 10 setzen.
// ---------------------------------------------------------------------------
export const FREE_TIMER_MINUTES = 120; // TODO: Vor Go-Live auf 10 setzen

// ---------------------------------------------------------------------------
// PLAN-PREISE (EUR base monthly + CoinX + Buy Links)
// EUR is the base currency. USD users see the same number with $ sign.
// TODO: integrate exchange rate API for local currency conversion
// ---------------------------------------------------------------------------
export const PLAN_PRICES = {
  basic: {
    eur: 4.89,
    coinX: "500 CoinX",
    coinBuyUrl: "https://creamcoin.fun/tokens500",
    nftBuyUrl: "https://creamcoin.fun/NFT_Basic",
  },
  premium: {
    eur: 8.89,
    coinX: "1000 CoinX",
    coinBuyUrl: "https://creamcoin.fun/tokens1000",
    nftBuyUrl: "https://creamcoin.fun/NFT_Premium",
  },
  vip: {
    eur: 29,
    coinX: "5000 CoinX",
    coinBuyUrl: "https://creamcoin.fun/tokens5000",
    nftBuyUrl: "https://creamcoin.fun/NFT_VIP",
  },
};

// ---------------------------------------------------------------------------
// DEVELOPER MODE
// Wenn Username + Password + Confirm Password alle "0000" sind,
// wird der Free-Timer zurückgesetzt (für Entwickler-Tests).
// ---------------------------------------------------------------------------
export const DEV_RESET_CODE = "0000";

// ---------------------------------------------------------------------------
// NEWSLETTER & KONTAKT
// ---------------------------------------------------------------------------
export const SITE_EMAIL = ""; // z.B. "info@cryptai.com"

// ---------------------------------------------------------------------------
// SOCIAL LINKS
// ---------------------------------------------------------------------------
export const SOCIAL_LINKS = {
  telegram: "https://t.me/creamyvibes",
  reddit: "https://www.reddit.com/r/creamcoin",
  suno: "https://suno.com/@creamyvibes",
  x: "https://x.com/creamyvibes",
  youtube: "https://www.youtube.com/creamyvibes",
  github: "https://github.com/creamyvibes",
  discord: "https://discord.com/creamyvibes",
  tiktok: "https://tiktok.com/creamyvibes",
  instagram: "https://instagram.com/creamyvibes",
  creamcoin: "https://creamcoin.fun/",
};
