// Arabic region groups
export const NORTH_AFRICA_ARABIC = ["MA", "DZ", "TN"];
export const EAST_GULF_ARABIC = [
  "EG",
  "SD",
  "LY",
  "JO",
  "SY",
  "LB",
  "IQ",
  "SA",
  "AE",
  "KW",
  "QA",
  "BH",
  "OM",
  "YE",
  "PS",
];
export const ALL_ARABIC_COUNTRIES = [
  ...NORTH_AFRICA_ARABIC,
  ...EAST_GULF_ARABIC,
];
export const ARABIC_COUNTRY_CODES = ALL_ARABIC_COUNTRIES; // keep backward compat

// Africa groups
export const ENGLISH_AFRICA = [
  "NG",
  "AO",
  "ZA",
  "KE",
  "ET",
  "GH",
  "TZ",
  "UG",
  "ZM",
  "ZW",
  "MW",
  "MZ",
  "BW",
  "NA",
  "LS",
  "SZ",
  "RW",
  "BI",
  "ER",
  "SO",
  "SS",
  "GM",
  "SL",
  "LR",
  "GH",
  "CM",
];
export const FRENCH_AFRICA = [
  "CI",
  "SN",
  "ML",
  "BF",
  "NE",
  "TD",
  "CF",
  "CG",
  "CD",
  "GA",
  "GQ",
  "TG",
  "BJ",
  "MR",
  "MG",
  "DJ",
  "KM",
];

// English-speaking native countries
export const NATIVE_ENGLISH = ["US", "GB", "AU", "CA", "NZ", "IE"];

// Spanish-speaking countries
export const SPANISH_COUNTRIES = [
  "ES",
  "MX",
  "CO",
  "AR",
  "CL",
  "PE",
  "VE",
  "EC",
  "BO",
  "PY",
  "UY",
  "CR",
  "PA",
  "HN",
  "SV",
  "GT",
  "DO",
  "CU",
  "PR",
];

// French-speaking countries
export const FRENCH_COUNTRIES = ["FR", "BE", "LU", "MC"];
export const PORTUGUESE_COUNTRIES = ["BR", "PT", "AO", "MZ"];

// German-speaking countries
export const GERMAN_COUNTRIES = ["DE", "AT", "LI"];

// Asian countries (English default)
export const ASIAN_ENGLISH = [
  "JP",
  "CN",
  "KR",
  "TH",
  "VN",
  "ID",
  "MY",
  "PH",
  "SG",
  "IN",
  "PK",
  "BD",
  "LK",
  "NP",
  "MM",
  "KH",
  "LA",
  "BN",
  "MN",
];

export const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  DE: "de",
  AT: "de",
  CH: "de",
  FR: "fr",
  BE: "fr",
  LU: "fr",
  ES: "es",
  MX: "es",
  CO: "es",
  AR: "es",
  CL: "es",
  PE: "es",
  TR: "tr",
  IR: "fa",
  IT: "it",
  PT: "pt",
  NL: "nl",
  PL: "pl",
  RU: "ru",
  JP: "ja",
  CN: "zh",
  KR: "ko",
  SE: "sv",
  NO: "no",
  DK: "da",
  FI: "fi",
  GR: "el",
  CZ: "cs",
  HU: "hu",
  RO: "ro",
};

export const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  ar: "العربية",
  tr: "Türkçe",
  fa: "فارسی",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
  pl: "Polski",
  ru: "Русский",
  ja: "日本語",
  zh: "中文",
  ko: "한국어",
  sv: "Svenska",
  no: "Norsk",
  da: "Dansk",
  fi: "Suomi",
  el: "Ελληνικά",
  cs: "Čeština",
  hu: "Magyar",
  ro: "Română",
};

export type Language = "en" | "de" | "fr" | "ar" | "es" | "tr" | "fa" | string;

export type TranslationKey =
  | "nav_home"
  | "nav_ai"
  | "nav_crypto"
  | "connect_wallet"
  | "disconnect"
  | "wallet_disclaimer"
  | "dark_mode"
  | "light_mode"
  | "subscribe"
  | "newsletter_title"
  | "newsletter_hint"
  | "email_placeholder"
  | "subscribe_success"
  | "subscribe_error"
  | "plans_title"
  | "articles_title"
  | "footer_tagline"
  | "ai_desc"
  | "crypto_desc"
  | "upgrade_to"
  | "locked_content"
  | "paypal_btn"
  | "coinx_btn"
  | "nft_btn"
  | "login"
  | "register"
  | "logout"
  | "username"
  | "password"
  | "confirm_password"
  | "account_settings"
  | "change_password"
  | "old_password"
  | "new_password"
  | "passwords_dont_match"
  | "username_taken"
  | "invalid_credentials"
  | "register_to_read"
  | "register_prompt_title"
  | "register_prompt_desc"
  | "minutes_left"
  | "payment_title"
  | "payment_card_desc"
  | "payment_coinx_desc"
  | "payment_nft_desc"
  | "login_register"
  | "save_language"
  | "language_preference"
  | "select_wallet"
  | "wallet_connected"
  | "footer_legal"
  | "footer_impressum"
  | "footer_datenschutz"
  | "footer_terms"
  | "footer_kontakt"
  | "fiat_label"
  | "or_label"
  | "month_label"
  | "year_label"
  | "monthly_label"
  | "yearly_label"
  | "your_current_plan"
  | "save_25"
  | "best_plan"
  | "active_badge"
  | "researchers_community"
  | "memes_meet_research"
  | "smarter_research"
  | "hero_subtitle"
  | "download_register"
  | "download_limit_reached"
  | "download_unlimited"
  | "plan_uncreamed"
  | "plan_creamed"
  | "plan_extracreamed"
  | "plan_creamy"
  | "register_for_free"
  | "uncreamed_benefit_1"
  | "uncreamed_benefit_2"
  | "uncreamed_benefit_3"
  | "uncreamed_benefit_4"
  | "uncreamed_benefit_5"
  | "creamed_benefit_1"
  | "creamed_benefit_2"
  | "creamed_benefit_3"
  | "creamed_benefit_4"
  | "creamed_benefit_5"
  | "extracreamed_benefit_1"
  | "extracreamed_benefit_2"
  | "extracreamed_benefit_3"
  | "extracreamed_benefit_4"
  | "extracreamed_benefit_5"
  | "creamy_benefit_1"
  | "creamy_benefit_2"
  | "creamy_benefit_3"
  | "creamy_benefit_4"
  | "creamy_benefit_5";

export interface RegionLanguageConfig {
  defaultLang: Language;
  availableOptions: { code: string; label: string }[];
}

export function getRegionLanguageConfig(
  countryCode: string,
  _browserLang: string,
): RegionLanguageConfig {
  const mk = (codes: string[]) =>
    codes.map((c) => ({ code: c, label: LANGUAGE_LABELS[c] || c }));

  // Arabic regions
  if (NORTH_AFRICA_ARABIC.includes(countryCode)) {
    return { defaultLang: "fr", availableOptions: mk(["fr", "ar", "en"]) };
  }
  if (EAST_GULF_ARABIC.includes(countryCode)) {
    return { defaultLang: "en", availableOptions: mk(["en", "ar"]) };
  }

  // Turkey
  if (countryCode === "TR") {
    return { defaultLang: "en", availableOptions: mk(["tr", "en"]) };
  }

  // Iran
  if (countryCode === "IR") {
    return { defaultLang: "en", availableOptions: mk(["fa", "en"]) };
  }

  // Switzerland (special: German + French + English)
  if (countryCode === "CH") {
    return {
      defaultLang: "de",
      availableOptions: mk(["de", "en", "fr", "it"]),
    };
  }

  // German-speaking
  if (GERMAN_COUNTRIES.includes(countryCode)) {
    return { defaultLang: "de", availableOptions: mk(["de", "en"]) };
  }

  // French-speaking
  if (PORTUGUESE_COUNTRIES.includes(countryCode)) {
    return { defaultLang: "pt", availableOptions: mk(["pt", "en"]) };
  }

  if (FRENCH_COUNTRIES.includes(countryCode)) {
    return { defaultLang: "fr", availableOptions: mk(["fr", "en"]) };
  }

  // Italy
  if (countryCode === "IT") {
    return { defaultLang: "it", availableOptions: mk(["it", "en"]) };
  }

  // Spanish-speaking
  if (SPANISH_COUNTRIES.includes(countryCode)) {
    return { defaultLang: "es", availableOptions: mk(["es", "en"]) };
  }

  // Native English (US, UK, AU, CA)
  if (NATIVE_ENGLISH.includes(countryCode)) {
    return { defaultLang: "en", availableOptions: mk(["en", "es", "fr"]) };
  }

  // African English countries
  if (ENGLISH_AFRICA.includes(countryCode)) {
    return { defaultLang: "en", availableOptions: mk(["en", "fr"]) };
  }

  // African French countries
  if (FRENCH_AFRICA.includes(countryCode)) {
    return { defaultLang: "fr", availableOptions: mk(["fr", "en"]) };
  }

  // China
  if (countryCode === "CN") {
    return { defaultLang: "en", availableOptions: mk(["en", "zh"]) };
  }

  // Japan
  if (countryCode === "JP") {
    return { defaultLang: "en", availableOptions: mk(["en", "ja"]) };
  }

  // Asian countries (English)
  if (ASIAN_ENGLISH.includes(countryCode)) {
    return { defaultLang: "en", availableOptions: mk(["en"]) };
  }

  // Default: English + Spanish + French
  return { defaultLang: "en", availableOptions: mk(["en", "es", "fr"]) };
}

