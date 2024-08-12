import {
  appleOptions,
  baseUrl,
  productTypes,
  siteName,
} from "@/lib/core/basic/Constants";
import { CategoryModel } from "./CategoryModel";
import { ConfigurationModel } from "./ConfigurationModel";
import { ProductModel } from "./ProductModel";
import { PageProps } from "../types/PageProps";
import { CmsPageModel } from "./CmsPageModel";
import { isArabic } from "@/lib/helper/language";

export class MetaDataModel {
  #configuration: ConfigurationModel;
  #cmsPage: CmsPageModel;
  #category: CategoryModel;
  #product: ProductModel;
  #params: { storeCode: string; route?: string[]; searchTerm?: string };
  #searchParams: { page?: string; customFilter?: string } | undefined;

  #defaultTitle: string;
  #defaultDescription: string;
  #defaultKeywords: string;

  #websiteName: string;
  #ogType: string = "website";
  #isHomePage: boolean;
  #locale: string;
  #defaultImage: string;

  title = "";
  description = "";
  keywords = "";
  robots = { index: true, follow: true };
  alternates = {
    canonical: "",
    languages: {},
  };
  openGraph = {
    title: "",
    description: "",
    url: "",
    siteName: "",
    images: [""],
    locale: "",
    type: "website",
  };
  manifest = "/manifest.json";
  itunes = {
    appId: "",
    appArgument: "",
  };

  constructor({
    configuration,
    cmsPage,
    category,
    product,
    params,
    searchParams,
  }: {
    configuration: ConfigurationModel;
    cmsPage?: CmsPageModel;
    category?: CategoryModel;
    product?: ProductModel;
  } & PageProps) {
    this.#configuration = configuration;
    this.#cmsPage =
      cmsPage ??
      new CmsPageModel({ cmsPageData: null, storeCode: params.storeCode });
    this.#category = category ?? new CategoryModel({ categoryData: null });
    this.#product = product ?? new ProductModel({ productData: null });

    this.#params = params;
    this.#searchParams = searchParams;

    // this.#defaultTitle = configuration?.defaultTitle;
    // this.#defaultDescription = configuration?.defaultDescription;
    // this.#defaultKeywords = configuration?.defaultKeywords;

    this.#defaultTitle = "أناقة وراحة بكل مناسبة | بلومنج السعودية";
    this.#defaultDescription =
      "اكتشفي عالماً من الموضة والراحة ببلومنج. من ملابس المنزل إلى لانجري العروسة، خيارات أنيقة ومريحة معك في كل لحظة";
    this.#defaultKeywords = configuration?.defaultKeywords;

    this.#websiteName = isArabic(params.storeCode) ? siteName.ar : siteName.en;

    this.#isHomePage = params.route?.at(0) === configuration?.homePage;

    this.#locale = params.storeCode?.split("_")?.reverse()?.join("-");

    this.#defaultImage = `${baseUrl}/image/default_image.webp`;
  }

  fromCmsPage() {
    const cmsPageRoute = this.#isHomePage
      ? ""
      : `/${this.#params?.route?.at(0)}`;

    const url = `${baseUrl}/${this.#params.storeCode}${cmsPageRoute}`;

    this.title = this.#cmsPage?.metaTitle ?? this.#defaultTitle;
    this.description =
      this.#cmsPage?.metaDescription ?? this.#defaultDescription;
    this.keywords = this.#cmsPage?.metaKeywords ?? this.#defaultKeywords;
    this.robots = { index: true, follow: true };
    this.alternates = {
      canonical: url,
      languages: {
        ["ar-sa"]: `${baseUrl}/SA_ar${cmsPageRoute}`,
        ["en-sa"]: `${baseUrl}/SA_en${cmsPageRoute}`,
      },
    };
    this.openGraph = {
      title: this.title,
      description: this.description,
      url: this.alternates.canonical,
      siteName: this.#websiteName,
      images: [this.#defaultImage],
      locale: this.#locale,
      type: this.#ogType,
    };
    this.itunes = {
      appId: appleOptions?.appUid,
      appArgument: this.alternates.canonical,
    };

    return this;
  }

  fromCategory() {
    const joinedRoute = this.#params?.route?.join("/");
    const url = `${baseUrl}/${this.#params?.storeCode}/${joinedRoute}${
      this.#searchParams?.page ? `?page=${this.#searchParams?.page}` : ""
    }`;
    const categoryImage = (): string[] => {
      if (this.#category?.image?.length > 0) {
        return [this.#category?.image];
      } else if (
        (this.#category?.products?.at(0)?.smallImage ?? "")?.length > 0
      ) {
        return [this.#category?.products?.at(0)?.smallImage ?? ""];
      } else {
        return [this.#defaultImage];
      }
    };

    this.title =
      !!this.#category?.metaTitle &&
      this.#category?.metaTitle?.toLowerCase() != "null"
        ? this.#category?.metaTitle
        : (this.#category?.name ?? this.#defaultTitle);
    this.description =
      !!this.#category?.metaDescription &&
      this.#category?.metaDescription?.toLowerCase() != "null"
        ? this.#category?.metaDescription
        : (this.#category?.name ?? this.#defaultDescription);
    this.keywords = this.#category?.metaKeywords ?? this.#defaultKeywords;
    this.robots = {
      index: this.#searchParams?.customFilter ? false : true,
      follow: true,
    };
    this.alternates = {
      canonical: url,
      languages: {
        ["ar-sa"]: url?.replace(this.#params?.storeCode, "SA_ar"),
        ["en-sa"]: url?.replace(this.#params?.storeCode, "SA_en"),
      },
    };
    this.openGraph = {
      title: this.title,
      description: this.description,
      url: url,
      siteName: this.#websiteName,
      images: categoryImage(),
      locale: this.#locale,
      type: this.#ogType,
    };
    this.itunes = {
      appId: appleOptions?.appUid,
      appArgument: this.alternates.canonical,
    };

    return this;
  }

  fromProduct() {
    const url = `${baseUrl}${
      this.#product?.type === productTypes?.configurable
        ? this.#product?.url
        : this.#product?.parentUrl
    }`;

    this.title =
      !!this.#product?.metaTitle &&
      this.#product?.metaTitle?.toLowerCase() != "null"
        ? this.#product?.metaTitle
        : (this.#product?.name ?? this.#defaultTitle);
    this.description =
      !!this.#product?.metaDescription &&
      this.#product?.metaDescription?.toLowerCase() != "null"
        ? this.#product?.metaDescription
        : (this.#product?.description?.slice(0, 200) ??
          this.#defaultDescription);
    this.keywords = this.#product?.metaKeywords ?? this.#defaultKeywords;
    this.robots = {
      index: this.#product?.type === productTypes?.configurable ? true : true,
      follow: true,
    };
    this.alternates = {
      canonical: url,
      languages: {
        ["ar-sa"]: url?.replace(this.#params?.storeCode, "SA_ar"),
        ["en-sa"]: url?.replace(this.#params?.storeCode, "SA_en"),
      },
    };
    this.openGraph = {
      title: this.title,
      description: this.description,
      url: url,
      siteName: this.#websiteName,
      images:
        this.#product?.images?.length > 0
          ? this.#product?.images
          : [this.#defaultImage],
      locale: this.#locale,
      type: this.#ogType,
    };
    this.itunes = {
      appId: appleOptions?.appUid,
      appArgument: this.alternates.canonical,
    };

    return this;
  }
}
