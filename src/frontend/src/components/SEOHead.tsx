import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const SEO_DATA: Record<
  string,
  {
    title: string;
    description: string;
    lang: string;
    slogan: string;
    keywords: string;
  }
> = {
  en: {
    lang: "en",
    title:
      "CreamyCryptoAI.org – AI Crypto Research Community | Where Crypto Meets AI",
    description:
      "Your edge in crypto: research-driven insights, AI-powered analysis, and the community that gets it. Master cryptocurrency analysis, leverage AI-driven market insights, and invest smarter.",
    slogan: "Smarter research, powered by memetic vibes",
    keywords:
      "crypto AI research, AI cryptocurrency community, crypto market analysis, AI-powered crypto, blockchain research, DeFi analysis, crypto intelligence, cryptocurrency insights",
  },
  de: {
    lang: "de",
    title:
      "CreamyCryptoAI.org – KI-Krypto-Research Community | Wo Crypto auf KI trifft",
    description:
      "Ihr Vorteil in Krypto: forschungsbasierte Erkenntnisse, KI-gestützte Analysen und die Community, die es versteht. Meistern Sie Kryptowährungsanalysen und investieren Sie smarter.",
    slogan: "Smarte Recherche, angetrieben von memetischen Vibes",
    keywords:
      "Krypto KI Forschung, KI Kryptowährung Community, Kryptomarkt Analyse, KI-gestützte Krypto, Blockchain Forschung, DeFi Analyse, Krypto Intelligenz",
  },
  fr: {
    lang: "fr",
    title:
      "CreamyCryptoAI.org – Communauté de Recherche Crypto AI | Où la Crypto Rencontre l'IA",
    description:
      "Votre avantage en crypto: analyses pilotées par l'IA, insights basés sur la recherche, et la communauté qui comprend. Maîtrisez l'analyse des cryptomonnaies et investissez plus intelligemment.",
    slogan: "Recherche plus intelligente, propulsée par les vibes mémétiques",
    keywords:
      "crypto IA recherche, communauté IA cryptomonnaie, analyse marché crypto, crypto propulsée par IA, recherche blockchain, analyse DeFi",
  },
  ar: {
    lang: "ar",
    title: "CreamyCryptoAI.org – مجتمع أبحاث العملات المشفرة بالذكاء الاصطناعي",
    description:
      "ميزتك في عالم الكريبتو: رؤى مدفوعة بالبحث، تحليلات بالذكاء الاصطناعي، والمجتمع الذي يفهم. أتقن تحليل العملات المشفرة واستثمر بذكاء.",
    slogan: "بحث أذكى، مدعوم بالطاقة الميمية",
    keywords:
      "بحث كريبتو ذكاء اصطناعي، مجتمع عملات مشفرة، تحليل سوق كريبتو، بلوكتشين، ديفاي",
  },
  es: {
    lang: "es",
    title:
      "CreamyCryptoAI.org – Comunidad de Investigación Crypto AI | Donde las Cripto se Une a la IA",
    description:
      "Tu ventaja en cripto: insights basados en investigación, análisis impulsado por IA, y la comunidad que lo entiende. Domina el análisis de criptomonedas con IA e invierte más inteligentemente.",
    slogan: "Investigación más inteligente, impulsada por vibes mémicas",
    keywords:
      "investigación crypto IA, comunidad IA criptomonedas, análisis mercado crypto, blockchain, DeFi análisis, inteligencia cripto",
  },
  tr: {
    lang: "tr",
    title:
      "CreamyCryptoAI.org – AI Kripto Araştırma Topluluğu | Kriptonun AI ile Buluştuğu Yer",
    description:
      "Kripto'daki avantajınız: araştırma odaklı içgörüler, yapay zeka destekli analizler ve anlayan topluluk. AI ile kripto para analizinde ustalaşın, daha akıllıca yatırım yapın.",
    slogan: "Daha akıllı araştırma, memetik titreşimlerle destekleniyor",
    keywords:
      "kripto yapay zeka araştırma, AI kripto topluluğu, kripto piyasa analizi, blockchain araştırma, DeFi analizi",
  },
  fa: {
    lang: "fa",
    title: "CreamyCryptoAI.org – جامعه تحقیقات کریپتو هوش مصنوعی",
    description:
      "مزیت شما در کریپتو: بینش‌های تحقیقاتی، تحلیل‌های هوش مصنوعی، و جامعه‌ای که درک می‌کند. با هوش مصنوعی بر تحلیل ارز دیجیتال مسلط شوید.",
    slogan: "تحقیق هوشمندانه‌تر، با انرژی میمتیک",
    keywords:
      "تحقیق کریپتو هوش مصنوعی، جامعه ارز دیجیتال، تحلیل بازار کریپتو، بلاکچین",
  },
  pt: {
    lang: "pt",
    title:
      "CreamyCryptoAI.org – Comunidade de Pesquisa Crypto AI | Onde Crypto Encontra IA",
    description:
      "Sua vantagem em cripto: insights baseados em pesquisa, análises impulsionadas por IA, e a comunidade que entende. Domine a análise de criptomoedas com IA e invista de forma mais inteligente.",
    slogan: "Pesquisa mais inteligente, impulsionada por vibes mémicas",
    keywords:
      "pesquisa crypto IA, comunidade IA criptomoedas, análise mercado crypto, blockchain, análise DeFi",
  },
  it: {
    lang: "it",
    title:
      "CreamyCryptoAI.org – Comunità di Ricerca Crypto AI | Dove la Crypto Incontra l'AI",
    description:
      "Il tuo vantaggio in cripto: insight basati sulla ricerca, analisi potenziata dall'IA, e la comunità che capisce. Padroneggia l'analisi delle criptovalute con l'IA e investi in modo più intelligente.",
    slogan: "Ricerca più intelligente, alimentata da vibes memetiche",
    keywords:
      "ricerca crypto IA, comunità IA criptovalute, analisi mercato crypto, blockchain, analisi DeFi",
  },
  zh: {
    lang: "zh",
    title: "CreamyCryptoAI.org – AI加密研究社区 | 加密遇见AI",
    description:
      "您在加密货币领域的优势：基于研究的洞察、AI驱动的分析和理解一切的社区。用AI掌握加密货币分析，做出更明智的投资。",
    slogan: "更智能的研究，由模因活力驱动",
    keywords:
      "加密货币AI研究, AI加密社区, 加密市场分析, 区块链研究, DeFi分析, 人工智能加密",
  },
  ja: {
    lang: "ja",
    title:
      "CreamyCryptoAI.org – AI暗号通貨リサーチコミュニティ | 暗号とAIの交差点",
    description:
      "暗号通貨における優位性：研究に基づいた洞察、AI駆動の分析、そして理解するコミュニティ。AIで暗号通貨分析をマスターし、よりスマートに投資しましょう。",
    slogan: "よりスマートなリサーチ、ミーム的バイブスで動く",
    keywords:
      "暗号通貨AI研究, AIクリプトコミュニティ, 暗号市場分析, ブロックチェーン研究, DeFi分析",
  },
};

