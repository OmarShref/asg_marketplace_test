"use client";
import { useState, useEffect, useRef } from "react";
import Image from "@/lib/component/generic/pure/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselBullets,
  type CarouselApi,
} from "@/lib/component/generic/ui/carousel";
import { getDirection } from "@/lib/helper/direction";
import Addtowishlist_Btn from "../../part/button/Addtowhishlist_Btn";
import DiscountLabel from "../../part/label/Discount_Label";
import Timer_1 from "../../part/timer/Timer_1";
import { ProductModel } from "@/lib/data/models/ProductModel";

type Props = {
  storeCode: string;
  images: string[];
  product: ProductModel;
};

export function ProductImages_Carousel_2({
  storeCode,
  images,
  product,
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
    <section className=" flex aspect-[120/100] w-full flex-row-reverse">
      <div className="relative basis-10/12 overflow-clip rounded-2xl border">
        <Carousel
          className=" flex aspect-square h-full gap-5 "
          setApi={setApi}
          opts={{ direction: direction.current, align: "start" }}
        >
          <CarouselContent className=" relative aspect-square h-full flex-1 shrink-0 ">
            {images?.map((image, index) => (
              <CarouselItem key={index} className=" basis-full ">
                <Image
                  src={image + "?width=700"}
                  highPeriority={index <= 0}
                  alt={`${product?.name} product image ${index + 1}`}
                  className=" rounded-xl object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* =========================================================== */}

        <Addtowishlist_Btn
          productId={product?.id}
          className=" absolute end-6 top-5"
        />
        <DiscountLabel
          value={product?.discountPercentage}
          className=" absolute bottom-[24%] start-0 pl-3 text-2xl md:bottom-[10%]"
        />
        <Timer_1
          specialToDate={product?.specialToDate}
          className=" absolute bottom-[19%] start-0 rounded-s-none md:bottom-[5%]"
        />
      </div>

      {/* =========================================================== */}

      {/* bullets or thumbs */}
      <div className=" h-full shrink-0 basis-2/12 overflow-y-scroll">
        <CarouselBullets className=" w-full flex-col justify-start gap-2 bg-background px-2 pt-0">
          {images?.map((image, index) => {
            return (
              <Image
                key={index}
                src={image + "?width=150"}
                alt={`${product?.name} product image ${index + 1}`}
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
