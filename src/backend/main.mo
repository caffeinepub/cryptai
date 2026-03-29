import Iter "mo:core/Iter";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";

actor {
  // Types
  type AccessLevel = {
    #Free;
    #Basic;
    #Premium;
    #VIP;
  };
  type Category = { #AI; #Crypto; #General };

  module Article {
    public type T = {
      id : Text;
      title : Text;
      summary : Text;
      content : Text;
      publishDate : Int;
      accessLevel : AccessLevel;
      category : Category;
      language : Text;
      isArabicOriginal : Bool;
      isVisible : Bool;
    };

    public func compare(a1 : T, a2 : T) : { #less; #equal; #greater } {
      Text.compare(a1.id, a2.id);
    };
  };

  type PlanConfig = {
    usdPrice : Nat;
    coinXThreshold : Nat;
    nftContractAddress : Text;
    purchaseLinkPaypal : Text;
    purchaseLinkCoinX : Text;
    purchaseLinkNFT : Text;
  };
  type ContractConfig = {
    coinXAddress : Text;
    nftBasicAddress : Text;
    nftPremiumAddress : Text;
    nftVipAddress : Text;
    basicThreshold : Nat;
    premiumThreshold : Nat;
    vipThreshold : Nat;
  };
  type NewsletterSub = {
    email : Text;
    subscribedAt : Int;
    isConfirmed : Bool;
  };
  type Page = {
    slug : Text;
    title : Text;
    content : Text;
    isVisible : Bool;
  };
  type RegionConfig = {
    arabicCountryCodes : [Text];
    defaultLanguages : [Text];
    supportedLanguageCodes : [Text];
  };
  type TickerEntry = {
    symbol : Text;
    price : Nat;
    change24h : Int;
  };
  type WalletSession = {
    walletAddress : Text;
    walletType : Text;
    connectedAt : Int;
    detectedMembershipLevel : AccessLevel;
  };

  // Storage
  let articles = Map.empty<Text, Article.T>();
  let planConfigs = Map.empty<Text, PlanConfig>();
  let newsletterSubs = Map.empty<Text, NewsletterSub>();
  let pages = Map.empty<Text, Page>();
  var contractConfig : ?ContractConfig = null;
  var regionConfig : ?RegionConfig = null;
  let tickers = Map.empty<Text, TickerEntry>();
  let walletSessions = Map.empty<Text, WalletSession>();

  // ARTICLE FUNCTIONS
  public shared ({ caller }) func addArticle(article : Article.T) : async () {
    if (not article.isVisible) { Runtime.trap("to be published articles not yet supported") };
    articles.add(article.id, article);
  };

  public query ({ caller }) func getArticle(id : Text) : async Article.T {
    switch (articles.get(id)) {
      case (null) { Runtime.trap("Article not found") };
      case (?article) { article };
    };
  };

  public query ({ caller }) func getArticlesByAccessLevel(level : AccessLevel) : async [Article.T] {
    articles.values().toArray().filter(func(a) { a.accessLevel == level });
  };

  public query ({ caller }) func getArticlesByCategory(category : Category) : async [Article.T] {
    articles.values().toArray().filter(func(a) { a.category == category });
  };

  public query ({ caller }) func getLatestArticlesByAccessLevel(level : AccessLevel, maxCount : Nat) : async [Article.T] {
    let matchingArticles = articles.values().toArray().filter(func(a) { a.accessLevel == level });
    matchingArticles.sliceToArray(0, maxCount);
  };

  public query ({ caller }) func getHomepageArticles() : async {
    free : [Article.T];
    basic : [Article.T];
    premium : [Article.T];
    vip : [Article.T];
  } {
    {
      free = articles.values().toArray().filter(func(a) { a.accessLevel == #Free });
      basic = articles.values().toArray().filter(func(a) { a.accessLevel == #Basic });
      premium = articles.values().toArray().filter(func(a) { a.accessLevel == #Premium });
      vip = articles.values().toArray().filter(func(a) { a.accessLevel == #VIP });
    };
  };

  // MEMBERSHIP CONFIG FUNCTIONS
  public shared ({ caller }) func updatePlanConfig(planName : Text, config : PlanConfig) : async () {
    planConfigs.add(planName, config);
  };

  public shared ({ caller }) func updateContractConfig(config : ContractConfig) : async () {
    contractConfig := ?config;
  };

  public query ({ caller }) func getPlanConfigs() : async [PlanConfig] {
    planConfigs.values().toArray();
  };

  public query ({ caller }) func getContractConfig() : async ContractConfig {
    switch (contractConfig) {
      case (null) { Runtime.trap("Config not found") };
      case (?config) { config };
    };
  };

  // NEWSLETTER FUNCTIONS
  public shared ({ caller }) func addNewsletterSubscriber(email : Text) : async () {
    let newSub : NewsletterSub = {
      email;
      subscribedAt = Time.now();
      isConfirmed = false;
    };
    newsletterSubs.add(email, newSub);
  };

  public query ({ caller }) func confirmNewsletterSubscriber(email : Text) : async () {
    switch (newsletterSubs.get(email)) {
      case (null) { Runtime.trap("Subscriber not found") };
      case (?sub) {
        let updatedSub : NewsletterSub = { email = sub.email; subscribedAt = sub.subscribedAt; isConfirmed = true };
        newsletterSubs.add(email, updatedSub);
      };
    };
  };

  public query ({ caller }) func getAllNewsletterSubscribers() : async [NewsletterSub] {
    newsletterSubs.values().toArray();
  };

  // PAGES FUNCTIONS
  public shared ({ caller }) func addOrUpdatePage(page : Page) : async () {
    if (page.slug.size() > 32) { Runtime.trap("Slug too long") };
    pages.add(page.slug, page);
  };

  public shared ({ caller }) func seedPlaceholderPages() : async () {
    let placeholders = List.empty<Page>();
    placeholders.add({ slug = "about"; title = "About Us"; content = "About Lorem"; isVisible = true });
    placeholders.add({ slug = "disclaimer"; title = "Disclaimer"; content = "Discl Lorem"; isVisible = true });
    placeholders.add({
      slug = "privacy";
      title = "Privacy Policy";
      content = "Your privacy Lorem";
      isVisible = true;
    });
    for (page in placeholders.values()) {
      pages.add(page.slug, page);
    };
  };

  public query ({ caller }) func getPage(slug : Text) : async Page {
    switch (pages.get(slug)) {
      case (null) { Runtime.trap("Page not found") };
      case (?page) { page };
    };
  };

  public query ({ caller }) func getAllPages() : async [Page] {
    pages.values().toArray();
  };

  // LANGUAGE/REGION CONFIG FUNCTIONS
  public shared ({ caller }) func updateRegionConfig(config : RegionConfig) : async () {
    // if (not config.arabicCountryCodes.contains("AE")) {
    //   Runtime.trap("Missing country codes");
    // };
    regionConfig := ?config;
  };

  public query ({ caller }) func getRegionConfig() : async RegionConfig {
    switch (regionConfig) {
      case (null) { Runtime.trap("Config not found") };
      case (?config) { config };
    };
  };

  // TICKER FUNCTIONS
  public shared ({ caller }) func addOrUpdateTicker(ticker : TickerEntry) : async () {
    tickers.add(ticker.symbol, ticker);
  };

  public query ({ caller }) func getTicker(symbol : Text) : async TickerEntry {
    switch (tickers.get(symbol)) {
      case (null) { Runtime.trap("Ticker not found") };
      case (?ticker) { ticker };
    };
  };

  public query ({ caller }) func getAllTickers() : async [TickerEntry] {
    tickers.values().toArray();
  };

  // WALLET SESSION FUNCTIONS
  public shared ({ caller }) func recordWalletSession(address : Text, wtype : Text, detectedLevel : AccessLevel) : async () {
    let session : WalletSession = {
      walletAddress = address;
      walletType = wtype;
      connectedAt = Time.now();
      detectedMembershipLevel = detectedLevel;
    };
    walletSessions.add(address, session);
  };

  public query ({ caller }) func getWalletSession(address : Text) : async WalletSession {
    switch (walletSessions.get(address)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) { session };
    };
  };

  public query ({ caller }) func getAllWalletSessions() : async [WalletSession] {
    walletSessions.values().toArray();
  };
};