export const TRANSLATIONS: Record<string, Record<TranslationKey, string>> = {
  en: {
    nav_home: "Home",
    nav_ai: "AI",
    nav_crypto: "Crypto & Market",
    connect_wallet: "Connect Wallet",
    disconnect: "Disconnect",
    wallet_disclaimer:
      "This website does not execute any wallet transactions. It only checks whether the required amount of Tokens or the required NFTs are present in the wallet.",
    dark_mode: "Dark Mode",
    light_mode: "Light Mode",
    subscribe: "Subscribe",
    newsletter_title: "Stay Creamy",
    newsletter_hint: "Receive updates on AI, Crypto & Market.",
    email_placeholder: "Your email address",
    subscribe_success: "Successfully subscribed!",
    subscribe_error: "Subscription failed. Please try again.",
    plans_title: "Choose Your creamy Plan & Join the Community",
    articles_title: "Latest Insights",
    footer_tagline: "Where crypto meets AI.",
    ai_desc:
      "Explore the latest in artificial intelligence, machine learning, and emerging AI technologies.",
    crypto_desc:
      "Real-time market data, crypto analysis, and blockchain insights.",
    upgrade_to: "Upgrade to",
    locked_content: "This content requires a higher membership tier.",
    paypal_btn: "PayPal / Visa / MC",
    coinx_btn: "Buy Tokens",
    nft_btn: "Buy NFT",
    login: "Login",
    register: "Register",
    logout: "Logout",
    username: "Username",
    password: "Password",
    confirm_password: "Confirm Password",
    account_settings: "Account Settings",
    change_password: "Change Password",
    old_password: "Old Password",
    new_password: "New Password",
    passwords_dont_match: "Passwords do not match",
    username_taken: "Username already taken",
    invalid_credentials: "Invalid username or password",
    register_to_read: "Register to continue reading",
    register_prompt_title: "Your free reading time has ended",
    register_prompt_desc:
      "Create a free account to keep reading. Registered users get full access to all free content plus one Basic article.",
    minutes_left: "min left",
    payment_title: "How to Purchase",
    payment_card_desc: "Pay with PayPal, Visa, or Mastercard",
    payment_coinx_desc: "Use your Token balance",
    payment_nft_desc: "Own a qualifying NFT for access",
    login_register: "Login / Register",
    save_language: "Save language",
    language_preference: "Language preference",
    select_wallet: "Select wallet",
    wallet_connected: "Wallet connected",
    footer_legal: "Legal",
    footer_impressum: "Imprint",
    footer_datenschutz: "Privacy Policy",
    footer_terms: "Terms",
    footer_kontakt: "Contact",
    fiat_label: "Fiat",
    or_label: "OR",
    month_label: "month",
    year_label: "year",
    monthly_label: "Monthly",
    yearly_label: "Yearly",
    your_current_plan: "Your current plan",
    save_25: "Save 25%",
    best_plan: "Best Plan",
    active_badge: "Active",
    researchers_community: "Researchers' Community",
    memes_meet_research: "memes meet research",
    smarter_research: "Smarter research, powered by memetic vibes",
    hero_subtitle:
      "Master crypto research, leverage AI-driven insights, and invest smarter. Your edge in the market starts here.",
    download_register: "Register to download",
    download_limit_reached: "Get Basic for more downloads",
    download_unlimited: "Unlimited downloads",
    plan_uncreamed: "Uncreamed (free)",
    plan_creamed: "Creamed",
    plan_extracreamed: "Extra Creamed",
    plan_creamy: "Creamy",
    register_for_free: "Register for free",
    uncreamed_benefit_1: "Option 1 benefit",
    uncreamed_benefit_2: "Option 2 benefit",
    uncreamed_benefit_3: "Option 3 benefit",
    uncreamed_benefit_4: "Option 4 benefit",
    uncreamed_benefit_5: "Option 5 benefit",
    creamed_benefit_1: "Option 1 benefit",
    creamed_benefit_2: "Option 2 benefit",
    creamed_benefit_3: "Option 3 benefit",
    creamed_benefit_4: "Option 4 benefit",
    creamed_benefit_5: "Option 5 benefit",
    extracreamed_benefit_1: "Option 1 benefit",
    extracreamed_benefit_2: "Option 2 benefit",
    extracreamed_benefit_3: "Option 3 benefit",
    extracreamed_benefit_4: "Option 4 benefit",
    extracreamed_benefit_5: "Option 5 benefit",
    creamy_benefit_1: "Option 1 benefit",
    creamy_benefit_2: "Option 2 benefit",
    creamy_benefit_3: "Option 3 benefit",
    creamy_benefit_4: "Option 4 benefit",
    creamy_benefit_5: "Option 5 benefit",
  },
  de: {
    nav_home: "Startseite",
    nav_ai: "KI",
    nav_crypto: "Krypto & Markt",
    connect_wallet: "Connect Wallet",
    disconnect: "Trennen",
    wallet_disclaimer:
      "Diese Webseite führt keine Wallet-Transaktionen aus. Es wird ausschließlich geprüft, ob die erforderliche Anzahl an Tokens oder die erforderlichen NFTs in der Wallet vorhanden sind.",
    dark_mode: "Dunkelmodus",
    light_mode: "Hellmodus",
    subscribe: "Abonnieren",
    newsletter_title: "Bleib Creamy",
    newsletter_hint: "Erhalte Updates zu KI, Krypto & Markt.",
    email_placeholder: "Deine E-Mail-Adresse",
    subscribe_success: "Erfolgreich abonniert!",
    subscribe_error: "Abonnement fehlgeschlagen. Bitte erneut versuchen.",
    plans_title: "Wähle deinen Plan & tritt der Community bei",
    articles_title: "Neueste Einblicke",
    footer_tagline: "Wo Krypto auf KI trifft.",
    ai_desc:
      "Entdecke die neuesten Entwicklungen in künstlicher Intelligenz und maschinellem Lernen.",
    crypto_desc:
      "Echtzeit-Marktdaten, Krypto-Analysen und Blockchain-Einblicke.",
    upgrade_to: "Upgrade auf",
    locked_content: "Dieser Inhalt erfordert eine höhere Mitgliedschaftsstufe.",
    paypal_btn: "PayPal / Visa / MC",
    coinx_btn: "Tokens kaufen",
    nft_btn: "NFT kaufen",
    login: "Anmelden",
    register: "Registrieren",
    logout: "Abmelden",
    username: "Benutzername",
    password: "Passwort",
    confirm_password: "Passwort bestätigen",
    account_settings: "Kontoeinstellungen",
    change_password: "Passwort ändern",
    old_password: "Altes Passwort",
    new_password: "Neues Passwort",
    passwords_dont_match: "Passwörter stimmen nicht überein",
    username_taken: "Benutzername bereits vergeben",
    invalid_credentials: "Ungültiger Benutzername oder Passwort",
    register_to_read: "Registrieren um weiterzulesen",
    register_prompt_title: "Deine kostenlose Lesezeit ist abgelaufen",
    register_prompt_desc:
      "Erstelle ein kostenloses Konto um weiterzulesen. Registrierte Nutzer erhalten Zugang zu allen kostenlosen Inhalten plus einem Basic-Artikel.",
    minutes_left: "Min übrig",
    payment_title: "Wie kaufen?",
    payment_card_desc: "Mit PayPal, Visa oder Mastercard bezahlen",
    payment_coinx_desc: "Token-Guthaben verwenden",
    payment_nft_desc: "Qualifizierendes NFT für Zugang besitzen",
    login_register: "Anmelden / Registrieren",
    save_language: "Sprache speichern",
    language_preference: "Spracheinstellung",
    select_wallet: "Wallet auswählen",
    wallet_connected: "Wallet verbunden",
    footer_legal: "Rechtliches",
    footer_impressum: "Impressum",
    footer_datenschutz: "Datenschutz",
    footer_terms: "AGB",
    footer_kontakt: "Kontakt",
    fiat_label: "Fiat",
    or_label: "ODER",
    month_label: "Monat",
    year_label: "Jahr",
    monthly_label: "Monatlich",
    yearly_label: "Jährlich",
    your_current_plan: "Dein aktueller Plan",
    save_25: "25% sparen",
    best_plan: "Bester Plan",
    active_badge: "Aktiv",
    researchers_community: "Forscher-Community",
    memes_meet_research: "Memes treffen Forschung",
    smarter_research: "Klügere Recherche, befeuert von memetischen Vibes",
    hero_subtitle:
      "Meistere Krypto-Research, nutze KI-gestützte Analysen und investiere klüger. Dein Vorteil im Markt beginnt hier.",
    download_register: "Registrieren zum Herunterladen",
    download_limit_reached: "Basic holen für mehr Downloads",
    download_unlimited: "Unbegrenzte Downloads",
    plan_uncreamed: "Uncreamed (free)",
    plan_creamed: "Creamed",
    plan_extracreamed: "Extra Creamed",
    plan_creamy: "Creamy",
    register_for_free: "Kostenlos registrieren",
    uncreamed_benefit_1: "Option 1 Vorteil",
    uncreamed_benefit_2: "Option 2 Vorteil",
    uncreamed_benefit_3: "Option 3 Vorteil",
    uncreamed_benefit_4: "Option 4 Vorteil",
    uncreamed_benefit_5: "Option 5 Vorteil",
    creamed_benefit_1: "Option 1 Vorteil",
    creamed_benefit_2: "Option 2 Vorteil",
    creamed_benefit_3: "Option 3 Vorteil",
    creamed_benefit_4: "Option 4 Vorteil",
    creamed_benefit_5: "Option 5 Vorteil",
    extracreamed_benefit_1: "Option 1 Vorteil",
    extracreamed_benefit_2: "Option 2 Vorteil",
    extracreamed_benefit_3: "Option 3 Vorteil",
    extracreamed_benefit_4: "Option 4 Vorteil",
    extracreamed_benefit_5: "Option 5 Vorteil",
    creamy_benefit_1: "Option 1 Vorteil",
    creamy_benefit_2: "Option 2 Vorteil",
    creamy_benefit_3: "Option 3 Vorteil",
    creamy_benefit_4: "Option 4 Vorteil",
    creamy_benefit_5: "Option 5 Vorteil",
  },
  fr: {
    nav_home: "Accueil",
    nav_ai: "IA",
    nav_crypto: "Crypto & Marché",
    connect_wallet: "Connect Wallet",
    disconnect: "Déconnecter",
    wallet_disclaimer:
      "Ce site n'effectue aucune transaction de portefeuille. Il vérifie uniquement si la quantité requise de Tokens ou les NFT requis sont présents dans le portefeuille.",
    dark_mode: "Mode sombre",
    light_mode: "Mode clair",
    subscribe: "S'abonner",
    newsletter_title: "Restez Creamy",
    newsletter_hint:
      "Recevez des mises à jour sur l'IA, la Crypto & le Marché.",
    email_placeholder: "Votre adresse e-mail",
    subscribe_success: "Abonnement réussi!",
    subscribe_error: "Échec de l'abonnement. Veuillez réessayer.",
    plans_title: "Choisissez votre plan & rejoignez la communauté",
    articles_title: "Dernières analyses",
    footer_tagline: "Là où la crypto rencontre l'IA.",
    ai_desc:
      "Explorez les dernières avancées en intelligence artificielle et apprentissage automatique.",
    crypto_desc:
      "Données de marché en temps réel, analyses crypto et insights blockchain.",
    upgrade_to: "Passer à",
    locked_content: "Ce contenu nécessite un niveau d'adhésion supérieur.",
    paypal_btn: "PayPal / Visa / MC",
    coinx_btn: "Acheter des Tokens",
    nft_btn: "Acheter NFT",
    login: "Connexion",
    register: "S'inscrire",
    logout: "Déconnexion",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    confirm_password: "Confirmer le mot de passe",
    account_settings: "Paramètres du compte",
    change_password: "Changer le mot de passe",
    old_password: "Ancien mot de passe",
    new_password: "Nouveau mot de passe",
    passwords_dont_match: "Les mots de passe ne correspondent pas",
    username_taken: "Nom d'utilisateur déjà pris",
    invalid_credentials: "Nom d'utilisateur ou mot de passe invalide",
    register_to_read: "Inscrivez-vous pour continuer à lire",
    register_prompt_title: "Votre temps de lecture gratuit est écoulé",
    register_prompt_desc:
      "Créez un compte gratuit pour continuer à lire. Les utilisateurs inscrits ont accès à tout le contenu gratuit plus un article Basic.",
    minutes_left: "min restantes",
    payment_title: "Comment acheter",
    payment_card_desc: "Payez avec PayPal, Visa ou Mastercard",
    payment_coinx_desc: "Utilisez votre solde de Tokens",
    payment_nft_desc: "Possédez un NFT qualifiant pour l'accès",
    login_register: "Connexion / Inscription",
    save_language: "Enregistrer la langue",
    language_preference: "Préférence de langue",
    select_wallet: "Sélectionner un portefeuille",
    wallet_connected: "Portefeuille connecté",
    footer_legal: "Légal",
    footer_impressum: "Mentions légales",
    footer_datenschutz: "Confidentialité",
    footer_terms: "CGU",
    footer_kontakt: "Contact",
    fiat_label: "Fiat",
    or_label: "OU",
    month_label: "mois",
    year_label: "an",
    monthly_label: "Mensuel",
    yearly_label: "Annuel",
    your_current_plan: "Votre plan actuel",
    save_25: "Économisez 25%",
    best_plan: "Meilleur Plan",
    active_badge: "Actif",
    researchers_community: "Communauté des Chercheurs",
    memes_meet_research: "mèmes rencontrent la recherche",
    smarter_research:
      "Recherche plus intelligente, propulsée par des vibes mémétiques",
    hero_subtitle:
      "Maîtrisez la recherche crypto, exploitez les analyses IA et investissez plus intelligemment. Votre avantage commence ici.",
    download_register: "Inscrivez-vous pour télécharger",
    download_limit_reached: "Obtenez Basic pour plus de téléchargements",
    download_unlimited: "Téléchargements illimités",
    plan_uncreamed: "Uncreamed (free)",
    plan_creamed: "Creamed",
    plan_extracreamed: "Extra Creamed",
    plan_creamy: "Creamy",
    register_for_free: "S'inscrire gratuitement",
    uncreamed_benefit_1: "Option 1 avantage",
    uncreamed_benefit_2: "Option 2 avantage",
    uncreamed_benefit_3: "Option 3 avantage",
    uncreamed_benefit_4: "Option 4 avantage",
    uncreamed_benefit_5: "Option 5 avantage",
    creamed_benefit_1: "Option 1 avantage",
    creamed_benefit_2: "Option 2 avantage",
    creamed_benefit_3: "Option 3 avantage",
    creamed_benefit_4: "Option 4 avantage",
    creamed_benefit_5: "Option 5 avantage",
    extracreamed_benefit_1: "Option 1 avantage",
    extracreamed_benefit_2: "Option 2 avantage",
    extracreamed_benefit_3: "Option 3 avantage",
    extracreamed_benefit_4: "Option 4 avantage",
    extracreamed_benefit_5: "Option 5 avantage",
    creamy_benefit_1: "Option 1 avantage",
    creamy_benefit_2: "Option 2 avantage",
    creamy_benefit_3: "Option 3 avantage",
    creamy_benefit_4: "Option 4 avantage",
    creamy_benefit_5: "Option 5 avantage",
  },
  ar: {
    nav_home: "الرئيسية",
    nav_ai: "الذكاء الاصطناعي",
    nav_crypto: "العملات والسوق",
    connect_wallet: "Connect Wallet",
    disconnect: "قطع الاتصال",
    wallet_disclaimer:
      "هذا الموقع لا ينفذ أي معاملات للمحفظة. يتحقق فقط من وجود الكمية المطلوبة من Tokens أو NFT المطلوبة في المحفظة.",
    dark_mode: "الوضع الداكن",
    light_mode: "الوضع الفاتح",
    subscribe: "اشتراك",
    newsletter_title: "ابق على اطلاع",
    newsletter_hint: "احصل على تحديثات حول الذكاء الاصطناعي والعملات المشفرة.",
    email_placeholder: "عنوان بريدك الإلكتروني",
    subscribe_success: "تم الاشتراك بنجاح!",
    subscribe_error: "فشل الاشتراك. يرجى المحاولة مرة أخرى.",
    plans_title: "اختر خطتك وانضم إلى المجتمع",
    articles_title: "أحدث المقالات",
    footer_tagline: "حيث تلتقي العملات المشفرة بالذكاء الاصطناعي.",
    ai_desc: "استكشف أحدث التطورات في الذكاء الاصطناعي والتعلم الآلي.",
    crypto_desc: "بيانات السوق في الوقت الفعلي وتحليلات العملات المشفرة.",
    upgrade_to: "ترقية إلى",
    locked_content: "هذا المحتوى يتطلب مستوى عضوية أعلى.",
    paypal_btn: "PayPal / Visa / MC",
    coinx_btn: "شراء Tokens",
    nft_btn: "شراء NFT",
    login: "تسجيل الدخول",
    register: "تسجيل",
    logout: "تسجيل الخروج",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    confirm_password: "تأكيد كلمة المرور",
    account_settings: "إعدادات الحساب",
    change_password: "تغيير كلمة المرور",
    old_password: "كلمة المرور القديمة",
    new_password: "كلمة المرور الجديدة",
    passwords_dont_match: "كلمات المرور غير متطابقة",
    username_taken: "اسم المستخدم مأخوذ بالفعل",
    invalid_credentials: "اسم المستخدم أو كلمة المرور غير صحيحة",
    register_to_read: "سجل للاستمرار في القراءة",
    register_prompt_title: "انتهى وقت القراءة المجاني",
    register_prompt_desc:
      "أنشئ حسابًا مجانيًا للاستمرار في القراءة. يحصل المستخدمون المسجلون على الوصول الكامل للمحتوى المجاني بالإضافة إلى مقالة أساسية واحدة.",
    minutes_left: "دقائق متبقية",
    payment_title: "كيفية الشراء",
    payment_card_desc: "ادفع باستخدام PayPal أو Visa أو Mastercard",
    payment_coinx_desc: "استخدم رصيد Token الخاص بك",
    payment_nft_desc: "امتلك NFT مؤهلًا للوصول",
    login_register: "تسجيل الدخول / التسجيل",
    save_language: "حفظ اللغة",
    language_preference: "تفضيل اللغة",
    select_wallet: "اختر المحفظة",
    wallet_connected: "تم توصيل المحفظة",
    footer_legal: "قانوني",
    footer_impressum: "بيانات الناشر",
    footer_datenschutz: "سياسة الخصوصية",
    footer_terms: "الشروط",
    footer_kontakt: "اتصل بنا",
    fiat_label: "فيات",
    or_label: "أو",
    month_label: "شهر",
    year_label: "سنة",
    monthly_label: "شهري",
    yearly_label: "سنوي",
    your_current_plan: "خطتك الحالية",
    save_25: "وفر 25%",
    best_plan: "أفضل خطة",
    active_badge: "نشط",
    researchers_community: "مجتمع الباحثين",
    memes_meet_research: "الميمات تلتقي بالبحث",
    smarter_research: "بحث أذكى، مدفوع بالطاقة الميمية",
    hero_subtitle:
      "أتقن أبحاث العملات المشفرة، استفد من تحليلات الذكاء الاصطناعي، واستثمر بذكاء. ميزتك في السوق تبدأ هنا.",
    download_register: "سجّل للتنزيل",
    download_limit_reached: "احصل على Basic لمزيد من التنزيلات",
    download_unlimited: "تنزيلات غير محدودة",
    plan_uncreamed: "Uncreamed (free)",
    plan_creamed: "Creamed",
    plan_extracreamed: "Extra Creamed",
    plan_creamy: "Creamy",
    register_for_free: "سجّل مجاناً",
    uncreamed_benefit_1: "ميزة الخيار 1",
    uncreamed_benefit_2: "ميزة الخيار 2",
    uncreamed_benefit_3: "ميزة الخيار 3",
    uncreamed_benefit_4: "ميزة الخيار 4",
    uncreamed_benefit_5: "ميزة الخيار 5",
    creamed_benefit_1: "ميزة الخيار 1",
    creamed_benefit_2: "ميزة الخيار 2",
    creamed_benefit_3: "ميزة الخيار 3",
    creamed_benefit_4: "ميزة الخيار 4",
    creamed_benefit_5: "ميزة الخيار 5",
    extracreamed_benefit_1: "ميزة الخيار 1",
    extracreamed_benefit_2: "ميزة الخيار 2",
    extracreamed_benefit_3: "ميزة الخيار 3",
    extracreamed_benefit_4: "ميزة الخيار 4",
    extracreamed_benefit_5: "ميزة الخيار 5",
    creamy_benefit_1: "ميزة الخيار 1",
    creamy_benefit_2: "ميزة الخيار 2",
    creamy_benefit_3: "ميزة الخيار 3",
    creamy_benefit_4: "ميزة الخيار 4",
    creamy_benefit_5: "ميزة الخيار 5",
  },
  es: {
    nav_home: "Inicio",
    nav_ai: "IA",
    nav_crypto: "Cripto & Mercado",
    connect_wallet: "Connect Wallet",
    disconnect: "Desconectar",
    wallet_disclaimer:
      "Este sitio web no ejecuta ninguna transacción de billetera. Solo verifica si la cantidad requerida de Tokens o los NFT requeridos están presentes en la billetera.",
    dark_mode: "Modo oscuro",
    light_mode: "Modo claro",
    subscribe: "Suscribirse",
    newsletter_title: "Quédate Creamy",
    newsletter_hint: "Recibe actualizaciones sobre IA, Cripto y Mercado.",
    email_placeholder: "Tu dirección de email",
    subscribe_success: "¡Suscripción exitosa!",
    subscribe_error: "Error en la suscripción. Por favor intenta de nuevo.",
    plans_title: "Elige tu plan & únete a la comunidad",
    articles_title: "Últimas perspectivas",
    footer_tagline: "Donde las criptomonedas se encuentran con la IA.",
    ai_desc:
      "Explora lo último en inteligencia artificial y aprendizaje automático.",
    crypto_desc:
      "Datos de mercado en tiempo real, análisis cripto e insights blockchain.",
    upgrade_to: "Actualizar a",
    locked_content: "Este contenido requiere un nivel de membresía superior.",
    paypal_btn: "PayPal / Visa / MC",
    coinx_btn: "Comprar Tokens",
    nft_btn: "Comprar NFT",
    login: "Iniciar sesión",
    register: "Registrarse",
    logout: "Cerrar sesión",
    username: "Usuario",
    password: "Contraseña",
    confirm_password: "Confirmar contraseña",
    account_settings: "Configuración de cuenta",
    change_password: "Cambiar contraseña",
    old_password: "Contraseña anterior",
    new_password: "Nueva contraseña",
    passwords_dont_match: "Las contraseñas no coinciden",
    username_taken: "Nombre de usuario ya tomado",
    invalid_credentials: "Usuario o contraseña inválidos",
    register_to_read: "Regístrate para continuar leyendo",
    register_prompt_title: "Tu tiempo de lectura gratuita ha terminado",
    register_prompt_desc:
      "Crea una cuenta gratuita para seguir leyendo. Los usuarios registrados obtienen acceso completo al contenido gratuito más un artículo básico.",
    minutes_left: "min restantes",
    payment_title: "Cómo comprar",
    payment_card_desc: "Paga con PayPal, Visa o Mastercard",
    payment_coinx_desc: "Usa tu saldo de Tokens",
    payment_nft_desc: "Posee un NFT calificado para acceder",
    login_register: "Iniciar sesión / Registrarse",
    save_language: "Guardar idioma",
    language_preference: "Preferencia de idioma",
    select_wallet: "Seleccionar billetera",
    wallet_connected: "Billetera conectada",
    footer_legal: "Legal",
    footer_impressum: "Aviso legal",
    footer_datenschutz: "Privacidad",
    footer_terms: "Términos",
    footer_kontakt: "Contacto",
    fiat_label: "Fiat",
    or_label: "O",
    month_label: "mes",
    year_label: "año",
    monthly_label: "Mensual",
    yearly_label: "Anual",
    your_current_plan: "Tu plan actual",
    save_25: "Ahorra 25%",
    best_plan: "Mejor Plan",
    active_badge: "Activo",
    researchers_community: "Comunidad de Investigadores",
    memes_meet_research: "memes se encuentran con la investigación",
    smarter_research:
      "Investigación más inteligente, impulsada por el vibrante memético",
    hero_subtitle:
      "Domina la investigación cripto, aprovecha los análisis con IA e invierte con inteligencia. Tu ventaja en el mercado empieza aquí.",
    download_register: "Regístrate para descargar",
    download_limit_reached: "Obtén Basic para más descargas",
    download_unlimited: "Descargas ilimitadas",
    plan_uncreamed: "Uncreamed (free)",
    plan_creamed: "Creamed",
    plan_extracreamed: "Extra Creamed",
    plan_creamy: "Creamy",
    register_for_free: "Regístrate gratis",
    uncreamed_benefit_1: "Opción 1 beneficio",
    uncreamed_benefit_2: "Opción 2 beneficio",
    uncreamed_benefit_3: "Opción 3 beneficio",
    uncreamed_benefit_4: "Opción 4 beneficio",
    uncreamed_benefit_5: "Opción 5 beneficio",
    creamed_benefit_1: "Opción 1 beneficio",
    creamed_benefit_2: "Opción 2 beneficio",
    creamed_benefit_3: "Opción 3 beneficio",
    creamed_benefit_4: "Opción 4 beneficio",
    creamed_benefit_5: "Opción 5 beneficio",
    extracreamed_benefit_1: "Opción 1 beneficio",
    extracreamed_benefit_2: "Opción 2 beneficio",
    extracreamed_benefit_3: "Opción 3 beneficio",
    extracreamed_benefit_4: "Opción 4 beneficio",
    extracreamed_benefit_5: "Opción 5 beneficio",
    creamy_benefit_1: "Opción 1 beneficio",
    creamy_benefit_2: "Opción 2 beneficio",
    creamy_benefit_3: "Opción 3 beneficio",
    creamy_benefit_4: "Opción 4 beneficio",
    creamy_benefit_5: "Opción 5 beneficio",
  },
  tr: {
    nav_home: "Ana Sayfa",
    nav_ai: "Yapay Zeka",
    nav_crypto: "Kripto & Piyasa",
    connect_wallet: "Connect Wallet",
    disconnect: "Bağlantıyı Kes",
    wallet_disclaimer:
      "Bu web sitesi herhangi bir cüzdan işlemi gerçekleştirmez. Yalnızca gerekli miktarda Tokens veya gerekli NFT'lerin cüzdanında mevcut olup olmadığını kontrol eder.",
    dark_mode: "Karanlık Mod",
    light_mode: "Aydınlık Mod",
    subscribe: "Abone Ol",
    newsletter_title: "Güncel Kal",
    newsletter_hint: "Yapay Zeka, Kripto & Piyasa güncellemeleri al.",
    email_placeholder: "E-posta adresin",
    subscribe_success: "Başarıyla abone oldunuz!",
    subscribe_error: "Abonelik başarısız. Lütfen tekrar deneyin.",
    plans_title: "Planını Seç & Topluluğa Katıl",
    articles_title: "Son Analizler",
    footer_tagline: "Kriptonun yapay zeka ile buluştuğu yer.",
    ai_desc: "Yapay zeka ve makine öğrenmesindeki en son gelişmeleri keşfedin.",
    crypto_desc:
      "Gerçek zamanlı piyasa verileri, kripto analizleri ve blockchain bilgileri.",
    upgrade_to: "Yükselt:",
    locked_content: "Bu içerik daha yüksek bir üyelik seviyesi gerektiriyor.",
    paypal_btn: "PayPal / Visa / MC",
    coinx_btn: "Token Satın Al",
    nft_btn: "NFT Satın Al",
    login: "Giriş Yap",
    register: "Kayıt Ol",
    logout: "Çıkış Yap",
    username: "Kullanıcı Adı",
    password: "Şifre",
    confirm_password: "Şifreyi Onayla",
    account_settings: "Hesap Ayarları",
    change_password: "Şifre Değiştir",
    old_password: "Eski Şifre",
    new_password: "Yeni Şifre",
    passwords_dont_match: "Şifreler eşleşmiyor",
    username_taken: "Kullanıcı adı zaten alınmış",
    invalid_credentials: "Geçersiz kullanıcı adı veya şifre",
    register_to_read: "Okumaya devam etmek için kayıt ol",
    register_prompt_title: "Ücretsiç okuma süreniz doldu",
    register_prompt_desc:
      "Okumaya devam etmek için ücretsiz hesap oluşturun. Kayıtlı kullanıcılar tüm ücretsiz içeriklere ve bir Temel makaleye erişebilir.",
    minutes_left: "dk kaldı",
    payment_title: "Nasıl Satın Alınır",
    payment_card_desc: "PayPal, Visa veya Mastercard ile öde",
    payment_coinx_desc: "Token bakiyeni kullan",
    payment_nft_desc: "Erişim için uygun bir NFT'ye sahip ol",
    login_register: "Giriş / Kayıt",
    save_language: "Dili Kaydet",
    language_preference: "Dil Tercihi",
    select_wallet: "Cüzdan Seç",
    wallet_connected: "Cüzdan Bağlandı",
    footer_legal: "Yasal",
    footer_impressum: "Künye",
    footer_datenschutz: "Gizlilik",
    footer_terms: "Şartlar",
    footer_kontakt: "İletişim",
    fiat_label: "Fiat",
    or_label: "VEYA",
    month_label: "ay",
    year_label: "yıl",
    monthly_label: "Aylık",
    yearly_label: "Yıllık",
    your_current_plan: "Mevcut planın",
    save_25: "%25 tasarruf",
    best_plan: "En İyi Plan",
    active_badge: "Aktif",
    researchers_community: "Araştırmacılar Topluluğu",
    memes_meet_research: "memler araştırmayla buluşuyor",
    smarter_research:
      "Memetik titreşimlerle güçlendirilmiş daha akıllı araştırma",
    hero_subtitle:
      "Kripto araştırmada ustalaş, yapay zeka destekli analizlerden yararlan ve daha akıllıca yatırım yap. Piyasadaki avantajın burada başlıyor.",
    download_register: "İndirmek için kayıt ol",
    download_limit_reached: "Daha fazla indirme için Basic al",
    download_unlimited: "Sınırsız indirme",
    plan_uncreamed: "Uncreamed (free)",
    plan_creamed: "Creamed",
    plan_extracreamed: "Extra Creamed",
    plan_creamy: "Creamy",
    register_for_free: "Ücretsiz kayıt ol",
    uncreamed_benefit_1: "Seçenek 1 avantajı",
    uncreamed_benefit_2: "Seçenek 2 avantajı",
    uncreamed_benefit_3: "Seçenek 3 avantajı",
    uncreamed_benefit_4: "Seçenek 4 avantajı",
    uncreamed_benefit_5: "Seçenek 5 avantajı",
    creamed_benefit_1: "Seçenek 1 avantajı",
    creamed_benefit_2: "Seçenek 2 avantajı",
    creamed_benefit_3: "Seçenek 3 avantajı",
    creamed_benefit_4: "Seçenek 4 avantajı",
    creamed_benefit_5: "Seçenek 5 avantajı",
    extracreamed_benefit_1: "Seçenek 1 avantajı",
    extracreamed_benefit_2: "Seçenek 2 avantajı",
    extracreamed_benefit_3: "Seçenek 3 avantajı",
    extracreamed_benefit_4: "Seçenek 4 avantajı",
    extracreamed_benefit_5: "Seçenek 5 avantajı",
    creamy_benefit_1: "Seçenek 1 avantajı",
    creamy_benefit_2: "Seçenek 2 avantajı",
    creamy_benefit_3: "Seçenek 3 avantajı",
    creamy_benefit_4: "Seçenek 4 avantajı",
    creamy_benefit_5: "Seçenek 5 avantajı",
  },
  fa: {
    nav_home: "خانه",
    nav_ai: "هوش مصنوعی",
    nav_crypto: "کریپتو و بازار",
    connect_wallet: "Connect Wallet",
    disconnect: "قطع اتصال",
    wallet_disclaimer:
      "این وب‌سایت هیچ تراکنش کیف پولی انجام نمی‌دهد. فقط بررسی می‌کند که آیا مقدار مورد نیاز Tokens یا NFT‌های مورد نیاز در کیف پول موجود هستند.",
    dark_mode: "حالت تاریک",
    light_mode: "حالت روشن",
    subscribe: "اشتراک",
    newsletter_title: "به‌روز بمانید",
    newsletter_hint: "به‌روزرسانی‌های هوش مصنوعی، کریپتو و بازار دریافت کنید.",
    email_placeholder: "آدرس ایمیل شما",
    subscribe_success: "با موفقیت مشترک شدید!",
    subscribe_error: "اشتراک ناموفق بود. لطفاً دوباره امتحان کنید.",
    plans_title: "طرح خود را انتخاب کنید و به جامعه بپیوندید",
    articles_title: "آخرین تحلیل‌ها",
    footer_tagline: "جایی که کریپتو با هوش مصنوعی دیدار می‌کند.",
    ai_desc: "آخرین پیشرفت‌های هوش مصنوعی و یادگیری ماشین را کاوش کنید.",
    crypto_desc: "داده‌های بازار در زمان واقعی، تحلیل کریپتو و بینش‌های بلاکچین.",
    upgrade_to: "ارتقا به",
    locked_content: "این محتوا به سطح عضویت بالاتری نیاز دارد.",
    paypal_btn: "PayPal / Visa / MC",
    coinx_btn: "خرید Tokens",
    nft_btn: "خرید NFT",
    login: "ورود",
    register: "ثبت‌نام",
    logout: "خروج",
    username: "نام کاربری",
    password: "رمز عبور",
    confirm_password: "تأیید رمز عبور",
    account_settings: "تنظیمات حساب",
    change_password: "تغییر رمز عبور",
    old_password: "رمز عبور قدیم",
    new_password: "رمز عبور جدید",
    passwords_dont_match: "رمزهای عبور مطابقت ندارند",
    username_taken: "نام کاربری قبلاً استفاده شده",
    invalid_credentials: "نام کاربری یا رمز عبور نادرست",
    register_to_read: "برای ادامه مطالعه ثبت‌نام کنید",
    register_prompt_title: "زمان مطالعه رایگان شما به پایان رسید",
    register_prompt_desc:
      "برای ادامه مطالعه یک حساب رایگان ایجاد کنید. کاربران ثبت‌نام‌شده به تمام محتوای رایگان به اضافه یک مقاله پایه دسترسی دارند.",
    minutes_left: "دقیقه مانده",
    payment_title: "نحوه خرید",
    payment_card_desc: "با PayPal، Visa یا Mastercard پرداخت کنید",
    payment_coinx_desc: "از موجودی Token خود استفاده کنید",
    payment_nft_desc: "برای دسترسی یک NFT واجد شرایط داشته باشید",
    login_register: "ورود / ثبت‌نام",
    save_language: "ذخیره زبان",
    language_preference: "ترجیح زبان",
    select_wallet: "انتخاب کیف پول",
    wallet_connected: "کیف پول متصل شد",
    footer_legal: "حقوقی",
    footer_impressum: "اطلاعات ناشر",
    footer_datenschutz: "حریم خصوصی",
    footer_terms: "شرایط",
    footer_kontakt: "تماس",
    fiat_label: "فیات",
    or_label: "یا",
    month_label: "ماه",
    year_label: "سال",
    monthly_label: "ماهانه",
    yearly_label: "سالانه",
    your_current_plan: "پلن فعلی شما",
    save_25: "۲۵٪ صرفه‌جویی",
    best_plan: "بهترین پلن",
    active_badge: "فعال",
    researchers_community: "جامعه پژوهشگران",
    memes_meet_research: "میم‌ها با تحقیق ملاقات می‌کنند",
    smarter_research: "پژوهش هوشمندتر، با انرژی میمتیک",
    hero_subtitle:
      "بر تحقیقات کریپتو مسلط شوید، از تحلیل‌های هوش مصنوعی بهره بگیرید و هوشمندانه‌تر سرمایه‌گذاری کنید. مزیت شما در بازار از اینجا شروع می‌شود.",
    download_register: "برای دانلود ثبت‌نام کنید",
    download_limit_reached: "برای دانلودهای بیشتر Basic بگیرید",
    download_unlimited: "دانلود نامحدود",
    plan_uncreamed: "Uncreamed (free)",
    plan_creamed: "Creamed",
    plan_extracreamed: "Extra Creamed",
    plan_creamy: "Creamy",
    register_for_free: "رایگان ثبت‌نام کنید",
    uncreamed_benefit_1: "مزیت گزینه ۱",
    uncreamed_benefit_2: "مزیت گزینه ۲",
    uncreamed_benefit_3: "مزیت گزینه ۳",
    uncreamed_benefit_4: "مزیت گزینه ۴",
    uncreamed_benefit_5: "مزیت گزینه ۵",
    creamed_benefit_1: "مزیت گزینه ۱",
    creamed_benefit_2: "مزیت گزینه ۲",
    creamed_benefit_3: "مزیت گزینه ۳",
    creamed_benefit_4: "مزیت گزینه ۴",
    creamed_benefit_5: "مزیت گزینه ۵",
    extracreamed_benefit_1: "مزیت گزینه ۱",
    extracreamed_benefit_2: "مزیت گزینه ۲",
    extracreamed_benefit_3: "مزیت گزینه ۳",
    extracreamed_benefit_4: "مزیت گزینه ۴",
    extracreamed_benefit_5: "مزیت گزینه ۵",
    creamy_benefit_1: "مزیت گزینه ۱",
    creamy_benefit_2: "مزیت گزینه ۲",
    creamy_benefit_3: "مزیت گزینه ۳",
    creamy_benefit_4: "مزیت گزینه ۴",
    creamy_benefit_5: "مزیت گزینه ۵",
  },
};

