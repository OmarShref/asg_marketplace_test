"use client";
import { CartIcon } from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import { cn } from "@/lib/utils/utils";
import { Button } from "@/lib/component/generic/ui/button";
import Product_Counter from "../../construct/counter/Product_Counter";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
  inStock: boolean;
  productCount: number;
  setProductCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function Addtocart_Btn_2({
  storeCode,
  inStock,
  productCount,
  setProductCount,
  className,
  ...restProps
}: Props) {
  return (
    <div
      className={cn(
        " fixed bottom-0 left-0 z-10 flex w-full items-center justify-between gap-5 bg-slate-100 px-5 py-2",
        className,
      )}
    >
      <Product_Counter
        productCount={productCount}
        setProductCount={setProductCount}
      />
      <Button
        variant={"brand"}
        className={` w-full gap-2 py-2 font-medium text-background`}
        {...restProps}
      >
        {inStock ? (
          <>
            <CartIcon />
            <p className="">
              {getText({ storeCode: storeCode, text: Texts.addToCart })}
            </p>
          </>
        ) : (
          <p>
            {getText({
              storeCode: storeCode,
              text: Texts.pleaseNotifyMeWhenItIsAvailable,
            })}
          </p>
        )}
      </Button>
    </div>
  );
}
