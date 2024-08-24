import { Texts, getText } from "@/lib/assets/text";
import { Button } from "@/lib/component/generic/ui/button";
import { Gift } from "lucide-react";
import { forwardRef } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

const GiftCard_Btn = forwardRef<HTMLButtonElement, Props>(
  ({ storeCode, ...restProps }, ref) => {
    return (
      <Button
        className=" w-full items-center justify-center gap-2 lg:ps-0"
        {...restProps}
      >
        <Gift className=" h-5 w-auto text-accent" />
        <p>{getText({ storeCode: storeCode, text: Texts.giftCards })}</p>
      </Button>
    );
  },
);
GiftCard_Btn.displayName = "GiftCard_Btn";

export default GiftCard_Btn;