// Add pt to TRANSLATIONS (patch)
(TRANSLATIONS as Record<string, Record<string, string>>).pt = {
  nav_home: "Início",
  nav_ai: "IA",
  nav_crypto: "Cripto & Mercado",
  connect_wallet: "Connect Wallet",
  disconnect: "Desconectar",
  wallet_disclaimer:
    "Este site não executa nenhuma transação de carteira. Apenas verifica se a quantidade necessária de Tokens ou os NFTs necessários estão presentes na carteira.",
  dark_mode: "Modo escuro",
  light_mode: "Modo claro",
  subscribe: "Subscrever",
  newsletter_title: "Fique Creamy",
  newsletter_hint: "Receba atualizações sobre IA, Cripto & Mercado.",
  email_placeholder: "O seu endereço de email",
  subscribe_success: "Subscrito com sucesso!",
  subscribe_error: "Falha na subscrição. Por favor tente novamente.",
  plans_title: "Escolha o seu plano & junte-se à comunidade",
  articles_title: "Últimas análises",
  footer_tagline: "Onde as criptomoedas encontram a IA.",
  ai_desc:
    "Explore as últimas novidades em inteligência artificial e aprendizagem automática.",
  crypto_desc:
    "Dados de mercado em tempo real, análise cripto e insights blockchain.",
  upgrade_to: "Atualizar para",
  locked_content: "Este conteúdo requer um nível de adesão superior.",
  paypal_btn: "PayPal / Visa / MC",
  coinx_btn: "Comprar Tokens",
  nft_btn: "Comprar NFT",
  login: "Iniciar sessão",
  register: "Registar",
  logout: "Terminar sessão",
  username: "Nome de utilizador",
  password: "Palavra-passe",
  confirm_password: "Confirmar palavra-passe",
  account_settings: "Definições da conta",
  change_password: "Alterar palavra-passe",
  old_password: "Palavra-passe antiga",
  new_password: "Nova palavra-passe",
  passwords_dont_match: "As palavras-passe não coincidem",
  username_taken: "Nome de utilizador já utilizado",
  invalid_credentials: "Nome de utilizador ou palavra-passe inválidos",
  register_to_read: "Registe-se para continuar a ler",
  register_prompt_title: "O seu tempo de leitura gratuita terminou",
  register_prompt_desc:
    "Crie uma conta gratuita para continuar a ler. Os utilizadores registados têm acesso a todo o conteúdo gratuito mais um artigo Básico.",
  minutes_left: "min restantes",
  payment_title: "Como comprar",
  payment_card_desc: "Pague com PayPal, Visa ou Mastercard",
  payment_coinx_desc: "Use o seu saldo de Tokens",
  payment_nft_desc: "Possua um NFT qualificado para acesso",
  login_register: "Iniciar sessão / Registar",
  save_language: "Guardar idioma",
  language_preference: "Preferência de idioma",
  select_wallet: "Selecionar carteira",
  wallet_connected: "Carteira ligada",
  footer_legal: "Legal",
  footer_impressum: "Impressão",
  footer_datenschutz: "Privacidade",
  footer_terms: "Termos",
  footer_kontakt: "Contacto",
  fiat_label: "Fiat",
  or_label: "OU",
  month_label: "mês",
  year_label: "ano",
  monthly_label: "Mensal",
  yearly_label: "Anual",
  your_current_plan: "Seu plano atual",
  save_25: "Economize 25%",
  best_plan: "Melhor Plano",
  active_badge: "Ativo",
  researchers_community: "Comunidade de Pesquisadores",
  memes_meet_research: "memes encontram a pesquisa",
  smarter_research:
    "Pesquisa mais inteligente, impulsionada por vibrações meméticas",
  hero_subtitle:
    "Domine a pesquisa cripto, aproveite análises baseadas em IA e invista com mais inteligência. A sua vantagem no mercado começa aqui.",
  download_register: "Registe-se para descarregar",
  download_limit_reached: "Obtenha o Basic para mais downloads",
  download_unlimited: "Downloads ilimitados",
  plan_uncreamed: "Uncreamed (free)",
  plan_creamed: "Creamed",
  plan_extracreamed: "Extra Creamed",
  plan_creamy: "Creamy",
  register_for_free: "Registrar gratuitamente",
  uncreamed_benefit_1: "Opção 1 benefício",
  uncreamed_benefit_2: "Opção 2 benefício",
  uncreamed_benefit_3: "Opção 3 benefício",
  uncreamed_benefit_4: "Opção 4 benefício",
  uncreamed_benefit_5: "Opção 5 benefício",
  creamed_benefit_1: "Opção 1 benefício",
  creamed_benefit_2: "Opção 2 benefício",
  creamed_benefit_3: "Opção 3 benefício",
  creamed_benefit_4: "Opção 4 benefício",
  creamed_benefit_5: "Opção 5 benefício",
  extracreamed_benefit_1: "Opção 1 benefício",
  extracreamed_benefit_2: "Opção 2 benefício",
  extracreamed_benefit_3: "Opção 3 benefício",
  extracreamed_benefit_4: "Opção 4 benefício",
  extracreamed_benefit_5: "Opção 5 benefício",
  creamy_benefit_1: "Opção 1 benefício",
  creamy_benefit_2: "Opção 2 benefício",
  creamy_benefit_3: "Opção 3 benefício",
  creamy_benefit_4: "Opção 4 benefício",
  creamy_benefit_5: "Opção 5 benefício",
};

