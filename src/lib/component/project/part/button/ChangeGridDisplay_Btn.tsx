"use client";
import { OneColListIcon } from "@/lib/assets/svg";
import { LayoutGridIcon } from "lucide-react";
import { Button } from "@/lib/component/generic/ui/button";
import { productsListDisplayModes } from "@/lib/core/basic/Constants";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export default function ChangeGridDisplay_Btn({ className }: Props) {
  const { productsListDisplayMode, changeProductsListDisplayMode } =
    useUtilityStore();
  return (
    <Button
      variant={"circle"}
      className={cn(
        " w-9 bg-rounded_btn_background_light text-accent",
        className
      )}
      onClick={() => {
        changeProductsListDisplayMode();
      }}
    >
      {productsListDisplayMode === productsListDisplayModes.multiColumn ? (
        <LayoutGridIcon />
      ) : (
        <OneColListIcon />
      )}
    </Button>
  );
}
