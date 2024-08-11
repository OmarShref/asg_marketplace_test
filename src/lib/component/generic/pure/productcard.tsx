import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/utils";
import Anchor from "./anchor";
import { LinkPropsInterface } from "./anchor";

const productCardVariants = cva(
  "relative aspect-[55/100] overflow-hidden bg-transparent border border-slate-200 ",
  {
    variants: {
      variant: {
        default: "",
        rounded: " rounded-lg",
        rounded_bottom: " rounded-b-lg",
      },
      size: {
        default: " w-full",
        small: " w-36 md:w-44",
        medium: " w-64",
        large: " w-70",
        full: " w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ProductCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof productCardVariants> {
  asChild?: boolean;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(productCardVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ProductCard.displayName = "ProductCard";

// ====================================================================================

const ProductCardLink = ({ href, children, ...props }: LinkPropsInterface) => {
  return (
    <Anchor href={href} {...props}>
      {children}
    </Anchor>
  );
};
// ====================================================================================

const ProductCardSection = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  return (
    <section ref={ref} className={cn("", className)} {...props}>
      {children}
    </section>
  );
});
ProductCardSection.displayName = "ProductCardSection";

// ====================================================================================

const productCardImageVariants = cva(
  " aspect-[1/1.2] overflow-hidden bg-transparent",
  {
    variants: {
      variant: {
        default: "",
        rounded: " rounded-lg",
      },
      size: {
        default: " w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ProductCardImageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof productCardImageVariants> {
  asChild?: boolean;
}

const ProductCardImage = React.forwardRef<
  HTMLDivElement,
  ProductCardImageProps
>(({ className, variant, size, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(productCardImageVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </div>
  );
});
ProductCardImage.displayName = "ProductCardImage";

// ====================================================================================

const productCardNameVariants = cva(" text-base text-primary_text px-2", {
  variants: {
    variant: {
      default: "text-start",
      center: "text-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ProductCardNameProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof productCardNameVariants> {
  asChild?: boolean;
}

const ProductCardName = React.forwardRef<
  HTMLParagraphElement,
  ProductCardNameProps
>(({ className, variant, children, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(productCardNameVariants({ variant, className }))}
      {...props}
    >
      {children}
    </h2>
  );
});
ProductCardName.displayName = "ProductCardName";

// ====================================================================================

const productCardPricesVariants = cva(" px-2 ", {
  variants: {
    variant: {
      default: "",
      row_center: " flex justify-center items-center gap-1",
      row_start: " flex justify-start items-center gap-1",
      row_end: " flex justify-end items-center gap-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ProductCardPricesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof productCardPricesVariants> {
  asChild?: boolean;
}

const ProductCardPrices = React.forwardRef<
  HTMLDivElement,
  ProductCardPricesProps
>(({ className, variant, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(productCardPricesVariants({ variant, className }))}
      {...props}
    >
      {children}
    </div>
  );
});
ProductCardPrices.displayName = "ProductCardPrices";

// ====================================================================================

const ProductCardPrice = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(" text-base text-primary_text ", className)}
      {...props}
    >
      {children}
    </div>
  );
});
ProductCardPrice.displayName = "ProductCardPrice";

export {
  ProductCard,
  ProductCardSection,
  ProductCardLink,
  ProductCardImage,
  ProductCardName,
  ProductCardPrices,
  ProductCardPrice,
};
