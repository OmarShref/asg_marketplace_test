import BasicConfirm_Btn from "./BasicConfirm_Btn";
import { cn } from "@/lib/utils/utils";
import { Texts, getText } from "@/lib/assets/text";
import Anchor from "@/lib/component/generic/pure/anchor";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

export default function ReviewProductContinueShopping_Btn({
  storeCode,
  className,
  ...restProps
}: Props) {
  return (
    <div className={cn("", className)}>
      <Anchor href={`/${storeCode}`}>
        <BasicConfirm_Btn {...restProps}>
          {getText({
            storeCode: storeCode,
            text: Texts.reviewAndContinueShopping,
          })}
        </BasicConfirm_Btn>
      </Anchor>
    </div>
  );
}
