import { Texts, getText } from "@/lib/assets/text";
import { Label } from "@/lib/component/generic/pure/label";
import { RewardPointsModel } from "@/lib/data/models/RewardPointsModel";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { CrownIcon } from "lucide-react";

type Props = {
  productRewardPoints: RewardPointsModel | undefined | null;
};

export function FinishBuyingProductToGetPoints_Label({
  productRewardPoints,
}: Props) {
  return (
    productRewardPoints?.visible && (
      <Label
        className=" mx-auto my-1 w-fit rounded-md bg-cyan-100 px-6 py-0.5 text-sm text-sky-500  shadow-md"
        style={
          {
            // color: productRewardPoints?.color,
          }
        }
      >
        <CrownIcon className="h-5 w-5 text-yellow-400" />

        {/* ============================================= */}

        {`${getText({
          storeCode: useUtilityStore?.getState()?.storeCode,
          text: Texts.finishBuyingThisProductToGet,
        })} `}
        <span className="animate-pulse font-fontEnglish text-lg font-medium">{`${productRewardPoints?.points}`}</span>
        {` ${getText({
          storeCode: useUtilityStore?.getState()?.storeCode,
          text: Texts.point,
        })}`}
      </Label>
    )
  );
}
