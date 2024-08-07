import { Texts, getText } from "@/lib/assets/text";
import { Button } from "@/lib/component/generic/ui/button";
import { EditIcon } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

export default function AccountInfo_Btn({ storeCode, ...restProps }: Props) {
  return (
    <Button className=" gap-1 px-1 text-xs text-accent" {...restProps}>
      <EditIcon className=" h-4 w-4 " />
      {getText({ storeCode: storeCode, text: Texts.accountInfo })}
    </Button>
  );
}
