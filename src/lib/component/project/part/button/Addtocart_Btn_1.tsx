"use client";
import { AddToCartIcon, CartIcon } from "@/lib/assets/svg";
import { Button } from "@/lib/component/generic/ui/button";
import Itemcount_Label from "@/lib/component/project/part/label/Itemcount_Label";
import useUserStore from "@/lib/data/stores/UserStore";
import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  addedToCartCount?: number;
}

export default function Addtocart_Btn_1({
  addedToCartCount = 0,
  className,
  ...restProps
}: Props) {
  const { cart } = useUserStore((state) => state);
  return (
    <Button
      variant={"circle"}
      className={cn(
        ` h-auto w-10 p-0  ring-1 ring-accent hover:bg-accent hover:text-white ${
          addedToCartCount <= 0
            ? "bg-slate-100 text-accent"
            : " bg-accent text-white"
        }`,
        className,
      )}
      {...restProps}
    >
      {addedToCartCount <= 0 ? <AddToCartIcon /> : <CartIcon />}

      {addedToCartCount > 0 && (
        <Itemcount_Label
          value={`${addedToCartCount}`}
          className="  font-fontEnglish bottom-0 left-0"
        />
      )}
    </Button>
  );
}
