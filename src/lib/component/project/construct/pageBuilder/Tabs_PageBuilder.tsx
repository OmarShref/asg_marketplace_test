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
  isSmallDevice: boolean;
};

export default function Menu_Tabs({ storeCode, tabs, isSmallDevice }: Props) {
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
      <section className=" flex flex-col justify-start gap-3 lg:flex-row">
        {/* Side bar tabs */}
        <TabsList className=" flex w-full flex-row justify-start gap-4 overflow-y-scroll lg:aspect-square lg:w-[20%] lg:flex-col lg:gap-0">
          {tabs?.children?.map((item, index) => {
            return (
              <TabsTrigger
                key={index}
                value={`${index}`}
                className={` relative flex w-fit items-center justify-start whitespace-nowrap border-b py-2.5 lg:w-full lg:whitespace-normal lg:hover:border-b-accent lg:hover:text-accent  ${index === currentIndex ? "border-b-accent font-medium text-accent" : "font-light text-slate-400"} ${index === 0 && "lg:pt-0"}`}
              >
                <p
                  className={`w-fit text-start text-base lg:line-clamp-1 lg:w-full lg:text-ellipsis`}
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
              className=" w-full lg:w-[calc(80%-12px)]"
            >
              <Transition_1 className="flex h-full w-full flex-col items-stretch justify-start gap-3 lg:flex-row">
                <div className="w-full shrink-0 lg:w-[210px] lg:pt-8">
                  <Image
                    src={
                      isSmallDevice
                        ? child?.properties?.mobileIamge
                        : child?.properties?.desktopImage
                    }
                    alt=""
                    className=" rounded-lg"
                  />
                </div>
                <div className="w-full lg:w-[calc(100%-212px)]">
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
