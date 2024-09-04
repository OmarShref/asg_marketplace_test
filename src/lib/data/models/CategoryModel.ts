import { CurrencyType, getCurrency } from "@/lib/helper/currency";
import { FilterItemType, FilterModel } from "./FilterModel";
import { GtmProductType, ProductModel } from "./ProductModel";
import { baseUrl } from "@/lib/core/basic/Constants";
import { CmsPageModel } from "./CmsPageModel";

export type GtmCategoryType = {
  currency: string | undefined;
  items: GtmProductType[];
};
interface CategoryInterface {
  pagesCount: number;
  pageSize: number;
  currentPage: number;
  url: string;
  paginationUrl: {
    previousUrl: string | null;
    nextUrl: string | null;
  };
  id: number;
  name: string;
  image: string;
  totalCount: number;
  currency: CurrencyType;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  products: ProductModel[];
  filters: FilterItemType[];
  queryId?: string;
}

export class CategoryModel implements CategoryInterface {
  #categoryData: any;
  #storeCode?: string;

  pagesCount: number;
  pageSize: number;
  currentPage: number;
  url: string;
  paginationUrl: {
    previousUrl: string | null;
    nextUrl: string | null;
  };
  id: number;
  name: string;
  image: string;
  totalCount: number;
  currency: CurrencyType;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  products: ProductModel[];
  filters: FilterItemType[];
  queryId?: string;
  pageBuilder: CmsPageModel | undefined;

  #getPaginationUrl() {
    const hasPrevious =
      this.currentPage <= this.pagesCount && this.currentPage > 1;

    const hasNext = this.currentPage < this.pagesCount && this.pagesCount > 1;

    const previousUrl = hasPrevious
      ? `${baseUrl}${this.url}${
          this.currentPage - 1 === 1 ? "" : `?page=${this.currentPage - 1}`
        }`
      : null;

    const nextUrl = hasNext
      ? `${baseUrl}${this.url}?page=${this.currentPage + 1}`
      : null;

    return {
      previousUrl,
      nextUrl,
    };
  }

  constructor({
    categoryData,
    storeCode,
  }: {
    categoryData: any;
    storeCode?: string;
  }) {
    this.#categoryData = categoryData;
    this.#storeCode = storeCode;

    const categoryProducts = categoryData?.data?.vestedProducts;
    const categoryMetaData = categoryData?.data?.vestedCategory;
    const categoryPageInfo = categoryProducts?.page_info;
    const categoryFilters = categoryProducts?.facet_result;

    // the arrangement is very important (pagination data then url then get pagination url)
    this.pagesCount = categoryPageInfo?.total_pages ?? 0;
    this.pageSize = categoryPageInfo?.page_size ?? 0;
    this.currentPage = categoryPageInfo?.current_page_or_offset ?? 0;
    this.url = categoryMetaData?.url ?? "";
    this.paginationUrl = this.#getPaginationUrl();

    this.id = categoryMetaData?.entity_id ?? 0;
    this.name = categoryMetaData?.name ?? "";

    this.image = categoryMetaData?.image ?? "";
    this.totalCount = categoryProducts?.total_count ?? 0;
    this.currency = getCurrency({ storeCode: storeCode });
    this.metaTitle = categoryMetaData?.meta_title ?? "";
    this.metaDescription = categoryMetaData?.meta_description ?? "";
    this.metaKeywords = categoryMetaData?.meta_keywords ?? "";
    this.products = categoryProducts?.items?.map((productData: any) => {
      return new ProductModel({ productData, storeCode })?.create();
    });
    this.filters = new FilterModel(categoryFilters).filters;
    this.pageBuilder = new CmsPageModel({
      storeCode: storeCode ?? "SA_ar",
      cmsPageData: categoryMetaData?.page_builder_json,
    })?.create();
  }

  create(): CategoryModel {
    return {
      pagesCount: this.pagesCount,
      pageSize: this.pageSize,
      currentPage: this.currentPage,
      url: this.url,
      paginationUrl: this.paginationUrl,
      id: this.id,
      name: this.name,
      image: this.image,
      totalCount: this.totalCount,
      currency: this.currency,
      metaTitle: this.metaTitle,
      metaDescription: this.metaDescription,
      metaKeywords: this.metaKeywords,
      products: this.products,
      filters: this.filters,
      pageBuilder: this.pageBuilder,
    } as CategoryModel;
  }

  fromAlgolia() {
    const category =
      this.#categoryData?.results?.at(0)?.nbHits > 0
        ? this.#categoryData?.results?.at(0)
        : this.#categoryData?.results?.at(1);

    this.id = category?.queryID;
    this.name = category?.query;
    this.totalCount = category?.nbHits;
    this.pageSize = category?.hitsPerPage;
    this.pagesCount = category?.nbPages - 1;
    this.currentPage = category?.page;

    this.queryId = category?.queryID;

    this.products = category?.hits?.map(
      (productData: any): ProductModel =>
        new ProductModel({
          productData: productData,
          storeCode: this.#storeCode,
        }).fromAlgolia(),
    );

    return this;
  }

  static toGtm(category: CategoryModel): GtmCategoryType {
    return {
      currency: category?.currency?.value,
      items: category?.products?.map((product, index) => {
        const gtmProduct = ProductModel?.toGtm(product);
        gtmProduct.index =
          (category?.currentPage - 1) * category?.pageSize + index + 1;
        gtmProduct.item_list_name = category?.name;
        gtmProduct.item_list_id = category?.id;
        return gtmProduct;
      }),
    };
  }
}
