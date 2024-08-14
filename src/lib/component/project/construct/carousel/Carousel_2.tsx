"use client";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
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
};

export function Carousel_2({ storeCode, carouselItems }: Props) {
  const direction = useRef<"ltr" | "rtl">(getDirection(storeCode));

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className=" mx-auto w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{ direction: direction.current, loop: true }}
    >
      <CarouselContent className=" mx-5 lg:mx-0">
        {carouselItems?.children?.map((item, index) => (
          <CarouselItem key={index} className=" basis-3/4 pl-2">
            <Anchor href={item?.url}>
              <Image
                src={item?.properties?.image + "?width=1200"}
                alt={item?.componentType + index}
                highPeriority={index <= 1}
              />
            </Anchor>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" hidden lg:inline-flex" />
      <CarouselNext className=" hidden lg:inline-flex" />
    </Carousel>
  );
}
