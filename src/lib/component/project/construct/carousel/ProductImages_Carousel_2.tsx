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

export function ProductImages_Carousel_2({
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
    <section className=" flex h-full w-full">
      <Carousel
        className=" mx-auto flex h-full w-full gap-5 "
        setApi={setApi}
        opts={{ direction: direction.current, align: "start" }}
      >
        <CarouselContent className=" relative aspect-square h-full flex-1 shrink-0 ">
          {images?.map((image, index) => (
            <CarouselItem key={index} className=" basis-full ">
              <Image
                src={image + "?width=700"}
                highPeriority={index <= 0}
                alt={`${productName} product image ${index + 1}`}
                className=" rounded-xl object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* ======================================================================================================================== */}
      </Carousel>

      {/* bullets or thumbs */}
      <div className=" aspect-[1/3] h-full shrink-0 basis-3/12 overflow-y-scroll">
        <CarouselBullets className=" w-full flex-col justify-start gap-2 bg-background px-2 pt-0">
          {images?.map((image, index) => {
            return (
              <Image
                key={index}
                src={image + "?width=150"}
                alt={`${productName} product image ${index + 1}`}
                highPeriority={index <= images?.length - 1}
                className={` h-auto w-full cursor-pointer rounded-lg shadow-md transition-all ${
                  index === current
                    ? " z-10 border-2 border-accent blur-0"
                    : " blur-[1px]"
                } `}
                onClick={() => api?.scrollTo(index)}
              />
            );
          })}
        </CarouselBullets>
      </div>
    </section>
  );
}
