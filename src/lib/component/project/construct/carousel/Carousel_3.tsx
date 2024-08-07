"use client";
import Image from "@/lib/component/generic/pure/image";
import Anchor from "@/lib/component/generic/pure/anchor";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/lib/component/generic/ui/carousel";
import { getDirection } from "@/lib/helper/direction";
import { useRef } from "react";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";

type Props = {
  storeCode: string;
  carouselItems: PageBuilderType;
};

export function Carousel_3({ storeCode, carouselItems }: Props) {
  // const carouselItems = carouselItems_3;
  const direction = useRef<"ltr" | "rtl">(getDirection(storeCode));

  return (
    <Carousel
      className=" mx-auto w-full"
      opts={{ direction: direction.current, skipSnaps: true }}
    >
      <CarouselContent className=" mx-5">
        {carouselItems?.children?.map((item, index) => (
          <CarouselItem
            key={index}
            className={` basis-1/6  ${
              (direction.current === "ltr" && index === 0) ||
              (direction.current === "rtl" &&
                index === (carouselItems?.children?.length ?? 0) - 1)
                ? ""
                : "ml-6"
            }`}
          >
            <Anchor href={item?.url}>
              <Image
                src={item?.properties?.image}
                alt={item?.componentType + index}
                highPeriority={index <= 4}
              />
              <p className=" py-1 text-center text-xs text-primary_text">
                {item?.name}
              </p>
            </Anchor>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" hidden lg:inline-flex" />
      <CarouselNext className=" hidden lg:inline-flex" />
    </Carousel>
  );
}
