import BasicConfirm_Btn from "./BasicConfirm_Btn";
import { cn } from "@/lib/utils/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

export default function ConfirmLocation_Btn({
  storeCode,
  className,
  ...restProps
}: Props) {
  return (
    <div className={cn("", className)}>
      <BasicConfirm_Btn {...restProps}>
        {storeCode.includes("_ar") ? "تأكيد" : "Confirm"}
      </BasicConfirm_Btn>
    </div>
  );
}
