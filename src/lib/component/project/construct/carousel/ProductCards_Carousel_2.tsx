"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/lib/component/generic/ui/carousel";
import { getDirection } from "@/lib/helper/direction";
import { useRef } from "react";
import ProductCard_2 from "@/lib/component/project/construct/card/ProductCard_2";
import { cn } from "@/lib/utils/utils";
import { ProductModel } from "@/lib/data/models/ProductModel";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  storeCode: string;
  carouselItems: ProductModel[] | undefined;
}

export function ProductCards_Carousel_2({
  storeCode,
  className,
  carouselItems,
}: Props) {
  const direction = useRef<"ltr" | "rtl">(getDirection(storeCode));

  return (
    <Carousel
      className=" mx-auto w-full"
      opts={{ direction: direction.current, skipSnaps: true }}
    >
      <CarouselContent className={cn("", className)}>
        {carouselItems?.map((product, index) => (
          <CarouselItem
            key={index}
            className={` basis-auto  ${
              (direction.current === "ltr" && index === 0) ||
              (direction.current === "rtl" &&
                index === carouselItems?.length - 1)
                ? ""
                : "ml-3"
            }`}
          >
            <ProductCard_2 product={product} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {(carouselItems ?? [])?.length > 1 && (
        <>
          <CarouselPrevious className=" hidden lg:inline-flex" />
          <CarouselNext className=" hidden lg:inline-flex" />
        </>
      )}
    </Carousel>
  );
}
