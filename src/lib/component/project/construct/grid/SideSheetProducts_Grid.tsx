"use client";
import { ProductModel } from "@/lib/data/models/ProductModel";
import { cn } from "@/lib/utils/utils";
import ProductCard_3 from "../card/ProductCard_3";
import useUtilityStore from "@/lib/data/stores/UtilityStore";

type Props = {
  products: ProductModel[] | undefined;
};

export default function SideSheetProducts_Grid({
  products,
  className,
}: Props & React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {products?.map((product, index) => {
        return (
          <ProductCard_3
            key={index}
            storeCode={useUtilityStore.getState()?.storeCode}
            product={product}
            index={index}
          />
        );
      })}
    </div>
  );
}
