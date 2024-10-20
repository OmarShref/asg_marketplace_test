import * as React from "react";
import { cn } from "@/lib/utils/utils";

const PageBuilder = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  return (
    <main ref={ref} className={cn("", className)} {...props}>
      {children}
    </main>
  );
});
PageBuilder.displayName = "PageBuilder";

// ====================================================================================

const Row = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <>
        <section
          ref={ref}
          className={cn(
            " mb-[10px] w-full items-stretch gap-[10px] px-[10px] lg:px-0",
            className,
          )}
          {...props}
        >
          {children}
        </section>
      </>
    );
  },
);
Row.displayName = "Row";

// ====================================================================================

const ColumnGroup = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  return (
    <>
      <section ref={ref} className={cn("", className)} {...props}>
        {children}
      </section>
    </>
  );
});
ColumnGroup.displayName = "ColumnGroup";

// ====================================================================================

const ColumnLine = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  return (
    <>
      <section ref={ref} className={cn(" gap-[10px] ", className)} {...props}>
        {children}
      </section>
    </>
  );
});
ColumnLine.displayName = "ColumnLine";

// ====================================================================================

const Column = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(" relative grid gap-[10px]", className)}
        {...props}
      >
        {children}
      </section>
    );
  },
);
Column.displayName = "Column";

// ====================================================================================

export { PageBuilder, Row, ColumnGroup, ColumnLine, Column };
