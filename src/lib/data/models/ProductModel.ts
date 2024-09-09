import { productTypes } from "@/lib/core/basic/Constants";
import { CurrencyType, getCurrency } from "@/lib/helper/currency";

export type GtmProductType = {
  index: number | undefined;
  item_id: string | undefined;
  item_type: string | undefined;
  item_name: string | undefined;
  item_variant: string[][] | undefined;
  item_color: string | undefined;
  item_size: string | undefined;
  price: number | undefined;
  currency: string | undefined;
  discount: number | undefined;
  is_sale_item: boolean | undefined;
  quantity: number | undefined;
  product_image: string | undefined;
  item_brand: string | undefined | null;
  item_category: string | undefined;
  item_category2: string | undefined;
  item_category3: string | undefined;
  item_list_name: string | undefined;
  item_list_id: number | undefined;
};
export type AttributeType = {
  code: string;
  name: string;
  value: string | null;
  show: boolean;
};
export type PaymentMethodType = {
  name: string;
  allow: boolean;
  price: number;
  currency: CurrencyType;
  minAmount: number;
  maxAmount: number;
  installmentsCount: number;
  auth: string[];
  methods?: PaymentMethodType[];
};
export type ReviewItemType = {
  id: number;
  name: string;
  date: string;
  title: string;
  detail: string;
  rating: number;
};
export type VariantOptionType = {
  id: number;
  uId: string;
  isAvailabel: boolean;
  isSelected: boolean;
  value: string;
  isSwatch?: boolean;
  swatchType?: string;
  swatchValue?: string;
};
export type VariantType = {
  code: string;
  label: string;
  id: number;
  options: VariantOptionType[];
};
export type LabelType = {
  type: string;
  image: string;
  imageSize: number;
  name: string;
  position: string;
  labelText: string;
  textStyle: string;
  redirectUrl: string;
  activeFrom: string;
  activeTo: string;
};
interface ProductInterface {
  id: number;
  itemId: number;
  type: string;
  name: string;
  sku: string;
  url: string;
  parentId: number;
  parentSku: string;
  parentUrl: string;
  smallImage: string;
  images: string[];
  specialToDate: string;
  quantity: number;
  inStock: boolean;
  regularPrice: number;
  salePrice: number;
  discount: number;
  discountPercentage: number;
  currency: CurrencyType;
  parentCategories: {
    name: string;
    url: string;
  }[];
  description: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  attributes: AttributeType[];
  color: AttributeType | undefined;
  size: AttributeType | undefined;
  brand: AttributeType | undefined;
  material: AttributeType | undefined;
  barcode: AttributeType | undefined;
  dimension: AttributeType | undefined;
  pattern: AttributeType | undefined;
  paymentMethods: {
    tamara: PaymentMethodType;
    tabby: PaymentMethodType;
  };
  reviewCount: number;
  rating: number;
  reviews: ReviewItemType[];

  labels: LabelType[];

  variants: VariantType[];
  currentVariant?: ProductModel | null;
}

// TODO: refactor this shit
export class ProductModel implements ProductInterface {
  #productData: any;
  #storeCode?: string;

  id: number;
  itemId: number = 0;
  type: string;
  name: string;
  sku: string;
  url: string;
  parentId: number;
  parentSku: string;
  parentUrl: string;
  smallImage: string;
  images: string[];
  specialToDate: string;
  quantity: number;
  inStock: boolean;
  regularPrice: number;
  salePrice: number;
  discount: number;
  discountPercentage: number;
  currency: CurrencyType;
  parentCategories: {
    name: string;
    url: string;
  }[] = [{ name: "", url: "" }];
  description: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  attributes: AttributeType[];
  color: AttributeType | undefined;
  size: AttributeType | undefined;
  brand: AttributeType | undefined;
  material: AttributeType | undefined;
  barcode: AttributeType | undefined;
  dimension: AttributeType | undefined;
  pattern: AttributeType | undefined;

  paymentMethods: {
    tamara: PaymentMethodType;
    tabby: PaymentMethodType;
  };

  rating: number;
  reviewCount: number;
  reviews: ReviewItemType[];

  labels: LabelType[];

  variants: VariantType[];
  currentVariant?: ProductModel | null;

