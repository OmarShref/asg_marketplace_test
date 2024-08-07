import { Texts, getText } from "@/lib/assets/text";
import { Button } from "@/lib/component/generic/ui/button";
import { CrownIcon } from "lucide-react";
import { forwardRef } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

const RewardPoints_Btn = forwardRef<HTMLButtonElement, Props>(
  ({ storeCode, ...restProps }, ref) => {
    return (
      <Button
        ref={ref}
        className=" w-full justify-center gap-2 lg:ps-0"
        {...restProps}
      >
        <CrownIcon className=" h-5 w-auto text-yellow-400" />
        <p>{getText({ storeCode: storeCode, text: Texts.myPoints })}</p>
      </Button>
    );
  },
);
RewardPoints_Btn.displayName = "RewardPoints_Btn";

export default RewardPoints_Btn;
