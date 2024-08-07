"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/component/generic/ui/tabs";
import { getDirection } from "@/lib/helper/direction";
import { MenuItemType } from "@/lib/data/models/MenuModel";
import Cms from "../pageBuilder/Cms";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import Image from "@/lib/component/generic/pure/image";
import Anchor from "@/lib/component/generic/pure/anchor";
import { useState } from "react";
import Spacing from "@/lib/component/generic/pure/spacing";
import { NavigationMenuLink } from "@/lib/component/generic/ui/navigation-menu";

type Props = {
  storeCode: string;
  menuItem: MenuItemType;
};

export default function HeaderMenu_Tabs({ storeCode, menuItem }: Props) {
  const direction = getDirection(storeCode);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Tabs
      defaultValue="0"
      className=" h-[600px] max-h-[600px] overflow-hidden"
      style={{ direction: direction }}
      onValueChange={(value) => {
        setCurrentIndex(Number(value));
      }}
    >
      <section className="flex items-start justify-start">
        <div className=" z-20 flex h-[600px] basis-[30%] flex-col justify-start overflow-y-scroll">
          {/* menu item image */}
          <Cms
            cms={
              new CmsPageModel({
                cmsPageData: menuItem,
                storeCode: storeCode,
              })
            }
            storeCode={storeCode}
            classNameArray={["px-0 w-full rounded-lg overflow-clip"]}
          />

          {/* Side bar tabs */}
          <TabsList className=" flex h-fit basis-[30%] flex-col gap-4 py-0 pt-2">
            {menuItem?.children?.map((item, index) => {
              return (
                <TabsTrigger
                  key={index}
                  value={`${index}`}
                  className={` relative flex min-h-[64px] w-full origin-right overflow-clip rounded-e-md bg-menu_tab_background duration-300 data-[state=active]:z-10 data-[state=active]:max-h-20 data-[state=active]:min-h-20 data-[state=active]:items-center  data-[state=active]:justify-center data-[state=active]:rounded-e-md data-[state=active]:bg-faint_accent data-[state=active]:shadow-md `}
                  style={{
                    backgroundColor: `${
                      index === currentIndex ? " bg-faint_accent" : ""
                    }`,
                  }}
                >
                  <p
                    className={` z-10 transition-all  ${
                      index === currentIndex ? " text-lg" : ""
                    }`}
                    style={{
                      color: `${
                        index === currentIndex ? item?.labelTextColor : ""
                      }`,
                    }}
                  >
                    {item.name}
                  </p>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <Spacing value={4} className=" shrink-0" />
        </div>

        {/* Content */}
        {menuItem?.children?.map((item, index) => {
          return (
            <TabsContent
              key={index}
              value={`${index}`}
              className=" h-[600px] flex-1 overflow-y-auto pe-3 ps-5"
            >
              <section className=" grid grid-cols-5 gap-y-4 py-4">
                {item?.children?.map((item, index) => {
                  return (
                    <NavigationMenuLink asChild key={index}>
                      <Anchor
                        href={item?.url}
                        className=" flex flex-col items-center justify-center gap-3 "
                      >
                        <div className=" aspect-square w-[70%] overflow-hidden rounded-full">
                          <Image src={item?.icon} />
                        </div>
                        <p className=" h-6 overflow-hidden">{item?.name}</p>
                      </Anchor>
                    </NavigationMenuLink>
                  );
                })}
              </section>
            </TabsContent>
          );
        })}
      </section>
    </Tabs>
  );
}