// Add it to TRANSLATIONS (patch)
(TRANSLATIONS as Record<string, Record<string, string>>).it = {
  nav_home: "Home",
  nav_ai: "IA",
  nav_crypto: "Cripto & Mercato",
  connect_wallet: "Connect Wallet",
  disconnect: "Disconnetti",
  wallet_disclaimer:
    "Questo sito non esegue transazioni di portafoglio. Verifica solo se la quantità richiesta di Tokens o gli NFT richiesti sono presenti nel portafoglio.",
  dark_mode: "Modalità scura",
  light_mode: "Modalità chiara",
  subscribe: "Iscriviti",
  newsletter_title: "Rimani Creamy",
  newsletter_hint: "Ricevi aggiornamenti su IA, Cripto & Mercato.",
  email_placeholder: "Il tuo indirizzo email",
  subscribe_success: "Iscrizione avvenuta con successo!",
  subscribe_error: "Iscrizione fallita. Riprova.",
  plans_title: "Scegli il tuo piano & unisciti alla community",
  articles_title: "Ultime analisi",
  footer_tagline: "Dove le criptovalute incontrano l'IA.",
  ai_desc:
    "Esplora le ultime novità in intelligenza artificiale e machine learning.",
  crypto_desc:
    "Dati di mercato in tempo reale, analisi cripto e insight blockchain.",
  upgrade_to: "Aggiorna a",
  locked_content:
    "Questo contenuto richiede un livello di abbonamento superiore.",
  paypal_btn: "PayPal / Visa / MC",
  coinx_btn: "Acquista Tokens",
  nft_btn: "Acquista NFT",
  login: "Accedi",
  register: "Registrati",
  logout: "Esci",
  username: "Nome utente",
  password: "Password",
  confirm_password: "Conferma password",
  account_settings: "Impostazioni account",
  change_password: "Cambia password",
  old_password: "Vecchia password",
  new_password: "Nuova password",
  passwords_dont_match: "Le password non corrispondono",
  username_taken: "Nome utente già in uso",
  invalid_credentials: "Nome utente o password non validi",
  register_to_read: "Registrati per continuare a leggere",
  register_prompt_title: "Il tuo tempo di lettura gratuita è terminato",
  register_prompt_desc:
    "Crea un account gratuito per continuare a leggere. Gli utenti registrati hanno accesso a tutti i contenuti gratuiti più un articolo Basic.",
  minutes_left: "min rimanenti",
  payment_title: "Come acquistare",
  payment_card_desc: "Paga con PayPal, Visa o Mastercard",
  payment_coinx_desc: "Usa il tuo saldo di token CoinX",
  payment_nft_desc: "Possiedi un NFT qualificato per l'accesso",
  login_register: "Accedi / Registrati",
  save_language: "Salva lingua",
  language_preference: "Preferenza lingua",
  select_wallet: "Seleziona portafoglio",
  wallet_connected: "Portafoglio connesso",
  footer_legal: "Legale",
  footer_impressum: "Impressum",
  footer_datenschutz: "Privacy",
  footer_terms: "Termini",
  footer_kontakt: "Contatti",
  fiat_label: "Fiat",
  or_label: "O",
  month_label: "mese",
  year_label: "anno",
  monthly_label: "Mensile",
  yearly_label: "Annuale",
  your_current_plan: "Il tuo piano attuale",
  save_25: "Risparmia 25%",
  best_plan: "Piano Migliore",
  active_badge: "Attivo",
  researchers_community: "Community dei Ricercatori",
  memes_meet_research: "i meme incontrano la ricerca",
  smarter_research:
    "Ricerca più intelligente, alimentata da vibrazioni memetiche",
  hero_subtitle:
    "Padroneggia la ricerca cripto, sfrutta le analisi basate su IA e investi in modo più intelligente. Il tuo vantaggio nel mercato inizia qui.",
  download_register: "Registrati per scaricare",
  download_limit_reached: "Ottieni Basic per più download",
  download_unlimited: "Download illimitati",
  plan_uncreamed: "Uncreamed (free)",
  plan_creamed: "Creamed",
  plan_extracreamed: "Extra Creamed",
  plan_creamy: "Creamy",
  register_for_free: "Registrati gratuitamente",
  uncreamed_benefit_1: "Opzione 1 vantaggio",
  uncreamed_benefit_2: "Opzione 2 vantaggio",
  uncreamed_benefit_3: "Opzione 3 vantaggio",
  uncreamed_benefit_4: "Opzione 4 vantaggio",
  uncreamed_benefit_5: "Opzione 5 vantaggio",
  creamed_benefit_1: "Opzione 1 vantaggio",
  creamed_benefit_2: "Opzione 2 vantaggio",
  creamed_benefit_3: "Opzione 3 vantaggio",
  creamed_benefit_4: "Opzione 4 vantaggio",
  creamed_benefit_5: "Opzione 5 vantaggio",
  extracreamed_benefit_1: "Opzione 1 vantaggio",
  extracreamed_benefit_2: "Opzione 2 vantaggio",
  extracreamed_benefit_3: "Opzione 3 vantaggio",
  extracreamed_benefit_4: "Opzione 4 vantaggio",
  extracreamed_benefit_5: "Opzione 5 vantaggio",
  creamy_benefit_1: "Opzione 1 vantaggio",
  creamy_benefit_2: "Opzione 2 vantaggio",
  creamy_benefit_3: "Opzione 3 vantaggio",
  creamy_benefit_4: "Opzione 4 vantaggio",
  creamy_benefit_5: "Opzione 5 vantaggio",
};

