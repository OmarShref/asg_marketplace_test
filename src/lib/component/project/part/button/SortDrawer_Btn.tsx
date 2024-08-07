import { TrueCircleIcon } from "@/lib/assets/svg";
import { Button } from "@/lib/component/generic/ui/button";
import { Separator } from "@/lib/component/generic/ui/separator";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  applied?: boolean;
}

export default function SortDrawer_Btn({
  children,
  applied = false,
  ...restProps
}: Props) {
  return (
    <Button
      variant={"default"}
      className={` block px-5 text-base font-light ${
        applied ? " bg-faint_accent font-semibold" : " font-light"
      }`}
      {...restProps}
    >
      <div className="flex  items-center justify-start gap-2 py-2">
        {applied && <TrueCircleIcon />}
        {children}
      </div>
      <Separator className=" w-full" />
    </Button>
  );
}
