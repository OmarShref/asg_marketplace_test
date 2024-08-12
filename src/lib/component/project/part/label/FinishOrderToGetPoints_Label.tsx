"use client";
import { Texts, getText } from "@/lib/assets/text";
import { Label } from "@/lib/component/generic/pure/label";
import { RewardPointsModel } from "@/lib/data/models/RewardPointsModel";
import useUserStore from "@/lib/data/stores/UserStore";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { CrownIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {};

export function FinishOrderToGetPoints_Label({}: Props) {
  const { checkoutRewardPoints } = useUserStore((state) => state);
  const [checkoutRewardPointsState, setCheckoutRewardPointsState] =
    useState<RewardPointsModel | null>(null);

  useEffect(() => {
    setCheckoutRewardPointsState(checkoutRewardPoints);
  }, [checkoutRewardPoints]);

  return (
    checkoutRewardPointsState?.visible && (
      <Label
        className=" mx-auto my-1 w-fit rounded-md bg-cyan-100 px-6 py-0.5 text-sm text-sky-500  shadow-md"
        style={
          {
            // color: checkoutRewardPointsState?.color,
          }
        }
      >
        <CrownIcon className="h-5 w-5 text-yellow-400" />

        {/* ============================================= */}

        {`${getText({
          storeCode: useUtilityStore?.getState()?.storeCode,
          text: Texts.completeThisOrderToGet,
        })} `}
        <span className="font-fontEnglish animate-pulse text-lg font-medium">{`${checkoutRewardPointsState?.points}`}</span>
        {` ${getText({
          storeCode: useUtilityStore?.getState()?.storeCode,
          text: Texts.point,
        })}`}
      </Label>
    )
  );
}