// Add zh to TRANSLATIONS (patch)
(TRANSLATIONS as Record<string, Record<string, string>>).zh = {
  nav_home: "首页",
  nav_ai: "人工智能",
  nav_crypto: "加密货币与市场",
  connect_wallet: "Connect Wallet",
  disconnect: "断开连接",
  wallet_disclaimer:
    "本网站不执行任何钱包交易。仅验证钱包中是否持有所需数量的Tokens或NFT。",
  dark_mode: "深色模式",
  light_mode: "浅色模式",
  subscribe: "订阅",
  newsletter_title: "保持关注",
  newsletter_hint: "获取AI、加密货币和市场的最新资讯。",
  email_placeholder: "您的电子邮件地址",
  subscribe_success: "订阅成功！",
  subscribe_error: "订阅失败，请重试。",
  plans_title: "选择您的计划并加入社区",
  articles_title: "最新见解",
  footer_tagline: "加密货币与AI的交汇之处。",
  ai_desc: "探索人工智能和机器学习的最新进展。",
  crypto_desc: "实时市场数据、加密分析和区块链见解。",
  upgrade_to: "升级至",
  locked_content: "此内容需要更高级别的会员资格。",
  paypal_btn: "PayPal / Visa / MC",
  coinx_btn: "购买 Tokens",
  nft_btn: "购买 NFT",
  login: "登录",
  register: "注册",
  logout: "退出",
  username: "用户名",
  password: "密码",
  confirm_password: "确认密码",
  account_settings: "账户设置",
  change_password: "修改密码",
  old_password: "旧密码",
  new_password: "新密码",
  passwords_dont_match: "两次密码不一致",
  username_taken: "用户名已被占用",
  invalid_credentials: "用户名或密码无效",
  register_to_read: "注册以继续阅读",
  register_prompt_title: "您的免费阅读时间已结束",
  register_prompt_desc:
    "创建免费账户继续阅读。注册用户可访问所有免费内容及一篇基础文章。",
  minutes_left: "分钟剩余",
  payment_title: "如何购买",
  payment_card_desc: "使用PayPal、Visa或Mastercard付款",
  payment_coinx_desc: "使用您的CoinX代币余额",
  payment_nft_desc: "持有符合条件的NFT以获取访问权限",
  login_register: "登录 / 注册",
  save_language: "保存语言",
  language_preference: "语言偏好",
  select_wallet: "选择钱包",
  wallet_connected: "钱包已连接",
  footer_legal: "法律条款",
  footer_impressum: "版权声明",
  footer_datenschutz: "隐私政策",
  footer_terms: "服务条款",
  footer_kontakt: "联系我们",
  fiat_label: "法币",
  or_label: "或",
  month_label: "月",
  year_label: "年",
  monthly_label: "按月付费",
  yearly_label: "按年付费",
  your_current_plan: "您当前的计划",
  save_25: "节省25%",
  best_plan: "最佳方案",
  active_badge: "已激活",
  researchers_community: "研究者社区",
  memes_meet_research: "表情包与研究的碰撞",
  smarter_research: "更智慧的研究，由模因活力驱动",
  hero_subtitle:
    "掌握加密研究，借助AI分析，投资更聪明。您的市场优势从这里开始。",
  download_register: "注册后下载",
  download_limit_reached: "升级至Basic以获得更多下载",
  download_unlimited: "无限次下载",
  plan_uncreamed: "Uncreamed (free)",
  plan_creamed: "Creamed",
  plan_extracreamed: "Extra Creamed",
  plan_creamy: "Creamy",
  register_for_free: "免费注册",
  uncreamed_benefit_1: "选项1优势",
  uncreamed_benefit_2: "选项2优势",
  uncreamed_benefit_3: "选项3优势",
  uncreamed_benefit_4: "选项4优势",
  uncreamed_benefit_5: "选项5优势",
  creamed_benefit_1: "选项1优势",
  creamed_benefit_2: "选项2优势",
  creamed_benefit_3: "选项3优势",
  creamed_benefit_4: "选项4优势",
  creamed_benefit_5: "选项5优势",
  extracreamed_benefit_1: "选项1优势",
  extracreamed_benefit_2: "选项2优势",
  extracreamed_benefit_3: "选项3优势",
  extracreamed_benefit_4: "选项4优势",
  extracreamed_benefit_5: "选项5优势",
  creamy_benefit_1: "选项1优势",
  creamy_benefit_2: "选项2优势",
  creamy_benefit_3: "选项3优势",
  creamy_benefit_4: "选项4优势",
  creamy_benefit_5: "选项5优势",
};

