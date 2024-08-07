"use client";
import { Texts, getText } from "@/lib/assets/text";
import Image from "@/lib/component/generic/pure/image";
import Spacing from "@/lib/component/generic/pure/spacing";
import { Widget, WidgetContent } from "@/lib/component/generic/pure/widget";
import { tamara } from "@/lib/core/basic/Constants";
import { PaymentMethodType } from "@/lib/data/models/ProductModel";
import { getLanguage, isArabic } from "@/lib/helper/language";
import { cn } from "@/lib/utils/utils";
import { useEffect, useRef, useState } from "react";
// import { useInView } from "react-intersection-observer";

interface TamaraWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  storeCode: string;
  tamaraData: PaymentMethodType;
  allow?: boolean;
}

const TamaraWidgetContent = ({ storeCode, tamaraData }: TamaraWidgetProps) => {
  const [loading, setLoading] = useState(true);
  const language = useRef(getLanguage(storeCode));
  const { price, currency, minAmount, maxAmount, auth } = tamaraData;
  useEffect(() => {
    if (!window.TamaraProductWidget) {
      const script = document.createElement("script");
      script.src = tamara.widgetUrl;
      document.head.appendChild(script);
      script.addEventListener(
        "load",
        () => {
          setLoading(false);
        },
        false,
      );
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && window.TamaraProductWidget) {
      window.TamaraProductWidget.init({ lang: language.current });
      window.TamaraProductWidget.render();
    }
  }, [loading]);

  return loading ? (
    <></>
  ) : (
    <div
      id="tamara-product-widget"
      className="tamara-product-widget !absolute !inset-0 !z-10 !p-0 !opacity-0"
      data-lang={language.current}
      data-price={price}
      data-currency={currency?.value}
      data-payment-type="installment"
      data-disable-installment="false"
      data-disable-paylater="false"
      data-installment-minimum-amount={minAmount}
      data-installment-maximum-amount={maxAmount}
      data-installment-available-amount={minAmount}
      data-pay-later-max-amount="0"
    ></div>
  );
};

// =============================================================================

export default function TamaraWidget({
  storeCode,
  tamaraData,
  allow,
  className,
}: TamaraWidgetProps) {
  const isArabicLanguage = useRef(isArabic(storeCode));
  const [loadWidget, setLoadWidget] = useState(false);
  // const { ref, inView } = useInView({ triggerOnce: true });
  // useEffect(() => {
  //   if (inView) {
  //     setLoadWidget(true);
  //   }
  // }, [inView]);

  function handleWidgetClick() {
    if (!loadWidget) {
      setLoadWidget(true);

      setTimeout(() => {
        document.getElementById("tamara-product-widget")?.click();
      }, 2000);
    }
  }

  return allow ? (
    <Widget
      // ref={ref}
      className={cn(" relative overflow-hidden", className)}
      onClick={handleWidgetClick}
    >
      <WidgetContent className=" relative flex items-start justify-start gap-3">
        <Image
          src="/image/ic_tamara.webp"
          alt="Tamara icon"
          className=" w-16"
        />
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
              text: Texts.chooseTamaraInPaymentPage,
            })}
          </p>
        </div>
        <div className=" absolute bottom-0 end-0 text-xs text-accent underline ">
          {getText({ storeCode: storeCode, text: Texts.learnMore })}
        </div>
      </WidgetContent>
      {loadWidget && (
        <TamaraWidgetContent storeCode={storeCode} tamaraData={tamaraData} />
      )}
    </Widget>
  ) : null;
}
