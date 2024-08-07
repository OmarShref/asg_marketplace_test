import { DirectionIcon, PhoneIcon } from "@/lib/assets/svg";
import Spacing from "@/lib/component/generic/pure/spacing";
import { Card, CardSection } from "@/lib/component/generic/ui/card";
import { Separator } from "@/lib/component/generic/ui/separator";
import { AddressModel } from "@/lib/data/models/AddressModel";

type Props = {
  storeCode: string;
  address: AddressModel | undefined;
};

export default function PaymentAddress_Card({ storeCode, address }: Props) {
  return (
    <Card className=" rounded-md border border-dotted border-accent px-3 py-3">
      <CardSection className=" flex items-center justify-start gap-2 ">
        <DirectionIcon className=" h-5 w-5 flex-shrink-0 text-accent" />
        <Separator orientation="vertical" className=" h-4 bg-secondry_text" />
        <p className=" font-montserrat-remove h-auto max-h-[72px] overflow-hidden ">
          {address?.street}
        </p>
      </CardSection>
      <Spacing value={3} />
      <CardSection className=" flex items-center justify-start gap-2 ">
        <PhoneIcon className=" h-5 w-5 flex-shrink-0 text-accent" />
        <Separator orientation="vertical" className=" h-4 bg-secondry_text" />
        <p className=" font-montserrat-remove max-h-6 overflow-hidden ">
          {address?.phone}
        </p>
      </CardSection>
    </Card>
  );
}
