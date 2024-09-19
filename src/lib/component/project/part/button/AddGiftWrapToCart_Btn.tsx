import { Texts, getText } from "@/lib/assets/text";
import Image from "@/lib/component/generic/pure/image";
import { Button } from "@/lib/component/generic/ui/button";
import useUserStore from "@/lib/data/stores/UserStore";
import { getCart } from "@/lib/network/repo/client_repos/gql/cart";
import {
  removeCartGiftWrap,
  removeItemGiftWrap,
} from "@/lib/network/repo/client_repos/gql/giftwrap";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
  setOpenGiftWrapDrawer: (open: boolean) => void;
}

export default function AddGiftWrapToCart_Btn({
  storeCode,
  setOpenGiftWrapDrawer,
  ...restProps
}: Props) {
  const router = useRouter();

  const { cart, customer } = useUserStore((state) => state);

  const [giftWrapAdded, setGiftWrapAdded] = useState<boolean>(false);
  useEffect(() => {
    const found = !!cart?.giftWrap?.at(0)?.allCart;
    setGiftWrapAdded(found);
  }, [cart]);

  async function handleRemoveCartGiftWrap() {
    if (cart?.id) {
      const removeItemGiftWrapData = await removeCartGiftWrap({
        cartId: cart?.id,
      });

      if (removeItemGiftWrapData?.success) {
        const getCartData = await getCart({});

        if (getCartData?.success) {
          useUserStore?.setState({
            cart: getCartData?.cart,
          });
        }
      }
    }
  }

  function handleOnClick() {
    if (customer?.token) {
      if (giftWrapAdded) {
        handleRemoveCartGiftWrap();
      } else {
        setOpenGiftWrapDrawer(true);
      }
    } else {
      router.push(`/${storeCode}/account/login`);
    }
  }

  return (
    <Button
      className={` mx-auto flex w-3/4  gap-2 rounded-full py-1 text-sm  ${
        giftWrapAdded ? "bg-accent text-white" : "bg-faint_accent text-accent"
      }`}
      onClick={handleOnClick}
      {...restProps}
    >
      <Image src="/gif/gift.gif" className="h-auto w-4 scale-150" alt="" />
      {giftWrapAdded
        ? getText({ storeCode: storeCode, text: Texts.giftWrapperIsAdded })
        : getText({ storeCode: storeCode, text: Texts.wrapCartAsGift })}
    </Button>
  );
}
