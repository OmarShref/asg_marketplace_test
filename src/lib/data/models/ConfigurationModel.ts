export type PageIdetifierType = {
  urlIdentifier: string;
  label: string;
  position: number;
};
type SocialAccountType = {
  code: string;
  url: string;
};
export type CountryInfoType = {
  code: string;
  name: string;
  flag: string;
};
export type ShippingInfoType = {
  freeShipping: number;
  timeOption: string;
  daysInGeddah: number;
  daysOutGeddah: number;
};
type RegionTytpe = {
  id: number;
  code: string;
  name: string;
  arabicName: string;
};
export type CountryRegionsType = {
  countryId: string;
  availabelRegions: RegionTytpe[];
};
type InstallmentsType = {
  tamaraAllow: boolean;
  tabbyAllow: boolean;
  emkanAllow: boolean;
  tamaraPublicKey: string;
  maxMonths: number;
  interestRate: number;
};

interface ConfigurationInterface {
  homePage: string;
  mobile: string;
  phone: string;
  whatsapp: string;
  email: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string;
  storeGroupCode: string;
  mobileLandingPages: PageIdetifierType[];
  desktopLandingPages: PageIdetifierType[];
  staticPages: PageIdetifierType[];
  socialAccounts: SocialAccountType[];
  countries: CountryInfoType[];
  shippingInfo: ShippingInfoType;
  countryRegions: CountryRegionsType;
  installments: InstallmentsType;
}

export class ConfigurationModel implements ConfigurationInterface {
  homePage: string;
  mobile: string;
  phone: string;
  whatsapp: string;
  email: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string;
  storeGroupCode: string;
  mobileLandingPages: PageIdetifierType[];
  desktopLandingPages: PageIdetifierType[];
  staticPages: PageIdetifierType[];
  socialAccounts: SocialAccountType[];
  countries: CountryInfoType[];
  shippingInfo: ShippingInfoType;
  countryRegions: CountryRegionsType;
  installments: InstallmentsType;

  constructor({ configurationData }: { configurationData: any }) {
    const configuration = configurationData?.data?.vestedConfig?.config;
    const storeConfig = configuration?.storeConfig;
    const shippingInfo = storeConfig?.shipping_data;
    const countryRegions = configurationData?.data?.vestedCountry;
    const installments = configuration?.installments;

    this.homePage = configuration?.home_page;
    this.mobile = configuration?.mobile;
    this.phone = configuration?.phone;
    this.whatsapp = configuration?.whatsapp;
    this.email = configuration?.email;
    this.defaultTitle = storeConfig?.default_title;
    this.defaultDescription = storeConfig?.default_description;
    this.defaultKeywords = storeConfig?.default_keywords;
    this.storeGroupCode = storeConfig?.store_group_code;
    this.mobileLandingPages = configuration?.landing_pages?.map(
      (page: any): PageIdetifierType => {
        return {
          urlIdentifier: page?.page_identifier,
          label: page?.label,
          position: page?.position,
        };
      },
    );
    this.desktopLandingPages = configuration?.landing_pages_desktop?.map(
      (page: any): PageIdetifierType => {
        return {
          urlIdentifier: page?.page_identifier,
          label: page?.label,
          position: page?.position,
        };
      },
    );
    this.staticPages = configuration?.static_pages?.map(
      (page: any): PageIdetifierType => {
        return {
          urlIdentifier: page?.page_identifier ?? page?.value,
          label: page?.label,
          position: page?.position,
        };
      },
    );
    this.socialAccounts = configuration?.social_accounts?.map(
      (account: any): SocialAccountType => {
        return {
          code: account?.key,
          url: account?.value,
        };
      },
    );
    this.countries = configuration?.websites?.map(
      (country: any): CountryInfoType => {
        return {
          code: country?.country_code,
          name: country?.name,
          flag: country?.website_flag,
        };
      },
    );
    this.shippingInfo = {
      freeShipping: shippingInfo?.free_shipping,
      timeOption: shippingInfo?.time_option,
      daysInGeddah: shippingInfo?.days_in_riyadh,
      daysOutGeddah: shippingInfo?.days_out_riyadh,
    };
    this.countryRegions = {
      countryId: countryRegions?.country_id,
      availabelRegions: countryRegions?.available_regions?.map(
        (availabelRegion: any): RegionTytpe => {
          return {
            id: availabelRegion?.id,
            code: availabelRegion?.code,
            name: availabelRegion?.name,
            arabicName: availabelRegion?.arabic_name,
          };
        },
      ),
    };
    this.installments = {
      tamaraAllow: installments?.tamara_allow,
      tabbyAllow: installments?.tabby_allow,
      emkanAllow: installments?.emkan_allow,
      tamaraPublicKey: installments?.tamara_public_key,
      maxMonths: installments?.max_months,
      interestRate: installments?.interest_rate,
    };
  }

  create(): ConfigurationModel {
    return {
      homePage: this.homePage,
      mobile: this.mobile,
      phone: this.phone,
      whatsapp: this.whatsapp,
      email: this.email,
      defaultTitle: this.defaultTitle,
      defaultDescription: this.defaultDescription,
      defaultKeywords: this.defaultKeywords,
      storeGroupCode: this.storeGroupCode,
      mobileLandingPages: this.mobileLandingPages,
      desktopLandingPages: this.desktopLandingPages,
      staticPages: this.staticPages,
      socialAccounts: this.socialAccounts,
      countries: this.countries,
      shippingInfo: this.shippingInfo,
      countryRegions: this.countryRegions,
      installments: this.installments,
    } as ConfigurationModel;
  }
}
