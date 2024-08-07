import {
  LocationPinIcon,
  MyOrdersIcon,
  ProductReturnIcon,
} from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import Anchor from "@/lib/component/generic/pure/anchor";
import Spacing from "@/lib/component/generic/pure/spacing";
import { Button } from "@/lib/component/generic/ui/button";
import { Separator } from "@/lib/component/generic/ui/separator";
import { WalletIcon } from "lucide-react";

type Props = {
  storeCode: string;
};

export default function AccountUtility_Bar({ storeCode }: Props) {
  const AccountUtilities = [
    {
      icon: <MyOrdersIcon />,
      label: getText({ storeCode: storeCode, text: Texts.myOrders }),
      url: `/${storeCode}/account/order`,
    },
    {
      icon: <ProductReturnIcon />,
      label: getText({ storeCode: storeCode, text: Texts.return }),
      url: "",
    },
    {
      icon: <WalletIcon />,
      label: getText({ storeCode: storeCode, text: Texts.wallet }),
      url: "",
    },
    {
      icon: <LocationPinIcon />,
      label: getText({ storeCode: storeCode, text: Texts.address }),
      url: `/${storeCode}/account/address`,
    },
  ];
  return (
    <section className=" rounded-t-xl bg-accent px-3">
      <Spacing value={4} />
      <div className=" mx-8 flex items-center justify-between">
        {AccountUtilities.map((utility, index) => (
          <Anchor key={index} href={utility.url}>
            <Button className=" flex-col gap-1 font-light text-background">
              {utility.icon}
              <p>{utility.label}</p>
            </Button>
          </Anchor>
        ))}
      </div>
      <Spacing value={3} />
      <Separator className=" h-0.5" />
      <Spacing value={3} />
    </section>
  );
}
