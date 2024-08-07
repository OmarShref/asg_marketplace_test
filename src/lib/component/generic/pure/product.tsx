import * as React from "react";
import { cn } from "@/lib/utils/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { Button } from "../ui/button";

const Product = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  return (
    <main ref={ref} className={cn("", className)} {...props}>
      {children}
    </main>
  );
});
Product.displayName = "Product";

// ====================================================================================

const ProductSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <section ref={ref} className={cn("", className)} {...props}>
      {children}
    </section>
  );
});
ProductSection.displayName = "ProductSection";

// ====================================================================================

const ProductImages = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
ProductImages.displayName = "ProductImages";

// ====================================================================================

const ProductName = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <h1 ref={ref} className={cn(" text-2xl font-medium", className)} {...props}>
      {children}
    </h1>
  );
});
ProductName.displayName = "ProductName";

// ====================================================================================

const ProductPrice = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
ProductPrice.displayName = "ProductPrice";

// ====================================================================================

const ProductRatingSummary = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
ProductRatingSummary.displayName = "ProductRatingSummary";

// ====================================================================================

const ProductGift = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
ProductGift.displayName = "ProductGift";

// ====================================================================================

const ProductVariants = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
ProductVariants.displayName = "ProductVariants";

// ====================================================================================

const ProductVariant = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
ProductVariant.displayName = "ProductVariant";

// ====================================================================================

const ProductVariantHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
ProductVariantHeader.displayName = "ProductVariantHeader";

// ====================================================================================

const ProductVariantTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(" text-sm font-semibold", className)}
      {...props}
    >
      {children}
    </div>
  );
});
ProductVariantTitle.displayName = "ProductVariantTitle";

// ====================================================================================

const ProductVariantOptions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        " flex flex-wrap items-center justify-start gap-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ProductVariantOptions.displayName = "ProductVariantOptions";

// ====================================================================================

const ProductVariantOptionVariants = cva(" rounded-full aspect-square", {
  variants: {
    variant: {
      text_swatch:
        " w-7 ring-circular_change_btn_border font-montserrat-remove text-xs ring-1",
      color_swatch:
        " w-7 bg-cover bg-center bg-no-repeat border border-product_colorswatch_border ring-2 ring-background",
    },
  },
  defaultVariants: {
    variant: "text_swatch",
  },
});

interface ProductVariantOptionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ProductVariantOptionVariants> {
  asChild?: boolean;
}

const ProductVariantOption = React.forwardRef<
  HTMLButtonElement,
  ProductVariantOptionProps
>(({ className, variant, children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={cn(
        "relative disabled:opacity-100 disabled:after:absolute disabled:after:h-0.5 disabled:after:w-full disabled:after:-rotate-45 disabled:after:bg-danger disabled:after:ring-1 disabled:after:ring-background",
        ProductVariantOptionVariants({ variant, className }),
      )}
      {...props}
    >
      {children}
    </Button>
  );
});
ProductVariantOption.displayName = "ProductVariantOption";

// ====================================================================================

export {
  Product,
  ProductSection,
  ProductImages,
  ProductName,
  ProductPrice,
  ProductRatingSummary,
  ProductGift,
  ProductVariants,
  ProductVariant,
  ProductVariantHeader,
  ProductVariantTitle,
  ProductVariantOptions,
  ProductVariantOption,
};
