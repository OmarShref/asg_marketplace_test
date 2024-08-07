import { Button } from "@/lib/component/generic/ui/button";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export default function QuickSort_Btn({ children, ...restProps }: Props) {
  return (
    <Button
      variant={"rounded"}
      className=" flex items-center justify-between gap-1 px-[14px] py-1 text-xs ring-1 ring-quick_sort_btn_border transition-colors hover:ring-accent"
      {...restProps}
    >
      {children}
    </Button>
  );
}
