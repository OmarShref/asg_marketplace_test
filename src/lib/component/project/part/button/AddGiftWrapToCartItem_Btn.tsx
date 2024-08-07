import { Texts, getText } from "@/lib/assets/text";
import Image from "@/lib/component/generic/pure/image";
import { Button } from "@/lib/component/generic/ui/button";
import useUserStore from "@/lib/data/stores/UserStore";
import { getCart } from "@/lib/network/client/gql/cart";
import { removeItemGiftWrap } from "@/lib/network/client/gql/giftwrap";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
  itemId: number | undefined;
  setOpenGiftWrapDrawer: (open: boolean) => void;
}

export default function AddGiftWrapToCartItem_Btn({
  storeCode,
  itemId,
  setOpenGiftWrapDrawer,
  ...restProps
}: Props) {
  const router = useRouter();

  const { cart, customer } = useUserStore((state) => state);

  const [giftWrapAdded, setGiftWrapAdded] = useState<boolean>(false);
  useEffect(() => {
    const found =
      (cart?.giftWrap?.findIndex((item) => item?.id === itemId) ?? -1) >= 0;
    setGiftWrapAdded(found);
  }, [cart, itemId]);

  async function handleRemoveCartItemGiftWrap() {
    if (itemId) {
      const removeItemGiftWrapData = await removeItemGiftWrap({
        itemId: itemId,
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
        handleRemoveCartItemGiftWrap();
      } else {
        setOpenGiftWrapDrawer(true);
      }
    } else {
      router.push(`/${storeCode}/account/login`);
    }
  }

  return (
    <Button
      className={` mx-auto flex w-3/4  gap-2 rounded-full py-1 text-sm ${
        giftWrapAdded ? "bg-accent text-white" : "bg-faint_accent text-accent"
      }`}
      onClick={handleOnClick}
      {...restProps}
    >
      <Image src="/gif/gift.gif" className="h-auto w-4 scale-150" alt="" />
      {giftWrapAdded
        ? getText({ storeCode: storeCode, text: Texts.giftWrapperIsAdded })
        : getText({ storeCode: storeCode, text: Texts.wrapProductAsGift })}
    </Button>
  );
}
