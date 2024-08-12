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
    <section className=" flex items-center justify-center border-b border-t border-accent bg-background py-2">
      <NavigationMenu dir={direction}>
        <NavigationMenuList className="min-w-[1024px] max-w-project gap-3 overflow-x-auto">
          {menu?.items?.map((item, index) => {
            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger
                  className=" gap-1 rounded-full bg-slate-100 ps-5 text-slate-800"
                  onClick={() => router.push(item?.url)}
                >
                  <p className="">{item?.name}</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent className=" h-[600px] max-h-[600px] overflow-y-auto">
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