const setMeta = (name: string, content: string, isProperty = false) => {
  const selector = isProperty
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    if (isProperty) el.setAttribute("property", name);
    else el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string, hreflang?: string) => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export function SEOHead() {
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    const data = SEO_DATA[currentLanguage] ?? SEO_DATA.en;
    const baseUrl = "https://creamycryptoai.org";

    // Set html lang attribute
    document.documentElement.setAttribute("lang", data.lang);
    // RTL for Arabic and Persian
    if (currentLanguage === "ar" || currentLanguage === "fa") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }

    // Title
    document.title = data.title;

    // Standard meta
    setMeta("description", data.description);
    setMeta("keywords", data.keywords);

    // Open Graph
    setMeta("og:title", data.title, true);
    setMeta("og:description", data.description, true);
    setMeta(
      "og:image",
      `${baseUrl}/assets/generated/og-image.dim_1200x630.jpg`,
      true,
    );
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:image:alt", `CreamyCryptoAI.org – ${data.slogan}`, true);
    setMeta(
      "og:locale",
      currentLanguage === "zh"
        ? "zh_CN"
        : currentLanguage === "ja"
          ? "ja_JP"
          : currentLanguage === "ar"
            ? "ar_SA"
            : currentLanguage === "fa"
              ? "fa_IR"
              : currentLanguage === "tr"
                ? "tr_TR"
                : currentLanguage === "de"
                  ? "de_DE"
                  : currentLanguage === "fr"
                    ? "fr_FR"
                    : currentLanguage === "es"
                      ? "es_ES"
                      : currentLanguage === "pt"
                        ? "pt_BR"
                        : currentLanguage === "it"
                          ? "it_IT"
                          : "en_US",
      true,
    );

    // Twitter Card
    setMeta("twitter:title", data.title);
    setMeta("twitter:description", data.description);
    setMeta(
      "twitter:image",
      `${baseUrl}/assets/generated/og-image.dim_1200x630.jpg`,
    );
    setMeta("twitter:image:alt", `CreamyCryptoAI.org – ${data.slogan}`);

    // Canonical
    setLink("canonical", `${baseUrl}/`);

    // hreflang alternates
    const langMap: Record<string, string> = {
      en: "en",
      de: "de",
      fr: "fr",
      ar: "ar",
      es: "es",
      tr: "tr",
      fa: "fa",
      pt: "pt",
      it: "it",
      zh: "zh",
      ja: "ja",
    };
    for (const lc of Object.keys(langMap)) {
      setLink("alternate", `${baseUrl}/`, langMap[lc]);
    }
    setLink("alternate", `${baseUrl}/`, "x-default");

    // Update JSON-LD with current language info
    let jsonLd = document.querySelector<HTMLScriptElement>(
      "script[type='application/ld+json']",
    );
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.setAttribute("type", "application/ld+json");
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          name: "CreamyCryptoAI.org",
          alternateName: [
            "Creamy Crypto AI",
            "cREAMY cOMMUNITY",
            "Researchers Community",
          ],
          url: `${baseUrl}/`,
          description: data.description,
          inLanguage: data.lang,
          publisher: {
            "@type": "Organization",
            "@id": `${baseUrl}/#organization`,
            name: "Future Compass Lab",
            url: `${baseUrl}/`,
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/assets/uploads/e6149769-dde7-4cf9-a544-1cede158fbd1-019d3653-1931-72e3-9b25-c3751a055916-1.png`,
            },
            sameAs: [
              "https://www.reddit.com/r/creamcoin",
              "https://www.youtube.com/creamyvibes",
              "https://suno.com/@creamyvibes",
              "https://creamcoin.fun/",
            ],
          },
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/#/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
        {
          "@type": "OnlineCommunity",
          "@id": `${baseUrl}/#community`,
          name: "CreamyCryptoAI Researchers Community",
          description: data.description,
          url: `${baseUrl}/`,
          keywords: data.keywords,
          image: `${baseUrl}/assets/generated/og-image.dim_1200x630.jpg`,
          membershipPointsEarned: "Crypto AI Research Access",
          about: [
            { "@type": "Thing", name: "Cryptocurrency" },
            { "@type": "Thing", name: "Artificial Intelligence" },
            { "@type": "Thing", name: "Crypto Research" },
            { "@type": "Thing", name: "Market Analysis" },
            { "@type": "Thing", name: "DeFi" },
          ],
        },
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/#webpage`,
          url: `${baseUrl}/`,
          name: data.title,
          description: data.description,
          inLanguage: data.lang,
          isPartOf: { "@id": `${baseUrl}/#website` },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: { "@id": `${baseUrl}/`, name: "Home" },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: { "@id": `${baseUrl}/#/ai`, name: "AI Research" },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@id": `${baseUrl}/#/cryptoandmarket`,
                  name: "Crypto & Market",
                },
              },
            ],
          },
        },
      ],
    });
  }, [currentLanguage]);

  return null;
}
