"use client";
import { Texts, getText } from "@/lib/assets/text";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/lib/component/generic/ui/drawer";
import Close_Btn from "../../part/button/Close_Btn";
import Spacing from "@/lib/component/generic/pure/spacing";
import { getDirection } from "@/lib/helper/direction";
import { OrderItemType } from "@/lib/data/models/OrderModel";
import OrderDetails_Card from "../card/OrderDetails_Card";
import { Row, RowSection } from "@/lib/component/generic/pure/row";
import { LocationPinIcon } from "@/lib/assets/svg";
import CartTotals_Card from "../card/CartTotals_Card";
import { CreditCardIcon } from "lucide-react";
import Cart_Card from "../card/Cart_Card";
import { Fragment } from "react";

type Props = {
  storeCode: string;
  order: OrderItemType | null;
  openOrderDetailsDrawer: boolean;
  setOpenOrderDetailsDrawer: (open: boolean) => void;
};

export function OrderDetails_Drawer({
  storeCode,
  order,
  openOrderDetailsDrawer,
  setOpenOrderDetailsDrawer,
}: Props) {
  const direction = getDirection(storeCode);

  return (
    <Drawer
      open={openOrderDetailsDrawer}
      onOpenChange={(open) => setOpenOrderDetailsDrawer(open)}
      dismissible={false}
    >
      <DrawerContent
        style={{ direction: direction }}
        className=" mx-auto h-[100dvh] max-h-[100dvh] max-w-md rounded-none bg-gray-50"
      >
        <DrawerHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
          <DrawerTitle>
            {getText({ storeCode: storeCode, text: Texts.orderDetails })}
          </DrawerTitle>
          <DrawerClose
            asChild
            className=" absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Close_Btn />
          </DrawerClose>
        </DrawerHeader>
        <section className=" overflow-y-auto px-5">
          <Spacing value={5} />

          {/* order info  */}
          <OrderDetails_Card
            cardTitle={getText({ storeCode: storeCode, text: Texts.orderInfo })}
          >
            <Row withSeparator={true} className=" text-sm">
              <p>
                {getText({ storeCode: storeCode, text: Texts.orderNumber })}
              </p>
              <p className=" font-fontEnglish">{order?.number}</p>
            </Row>
            <Spacing value={2} />
            <Row withSeparator={true} className=" text-sm">
              <p>{getText({ storeCode: storeCode, text: Texts.date })}</p>
              <p className=" font-fontEnglish">{order?.date}</p>
            </Row>
            <Spacing value={2} />
            <Row className=" text-sm">
              <p>{getText({ storeCode: storeCode, text: Texts.status })}</p>
              <p>{order?.status}</p>
            </Row>
          </OrderDetails_Card>
          <Spacing value={5} />

          {/* shipping address  */}
          <OrderDetails_Card
            cardTitle={getText({
              storeCode: storeCode,
              text: Texts.shippingInfo,
            })}
          >
            <Row className=" gap-3 text-sm">
              <RowSection>
                <LocationPinIcon className=" h-6 w-6" />
              </RowSection>
              <RowSection className=" block text-xs">
                <p className=" font-fontEnglish">{order?.address?.street}</p>
                <Spacing value={1} />
                <p className=" text-faint_text">{`${order?.address?.firstName} ${order?.address?.lastName}`}</p>
              </RowSection>
            </Row>
          </OrderDetails_Card>
          <Spacing value={5} />

          {/* payment method  */}
          <OrderDetails_Card
            cardTitle={getText({
              storeCode: storeCode,
              text: Texts.paymentMethod,
            })}
          >
            <Row className=" justify-start gap-3">
              <RowSection>
                <CreditCardIcon className=" h-6 w-6" />
              </RowSection>
              <RowSection>
                <p className=" font-fontEnglish">{order?.paymentMethod}</p>
              </RowSection>
            </Row>
          </OrderDetails_Card>
          <Spacing value={5} />

          {/* order products  */}
          <OrderDetails_Card
            cardTitle={getText({
              storeCode: storeCode,
              text: Texts.orderProducts,
            })}
            className=""
          >
            {order?.products?.map((product, index) => {
              return (
                <Fragment key={index}>
                  <Cart_Card storeCode={storeCode} cartItem={product} />
                  <Spacing value={2} />
                </Fragment>
              );
            })}
          </OrderDetails_Card>
          <Spacing value={5} />

          {/* cart totals  */}
          <CartTotals_Card
            storeCode={storeCode}
            totalsLines={order?.totalsLines?.filter((line) => line?.value > 0)}
            quantity={order?.qauntity}
            className=" mx-0"
          />
          <Spacing value={5} />
        </section>
        <Spacing value={7} />
      </DrawerContent>
    </Drawer>
  );
}
