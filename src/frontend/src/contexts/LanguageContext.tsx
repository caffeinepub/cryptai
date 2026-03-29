import { createContext, useContext, useEffect, useState } from "react";
import {
  LANGUAGE_LABELS,
  type Language,
  TRANSLATIONS,
  type TranslationKey,
  getRegionLanguageConfig,
} from "../config/regions";

// Callback so AuthContext can trigger language load on login
let _onLanguageLoad: ((lang: string) => void) | null = null;
export function setLanguageLoadCallback(cb: (lang: string) => void) {
  _onLanguageLoad = cb;
}
export function triggerLanguageLoad(lang: string) {
  if (_onLanguageLoad) _onLanguageLoad(lang);
}

function detectCountryCode(): string {
  const locale = navigator.language || "en-US";
  const parts = locale.split("-");
  return (parts[1] || "").toUpperCase();
}

function detectBrowserLang(): string {
  const locale = navigator.language || "en";
  return locale.split("-")[0].toLowerCase();
}

interface LanguageContextValue {
  currentLanguage: Language;
  availableLanguages: { code: string; label: string }[];
  isArabicRegion: boolean;
  setLanguage: (lang: Language) => void;
  loadFromAccount: (lang: string) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  currentLanguage: "en",
  availableLanguages: [{ code: "en", label: "English" }],
  isArabicRegion: false,
  setLanguage: () => {},
  loadFromAccount: () => {},
  t: (key) => key,
  isRTL: false,
});

// All 7 languages for account settings
export const ALL_LANGUAGES = Object.entries(LANGUAGE_LABELS)
  .filter(([code]) => ["en", "de", "fr", "ar", "es", "tr", "fa"].includes(code))
  .map(([code, label]) => ({ code, label }));

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const countryCode = detectCountryCode();
  const browserLang = detectBrowserLang();
  const regionConfig = getRegionLanguageConfig(countryCode, browserLang);

  const isArabicRegion = ["ar"].includes(regionConfig.defaultLang);

  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("cryptai-lang") as Language | null;
    return saved || regionConfig.defaultLang;
  });

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem("cryptai-lang", lang);
  };

  const loadFromAccount = (lang: string) => {
    if (lang) {
      setCurrentLanguage(lang as Language);
      localStorage.setItem("cryptai-lang", lang);
    }
  };

  // Register callback so AuthContext can call loadFromAccount on login
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    setLanguageLoadCallback(loadFromAccount);
  }, []);

  const t = (key: TranslationKey): string => {
    const translations = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    return (
      (translations as Record<string, string>)[key] ||
      (TRANSLATIONS.en as Record<string, string>)[key] ||
      key
    );
  };

  const isRTL = currentLanguage === "ar" || currentLanguage === "fa";

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        availableLanguages: regionConfig.availableOptions,
        isArabicRegion,
        setLanguage,
        loadFromAccount,
        t,
        isRTL,
      }}
    >
      <div dir={isRTL ? "rtl" : "ltr"}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
