import { CircleTrueIcon, GiftCardIcon } from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import { cn } from "@/lib/utils/utils";
import RemoveDiscount_Btn from "../button/RemoveDiscount_Btn";
import { DiscountInterface } from "@/lib/data/models/CartModel";
import { Fragment } from "react";
import { Separator } from "@/lib/component/generic/ui/separator";
import { removeGiftCardFromCart } from "@/lib/network/repo/client_repos/gql/cart";
import useUserStore from "@/lib/data/stores/UserStore";

interface Props extends React.HTMLAttributes<HTMLElement> {
  storeCode: string;
  giftCard: DiscountInterface | undefined;
}

// TODO: add currency after the amount
export default function AppliedGiftCard_Row({
  storeCode,
  giftCard,
  className,
}: Props) {
  async function handleRemoveGiftCardFromCart(giftCardCode: string) {
    const removeGiftCardFromCartData = await removeGiftCardFromCart({
      code: giftCardCode,
    });
    if (removeGiftCardFromCartData?.success) {
      useUserStore.setState({
        cart: removeGiftCardFromCartData?.cart,
      });
    }
  }

  return giftCard?.items?.map((item, index) => {
    return (
      <Fragment key={index}>
        <section
          className={cn(
            " flex h-11 items-center justify-between py-3",
            className,
          )}
        >
          <div className=" flex items-center justify-center gap-2">
            <GiftCardIcon />
            <p>{`${getText({
              storeCode: storeCode,
              text: Texts.congratulationsYouGotADiscount,
            })} ${Math.abs(item?.amount)}`}</p>
          </div>
          <div className=" flex items-center justify-center gap-2">
            <CircleTrueIcon className=" text-positive_text" />
            <RemoveDiscount_Btn
              onClick={() => handleRemoveGiftCardFromCart(item?.code)}
            />
          </div>
        </section>
        <Separator />
      </Fragment>
    );
  });
}
