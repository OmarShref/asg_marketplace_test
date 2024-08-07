import { ScrollTrigger } from "@/lib/component/generic/pure/scroll";
import { cn } from "@/lib/utils/utils";
import { ChevronUpIcon } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
}

export default function ScrollUp_Btn({ id, className }: Props) {
  return (
    <ScrollTrigger
      id={id}
      variant={"circle"}
      className={cn(
        "fixed bottom-24 right-5 w-12 bg-accent text-white opacity-45 transition-opacity active:opacity-100 lg:hover:opacity-100",
        className,
      )}
    >
      <ChevronUpIcon className="  h-9 w-9" />
    </ScrollTrigger>
  );
}
