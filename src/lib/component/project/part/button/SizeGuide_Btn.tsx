import { SizeGuideIcon, SizeTapeIcon } from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import { Button } from "@/lib/component/generic/ui/button";
import { forwardRef } from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}
const SizeGuide_Btn = forwardRef<HTMLButtonElement, Props>(
  ({ storeCode, ...restProps }, ref) => {
    return (
      <Button
        ref={ref}
        className=" flex w-24 gap-0 border border-slate-200 px-1 text-xs "
        {...restProps}
      >
        <SizeGuideIcon className=" h-auto w-8 shrink-0 text-accent" />
        <p className=" whitespace-pre-line text-start">
          {getText({ storeCode: storeCode, text: Texts.sizeGuide })}
        </p>
      </Button>
    );
  },
);
SizeGuide_Btn.displayName = "SizeGuide_Btn";
export default SizeGuide_Btn;
