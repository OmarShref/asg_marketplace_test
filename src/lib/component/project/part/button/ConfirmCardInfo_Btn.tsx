import BasicConfirm_Btn from "./BasicConfirm_Btn";
import { Texts, getText } from "@/lib/assets/text";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

export default function ConfirmCardInfo_Btn({
  storeCode,
  ...restProps
}: Props) {
  return (
    <BasicConfirm_Btn
      type="submit"
      className=" mx-auto block w-3/4 max-w-60"
      {...restProps}
    >
      {getText({ storeCode: storeCode, text: Texts.confirm })}
    </BasicConfirm_Btn>
  );
}
