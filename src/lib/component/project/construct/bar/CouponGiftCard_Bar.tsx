"use client";
import { Separator } from "@/lib/component/generic/ui/separator";
import { Coupon_Drawer } from "../drawer/Coupon_Drawer";
import { GiftCard_Drawer } from "../drawer/GiftCard_Drawer";
import AppliedCoupon_Row from "../../part/row/AppliedCoupon_Row";
import AppliedGiftCard_Row from "../../part/row/AppliedGiftCard_Row";
import { DiscountInterface } from "@/lib/data/models/CartModel";
import { RewardPoints_Drawer } from "../drawer/RewardPoints_Drawer";
import AppliedRewardPoints_Row from "../../part/row/AppliedRewardPoints_Row";
import useUserStore from "@/lib/data/stores/UserStore";
import Transition_1 from "../../part/transition/Transition_1";

type Props = {
  storeCode: string;
  coupon: DiscountInterface | undefined;
  giftCard: DiscountInterface | undefined;
  rewardPoints: DiscountInterface | undefined;
};

export default function CouponGiftCard_Bar({
  storeCode,
  coupon,
  giftCard,
  rewardPoints,
}: Props) {
  return (
    (coupon || giftCard) && (
      <section className="">
        {/* applied gift card bar  */}
        {(giftCard?.items?.at(0)?.code ?? "")?.length > 0 && (
          <Transition_1>
            <AppliedGiftCard_Row
              storeCode={storeCode}
              className=" px-5"
              giftCard={giftCard}
            />
            <Separator />
          </Transition_1>
        )}

        {/* ============================================================= */}

        {/* applied coupon bar  */}
        {(coupon?.items?.at(0)?.code ?? "")?.length > 0 && (
          <Transition_1>
            <AppliedCoupon_Row
              storeCode={storeCode}
              className=" px-5"
              coupon={coupon}
            />
          </Transition_1>
        )}

        {/* ============================================================= */}

        {/* applied reward points bar  */}
        {(rewardPoints?.totalAmountUsed ?? 0) > 0 && (
          <Transition_1>
            <AppliedRewardPoints_Row
              storeCode={storeCode}
              className=" px-5"
              rewardPoints={rewardPoints}
            />
          </Transition_1>
        )}

        {/* ============================================================= */}

        {/* buttons */}
        <div className=" flex h-11 items-center justify-center gap-2 py-3 lg:gap-4">
          {/* coupon button */}
          {(coupon?.items?.at(0)?.code ?? "")?.length === 0 && (
            <>
              <Coupon_Drawer storeCode={storeCode} />
              <Separator orientation="vertical" />
            </>
          )}

          {/* gift card button */}
          <GiftCard_Drawer storeCode={storeCode} />

          {/* reward points button */}
          {useUserStore.getState()?.customer?.token &&
            !!useUserStore.getState()?.customerRewardPoints?.currentBalance && (
              <>
                <Separator orientation="vertical" />
                <RewardPoints_Drawer storeCode={storeCode} />
              </>
            )}
        </div>
      </section>
    )
  );
}
