import { Texts, getText } from "@/lib/assets/text";
import Anchor from "@/lib/component/generic/pure/anchor";
import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

export default function ChangeAddress_Btn({
  storeCode,
  className,
  ...restProps
}: Props) {
  return (
    <Button
      variant={"rounded"}
      className={cn(
        "px-10 py-1 text-sm text-accent ring-1 ring-accent",
        className,
      )}
      {...restProps}
    >
      <Anchor href={`/${storeCode}/checkout/shipping`}>
        {getText({ storeCode, text: Texts.changeAddress })}
      </Anchor>
    </Button>
  );
}
