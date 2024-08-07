import { GiftCardIcon } from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import { Button } from "@/lib/component/generic/ui/button";
import { forwardRef } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

const GiftCard_Btn = forwardRef<HTMLButtonElement, Props>(
  ({ storeCode, ...restProps }, ref) => {
    return (
      <Button className=" w-full justify-center gap-2 lg:ps-0" {...restProps}>
        <GiftCardIcon />
        <p>{getText({ storeCode: storeCode, text: Texts.bloomingCards })}</p>
      </Button>
    );
  },
);
GiftCard_Btn.displayName = "GiftCard_Btn";

export default GiftCard_Btn;
