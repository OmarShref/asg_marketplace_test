import { Texts, getText } from "@/lib/assets/text";
import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

export default function InlineApply_Btn({
  storeCode,
  className,
  ...restProps
}: Props) {
  return (
    <Button
      type="submit"
      className={cn(" bg-accent px-8  text-background", className)}
      {...restProps}
    >
      {getText({ storeCode: storeCode, text: Texts.apply })}
    </Button>
  );
}
