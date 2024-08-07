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
import Spacing from "@/lib/component/generic/pure/spacing";
import { ProductModel } from "@/lib/data/models/ProductModel";

type Props = {
  product: ProductModel;
  index?: number;
};

export default function ProductCard_2({ product, index }: Props) {
  return (
    <ProductCard variant={"default"} size={"medium"}>
      <ProductCardLink href={product?.url}>
        <ProductCardImage variant={"default"} className=" overflow-auto">
          <Image
            src={`${product?.smallImage}?width=500`}
            alt={`${product?.name} product image`}
            highPeriority={(index ?? 0) <= 1}
          />
        </ProductCardImage>
        <Spacing value={0.5} />
        <ProductCardSection className="flex h-20 flex-col items-center justify-center">
          <ProductCardName
            variant={"center"}
            className=" max-h-12 px-7 text-base"
          >
            {product?.name}
          </ProductCardName>
          <Spacing value={0.5} />
          <ProductCardPrices variant={"row_center"} className=" gap-2">
            {product?.discount > 0 && (
              <ProductCardPrice className=" text-sm text-accent line-through">
                {`${product?.regularPrice} ${product?.currency?.label}`}
              </ProductCardPrice>
            )}
            <ProductCardPrice className=" text-lg text-accent">
              {`${product?.salePrice} ${product?.currency?.label}`}
            </ProductCardPrice>
          </ProductCardPrices>
        </ProductCardSection>
      </ProductCardLink>
      <DiscountLabel
        value={product?.discountPercentage}
        className=" absolute start-0 top-[356px] -translate-y-1/4"
      />
      <Addtocart_Btn_1
        addedToCartCount={0}
        className=" pointer-events-none absolute end-4 top-[356px] w-11 -translate-y-1/2"
      />
      <Addtowishlist_Btn
        productId={product?.id}
        className=" absolute left-4 top-4"
      />
    </ProductCard>
  );
}
