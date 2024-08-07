import { CircleTrueIcon } from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import { cn } from "@/lib/utils/utils";
import RemoveDiscount_Btn from "../button/RemoveDiscount_Btn";
import { DiscountInterface } from "@/lib/data/models/CartModel";
import { Separator } from "@/lib/component/generic/ui/separator";
import { Fragment } from "react";
import {
  removeCouponFromCart,
  removeRewardPointsFromCart,
} from "@/lib/network/client/gql/cart";
import useUserStore from "@/lib/data/stores/UserStore";
import { CrownIcon } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  storeCode: string;
  rewardPoints: DiscountInterface | undefined;
}

// TODO: add currency after the amount
export default function AppliedRewardPoints_Row({
  storeCode,
  className,
  rewardPoints,
}: Props) {
  async function handleRemoveRewardPointsFromCart() {
    const removeRewardPointsFromCartData = await removeRewardPointsFromCart({});
    if (removeRewardPointsFromCartData?.success) {
      useUserStore.setState({
        cart: removeRewardPointsFromCartData?.cart,
        checkoutRewardPoints:
          removeRewardPointsFromCartData?.checkoutRewardPoints,
      });
    }
  }

  return (
    (rewardPoints?.totalAmountUsed ?? 0) > 0 && (
      <Fragment>
        <section
          className={cn(
            " flex h-11 items-center justify-between py-3",
            className
          )}
        >
          <div className=" flex items-center justify-center gap-2">
            <CrownIcon className=" h-5 w-5 text-yellow-400" />
            <p>
              {`${getText({
                storeCode: storeCode,
                text: Texts.congratulationYouHaveApplied,
              })} ${Math.abs(rewardPoints?.totalAmountUsed ?? 0)} ${getText({
                storeCode: storeCode,
                text: Texts.point,
              })}`}
            </p>
          </div>
          <div className=" flex items-center justify-center gap-2">
            <CircleTrueIcon className=" text-positive_text" />
            <RemoveDiscount_Btn onClick={handleRemoveRewardPointsFromCart} />
          </div>
        </section>
        <Separator />
      </Fragment>
    )
  );
}