// Add ja to TRANSLATIONS (patch)
(TRANSLATIONS as Record<string, Record<string, string>>).ja = {
  nav_home: "ホーム",
  nav_ai: "AI",
  nav_crypto: "暗号通貨＆市場",
  connect_wallet: "Connect Wallet",
  disconnect: "切断",
  wallet_disclaimer:
    "このウェブサイトはウォレット取引を実行しません。必要な量のTokensまたは必要なNFTがウォレットに存在するかどうかを確認するだけです。",
  dark_mode: "ダークモード",
  light_mode: "ライトモード",
  subscribe: "登録する",
  newsletter_title: "最新情報をチェック",
  newsletter_hint: "AI、暗号通貨、市場の最新情報を受け取る。",
  email_placeholder: "メールアドレス",
  subscribe_success: "登録完了！",
  subscribe_error: "登録に失敗しました。もう一度お試しください。",
  plans_title: "プランを選んでコミュニティに参加しよう",
  articles_title: "最新インサイト",
  footer_tagline: "暗号通貨とAIが出会う場所。",
  ai_desc: "人工知能と機械学習の最新動向を探る。",
  crypto_desc: "リアルタイム市場データ、暗号分析、ブロックチェーンの洞察。",
  upgrade_to: "アップグレード：",
  locked_content: "このコンテンツは上位メンバーシップが必要です。",
  paypal_btn: "PayPal / Visa / MC",
  coinx_btn: "Tokensを購入",
  nft_btn: "NFTを購入",
  login: "ログイン",
  register: "登録",
  logout: "ログアウト",
  username: "ユーザー名",
  password: "パスワード",
  confirm_password: "パスワードを確認",
  account_settings: "アカウント設定",
  change_password: "パスワード変更",
  old_password: "現在のパスワード",
  new_password: "新しいパスワード",
  passwords_dont_match: "パスワードが一致しません",
  username_taken: "このユーザー名は既に使用されています",
  invalid_credentials: "ユーザー名またはパスワードが無効です",
  register_to_read: "読み続けるには登録してください",
  register_prompt_title: "無料閲覧時間が終了しました",
  register_prompt_desc:
    "読み続けるには無料アカウントを作成してください。登録ユーザーは全ての無料コンテンツと基本記事1本にアクセスできます。",
  minutes_left: "分残り",
  payment_title: "購入方法",
  payment_card_desc: "PayPal、Visa、またはMastercardで支払う",
  payment_coinx_desc: "Tokens残高を使用する",
  payment_nft_desc: "アクセスに対応するNFTを所持する",
  login_register: "ログイン / 登録",
  save_language: "言語を保存",
  language_preference: "言語の設定",
  select_wallet: "ウォレットを選択",
  wallet_connected: "ウォレットが接続されました",
  footer_legal: "法的情報",
  footer_impressum: "運営者情報",
  footer_datenschutz: "プライバシーポリシー",
  footer_terms: "利用規約",
  footer_kontakt: "お問い合わせ",
  fiat_label: "法定通貨",
  or_label: "または",
  month_label: "月",
  year_label: "年",
  monthly_label: "月払い",
  yearly_label: "年払い",
  your_current_plan: "現在のプラン",
  save_25: "25%オフ",
  best_plan: "ベストプラン",
  active_badge: "有効",
  researchers_community: "リサーチャーコミュニティ",
  memes_meet_research: "ミームと研究の融合",
  smarter_research: "ミーム的バイブに支えられた、より賢い研究",
  hero_subtitle:
    "暗号研究をマスターし、AI分析を活用して、よりスマートに投資しよう。あなたの市場での優位性はここから始まる。",
  download_register: "ダウンロードするには登録してください",
  download_limit_reached: "さらにダウンロードするにはBasicを取得してください",
  download_unlimited: "無制限ダウンロード",
  plan_uncreamed: "Uncreamed (free)",
  plan_creamed: "Creamed",
  plan_extracreamed: "Extra Creamed",
  plan_creamy: "Creamy",
  register_for_free: "無料登録する",
  uncreamed_benefit_1: "オプション1の特典",
  uncreamed_benefit_2: "オプション2の特典",
  uncreamed_benefit_3: "オプション3の特典",
  uncreamed_benefit_4: "オプション4の特典",
  uncreamed_benefit_5: "オプション5の特典",
  creamed_benefit_1: "オプション1の特典",
  creamed_benefit_2: "オプション2の特典",
  creamed_benefit_3: "オプション3の特典",
  creamed_benefit_4: "オプション4の特典",
  creamed_benefit_5: "オプション5の特典",
  extracreamed_benefit_1: "オプション1の特典",
  extracreamed_benefit_2: "オプション2の特典",
  extracreamed_benefit_3: "オプション3の特典",
  extracreamed_benefit_4: "オプション4の特典",
  extracreamed_benefit_5: "オプション5の特典",
  creamy_benefit_1: "オプション1の特典",
  creamy_benefit_2: "オプション2の特典",
  creamy_benefit_3: "オプション3の特典",
  creamy_benefit_4: "オプション4の特典",
  creamy_benefit_5: "オプション5の特典",
};
