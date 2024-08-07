import * as React from "react";
import { cn } from "@/lib/utils/utils";

const Category = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  return (
    <main ref={ref} className={cn("", className)} {...props}>
      {children}
    </main>
  );
});
Category.displayName = "Category";

// ====================================================================================

const CategoryHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
CategoryHeader.displayName = "CategoryHeader";

// ====================================================================================

const CategoryName = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <h1 ref={ref} className={cn("", className)} {...props}>
      {children}
    </h1>
  );
});
CategoryName.displayName = "CategoryName";

// ====================================================================================

const CategoryQuantity = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p ref={ref} className={cn("", className)} {...props}>
      {children}
    </p>
  );
});
CategoryQuantity.displayName = "CategoryQuantity";

// ====================================================================================

export { Category, CategoryHeader, CategoryName, CategoryQuantity };
