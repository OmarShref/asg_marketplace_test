import { cn } from "@/lib/utils/utils";
import { forwardRef } from "react";

const Label = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(" flex items-center justify-center gap-1", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Label.displayName = "Label";

export { Label };
