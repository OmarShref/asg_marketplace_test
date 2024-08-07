import { Texts, getText } from "@/lib/assets/text";
import Image from "@/lib/component/generic/pure/image";
import Spacing from "@/lib/component/generic/pure/spacing";
import { Button } from "@/lib/component/generic/ui/button";
import {
  Card,
  CardContent,
  CardSection,
} from "@/lib/component/generic/ui/card";
import { Separator } from "@/lib/component/generic/ui/separator";
import { useToast } from "@/lib/component/generic/ui/use-toast";
import { OrderItemType } from "@/lib/data/models/OrderModel";
import { ChevronLeftIcon } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  storeCode: string;
  order: OrderItemType;
  setCurrentOrder: (order: OrderItemType | null) => void;
  setOpenOrderDetailsDrawer: (open: boolean) => void;
}

// TODO: add status colors by mapping values to colors
export default function Order_Card({
  storeCode,
  order,
  setCurrentOrder,
  setOpenOrderDetailsDrawer,
}: Props) {
  const { toast } = useToast();
  return (
    <Card className=" rounded-xl bg-background px-5 py-3 shadow-md">
      <CardContent>
        <CardSection>
          <p className=" w-fit rounded-full bg-slate-200 px-3 py-1 text-sm">
            {order?.status}
          </p>
        </CardSection>
        <Spacing value={4} />
        <CardSection className=" flex items-end justify-between gap-4">
          <div className=" flex items-center gap-4">
            <div>
              <Image
                src={order?.products?.at(0)?.product?.smallImage}
                alt=""
                className=" h-auto w-10 rounded-lg"
              />
            </div>
            <div className=" flex w-full flex-col items-start justify-between">
              <p className=" text-xs text-sub_secondry_text">{`${getText({
                storeCode,
                text: Texts.date,
              })} : ${order?.date?.split(" ")?.at(0)}`}</p>
              <Spacing value={2} />
              <p className=" text-xs text-sub_secondry_text">
                {`${getText({
                  storeCode,
                  text: Texts.productsNumber,
                })} : ${order?.qauntity}`}
              </p>
            </div>
          </div>
          <div>
            <p className=" text-xs text-sub_secondry_text">
              {`${getText({
                storeCode,
                text: Texts.productsNumber,
              })} : ${
                order?.totalsLines?.find((line) => line?.code === "grand_total")
                  ?.value
              } ${order?.currency?.label}`}
            </p>
          </div>
        </CardSection>
        <Spacing value={2} />
        <Separator />
        <Spacing value={2} />
        <CardSection>
          <div className=" flex items-center justify-between">
            <p className=" font-medium">{`${getText({
              storeCode,
              text: Texts.orderNumber,
            })} :`}</p>
            <p className=" font-montserrat-remove text-sm">{order?.number}</p>
          </div>
        </CardSection>
        <Spacing value={4} />
        <CardSection>
          <div className=" flex items-center justify-center">
            <Button
              className=" gap-2"
              onClick={() => {
                setCurrentOrder(order);
                setOpenOrderDetailsDrawer(true);
              }}
            >
              <p className=" text-sm text-accent">
                {getText({ storeCode, text: Texts.viewDetails })}
              </p>
              <ChevronLeftIcon className=" h-4 w-4 text-accent" />
            </Button>
          </div>
        </CardSection>
        <Spacing value={2} />
      </CardContent>
    </Card>
  );
}
