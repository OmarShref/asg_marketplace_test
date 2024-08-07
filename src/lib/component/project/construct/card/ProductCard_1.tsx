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

export default function ProductCard_1({ product, index }: Props) {
  return (
    <ProductCard
      variant={"rounded"}
      size={"small"}
      className=" bg-product_card_background border border-stone-200"
    >
      <ProductCardLink href={product?.url}>
        <ProductCardImage variant={"rounded"} className=" overflow-auto">
          <Image
            src={`${product?.smallImage}?width=250`}
            alt={`${product?.name} product image`}
            highPeriority={(index ?? 0) <= 2}
          />
        </ProductCardImage>
        <Spacing value={0.5} />
        <ProductCardSection className="flex h-full flex-col items-center justify-center">
          <ProductCardName className=" h-4 overflow-hidden text-xs md:text-base md:h-6">
            {product?.name}
          </ProductCardName>
          <Spacing value={0.5} />
          <ProductCardPrices variant={"row_start"}>
            {product?.discount > 0 && (
              <ProductCardPrice className=" text-xs line-through">
                {`${product?.regularPrice} ${product?.currency?.label}`}
              </ProductCardPrice>
            )}
            <ProductCardPrice className=" text-sm font-bold">
              {`${product?.salePrice} ${product?.currency?.label}`}
            </ProductCardPrice>
          </ProductCardPrices>
        </ProductCardSection>
      </ProductCardLink>
      <Addtowishlist_Btn
        productId={product?.id}
        className=" absolute left-2 top-2 w-8"
      />
      <DiscountLabel
        value={product?.discountPercentage}
        className=" absolute start-0 top-48 md:top-56 -translate-y-1/2 text-xs"
      />
      <Addtocart_Btn_1
        className=" pointer-events-none absolute end-2 top-48 md:top-56 -translate-y-1/2 ring-0"
        addedToCartCount={0}
      />
    </ProductCard>
  );
}
