"use client";
import { WishlistIcon } from "@/lib/assets/svg";
import { Button } from "@/lib/component/generic/ui/button";
import { addOrRemoveWishlistItemController } from "@/lib/controller/productController";
import useUserStore from "@/lib/data/stores/UserStore";
import { cn } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  productId: number;
}

export default function Addtowishlist_Btn({
  productId,
  className,
  ...restProps
}: Props) {
  const router = useRouter();
  const { wishList } = useUserStore((state) => state);
  const [addedToWishList, setAddedToWishList] = useState<boolean>(false);
  useEffect(() => {
    const found =
      (wishList?.products?.findIndex((item) => item?.id === productId) ?? -1) >=
      0;
    setAddedToWishList(found);
  }, [wishList, productId, addedToWishList]);
  async function handleAddOrRemoveWishlistItem() {
    addOrRemoveWishlistItemController({
      productId: productId,
      addedToWishList: addedToWishList,
      router: router,
    });
  }
  return (
    <Button
      variant={"circle"}
      className={cn(
        ` h-auto w-10 border border-accent p-0 lg:hover:bg-accent lg:hover:text-white ${
          addedToWishList ? " bg-accent text-white" : "bg-slate-100 text-accent"
        }`,
        className,
      )}
      onClick={handleAddOrRemoveWishlistItem}
      {...restProps}
    >
      <WishlistIcon className=" h-auto w-5" />
    </Button>
  );
}
