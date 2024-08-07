"use client";
import { Texts, getText } from "@/lib/assets/text";
import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";
import { PlusIcon } from "lucide-react";
import { forwardRef } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

const AddAddress_Btn = forwardRef<HTMLButtonElement, Props>(
  ({ storeCode, className, ...restProps }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          " mx-5 w-full gap-2 rounded-md bg-black py-3 text-base font-medium text-white",
          className,
        )}
        {...restProps}
      >
        <PlusIcon className=" h-6 w-6" />
        <p>{getText({ storeCode: storeCode, text: Texts.addNewAddress })}</p>
      </Button>
    );
  },
);
AddAddress_Btn.displayName = "AddAddress_Btn";
export default AddAddress_Btn;
