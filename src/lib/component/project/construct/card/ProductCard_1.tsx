"use client";
import Image from "@/lib/component/generic/pure/image";
import {
  ProductCard,
  ProductCardImage,
  ProductCardLink,
  ProductCardName,
  ProductCardPrice,
  ProductCardPrices,
  ProductCardSection,
} from "@/lib/component/generic/pure/productcard";
import DiscountLabel from "@/lib/component/project/part/label/Discount_Label";
import Addtocart_Btn_1 from "../../part/button/Addtocart_Btn_1";
import Addtowishlist_Btn from "../../part/button/Addtowhishlist_Btn";
import {
  productLabelTypes,
  productsListDisplayModes,
} from "@/lib/core/basic/Constants";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import {
  ProductModel,
  VariantOptionType,
} from "@/lib/data/models/ProductModel";
import { useEffect, useRef, useState } from "react";
import { getProduct } from "@/lib/network/server/gql/product";
import { Button } from "@/lib/component/generic/ui/button";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import DynamicProduct_Label from "../../part/label/DynamicProduct_Label";
import { algoliaEventsSingleton } from "@/lib/core/analytics/Algolia";
import Addtocart_Btn_3 from "../../part/button/Addtocart_Btn_3";

type Props = {
  storeCode: string;
  product: ProductModel;
  index: number;
  categoryId?: number;
  categoryName?: string;
  queryId?: string | undefined;
};

