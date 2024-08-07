"use client";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/lib/component/generic/ui/radio-group";
import { getDirection } from "@/lib/helper/direction";
import Payment_Card from "../card/Payment_Card";
import { CartModel, PaymentMethodItemType } from "@/lib/data/models/CartModel";
import { CircleSlash2Icon } from "lucide-react";
import { setCartPayment } from "@/lib/network/client/gql/cart";
import useUserStore from "@/lib/data/stores/UserStore";
import { paymentTypes } from "@/lib/core/basic/Constants";
import { Fragment, useEffect, useState } from "react";
import { AddPaymentCard_Drawer } from "../drawer/AddPaymentCard_Drawer";
import { PaymentMethodInfoModel } from "@/lib/data/models/PaymentMethodInfoModel";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { GtmEvents } from "@/lib/core/analytics/Gtm";

type Props = {
  storeCode: string;
  paymentMethods: PaymentMethodItemType[] | undefined;
  selectedPaymentMethod: string | undefined;
  paymentMethodInfo: PaymentMethodInfoModel;
};

export default function Payment_RadioGroup({
  storeCode,
  paymentMethods,
  selectedPaymentMethod,
  paymentMethodInfo,
}: Props) {
  const direction = getDirection(storeCode);

  const [openAddPaymentDrawer, setOpenAddPaymentDrawer] = useState(false);
  const { openAddPaymentCardDrawer } = useUtilityStore((state) => state);
  useEffect(() => {
    if (openAddPaymentCardDrawer) {
      setOpenAddPaymentDrawer(openAddPaymentCardDrawer);
    }
  }, [openAddPaymentCardDrawer]);
  useEffect(() => {
    if (selectedPaymentMethod === paymentTypes.ckCard) {
      setOpenAddPaymentDrawer(true);
    }
  }, [selectedPaymentMethod]);

  async function handleSetCartPayment(PaymentMethodCode: string) {
    useUtilityStore.setState({ generalLoading: true });

    const setCartPaymentData = await setCartPayment({
      code: PaymentMethodCode,
    });

    if (setCartPaymentData?.success) {
      useUserStore.setState({ cart: setCartPaymentData?.cart });
      if (setCartPaymentData?.cart) {
        new GtmEvents({
          gtmCart: CartModel?.toGtm(setCartPaymentData?.cart),
        })?.addPaymentInfo();
      }
    }

    useUtilityStore.setState({ generalLoading: false });
  }

  function handlePaymentCartClick(paymentMethod: PaymentMethodItemType) {
    if (typeof document !== "undefined") {
      const radioGroupItem = document.getElementById(
        `${paymentMethod?.code}-radio-button`,
      );
      if (radioGroupItem) {
        radioGroupItem?.click();
      }
    }
  }

  return (
    paymentMethods && (
      <RadioGroup
        defaultValue={selectedPaymentMethod}
        style={{ direction: direction }}
        className=" gap-4"
        onValueChange={(value) => handleSetCartPayment(value)}
      >
        {paymentMethods?.map((paymentMethod, index) => {
          return (
            paymentMethod?.isAvailable &&
            paymentMethod?.code != paymentTypes.applePay && (
              <Fragment key={index}>
                <Payment_Card
                  paymentMethod={paymentMethod}
                  selectedPaymentMethod={selectedPaymentMethod}
                  onClick={() => {
                    handlePaymentCartClick(paymentMethod);
                  }}
                >
                  <RadioGroupItem
                    id={`${paymentMethod?.code}-radio-button`}
                    value={paymentMethod?.code}
                  />
                </Payment_Card>
                {paymentMethod?.code === paymentTypes.ckCard &&
                  selectedPaymentMethod === paymentTypes.ckCard && (
                    <AddPaymentCard_Drawer
                      storeCode={storeCode}
                      openAddPaymentDrawer={openAddPaymentDrawer}
                      setOpenAddPaymentDrawer={setOpenAddPaymentDrawer}
                      paymentMethodInfo={paymentMethodInfo}
                      selectedPaymentMethod={selectedPaymentMethod}
                    />
                  )}
              </Fragment>
            )
          );
        })}
        {paymentMethods?.map((paymentMethod, index) => {
          return (
            !paymentMethod?.isAvailable &&
            paymentMethod?.code != paymentTypes.applePay && (
              <Payment_Card key={index} paymentMethod={paymentMethod}>
                <CircleSlash2Icon className=" h-5 w-5 text-danger" />
              </Payment_Card>
            )
          );
        })}
      </RadioGroup>
    )
  );
}
