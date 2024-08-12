"use client";
import { Button } from "@/lib/component/generic/ui/button";
import { addOrRemoveWishlistItemController } from "@/lib/controller/productController";
import useUserStore from "@/lib/data/stores/UserStore";
import { cn } from "@/lib/utils/utils";
import { HeartIcon } from "lucide-react";
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
        `group h-auto w-10 border border-accent bg-background p-0`,
        className,
      )}
      onClick={handleAddOrRemoveWishlistItem}
      {...restProps}
    >
      <HeartIcon
        className={` h-auto w-5 fill-transparent text-accent transition-all duration-300 group-hover:fill-red-500 group-hover:text-red-500 ${addedToWishList ? "fill-red-500 text-red-500" : ""}`}
      />
    </Button>
  );
}
