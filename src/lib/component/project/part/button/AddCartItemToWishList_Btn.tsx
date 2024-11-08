"use client";
import { Texts, getText } from "@/lib/assets/text";
import { Button } from "@/lib/component/generic/ui/button";
import { addOrRemoveWishlistItemController } from "@/lib/controller/productController";
import useUserStore from "@/lib/data/stores/UserStore";
import { cn } from "@/lib/utils/utils";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
  productId: number;
}

export default function AddCartItemToWishList_Btn({
  storeCode,
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
      className={cn(`group gap-1 rounded-full text-xs  `, className)}
      onClick={handleAddOrRemoveWishlistItem}
      {...restProps}
    >
      <HeartIcon
        className={`h-5 w-5 lg:group-hover:fill-red-500 lg:group-hover:text-red-500 ${
          addedToWishList
            ? " fill-red-500 text-red-500"
            : "fill-transparent text-slate-500"
        }`}
      />
    </Button>
  );
}
