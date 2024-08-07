"use client";
import { Texts, getText } from "@/lib/assets/text";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/lib/component/generic/ui/drawer";
import Spacing from "@/lib/component/generic/pure/spacing";
import { getDirection } from "@/lib/helper/direction";
import Image from "@/lib/component/generic/pure/image";
import Back_Btn from "../../part/button/Back_Btn";
import { Otp_Form } from "../form/Otp_Form";
import { loginTypes } from "@/lib/core/basic/Constants";

type Props = {
  storeCode: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  loginType: string;
  loginData: string;
};

export function Otp_Drawer({
  storeCode,
  open,
  setOpen,
  loginType,
  loginData,
}: Props) {
  const direction = getDirection(storeCode);

  return (
    <Drawer
      open={open}
      onOpenChange={(open) => setOpen(open)}
      dismissible={false}
    >
      <DrawerContent
        style={{ direction: direction }}
        className=" mx-auto h-[100dvh] max-h-[100dvh] max-w-md rounded-t-none"
      >
        <section className=" relative h-full overflow-y-auto">
          <DrawerClose asChild className=" absolute left-3 top-3">
            <Back_Btn
              className=" rotate-180 shadow-circular_btn_inverted"
              onClick={() => setOpen(false)}
            />
          </DrawerClose>
          <Image
            src="/image/otp_bg.png"
            alt="otp background image"
            highPeriority={true}
            className=" h-auto w-full object-contain"
          />
          <Spacing value={8} />
          <p className=" text-center text-2xl font-semibold">
            {getText({ storeCode: storeCode, text: Texts.verifyingOTP })}
          </p>
          <Spacing value={3} />
          <p className=" text-light text-center text-xs">
            {getText({
              storeCode: storeCode,
              text: Texts.weWillSendYouAnOTPOn,
            })}
          </p>
          <p className=" text-center text-sm font-semibold">
            {loginType === loginTypes?.phone
              ? getText({ storeCode: storeCode, text: Texts.phoneNumber })
              : loginType === loginTypes?.email
                ? getText({ storeCode: storeCode, text: Texts.email })
                : ""}
          </p>
          <Spacing value={3} />
          <p
            className=" font-montserrat-remove text-center text-sm font-bold"
            dir="ltr"
          >
            {loginData}
          </p>
          <Spacing value={8} />
          <Otp_Form
            storeCode={storeCode}
            loginType={loginType}
            loginData={loginData}
          />
        </section>
      </DrawerContent>
    </Drawer>
  );
}
