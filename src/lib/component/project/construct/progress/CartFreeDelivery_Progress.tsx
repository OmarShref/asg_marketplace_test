"use client";
import { ShippingCarIcon } from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import Spacing from "@/lib/component/generic/pure/spacing";
import {
  Progress,
  ProgressIndicator,
} from "@/lib/component/generic/ui/progress";
import { useEffect, useState } from "react";

type Props = {
  storeCode: string;
  freeShipping: number;
  subTotal: number | undefined;
};

export default function CartFreeDelivery_Progress({
  storeCode,
  freeShipping,
  subTotal,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [leftForFreeShipping, setLeftForFreeShipping] = useState(0);

  useEffect(() => {
    const freeShippingPercentage = (subTotal ?? 0) / freeShipping;
    const freeShippingProgress =
      freeShippingPercentage > 1
        ? 100
        : Math.round(freeShippingPercentage * 100);
    setProgress(freeShippingProgress);

    const leftForFreeShipping = freeShipping - (subTotal ?? 0);
    setLeftForFreeShipping(
      leftForFreeShipping > 0 ? Math.round(leftForFreeShipping) : 0,
    );
  }, [subTotal]);

  return (
    !!subTotal && (
      <div className=" mx-5 ">
        <div className=" flex items-center justify-start gap-2">
          <ShippingCarIcon />
          {leftForFreeShipping > 0 ? (
            <p className=" text-sm text-sub_secondry_text">{`${getText({
              storeCode,
              text: Texts.add,
            })} ${leftForFreeShipping} ${"ر.س"} ${getText({
              storeCode,
              text: Texts.toGetFreeShipping,
            })}`}</p>
          ) : (
            <p className=" animate-pulse text-sm text-positive_text">{`${getText(
              {
                storeCode,
                text: Texts.youDeservedFreeShipping,
              },
            )}`}</p>
          )}
        </div>
        <Spacing value={1} />
        <Progress className=" h-2">
          <ProgressIndicator
            value={progress}
            className=" rounded-full bg-accent"
          />
        </Progress>
      </div>
    )
  );
}
