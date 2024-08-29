"use client";
import { useState, useEffect, useRef } from "react";
import Image from "@/lib/component/generic/pure/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselBullets,
  CarouselBullet,
  type CarouselApi,
} from "@/lib/component/generic/ui/carousel";
import { getDirection } from "@/lib/helper/direction";

type Props = {
  storeCode: string;
  images: string[];
  productName: string;
};

export function ProductImages_Carousel_1({
  storeCode,
  images,
  productName,
}: Props) {
  const direction = useRef<"ltr" | "rtl">(getDirection(storeCode));

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      className=" relative mx-auto h-full w-full"
      setApi={setApi}
      opts={{ direction: direction.current, align: "start" }}
    >
      <CarouselContent className=" relative h-full ">
        {images?.map((image, index) => (
          <CarouselItem key={index} className=" basis-[100%]">
            <Image
              src={image + "?width=400"}
              highPeriority={index <= 1}
              alt={`${productName} product image ${index + 1}`}
              className=" object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselBullets className=" absolute bottom-0 w-full justify-center gap-1">
        {images?.map((_, index) => {
          return (
            <CarouselBullet
              key={index}
              className={` shadow-sm ${
                index === current ? " bg-accent" : " bg-faint_accent"
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          );
        })}
      </CarouselBullets>
    </Carousel>
  );
}