// TODO: add pulse animation to added to wish list button
export default function ProductCard_1({
  storeCode,
  product,
  index,
  categoryId,
  categoryName,
  queryId,
}: Props) {
  const { productsListDisplayMode } = useUtilityStore();
  const isMultiColumn =
    productsListDisplayMode === productsListDisplayModes.multiColumn;

  // ================================================================================

  const [configurableProduct, setConfigurableProduct] =
    useState<ProductModel>(product);
  const [
    configurableProductCurrentVariant,
    setConfigurableProductCurrentVariant,
  ] = useState<ProductModel>(
    configurableProduct?.currentVariant ?? configurableProduct,
  );
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [sizeVariant, setSizeVariant] = useState(
    product?.variants?.find((variant) => variant?.code === "size"),
  );
  const [colorVariant, setColorVariant] = useState(
    product?.variants?.find((variant) => variant.code === "color"),
  );
  const [curretColorVariantOption, setCurretColorVariantOption] = useState<
    VariantOptionType | undefined
  >();

  useEffect(() => {
    setConfigurableProduct(product);
    setColorVariant(
      product?.variants?.find((variant) => variant.code === "color"),
    );
    setSizeVariant(
      product?.variants?.find((variant) => variant?.code === "size"),
    );
  }, [product]);

  useEffect(() => {
    setConfigurableProductCurrentVariant(
      configurableProduct?.currentVariant ?? configurableProduct,
    );
  }, [configurableProduct]);

  useEffect(() => {
    handleVariantChange();
  }, [curretColorVariantOption]);

  // ================================================================================

  function handleVariantChange() {
    if (curretColorVariantOption) {
      getProduct({
        params: { storeCode: storeCode },
        id: product.id,
        configurableProductUIds: [
          sizeVariant?.options?.at(0)?.uId ?? "",
          curretColorVariantOption?.uId ?? "",
        ],
      }).then((configurableProduct) => {
        setConfigurableProduct(configurableProduct);
      });
    }
  }

  // ================================================================================

  function handleSelectItem() {
    const gtmProduct = ProductModel?.toGtm(product);
    gtmProduct.index = index;
    gtmProduct.item_list_id = categoryId;
    gtmProduct.item_list_name = categoryName;

    // gtm event
    new GtmEvents({
      gtmProduct: gtmProduct,
    }).selectItem();

    // algolia event
    if (queryId) {
      algoliaEventsSingleton?.clickedObjectIDsAfterSearch({
        product,
        queryId,
        index,
      });
    } else {
      algoliaEventsSingleton?.clickedObjectIDs({
        product,
      });
    }
  }

  // ================================================================================

  const productLabel = useRef(
    product?.labels?.find(
      (label) => label?.type === productLabelTypes?.category,
    ),
  );

  return (
    <ProductCard
      variant={"rounded"}
      size={"default"}
      className={` group aspect-auto w-52 bg-background transition-all duration-300 lg:hover:-translate-y-1 lg:hover:shadow-lg`}
    >
      <ProductCardSection className=" relative">
        <ProductCardLink
          href={product.url}
          onClick={handleSelectItem}
          className=" p-3"
        >
          <ProductCardImage
            variant={"rounded"}
            className=" overflow-clip transition-all duration-300 group-hover:scale-105"
          >
            <Image
              src={`${configurableProductCurrentVariant.smallImage}?width=300`}
              alt={`${configurableProductCurrentVariant.name} product image`}
              highPeriority={index <= 4 ? true : false}
              className=" h-full w-full object-contain"
            />
          </ProductCardImage>
        </ProductCardLink>
        <DynamicProduct_Label label={productLabel.current} />
      </ProductCardSection>

      {/* name and price and color variants container */}
      <ProductCardSection
        className={` flex w-full flex-col items-stretch justify-between gap-3 pb-2 ${
          isMultiColumn ? "aspect-[170/100]" : "aspect-[360/100]"
        }`}
      >
        <ProductCardLink href={product.url} onClick={handleSelectItem}>
          <ProductCardName
            className={` line-clamp-2 text-ellipsis font-medium md:text-base ${
              isMultiColumn ? " text-sm" : " text-base"
            } `}
          >
            {product.name}
          </ProductCardName>
        </ProductCardLink>

        <ProductCardLink href={product.url} onClick={handleSelectItem}>
          <ProductCardPrices
            variant={"row_start"}
            className={`${isMultiColumn ? "gap-2" : "gap-4 px-5"} `}
          >
            <ProductCardPrice
              className={
                product.discount > 0
                  ? `line-through md:text-base ${
                      isMultiColumn ? " text-sm " : "text-base "
                    } 
              `
                  : `font-bold md:text-lg ${
                      isMultiColumn ? " text-sm" : " text-lg"
                    } 
              `
              }
            >
              {`${product?.regularPrice} ${product?.currency?.label}`}
            </ProductCardPrice>
            {product.discount > 0 && (
              <ProductCardPrice
                className={`font-bold md:text-lg ${
                  isMultiColumn ? " text-sm" : " text-lg"
                } 
            `}
              >
                {`${product?.salePrice} ${product?.currency?.label}`}
              </ProductCardPrice>
            )}
          </ProductCardPrices>
        </ProductCardLink>

        {/* {(colorVariant?.options?.length ?? 0) > 1 && (
          <ProductCardSection
            className=" w-full px-2"
            onClick={(e) => e.preventDefault()}
          >
            <div className=" mx-auto mt-0.5 flex w-fit max-w-full items-center justify-start gap-2 overflow-x-auto rounded-full bg-productcard_colorswatch_background px-1 py-1">
              {colorVariant?.options?.map((color, index) => {
                return (
                  <Button
                    key={index}
                    className={` h-5 w-5 flex-shrink-0 rounded-full  ${
                      index === currentIndex
                        ? " ring-1 ring-accent ring-offset-1 ring-offset-background"
                        : ""
                    }`}
                    style={{
                      backgroundColor: color?.swatchValue,
                      backgroundImage: color?.swatchValue
                        ? `url(${color?.swatchValue})`
                        : "",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentIndex(index);
                      setCurretColorVariantOption(color);
                    }}
                    disabled={colorVariant?.options?.length === 1}
                  ></Button>
                );
              })}
            </div>
          </ProductCardSection>
        )} */}

        <Addtocart_Btn_3 storeCode={storeCode} className=" mx-2 w-auto" />
      </ProductCardSection>

      {/* <Image
          src="/announcment_label.png"
          className={`${isMultiColumn ? " px-2" : " px-8"} `}
        /> */}

      <DiscountLabel
        value={product.discountPercentage}
        className={` absolute start-0  -translate-y-1/2  ${
          isMultiColumn ? "top-[58%] text-base" : " top-[70%] text-base"
        }`}
      />
      <Addtowishlist_Btn
        productId={product.id}
        className={` absolute w-8 fill-accent ${
          isMultiColumn ? "end-2 top-2" : "end-4 top-3"
        }`}
      />
    </ProductCard>
  );
}
