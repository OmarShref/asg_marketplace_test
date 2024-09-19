"use client";
import { MenuModel } from "@/lib/data/models/MenuModel";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/lib/component/generic/ui/navigation-menu";
import { getDirection } from "@/lib/helper/direction";
import HeaderMenu_Tabs from "../tabs/HeaderMenu_Tabs";
import { useRouter } from "next/navigation";

type Props = {
  storeCode: string;
  menu: MenuModel;
};

export default function HeaderMenu_Bar({ storeCode, menu }: Props) {
  const direction = getDirection(storeCode);
  const router = useRouter();

  return (
    <section className=" flex items-center justify-center bg-slate-100 pt-0.5">
      <NavigationMenu dir={direction}>
        <NavigationMenuList className="min-w-[1024px] max-w-project gap-3 overflow-x-auto">
          {menu?.items?.map((item, index) => {
            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger
                  className=" gap-1 rounded-t bg-transparent text-slate-800"
                  onClick={() => router.push(item?.url)}
                >
                  <p className=" text-sm">{item?.name}</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent className=" h-[400px] max-h-[400px] overflow-y-auto overscroll-contain">
                  <HeaderMenu_Tabs storeCode={storeCode} menuItem={item} />
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  );
}
