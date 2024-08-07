"use client";
import { Texts, getText } from "@/lib/assets/text";
import Image from "@/lib/component/generic/pure/image";
import Spacing from "@/lib/component/generic/pure/spacing";
import { Widget, WidgetContent } from "@/lib/component/generic/pure/widget";
import { tabby } from "@/lib/core/basic/Constants";
import { PaymentMethodType } from "@/lib/data/models/ProductModel";
import { getLanguage, isArabic } from "@/lib/helper/language";
import { cn } from "@/lib/utils/utils";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface TabbyWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  storeCode: string;
  tabbyData: PaymentMethodType;
  allow?: boolean;
}

const TabbyWidgetContent = ({ storeCode, tabbyData }: TabbyWidgetProps) => {
  const [loading, setLoading] = useState(true);
  const language = useRef(getLanguage(storeCode));
  const { price, currency, minAmount, maxAmount, auth } = tabbyData;

  useEffect(() => {
    if (!window.TabbyPromo) {
      const script = document.createElement("script");
      script.src = tabby.widgetUrl;
      script.referrerPolicy = "strict-origin-when-cross-origin";
      document.head.appendChild(script);
      script.addEventListener(
        "load",
        () => {
          setLoading(false);
        },
        false
      );
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      new window.TabbyPromo({
        selector: "#TabbyPromo",
        currency: currency?.value,
        price: price,
        installmentsCount: 4,
        lang: language.current,
        source: "product",
        publicKey: auth[0],
        merchantCode: auth[1],
      });
    }
  }, [loading]);

  return loading ? (
    <></>
  ) : (
    <div
      id="TabbyPromo"
      className="tabby-product-widget !absolute !inset-0 !z-10 !p-0 !opacity-0"
    ></div>
  );
};

// =============================================================================

export default function TabbyWidget({
  storeCode,
  tabbyData,
  allow,
  className,
}: TabbyWidgetProps) {
  const isArabicLanguage = useRef(isArabic(storeCode));
  const [loadWidget, setLoadWidget] = useState(false);
  // const { ref, inView } = useInView({ triggerOnce: true });
  // useEffect(() => {
  //   if (inView) {
  //     setLoadWidget(true);
  //   }
  // }, [inView]);

  // TODO : fix this on click so it works properly
  function handleWidgetClick() {
    if (!loadWidget) {
      setLoadWidget(true);

      setTimeout(() => {
        document.getElementById("TabbyPromo")?.click();
      }, 2500);
    }
  }

  return allow ? (
    <Widget
      // ref={ref}
      className={cn(" relative overflow-hidden", className)}
      onClick={handleWidgetClick}
    >
      <WidgetContent
        className={" relative flex items-start justify-start gap-3"}
      >
        <Image src="/image/tabby.webp" className=" w-16" alt="" />
        <div>
          <p className=" text-center text-sm text-sub_secondry_text">
            {getText({
              storeCode: storeCode,
              text: Texts.splitYourBillOn4InstallmentsWithoutInterest,
            })}
          </p>
          <Spacing value={0.5} />
          <p
            className={` text-xs text-faint_text ${
              isArabicLanguage.current ? "text-center" : "text-start"
            }`}
          >
            {getText({
              storeCode: storeCode,
              text: Texts.chooseTabbyInPaymentPage,
            })}
          </p>
        </div>
        <div className=" absolute bottom-0 end-0 text-xs text-accent underline ">
          {getText({ storeCode: storeCode, text: Texts.learnMore })}
        </div>
      </WidgetContent>
      {loadWidget && (
        <TabbyWidgetContent storeCode={storeCode} tabbyData={tabbyData} />
      )}
    </Widget>
  ) : null;
}