  #roundPrice(price: number): number {
    return price && Math.round(price);
  }

  #mapAttributes(attributes: any): void {
    attributes?.map?.((attribute: any) => {
      this?.attributes?.push({
        code: attribute?.attribute_code,
        name: attribute?.label,
        value: attribute?.value,
        show: !!(attribute?.is_html_allowed_on_front && attribute?.value),
      });
    });
  }

  #extractNumberFromAlgoliaFormattedPrice(text: string): number {
    const splittedPrice = text?.split("‏");
    const foundNumberIndex = /[٠-٩,0-9]/.test(splittedPrice?.at(0) as string)
      ? 0
      : 1;
    return parseInt(
      splittedPrice
        ?.at(foundNumberIndex)
        ?.replace("٫", ".")
        ?.replace(/[٠-٩]/g, (d) =>
          "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString(),
        ) as string,
    );
  }

  constructor({
    productData,
    storeCode,
  }: {
    productData: any;
    storeCode?: string;
  }) {
    this.#productData = productData;
    this.#storeCode = storeCode;

    const product =
      productData?.data?.vestedProducts?.items?.at(0) ?? productData;
    const productPrice = product?.price_range?.minimum_price;
    const parentProduct = product?.configurable_parent;

    this.id = product?.entity_id
      ? Number(product?.entity_id)
      : Number(product?.product_id);
    this.type = product?.type_id?.toString()?.toLowerCase();
    this.name = product?.name ?? "";
    this.sku = product?.sku ?? "";
    this.url = product?.url?.replace("SA_en", storeCode) ?? "";

    this.parentId = parentProduct?.product_id ?? 0;
    this.parentSku = parentProduct?.sku ?? "";
    this.parentUrl = parentProduct?.url ?? "";

    this.smallImage = product?.small_image ?? product?.large_image;
    this.images =
      product?.media_gallery?.map((image: any) => image?.value ?? "") ?? [];
    this.specialToDate = product?.special_to_date ?? "";
    this.quantity = product?.salable_qty > 0 ? product?.salable_qty : 0;
    this.inStock = product?.is_in_stock ?? product?.is_saleable;
    this.regularPrice =
      this.#roundPrice(productPrice?.regular_price?.value) ??
      this.#roundPrice(product?.regular_price);
    this.salePrice =
      this.#roundPrice(productPrice?.final_price?.value) ??
      this.#roundPrice(product?.final_price);
    this.discount =
      this.#roundPrice(productPrice?.discount?.amount_off) ??
      this.#roundPrice(product?.discount?.amount_off);
    this.discountPercentage =
      this.#roundPrice(productPrice?.discount?.percent_off) ??
      this.#roundPrice(product?.discount?.percent_off);
    this.currency = getCurrency({
      storeCode: storeCode,
    });
    this.parentCategories = Array.isArray(product?.categories)
      ? product?.categories?.map((category: any) => {
          return {
            name: category?.name ?? "",
            url: category?.url ?? "",
          };
        })
      : [];
    this.description = product?.description?.html ?? "";
    this.shortDescription = product?.short_description?.html ?? "";
    this.metaTitle = product?.meta_title ?? "";
    this.metaDescription = product?.meta_description ?? "";
    this.metaKeywords = product?.meta_keyword ?? "";

    this.paymentMethods = {
      tamara: {
        name: "tamara",
        allow: !!(this.salePrice >= 0 && this.salePrice <= 4000),
        price: this.salePrice,
        currency: this.currency,
        minAmount: 0,
        maxAmount: 4000,
        installmentsCount: 4,
        auth: ["dd0c62da-627b-11eb-a5ac-02001700e43e", "sa_store"],
      },
      tabby: {
        name: "tabby",
        allow: !!(this.salePrice >= 0 && this.salePrice <= 4000),
        price: this.salePrice,
        currency: this.currency,
        minAmount: 0,
        maxAmount: 4000,
        installmentsCount: 4,
        auth: ["pk_4217098c-06c2-4491-9e83-0cd6bb1c17e3", "sa_store"],
      },
    };

    this.rating = Number((product?.rating_summary / 20).toFixed(1)) ?? 0;
    this.reviewCount = product?.reviews_count ?? 0;
    this.reviews = product?.reviewItems?.items?.map(
      (review: any): ReviewItemType => {
        return {
          id: review?.review_id ?? 0,
          name: review?.nickname ?? "",
          date: review?.created_at ?? "",
          title: review?.title ?? "",
          detail: review?.detail ?? "",
          rating: review?.vote_value ?? 0,
        };
      },
    );

    this.labels =
      product?.labels?.map((label: any): LabelType => {
        return {
          type: label?.type ?? "",
          image: label?.image ?? "",
          imageSize: label?.image_size ?? 0,
          name: label?.name ?? "",
          position: label?.position ?? "",
          labelText: label?.label_text ?? "",
          textStyle: label?.text_style ?? "",
          redirectUrl: label?.redirect_url ?? "",
          activeFrom: label?.active_from ?? "",
          activeTo: label?.active_to ?? "",
        };
      }) ?? [];

    this.variants = product?.configurable_attributes?.map(
      (variant: any): VariantType => {
        return {
          code: variant?.attribute_code ?? "",
          label: variant?.label ?? "",
          id: variant?.attribute_id ?? 0,
          options: variant?.values?.map((option: any): VariantOptionType => {
            return {
              id: option?.option_id,
              uId: option?.uuid,
              isAvailabel: option?.is_available,
              isSelected: option?.is_selected,
              value: option?.value,
              isSwatch: option?.swatch_data?.is_swatch,
              swatchType: option?.swatch_data?.swatch_type,
              swatchValue: option?.swatch_data?.swatch_value,
            };
          }),
        };
      },
    );
    this.currentVariant = product?.configurable_variant?.entity_id
      ? new ProductModel({
          productData: product?.configurable_variant,
          storeCode: storeCode,
        })?.create()
      : null;

    this.attributes = [];
    this.#mapAttributes(product?.attributes);
    this.color = this?.attributes?.find(
      (attribute) => attribute?.code === "color",
    );
    this.size = this?.attributes?.find(
      (attribute) => attribute?.code === "size",
    );
    this.brand = this?.attributes?.find(
      (attribute) => attribute?.code === "brand",
    );
    this.barcode = this?.attributes?.find(
      (attribute) => attribute?.code === "barcode",
    );
    this.material = this?.attributes?.find(
      (attribute) => attribute?.code === "material",
    );
    this.dimension = this?.attributes?.find(
      (attribute) => attribute?.code === "model_measurements",
    );
    this.pattern = this?.attributes?.find(
      (attribute) => attribute?.code === "patterns",
    );
  }

  create(): ProductModel {
    return {
      id: this.id,
      sku: this.sku,
      parentId: this.parentId,
      parentSku: this.parentSku,
      parentUrl: this.parentUrl,
      itemId: this.itemId,
      type: this.type,
      name: this.name,
      url: this.url,
      description: this.description,
      shortDescription: this.shortDescription,
      metaTitle: this.metaTitle,
      metaDescription: this.metaDescription,
      metaKeywords: this.metaKeywords,
      smallImage: this.smallImage,
      images: this.images,
      regularPrice: this.regularPrice,
      salePrice: this.salePrice,
      discount: this.discount,
      discountPercentage: this.discountPercentage,
      currency: this.currency,
      inStock: this.inStock,
      quantity: this.quantity,
      specialToDate: this.specialToDate,
      parentCategories: this.parentCategories,
      paymentMethods: this.paymentMethods,
      rating: this.rating,
      reviewCount: this.reviewCount,
      reviews: this.reviews,
      labels: this.labels,
      variants: this.variants,
      currentVariant: this.currentVariant,
      attributes: this.attributes,
      color: this.color,
      size: this.size,
      brand: this.brand,
      barcode: this.barcode,
      material: this.material,
      dimension: this.dimension,
      pattern: this.pattern,
    } as ProductModel;
  }

  fromAlgolia() {
    const product = this.#productData;
    // TODO: handle deffirent currencies
    const price = product?.price?.SAR;
    const maxPrice =
      price?.default_max ??
      this.#extractNumberFromAlgoliaFormattedPrice(
        price?.default_original_formated,
      );
    const localDiscount = maxPrice - price?.default;

    this.id = Number(product.objectID);
    this.name = product.name;
    this.url = product.url;
    this.smallImage = product.image_url;
    this.regularPrice = !!maxPrice ? maxPrice : price?.default;
    this.salePrice = price?.default;
    this.discount = localDiscount > 0 ? localDiscount : 0;
    this.discountPercentage = this.#roundPrice(
      (localDiscount / maxPrice) * 100,
    );
    this.parentCategories = [
      {
        name: product?.categories_without_path?.at(0) ?? "",
        url: "",
      },
    ];

    return this;
  }

  static toGtm(product: ProductModel): GtmProductType {
    const productData = product?.currentVariant ?? product;

    return {
      index: undefined,
      item_id: productData?.sku,
      item_type: productData?.type,
      item_name: productData?.name,
      item_variant: undefined,
      item_color: product?.variants
        ?.find((variant) => variant?.code === "color")
        ?.options?.find((option) => option?.isSelected)?.value,
      item_size: product?.variants
        ?.find((variant) => variant?.code === "size")
        ?.options?.find((option) => option?.isSelected)?.value,
      price: Math.round(productData?.salePrice),
      currency: product?.currency?.value,
      discount: Math.round(productData?.discount),
      is_sale_item: productData?.discount > 0,
      quantity: undefined,
      product_image: product?.smallImage,
      item_brand: productData?.brand?.value,
      item_category: productData?.parentCategories?.at(0)?.name,
      item_category2: productData?.parentCategories?.at(1)?.name,
      item_category3: productData?.parentCategories?.at(2)?.name,
      item_list_name: undefined,
      item_list_id: undefined,
    };
  }
}
