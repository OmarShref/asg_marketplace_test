import { Texts, getText } from "@/lib/assets/text";
import { Button } from "@/lib/component/generic/ui/button";
import { TicketIcon } from "lucide-react";
import { forwardRef } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

const Coupon_Btn = forwardRef<HTMLButtonElement, Props>(
  ({ storeCode, ...restProps }, ref) => {
    return (
      <Button ref={ref} className=" w-full justify-center gap-2" {...restProps}>
        <TicketIcon className=" w-6 h-auto text-green-400" />
        <p>{getText({ storeCode: storeCode, text: Texts.coupons })}</p>
      </Button>
    );
  }
);
Coupon_Btn.displayName = "Coupon_Btn";

export default Coupon_Btn;
