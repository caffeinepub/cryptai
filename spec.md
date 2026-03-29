# CryptoAI.org

## Current State
- Region/language config is in `src/frontend/src/config/regions.ts` (`getRegionLanguageConfig`)
- `isArabicRegion` in LanguageContext checks if default language is 'ar'
- Articles have `isArabicOriginal` field used to filter out Arabic-only articles when not in Arabic region
- Article filter in `ArticlesSection.tsx`: `if (a.isArabicOriginal && !isArabicRegion) return false`
- Currently 8 languages supported: EN, DE, FR, AR, ES, TR, FA, PT

## Requested Changes (Diff)

### Add
- `arabic_only: boolean` field to `Article` interface (replaces `isArabicOriginal`)
- New languages in translation system: 中文 (zh), 日本語 (ja)
- Liechtenstein (LI) to German-speaking countries
- China (CN), Japan (JP) with their own language options in region config
- `isArabicLanguageSelected` boolean exported from LanguageContext: true when `currentLanguage === 'ar'` (not just when region default is Arabic)

### Modify
- Region logic in `getRegionLanguageConfig`:
  - Morocco (MA), Algeria (DZ), Tunisia (TN): default Français, options [العربية, English]
  - Egypt, Sudan, Jordan, Syria, Lebanon, Iraq, Gulf States, Libya: default English, options [العربية]
  - Germany (DE), Austria (AT), Switzerland (CH), Liechtenstein (LI): default Deutsch, options [English]
  - USA, UK (GB), Australia (AU), Canada (CA): default English, options [Español, Français]
  - China (CN): default English, options [中文]
  - Japan (JP): default English, options [日本語]
  - India (IN): default English, no options
  - All other Asian countries: default English, no options
  - Turkey (TR): default English, options [Türkçe]
  - Iran (IR): default English, options [فارسی]
  - Nigeria, Angola, South Africa, Kenya, Ethiopia, Ghana: default English, options [Français]
  - Brazil, Portugal: default Português, options [English]
  - France, Belgium: default Français, options [English]
  - Spain, Mexico, Latin America: default Español, options [English]
  - All other countries: default English, options [Español, Français]
- Article filtering: change from `isArabicOriginal && !isArabicRegion` to `arabic_only && currentLanguage !== 'ar'`
  - `arabic_only = true` articles: only shown when user has Arabic language selected
  - `arabic_only = false` articles: shown always, translated from English source
- `isArabicRegion` in LanguageContext: change to `currentLanguage === 'ar'` so it reflects user's selected language, not just region default
- All existing articles: set `arabic_only: false` (they are English-source articles)
- LANGUAGE_LABELS: add zh, ja entries
- Add basic zh and ja UI translations to TRANSLATIONS

### Remove
- `isArabicOriginal` field from Article interface (replaced by `arabic_only`)

## Implementation Plan
1. Update `regions.ts`: fix `getRegionLanguageConfig` with new rules, add LI, CN/JP with language options, add zh/ja to LANGUAGE_LABELS and TRANSLATIONS (basic UI strings)
2. Update `ArticleCard.tsx`: rename `isArabicOriginal` → `arabic_only` in Article interface
3. Update `ArticlesSection.tsx`: rename field in all article objects, update filter logic to use `arabic_only && language !== 'ar'`
4. Update `LanguageContext.tsx`: change `isArabicRegion` to `currentLanguage === 'ar'`
5. Validate and build
