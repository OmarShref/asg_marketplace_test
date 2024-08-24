"use client";
import { useRef, useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
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
import { getDirection } from "@/lib/helper/direction";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";

type Props = {
  storeCode: string;
  carouselItems: PageBuilderType;
  isSmallDevice?: boolean;
};

export function Carousel_1({ storeCode, carouselItems, isSmallDevice }: Props) {
  const direction = useRef<"ltr" | "rtl">(getDirection(storeCode));

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

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
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      setApi={setApi}
      opts={{ direction: direction.current, loop: true }}
      className=" mx-auto w-full"
    >
      <CarouselContent>
        {carouselItems?.children?.map((item, index) => (
          <CarouselItem key={index}>
            <Anchor href={item?.url}>
              <Image
                src={
                  isSmallDevice
                    ? item?.properties?.mobileIamge
                    : item?.properties?.desktopImage + "?width=1200"
                }
                alt={item?.componentType + index}
                highPeriority={index <= 0}
              />
            </Anchor>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselBullets>
        {carouselItems?.children?.map((_, index) => {
          return (
            <CarouselBullet
              key={index}
              className={`${
                index === current ? " bg-accent" : " bg-faint_accent"
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          );
        })}
      </CarouselBullets>
      <CarouselPrevious className=" hidden lg:inline-flex" />
      <CarouselNext className=" hidden lg:inline-flex" />
    </Carousel>
  );
}
