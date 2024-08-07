"use client";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/lib/component/generic/ui/radio-group";
import { getDirection } from "@/lib/helper/direction";
import useUserStore from "@/lib/data/stores/UserStore";
import { GiftWrapModel, GiftWrapType } from "@/lib/data/models/GiftWrapModel";
import BasicConfirm_Btn from "../../part/button/BasicConfirm_Btn";
import GiftWrap_Card from "../card/GiftWrap_Card";
import { Texts, getText } from "@/lib/assets/text";
import Spacing from "@/lib/component/generic/pure/spacing";
import { useState } from "react";
import {
  addCartGiftWrap,
  addItemGiftWrap,
} from "@/lib/network/client/gql/giftwrap";
import { getCart } from "@/lib/network/client/gql/cart";
import { useToast } from "@/lib/component/generic/ui/use-toast";

type Props = {
  storeCode: string;
  giftWrap: GiftWrapModel;
  setOpenGiftWrapDrawer?: (open: boolean) => void;
  itemId: number | undefined;
};

export default function GiftWrap_RadioGroup({
  storeCode,
  giftWrap,
  setOpenGiftWrapDrawer,
  itemId,
}: Props) {
  const direction = getDirection(storeCode);
  const { toast } = useToast();

  const { cart } = useUserStore((state) => state);

  const [choosenWrapId, setChoosenWrapId] = useState<number | undefined>();

  async function handleAddItemGiftWrap() {
    setOpenGiftWrapDrawer?.(false);
    if (choosenWrapId && itemId) {
      const addItemGiftWrapData = await addItemGiftWrap({
        itemId: itemId,
        wrapId: choosenWrapId,
      });

      if (addItemGiftWrapData?.success) {
        const getCartData = await getCart({});

        if (getCartData?.success) {
          useUserStore?.setState({
            cart: getCartData?.cart,
          });
        }
      }
    }
  }

  async function handleAddCartGiftWrap() {
    setOpenGiftWrapDrawer?.(false);
    if (choosenWrapId && cart?.id) {
      const addCartGiftWrapData = await addCartGiftWrap({
        cartId: cart?.id,
        wrapId: choosenWrapId,
      });

      if (addCartGiftWrapData?.success) {
        const getCartData = await getCart({});

        if (getCartData?.success) {
          useUserStore?.setState({
            cart: getCartData?.cart,
          });
        }
      }
    }
  }

  function handleConfirmGiftWrapClick() {
    if (!!choosenWrapId) {
      if (!!itemId) {
        handleAddItemGiftWrap();
      } else {
        handleAddCartGiftWrap();
      }
    } else {
      toast({
        description: getText({
          storeCode: storeCode,
          text: Texts?.pleaseAddWrappingType,
        }),
        variant: "destructive",
      });
    }
  }

  function handleGiftWrapCardClick(item: GiftWrapType) {
    const targetRadioGroupItem = document.getElementById(item?.id);

    if (targetRadioGroupItem) {
      targetRadioGroupItem.click();
    }
  }

  return (
    giftWrap && (
      <>
        <RadioGroup
          defaultValue={cart?.shippingAddress?.id?.toString()}
          style={{ direction: direction }}
          className=" mx-5 grid-cols-2 gap-5"
          onValueChange={(value) => setChoosenWrapId(Number(value))}
        >
          {giftWrap?.items
            ?.map((item, index) => {
              return (
                <GiftWrap_Card
                  key={index}
                  item={item}
                  onClick={() => {
                    handleGiftWrapCardClick(item);
                  }}
                >
                  <RadioGroupItem
                    id={item?.id}
                    value={item?.id}
                    className=" h-6 w-6"
                  />
                </GiftWrap_Card>
              );
            })
            .reverse()}
        </RadioGroup>
        <Spacing value={10} />
        <BasicConfirm_Btn onClick={handleConfirmGiftWrapClick}>
          {getText({ storeCode: storeCode, text: Texts?.confirm })}
        </BasicConfirm_Btn>
      </>
    )
  );
}
