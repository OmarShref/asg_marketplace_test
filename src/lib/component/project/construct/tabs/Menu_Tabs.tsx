"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/component/generic/ui/tabs";
import { getDirection } from "@/lib/helper/direction";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { MenuModel } from "@/lib/data/models/MenuModel";
import { Menu_Accordion } from "../accordion/Menu_Accordion";
import Cms from "../pageBuilder/Cms";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import Image from "@/lib/component/generic/pure/image";
import Spacing from "@/lib/component/generic/pure/spacing";

type Props = {
  storeCode: string;
  menu: MenuModel;
};

export default function Menu_Tabs({ storeCode, menu }: Props) {
  const direction = getDirection(storeCode);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState<number>();

  const pullStart = (e: any) => {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
  };

  const pull = (e: any) => {
    const touch = e.targetTouches[0];

    const { screenY } = touch;

    let pullLength = screenY - startPoint;
    setPullChange(pullLength);
  };

  const endPull = (e: any) => {
    setStartPoint(0);
    setPullChange(0);
    if ((pullChange ?? 0) > 20 && window.scrollY <= 0) {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    } else {
      const maxHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      );

      const windowHeight = window.innerHeight;
      const maxScroll = maxHeight - windowHeight;

      if ((pullChange ?? 0) < -20 && window.scrollY >= maxScroll) {
        if (currentIndex < menu?.items?.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("touchstart", pullStart);
    window.addEventListener("touchmove", pull);
    window.addEventListener("touchend", endPull);
    return () => {
      window.removeEventListener("touchstart", pullStart);
      window.removeEventListener("touchmove", pull);
      window.removeEventListener("touchend", endPull);
    };
  });

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
      <section className="flex justify-start overscroll-contain">
        {/* Side bar tabs */}
        <TabsList className=" sticky top-16 flex h-fit basis-[30%] flex-col gap-2 overscroll-contain pt-2">
          {menu?.items?.map((item, index) => {
            return (
              <TabsTrigger
                key={index}
                value={`${index}`}
                className={` relative flex min-h-[60px] w-full origin-right overflow-clip rounded-e-lg bg-menu_tab_background duration-300 data-[state=active]:start-2 data-[state=active]:z-10 data-[state=active]:min-h-20 data-[state=active]:w-[110%] data-[state=active]:items-end data-[state=active]:justify-start data-[state=active]:shadow-md `}
                style={{
                  backgroundColor: `${
                    index === currentIndex ? item?.labelBackgroundColor : ""
                  }`,
                }}
              >
                {index === currentIndex && (
                  <Image
                    src={item?.icon}
                    className={` absolute h-full w-full object-cover`}
                    style={{
                      transform: direction === "rtl" ? " rotateY(180deg)" : "",
                    }}
                    alt=""
                  />
                )}
                <p
                  className={` z-10  ${
                    index === currentIndex
                      ? " w-1/2 whitespace-normal pb-2 ps-3"
                      : ""
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

        {/* ============================================ */}

        {/* Content */}
        {menu?.items?.map((item, index) => {
          return (
            <TabsContent
              key={index}
              value={`${index}`}
              className=" flex-1 overscroll-contain pe-3  ps-5"
            >
              <section>
                <div>
                  <Cms
                    cms={
                      new CmsPageModel({
                        cmsPageData: item,
                        storeCode: storeCode,
                      })
                    }
                    storeCode={storeCode}
                  />
                </div>
                <div>
                  {item?.children?.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <Menu_Accordion storeCode={storeCode} menuItem={item} />
                        <Spacing value={8} />
                      </Fragment>
                    );
                  })}
                </div>
              </section>
            </TabsContent>
          );
        })}
      </section>
    </Tabs>
  );
}
