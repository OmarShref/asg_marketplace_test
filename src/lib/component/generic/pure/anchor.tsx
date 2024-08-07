import { cn } from "@/lib/utils/utils";
import Link, { LinkProps } from "next/link";

export interface LinkPropsInterface
  extends LinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  target?: string;
}

export default function Anchor({
  href,
  children,
  className,
  target,
  ...restProps
}: LinkPropsInterface) {
  return (
    <Link
      href={href ?? ""}
      className={cn(" block", className)}
      target={target ?? ""}
      {...restProps}
    >
      {children}
    </Link>
  );
}
