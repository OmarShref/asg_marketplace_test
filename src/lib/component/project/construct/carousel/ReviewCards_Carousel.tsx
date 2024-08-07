"use client";
import { products } from "@/lib/data/dummy/products-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/lib/component/generic/ui/carousel";
import { getDirection } from "@/lib/helper/direction";
import { useRef } from "react";
import Review_Card from "../card/Review_Card";
import { ReviewItemType } from "@/lib/data/models/ProductModel";
import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  storeCode: string;
  reviews: ReviewItemType[];
}

export function ReviewCards_Carousel({ storeCode, reviews, className }: Props) {
  const direction = useRef<"ltr" | "rtl">(getDirection(storeCode));

  return (
    <Carousel
      className=" mx-auto w-full"
      opts={{ direction: direction.current, skipSnaps: true }}
    >
      <CarouselContent className={cn("", className)}>
        {reviews?.map((review, index) => (
          <CarouselItem
            key={index}
            className={` basis-auto  ${
              (direction.current === "ltr" && index === 0) ||
              (direction.current === "rtl" && index === reviews?.length - 1)
                ? ""
                : "ml-3"
            }`}
          >
            <Review_Card review={review} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {(reviews ?? [])?.length > 1 && (
        <>
          <CarouselPrevious className=" hidden lg:inline-flex" />
          <CarouselNext className=" hidden lg:inline-flex" />
        </>
      )}
    </Carousel>
  );
}
