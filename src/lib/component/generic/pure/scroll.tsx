import { Button } from "../ui/button";
import { scrollToId } from "@/lib/controller/scrollController";
import { cn } from "@/lib/utils/utils";

interface ScrollTriggerInterface
  extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  id: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "circle"
    | "rounded"
    | null
    | undefined;
}

const ScrollTrigger = ({
  id,
  className,
  children,
  variant,
  ...restProps
}: ScrollTriggerInterface) => {
  return (
    <Button
      onClick={() => {
        scrollToId({ id: id });
      }}
      variant={variant}
      className={cn("", className)}
      {...restProps}
    >
      {children}
    </Button>
  );
};

// ==============================================================================

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

export default function ScrollDetector({ id, ...restProps }: Props) {
  return <div id={id} {...restProps}></div>;
}

export { ScrollTrigger, ScrollDetector };
