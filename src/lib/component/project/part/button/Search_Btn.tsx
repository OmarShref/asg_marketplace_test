import { SearchIcon } from "@/lib/assets/svg";
import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export default function Search_Btn({ className, ...restProps }: Props) {
  return (
    <Button className={cn(" text-accent", className)} {...restProps}>
      <SearchIcon />
    </Button>
  );
}
