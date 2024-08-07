import {
  Card,
  CardContent,
  CardSection,
} from "@/lib/component/generic/ui/card";
import Spacing from "@/lib/component/generic/pure/spacing";
import { PaymentMethodItemType } from "@/lib/data/models/CartModel";
import Image from "../../../generic/pure/image";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  paymentMethod: PaymentMethodItemType;
  selectedPaymentMethod?: string | undefined;
}

export default function Payment_Card({
  paymentMethod,
  selectedPaymentMethod,
  children,
  ...restProps
}: Props) {
  return (
    <Card
      className={` rounded-xl bg-gray-100 px-5 py-3 shadow-address_card ring-1 ${
        paymentMethod?.code === selectedPaymentMethod
          ? " ring-accent"
          : " ring-gray-200"
      }`}
      {...restProps}
    >
      <CardContent className=" flex items-stretch justify-between gap-4 font-light">
        <CardSection className=" flex items-center justify-center">
          {children}
        </CardSection>
        <CardSection className=" flex flex-1 items-center justify-start">
          <CardSection>
            <p className=" h-6 overflow-clip text-base font-medium">
              {paymentMethod?.title}
            </p>
            <Spacing value={1} />
            <p className="  h-5 overflow-clip text-sm text-sub_secondry_text">
              {paymentMethod?.hint}
            </p>
            {!paymentMethod?.isAvailable && (
              <>
                <Spacing value={1} />
                <p className=" text-light overflow-clip text-xs text-sub_secondry_text">
                  {paymentMethod?.unavailableMessage}
                </p>
              </>
            )}
          </CardSection>
        </CardSection>
        <CardSection className=" flex items-center justify-center">
          <Image
            src={paymentMethod?.icon}
            alt={paymentMethod?.title}
            className=" h-7 w-auto object-contain"
          />
        </CardSection>
      </CardContent>
    </Card>
  );
}
