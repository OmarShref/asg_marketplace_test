"use client";
import { useState, useEffect, useRef } from "react";
import Anchor from "@/lib/component/generic/pure/anchor";
import Image from "@/lib/component/generic/pure/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselBullets,
  CarouselBullet,
  type CarouselApi,
} from "@/lib/component/generic/ui/carousel";
import { carouselItems_2 } from "@/lib/data/dummy/carousel-data";
import { getDirection } from "@/lib/helper/direction";

type Props = {
  storeCode: string;
};

export function Carousel_4({ storeCode }: Props) {
  const direction = useRef<"ltr" | "rtl">(getDirection(storeCode));

  const carouselItems = carouselItems_2;

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
      className=" mx-auto w-full px-5"
      setApi={setApi}
      opts={{ direction: direction.current, loop: true }}
    >
      <CarouselContent>
        {carouselItems?.map((item, index) => (
          <CarouselItem key={index}>
            <Anchor href={item?.url}>
              <Image
                src={item?.image}
                alt={item?.label}
                highPeriority={index <= 0}
              />
            </Anchor>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselBullets>
        {carouselItems?.map((_, index) => {
          return (
            <CarouselBullet
              key={index}
              className={`${
                index === current ? " bg-accent" : " bg-faint_accent"
              }`}
            />
          );
        })}
      </CarouselBullets>
      <CarouselPrevious className=" hidden lg:inline-flex" />
      <CarouselNext className=" hidden lg:inline-flex" />
    </Carousel>
  );
}
