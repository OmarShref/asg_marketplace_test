import { CurrencyType } from "@/lib/helper/currency";

export const stores: string[] = ["SA_ar", "SA_en", "AE_ar", "AE_en"];
export const defaultCurrency: { [key: string]: CurrencyType } = {
  SA_ar: {
    label: "ر.س",
    value: "SAR",
  },
  SA_en: {
    label: "SAR",
    value: "SAR",
  },
  AE_ar: {
    label: "د.إ",
    value: "AED",
  },
  AE_en: {
    label: "AED",
    value: "AED",
  },
};

export const siteName = {
  ar: "السيف غاليري",
  en: "Alsaif Gallery",
};

export const productsListDisplayModes = {
  multiColumn: "multi-column",
  oneColumn: "one-column",
};

export const homeUrlIdentifiers = { mobile: "home" };

export const pageTypes = {
  product: "product",
  category: "category",
  home: "home",
  static: "static",
  cart: "cart",
  checkout: "checkout",
  account: "account",
  wishlist: "wishlist",
  menu: "menu",
  cms: "cms-page",
  login: "login",
  updateInfo: "updateInfo",
  success: "success",
  search: "search",
  searchTerm: "searchTerm",
  address: "address",
  order: "order",
};

// dev
export const baseUrl = "http://localhost:5050";
// beta
// export const baseUrl = "https://asg-vested.vercel.app";
// production
// export const baseUrl = "https://alsaifgallery.com";

export const apiUrl = {
  // beta
  // ======================================================================================
  // production
  main: "https://alsaifgallery.api.vestedcommerce.com/graphql",
  sales: "https://alsaifgallery.api.vestedcommerce.com/graphql",
};

export const deviceTypes = {
  mobile: "mobile",
  tablet: "tablet",
};

export const sortTypes = {
  priceLowToHigh: "{ Price_rangeMinimum_priceFinal_priceValue: ASC }",
  priceHighToLow: "{ Price_rangeMinimum_priceFinal_priceValue: DESC }",
  disCountHighToLow: "{ Price_rangeMinimum_priceDiscountPercent_off: DESC }",
  merchandising: "{}",
};

export const pageBuilderComponentTypes = {
  row: "row",
  columnGroup: "column-group",
  columnLine: "column-line",
  column: "column",
  text: "text",
  heading: "heading",
  html: "html",
  banner: "banner",
  slider: "slider",
  slide: "slide",
  iconCarousel: "iconcarousel",
  icon: "icon",
  products: "products",
  video: "video",
  image: "image",
  tabs: "tabs",
  block: "block",
  buttons: "buttons",
};

export const pageBuilderAppearanceTypes = {
  focusCarousel: "focus-carousel",
  carousel: "carousel",
  poster: "poster",
  wide: "wide",
};

export const tabby = {
  widgetUrl: "https://checkout.tabby.ai/tabby-promo.js",
};

export const tamara = {
  widgetUrl: "https://cdn.tamara.co/widget/product-widget.min.js",
};

export const checkoutcom = {
  tokenApiUrl: "https://api.checkout.com/tokens",
  // tokenApiUrl: "https://api.sandbox.checkout.com/tokens",
};

export const loginTypes = {
  phone: "MOBILE",
  email: "EMAIL",
};

export const productTypes = {
  simple: "simple",
  configurable: "configurable",
};

export const mapOptions = {
  defaultZoom: 5,
  defaultTimeout: 1000,
  timeout500: 500,
  zoomIn: 15,
  supportedCountries: ["SA", "AE", "KW"],
  unknown: "unknown",
  // blooming api key
  // googleMapsApiKey: "AIzaSyB31O-99fwVZTpBT4NgzN4G3XqpcAfTkBY",
  // alsaif api key
  googleMapsApiKey: "AIzaSyAAYsP6c15U1iMoImt79gHyEwrHE5gO964",
};

export const paymentTypes = {
  cod: "cashondelivery",
  applePay: "checkoutcom_apple_pay",
  ckCard: "checkoutcom_card_payment",
  tamara4: "tamara_pay_by_instalments_4",
  tabby: "tabby_installments",
  free: "free",
};

export const algoliaOptions = {
  appId: "JI5W90ZF3A",
  apiKey: "57cd186e40d436fbf368d62d4e8da01c",
  productsIndexAR: "magento2_SA_ar_products",
  productsIndexAR_price_asc: "magento2_SA_ar_products_price_default_asc",
  productsIndexAR_price_desc: "magento2_SA_ar_products_price_default_desc",
  productsIndexEN: "magento2_SA_en_products",
  searchApiUrl: `https://JI5W90ZF3A-dsn.algolia.net/1/indexes/*/queries`,
  recommendationApiUrl: `https://JI5W90ZF3A-dsn.algolia.net/1/indexes/*/recommendations`,
  insightsApiUrl: `https://insights.algolia.io/1/events`,
  recommendationModels: {
    relatedProducts: "related-products",
    boughtTogether: "bought-together",
    trendingItems: "trending-items",
  },
};

export const gtmOptions = {
  containerId: "GTM-K8QZ84LH",
};

export const moengageOptions = {
  app_id: "7R4YJJJXMBB5UZOLMJP5EZOB",
};

export const adjustOptions = {
  appToken: "64ehsjx54f40",
};

export const appleOptions = {
  appUid: "1459530502",
};

export const productLabelTypes = {
  category: "CATEGORY",
  product: "PRODUCT",
};

export const supportedShippingCountries = [
  "SA",
  "AE",
  "KW",
  "BH",
  "OM",
  "QA",
  "JO",
  "EG",
  "GB",
];
export const supportedPhoneLoginCountries = ["SA"];

export const appLinks = [
  {
    id: "ios",
    link: "https://apps.apple.com/sa/app/alsaif-gallery-%D8%A7%D9%84%D8%B3%D9%8A%D9%81-%D8%BA%D8%A7%D9%84%D9%8A%D8%B1%D9%8A/id1459530502",
    image: "/image/apple-store-download.png",
  },
  {
    id: "android",
    link: "https://play.google.com/store/apps/details?id=com.alsaifgallery&pcampaignid=web_share",
    image: "/image/google-play-download.png",
  },
  {
    id: "huawei",
    link: "https://appgallery.huawei.com/app/C103540015",
    image: "/image/app-gallery-icon.png",
  },
];

export const targetTypes = {
  cms: "cms-page",
  category: "category",
  product: "product",
  notfound: "notfound",
};

export const targetTypesShortHands = {
  [targetTypes.cms]: "m",
  [targetTypes.category]: "c",
  [targetTypes.product]: "p",
};
