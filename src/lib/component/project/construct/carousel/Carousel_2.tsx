"use client";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselBullet,
  CarouselBullets,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/lib/component/generic/ui/carousel";
import Image from "@/lib/component/generic/pure/image";
import Anchor from "@/lib/component/generic/pure/anchor";
import { getDirection } from "@/lib/helper/direction";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";

type Props = {
  storeCode: string;
  carouselItems: PageBuilderType;
  isSmallDevice?: boolean;
  properties?: PageBuilderType["properties"];
};

export function Carousel_2({
  storeCode,
  carouselItems,
  isSmallDevice,
  properties,
}: Props) {
  const direction = useRef<"ltr" | "rtl">(getDirection(storeCode));

  const plugin = useRef(
    Autoplay({
      delay: properties?.autoPlaySpeed ?? 2000,
      stopOnInteraction: true,
    }),
  );

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
      {...(properties?.autoPlay && {
        plugins: [plugin.current],
        onMouseEnter: () => {
          plugin.current.stop();
        },
        onMouseLeave: () => {
          plugin.current.play();
        },
      })}
      setApi={setApi}
      className=" mx-auto w-full"
      opts={{ direction: direction.current, loop: true }}
    >
      <CarouselContent className="">
        {carouselItems?.children?.map((item, index) => (
          <CarouselItem key={index} className=" basis-3/4 pl-2">
            <Anchor href={item?.url}>
              <Image
                src={
                  isSmallDevice
                    ? item?.properties?.mobileIamge
                    : item?.properties?.desktopImage + "?width=1200"
                }
                alt={item?.componentType + index}
                highPeriority={index <= 1}
              />
            </Anchor>
          </CarouselItem>
        ))}
      </CarouselContent>
      {properties?.show_dots && (
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
      )}
      {properties?.show_arrows && (
        <>
          <CarouselPrevious className=" hidden lg:inline-flex" />
          <CarouselNext className=" hidden lg:inline-flex" />
        </>
      )}
    </Carousel>
  );
}
