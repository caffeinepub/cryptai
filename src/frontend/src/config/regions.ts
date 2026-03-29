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
export const GERMAN_COUNTRIES = ["DE", "AT"];

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
  | "memes_meet_research";

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
    return { defaultLang: "ar", availableOptions: mk(["ar", "fr", "en"]) };
  }
  if (EAST_GULF_ARABIC.includes(countryCode)) {
    return { defaultLang: "ar", availableOptions: mk(["ar", "en"]) };
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
    return { defaultLang: "de", availableOptions: mk(["de", "fr", "en"]) };
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

  // Spanish-speaking
  if (SPANISH_COUNTRIES.includes(countryCode)) {
    return { defaultLang: "es", availableOptions: mk(["es", "en"]) };
  }

  // Native English (US, UK, AU, CA)
  if (NATIVE_ENGLISH.includes(countryCode)) {
    return { defaultLang: "en", availableOptions: mk(["en", "es"]) };
  }

  // African English countries
  if (ENGLISH_AFRICA.includes(countryCode)) {
    return { defaultLang: "en", availableOptions: mk(["en"]) };
  }

  // African French countries
  if (FRENCH_AFRICA.includes(countryCode)) {
    return { defaultLang: "fr", availableOptions: mk(["fr", "en"]) };
  }

  // Asian countries (English)
  if (ASIAN_ENGLISH.includes(countryCode)) {
    return { defaultLang: "en", availableOptions: mk(["en"]) };
  }

  // Default: English only
  return { defaultLang: "en", availableOptions: mk(["en"]) };
}

export const TRANSLATIONS: Record<string, Record<TranslationKey, string>> = {
  en: {
    nav_home: "Home",
    nav_ai: "AI",
    nav_crypto: "Crypto & Market",
    connect_wallet: "Connect Wallet",
    disconnect: "Disconnect",
    wallet_disclaimer:
      "This website does not execute any wallet transactions. It only checks whether the required amount of CoinX or the required NFTs are present in the wallet.",
    dark_mode: "Dark Mode",
    light_mode: "Light Mode",
    subscribe: "Subscribe",
    newsletter_title: "Stay Updated",
    newsletter_hint: "Receive updates on AI, Crypto & Market.",
    email_placeholder: "Your email address",
    subscribe_success: "Successfully subscribed!",
    subscribe_error: "Subscription failed. Please try again.",
    plans_title: "Choose Your Plan & Join the Community",
    articles_title: "Latest Insights",
    footer_tagline: "Where crypto meets AI.",
    ai_desc:
      "Explore the latest in artificial intelligence, machine learning, and emerging AI technologies.",
    crypto_desc:
      "Real-time market data, crypto analysis, and blockchain insights.",
    upgrade_to: "Upgrade to",
    locked_content: "This content requires a higher membership tier.",
    paypal_btn: "PayPal / Visa / MC",
    coinx_btn: "Buy CoinX",
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
    payment_coinx_desc: "Use your CoinX token balance",
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
  },
  de: {
    nav_home: "Startseite",
    nav_ai: "KI",
    nav_crypto: "Krypto & Markt",
    connect_wallet: "Connect Wallet",
    disconnect: "Trennen",
    wallet_disclaimer:
      "Diese Webseite führt keine Wallet-Transaktionen aus. Es wird ausschließlich geprüft, ob die erforderliche Anzahl an CoinX oder die erforderlichen NFTs in der Wallet vorhanden sind.",
    dark_mode: "Dunkelmodus",
    light_mode: "Hellmodus",
    subscribe: "Abonnieren",
    newsletter_title: "Bleib informiert",
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
    coinx_btn: "CoinX kaufen",
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
    payment_coinx_desc: "CoinX-Token-Guthaben verwenden",
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
  },
  fr: {
    nav_home: "Accueil",
    nav_ai: "IA",
    nav_crypto: "Crypto & Marché",
    connect_wallet: "Connect Wallet",
    disconnect: "Déconnecter",
    wallet_disclaimer:
      "Ce site n'effectue aucune transaction de portefeuille. Il vérifie uniquement si la quantité requise de CoinX ou les NFT requis sont présents dans le portefeuille.",
    dark_mode: "Mode sombre",
    light_mode: "Mode clair",
    subscribe: "S'abonner",
    newsletter_title: "Restez informé",
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
    coinx_btn: "Acheter CoinX",
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
    payment_coinx_desc: "Utilisez votre solde de tokens CoinX",
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
  },
  ar: {
    nav_home: "الرئيسية",
    nav_ai: "الذكاء الاصطناعي",
    nav_crypto: "العملات والسوق",
    connect_wallet: "Connect Wallet",
    disconnect: "قطع الاتصال",
    wallet_disclaimer:
      "هذا الموقع لا ينفذ أي معاملات للمحفظة. يتحقق فقط من وجود الكمية المطلوبة من CoinX أو NFT المطلوبة في المحفظة.",
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
    coinx_btn: "شراء CoinX",
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
    payment_coinx_desc: "استخدم رصيد رمز CoinX الخاص بك",
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
  },
  es: {
    nav_home: "Inicio",
    nav_ai: "IA",
    nav_crypto: "Cripto & Mercado",
    connect_wallet: "Connect Wallet",
    disconnect: "Desconectar",
    wallet_disclaimer:
      "Este sitio web no ejecuta ninguna transacción de billetera. Solo verifica si la cantidad requerida de CoinX o los NFT requeridos están presentes en la billetera.",
    dark_mode: "Modo oscuro",
    light_mode: "Modo claro",
    subscribe: "Suscribirse",
    newsletter_title: "Manténete actualizado",
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
    coinx_btn: "Comprar CoinX",
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
    payment_coinx_desc: "Usa tu saldo de tokens CoinX",
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
  },
  tr: {
    nav_home: "Ana Sayfa",
    nav_ai: "Yapay Zeka",
    nav_crypto: "Kripto & Piyasa",
    connect_wallet: "Connect Wallet",
    disconnect: "Bağlantıyı Kes",
    wallet_disclaimer:
      "Bu web sitesi herhangi bir cüzdan işlemi gerçekleştirmez. Yalnızca gerekli miktarda CoinX veya gerekli NFT'lerin cüzdanında mevcut olup olmadığını kontrol eder.",
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
    coinx_btn: "CoinX Satın Al",
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
    payment_coinx_desc: "CoinX token bakiyeni kullan",
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
  },
  fa: {
    nav_home: "خانه",
    nav_ai: "هوش مصنوعی",
    nav_crypto: "کریپتو و بازار",
    connect_wallet: "Connect Wallet",
    disconnect: "قطع اتصال",
    wallet_disclaimer:
      "این وب‌سایت هیچ تراکنش کیف پولی انجام نمی‌دهد. فقط بررسی می‌کند که آیا مقدار مورد نیاز CoinX یا NFT‌های مورد نیاز در کیف پول موجود هستند.",
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
    coinx_btn: "خرید CoinX",
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
    payment_coinx_desc: "از موجودی توکن CoinX خود استفاده کنید",
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
    "Este site não executa nenhuma transação de carteira. Apenas verifica se a quantidade necessária de CoinX ou os NFTs necessários estão presentes na carteira.",
  dark_mode: "Modo escuro",
  light_mode: "Modo claro",
  subscribe: "Subscrever",
  newsletter_title: "Fique atualizado",
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
  coinx_btn: "Comprar CoinX",
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
  payment_coinx_desc: "Use o seu saldo de tokens CoinX",
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
};
