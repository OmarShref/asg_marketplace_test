"use client";
import { Grid } from "@/lib/component/generic/pure/grid";
import ProductCard_3 from "../card/ProductCard_3";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { productsListDisplayModes } from "@/lib/core/basic/Constants";
import { ProductModel } from "@/lib/data/models/ProductModel";
import { CategoryModel } from "@/lib/data/models/CategoryModel";
import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  storeCode: string;
  products: ProductModel[];
  category?: CategoryModel;
}

export default function ProductCards_Grid({
  storeCode,
  products,
  category,
  className,
}: Props) {
  const { productsListDisplayMode } = useUtilityStore();
  return (
    <Grid
      variant={
        productsListDisplayMode === productsListDisplayModes.multiColumn
          ? "default"
          : "one_colomn"
      }
      className={cn(` mx-2 max-w-project md:mx-auto `, className)}
    >
      {products?.map((product, index) => {
        const i =
          (Number(category?.currentPage) - (category?.queryId ? 0 : 1)) *
            Number(category?.pageSize) +
          index +
          1;
        return (
          <ProductCard_3
            storeCode={storeCode}
            key={index}
            product={product}
            index={i}
            categoryId={category?.id}
            categoryName={category?.name}
            queryId={category?.queryId}
          />
        );
      })}
    </Grid>
  );
}
