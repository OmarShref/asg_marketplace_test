"use client";
import { Texts, getText } from "@/lib/assets/text";
import { cn } from "@/lib/utils/utils";
import BasicConfirm_Btn from "../../part/button/BasicConfirm_Btn";
import Anchor from "@/lib/component/generic/pure/anchor";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
  setAddedToCartDrawerOpen: (open: boolean) => void;
}

export default function ConfirmAddedToCart_Bar({
  storeCode,
  className,
  setAddedToCartDrawerOpen,
}: Props) {
  return (
    <section className={cn(" px-5", className)}>
      <div className=" flex  items-center justify-between gap-3 ">
        <BasicConfirm_Btn
          className={` basis-1/2 border border-background_inverted bg-background`}
          onClick={() => {
            setAddedToCartDrawerOpen(false);
          }}
        >
          <p className=" text-sm text-primary_text">
            {getText({ storeCode: storeCode, text: Texts.continueShopping })}
          </p>
        </BasicConfirm_Btn>
        <BasicConfirm_Btn
          className={` basis-1/2 `}
          onClick={() => {
            setAddedToCartDrawerOpen(false);
          }}
        >
          <Anchor href={`/${storeCode}/cart`}>
            <p className="text-sm">
              {getText({ storeCode: storeCode, text: Texts.showCart })}
            </p>
          </Anchor>
        </BasicConfirm_Btn>
      </div>
    </section>
  );
}
