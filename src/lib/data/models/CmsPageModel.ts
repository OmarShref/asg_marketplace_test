import { unicodeToChar } from "@/lib/helper/unicode";
import { ProductModel } from "./ProductModel";
import { turnStringToBoolean } from "@/lib/helper/boolean_helper";

export type PageBuilderType = {
  componentType: string;
  url: string;
  target: string;
  title: string;
  name: string;
  html: string;
  value: string;
  properties?: {
    appearance: string;
    desktopImage: string;
    mobileIamge: string;
    autoPlay: boolean;
    autoPlaySpeed: number;
    infinite_loop: boolean;
    show_arrows: boolean;
    show_dots: boolean;
    css: any;
    src: string;
    headingType: string;
    classNames: string;
  };
  products: ProductModel[];
  children?: PageBuilderType[];
};
interface CmsPageInterface {
  id: number;
  url: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  heading: string;
  pageBuilder: PageBuilderType[] | undefined;
}

export class CmsPageModel implements CmsPageInterface {
  #storeCode: string;

  id: number;
  url: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  heading: string;
  pageBuilder: PageBuilderType[] | undefined;

  #castPageBuilderJson(
    parsedPageBuilder: PageBuilderType[] | null,
  ): PageBuilderType[] | undefined {
    const parsedPageBuilderArray = Array.isArray(parsedPageBuilder)
      ? parsedPageBuilder
      : Object?.values(parsedPageBuilder ?? {});

    return parsedPageBuilderArray?.map((item: any): PageBuilderType => {
      return {
        componentType: item?.component_type,
        name: item?.properties?.tab_name ?? item?.properties?.icon_name,
        title: item?.properties?.header?.title,
        html: item?.html,
        url: (
          item?.link?.url ??
          item?.link?.href ??
          item?.properties?.header?.link?.url
        )?.replace("SA_en", this.#storeCode),
        target: item?.link?.target ?? "",
        value: item?.value,
        properties: {
          appearance: item?.properties?.appearance,
          desktopImage:
            item?.properties?.background_images?.desktop_image ??
            item?.desktop_image,
          mobileIamge:
            item?.properties?.background_images?.mobile_image ??
            item?.mobile_image,
          autoPlay: turnStringToBoolean(item?.properties?.autoplay),
          autoPlaySpeed: item?.properties?.autoplay_speed,
          infinite_loop: turnStringToBoolean(item?.properties?.infinite_loop),
          show_arrows: turnStringToBoolean(item?.properties?.show_arrows),
          show_dots: turnStringToBoolean(item?.properties?.show_dots),
          css: item?.properties?.css,
          src: item?.properties?.src,
          headingType: item?.properties?.heading_type,
          classNames: item?.properties?.class,
        },
        products: item?.value?.items?.map((item: any): ProductModel => {
          return new ProductModel({
            productData: item,
            storeCode: this.#storeCode,
          })?.create();
        }),
        children: this.#castPageBuilderJson(item?.children),
      };
    });
  }

  constructor({
    cmsPageData,
    storeCode,
  }: {
    cmsPageData: any;
    storeCode: string;
  }) {
    this.#storeCode = storeCode;

    const cmsPage = cmsPageData;
    const pageBuilderJson =
      cmsPage?.page_builder_json ?? cmsPage?.pageBuilderJson;
    let parsedPageBuilder = null;
    if (pageBuilderJson) {
      parsedPageBuilder = JSON.parse(
        unicodeToChar(pageBuilderJson),
      ) as PageBuilderType[];
    }

    this.id = cmsPage?.page_id ?? 0;
    this.url = cmsPage?.url ?? "";
    this.metaTitle = cmsPage?.meta_title ?? "";
    this.metaDescription = cmsPage?.meta_description ?? "";
    this.metaKeywords = cmsPage?.meta_keywords ?? "";
    this.heading = cmsPage?.content_heading ?? "";
    this.pageBuilder = this.#castPageBuilderJson(parsedPageBuilder) ?? [];
  }

  create(): CmsPageModel {
    return {
      id: this.id,
      url: this.url,
      metaTitle: this.metaTitle,
      metaDescription: this.metaDescription,
      metaKeywords: this.metaKeywords,
      heading: this.heading,
      pageBuilder: this.pageBuilder,
    } as CmsPageModel;
  }
}
