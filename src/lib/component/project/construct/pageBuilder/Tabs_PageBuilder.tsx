"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/component/generic/ui/tabs";
import { getDirection } from "@/lib/helper/direction";
import { useState } from "react";
import { renderPageBuilderComponent } from "../pageBuilder/Cms";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";
import Transition_1 from "../../part/transition/Transition_1";
import Image from "@/lib/component/generic/pure/image";

type Props = {
  storeCode: string;
  tabs: PageBuilderType | undefined;
};

export default function Menu_Tabs({ storeCode, tabs }: Props) {
  const direction = getDirection(storeCode);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Tabs
      defaultValue="0"
      className=" relative"
      style={{ direction: direction }}
      value={currentIndex.toString()}
      onValueChange={(value) => {
        setCurrentIndex(Number(value));
      }}
    >
      <section className="flex justify-start gap-3">
        {/* Side bar tabs */}
        <TabsList className=" flex aspect-square w-[20%] flex-col justify-start overflow-y-scroll">
          {tabs?.children?.map((item, index) => {
            return (
              <TabsTrigger
                key={index}
                value={`${index}`}
                className={` relative flex w-full items-center justify-start whitespace-normal border-b py-2.5 lg:hover:border-b-accent lg:hover:text-accent  ${index === currentIndex ? "border-b-accent font-medium text-accent" : "font-light text-slate-400"} ${index === 0 && "pt-0"}`}
              >
                <p
                  className={`line-clamp-1 w-full text-ellipsis text-start text-base`}
                >
                  {item.name}
                </p>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* ============================================ */}

        {/* Content */}
        {tabs?.children?.map((child, index) => {
          return (
            <TabsContent
              key={index}
              value={`${index}`}
              className=" w-[calc(80%-12px)]"
            >
              <Transition_1 className="flex h-full w-full items-stretch justify-start gap-3">
                <div className="w-[210px] shrink-0 pt-8">
                  <Image
                    src={child?.properties?.mobileIamge}
                    alt=""
                    className=" rounded-lg"
                  />
                </div>
                <div className="w-[calc(100%-212px)]">
                  {renderPageBuilderComponent({
                    storeCode,
                    child,
                  })}
                </div>
              </Transition_1>
            </TabsContent>
          );
        })}
      </section>
    </Tabs>
  );
}