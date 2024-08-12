"use client";
import {
  AccountIcon,
  CartIcon,
  CategoriesIcon,
  HomeIcon,
  WishlistIcon,
} from "@/lib/assets/svg";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { isArabic } from "@/lib/helper/language";
import Link from "next/link";
import { useEffect, useState } from "react";
import Itemcount_Label from "../../part/label/Itemcount_Label";
import useUserStore from "@/lib/data/stores/UserStore";
import { CartModel } from "@/lib/data/models/CartModel";
// import { deviceTypes } from "@/lib/core/basic/Constants";

type Props = {
  storeCode: string;
};

type icon = {
  name: [string, string];
  url: string;
  icon: string | JSX.Element;
};

export default function NavBar({ storeCode }: Props) {
  const { cart } = useUserStore((state) => state);
  const [cartState, setCartState] = useState<CartModel | null>(null);
  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  const { navbarOptions } = useUtilityStore();
  const icons: icon[] = [
    {
      name: ["الرئيسية", "Home"],
      url: `/${storeCode}`,
      icon: <HomeIcon />,
    },
    {
      name: ["الفئات", "Categories"],
      url: `/${storeCode}/menu`,
      icon: <CategoriesIcon />,
    },
    {
      name: ["الحقيبة", "Cart"],
      url: `/${storeCode}/cart`,
      icon: <CartIcon />,
    },
    {
      name: ["مفضلاتي", "Wishlist"],
      url: `/${storeCode}/wishlist`,
      icon: <WishlistIcon />,
    },
    {
      name: ["حسابي", "Account"],
      url: `/${storeCode}/account`,
      icon: <AccountIcon />,
    },
  ];

  const [activeMenuItemPosition, setActiveMenuItemPosition] = useState(0);

  return navbarOptions.showNavbar ? (
    <nav className=" fixed bottom-0 z-30 flex h-16 w-full items-center justify-evenly bg-background shadow-navbar md:hidden ">
      {icons.map((icon, i) => {
        return (
          <Link
            href={icon.url}
            key={`${icon.name[1]} menu icon ${i}`}
            className={` relative flex h-full flex-col items-center justify-center after:absolute after:top-0 after:h-1 after:w-3/4 after:rounded-b-md ${
              i === 2 && " bottom-3 after:hidden"
            } ${
              i === activeMenuItemPosition
                ? "text-accent after:bg-accent"
                : "text-slate-400 after:bg-transparent "
            }`}
            onClick={() => setActiveMenuItemPosition(i)}
          >
            <div
              className={` flex-shrink-0 transition-colors ${
                i === 2 &&
                "grid h-12 w-12 place-content-center rounded-full bg-accent text-white"
              }`}
            >
              {icon.icon}
              {i === 2 && (cartState?.quantity ?? 0) > 0 && (
                <Itemcount_Label
                  value={cartState?.quantity?.toString() ?? ""}
                ></Itemcount_Label>
              )}
            </div>
            <p className={`  py-1 text-sm font-medium transition-colors `}>
              {isArabic(storeCode) ? icon.name[0] : icon.name[1]}
            </p>
          </Link>
        );
      })}
    </nav>
  ) : null;
}
