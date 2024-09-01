"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/lib/component/generic/ui/carousel";
import { getDirection } from "@/lib/helper/direction";
import { useRef } from "react";
import ProductCard_1 from "@/lib/component/project/construct/card/ProductCard_1";
import { cn } from "@/lib/utils/utils";
import { ProductModel } from "@/lib/data/models/ProductModel";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  storeCode: string;
  carouselItems: ProductModel[] | undefined;
  properties?: PageBuilderType["properties"];
}

export function ProductCards_Carousel_1({
  storeCode,
  className,
  carouselItems,
  properties,
}: Props) {
  const direction = useRef<"ltr" | "rtl">(getDirection(storeCode));

  const plugin = useRef(
    Autoplay({
      delay: properties?.autoPlaySpeed ?? 2000,
      stopOnInteraction: false,
    }),
  );

  return (
    <Carousel
      {...(properties?.autoPlay && {
        plugins: [plugin.current],
        onMouseEnter: plugin.current.stop,
        onMouseLeave: plugin.current.reset,
      })}
      className={cn(" mx-auto w-full", className)}
      opts={{ direction: direction.current, skipSnaps: true, align: "start" }}
    >
      <CarouselContent className={""}>
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
            <ProductCard_1
              storeCode={storeCode}
              product={product}
              index={index}
            />
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
