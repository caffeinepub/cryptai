import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContractConfig {
    nftVipAddress: string;
    vipThreshold: bigint;
    nftBasicAddress: string;
    basicThreshold: bigint;
    premiumThreshold: bigint;
    coinXAddress: string;
    nftPremiumAddress: string;
}
export interface RegionConfig {
    defaultLanguages: Array<string>;
    supportedLanguageCodes: Array<string>;
    arabicCountryCodes: Array<string>;
}
export interface T {
    id: string;
    accessLevel: AccessLevel;
    title: string;
    content: string;
    publishDate: bigint;
    language: string;
    summary: string;
    isArabicOriginal: boolean;
    isVisible: boolean;
    category: Category;
}
export interface Page {
    title: string;
    content: string;
    slug: string;
    isVisible: boolean;
}
export interface WalletSession {
    walletType: string;
    walletAddress: string;
    connectedAt: bigint;
    detectedMembershipLevel: AccessLevel;
}
export interface TickerEntry {
    change24h: bigint;
    price: bigint;
    symbol: string;
}
export interface NewsletterSub {
    subscribedAt: bigint;
    email: string;
    isConfirmed: boolean;
}
export interface PlanConfig {
    purchaseLinkNFT: string;
    usdPrice: bigint;
    purchaseLinkCoinX: string;
    nftContractAddress: string;
    coinXThreshold: bigint;
    purchaseLinkPaypal: string;
}
export enum AccessLevel {
    VIP = "VIP",
    Premium = "Premium",
    Free = "Free",
    Basic = "Basic"
}
export enum Category {
    AI = "AI",
    General = "General",
    Crypto = "Crypto"
}
export interface backendInterface {
    addArticle(article: T): Promise<void>;
    addNewsletterSubscriber(email: string): Promise<void>;
    addOrUpdatePage(page: Page): Promise<void>;
    addOrUpdateTicker(ticker: TickerEntry): Promise<void>;
    confirmNewsletterSubscriber(email: string): Promise<void>;
    getAllNewsletterSubscribers(): Promise<Array<NewsletterSub>>;
    getAllPages(): Promise<Array<Page>>;
    getAllTickers(): Promise<Array<TickerEntry>>;
    getAllWalletSessions(): Promise<Array<WalletSession>>;
    getArticle(id: string): Promise<T>;
    getArticlesByAccessLevel(level: AccessLevel): Promise<Array<T>>;
    getArticlesByCategory(category: Category): Promise<Array<T>>;
    getContractConfig(): Promise<ContractConfig>;
    getHomepageArticles(): Promise<{
        vip: Array<T>;
        premium: Array<T>;
        free: Array<T>;
        basic: Array<T>;
    }>;
    getLatestArticlesByAccessLevel(level: AccessLevel, maxCount: bigint): Promise<Array<T>>;
    getPage(slug: string): Promise<Page>;
    getPlanConfigs(): Promise<Array<PlanConfig>>;
    getRegionConfig(): Promise<RegionConfig>;
    getTicker(symbol: string): Promise<TickerEntry>;
    getWalletSession(address: string): Promise<WalletSession>;
    recordWalletSession(address: string, wtype: string, detectedLevel: AccessLevel): Promise<void>;
    seedPlaceholderPages(): Promise<void>;
    updateContractConfig(config: ContractConfig): Promise<void>;
    updatePlanConfig(planName: string, config: PlanConfig): Promise<void>;
    updateRegionConfig(config: RegionConfig): Promise<void>;
}
