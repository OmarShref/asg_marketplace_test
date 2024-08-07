"use client";
import React, { useEffect } from "react";
import { ConfigurationModel } from "@/lib/data/models/ConfigurationModel";
import { cn } from "@/lib/utils/utils";
import LandingPageTab_Btn from "../../part/button/LandingPageTab_Btn";
import { hideShowOnScroll } from "@/lib/helper/scroll";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  configuration: ConfigurationModel;
}

export default function LandingPages_Bar({ configuration, className }: Props) {
  useEffect(() => {
    hideShowOnScroll({ elementId: "landing-pages-bar", topBefore: "52px" });
  }, []);

  return (
    <div
      id="landing-pages-bar"
      className={cn(
        " flex items-center justify-between bg-landingPageTabs_background transition-all delay-0 duration-1000",
        className,
      )}
    >
      {configuration?.mobileLandingPages?.map((landingPage, index) => {
        return (
          <LandingPageTab_Btn
            key={index}
            landingPage={landingPage}
            configuration={configuration}
          />
        );
      })}
    </div>
  );
}
