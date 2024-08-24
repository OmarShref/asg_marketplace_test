import { getDirection } from "@/lib/helper/direction";
import { MenuItemType } from "@/lib/data/models/MenuModel";
import Image from "@/lib/component/generic/pure/image";
import Anchor from "@/lib/component/generic/pure/anchor";
import { useState } from "react";

type Props = {
  storeCode: string;
  menuItem: MenuItemType;
};

export default function HeaderMenu_Tabs({ storeCode, menuItem }: Props) {
  return (
    <section className="grid grid-cols-5 items-start justify-start p-5">
      {menuItem?.children?.map((item, index) => {
        return (
          <div className=" flex flex-col gap-1">
            <h4
              key={index}
              className={`  pb-2 text-base font-bold text-accent`}
            >
              {item.name}
            </h4>
            {item?.children?.map((item, index) => {
              return (
                <Anchor
                  href={item?.url}
                  className=" flex items-center justify-start transition-colors lg:hover:text-red-400"
                >
                  <p className=" h-6 overflow-hidden text-sm">{item?.name}</p>
                </Anchor>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}
