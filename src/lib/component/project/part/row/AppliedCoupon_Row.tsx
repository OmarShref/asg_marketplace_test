import { CircleTrueIcon } from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import { cn } from "@/lib/utils/utils";
import RemoveDiscount_Btn from "../button/RemoveDiscount_Btn";
import { DiscountInterface } from "@/lib/data/models/CartModel";
import { Separator } from "@/lib/component/generic/ui/separator";
import { Fragment } from "react";
import { removeCouponFromCart } from "@/lib/network/client/gql/cart";
import useUserStore from "@/lib/data/stores/UserStore";
import { TicketIcon } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  storeCode: string;
  coupon: DiscountInterface | undefined;
}

// TODO: add currency after the amount
export default function AppliedCoupon_Row({
  storeCode,
  className,
  coupon,
}: Props) {
  async function handleRemoveCouponFromCart() {
    const removeCouponFromCartData = await removeCouponFromCart({});
    if (removeCouponFromCartData?.success) {
      useUserStore.setState({
        cart: removeCouponFromCartData?.cart,
      });
    }
  }

  return coupon?.items?.map((item, index) => {
    return (
      <Fragment key={index}>
        <section
          className={cn(
            " flex h-11 items-center justify-between py-3",
            className
          )}
        >
          <div className=" flex items-center justify-center gap-2">
            <TicketIcon className=" w-6 h-auto text-green-400" />
            <p>{`${getText({
              storeCode: storeCode,
              text: Texts.congratulationsYouGotADiscount,
            })} ${Math.abs(item?.amount)}`}</p>
          </div>
          <div className=" flex items-center justify-center gap-2">
            <CircleTrueIcon className=" text-positive_text" />
            <RemoveDiscount_Btn onClick={handleRemoveCouponFromCart} />
          </div>
        </section>
        <Separator />
      </Fragment>
    );
  });
}
