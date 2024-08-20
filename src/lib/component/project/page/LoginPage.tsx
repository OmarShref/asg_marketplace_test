"use client";
import PageType from "../../generic/utility/PageType";
import { loginTypes, pageTypes } from "@/lib/core/basic/Constants";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import Spacing from "../../generic/pure/spacing";
import useUserStore from "@/lib/data/stores/UserStore";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Back_Btn from "../part/button/Back_Btn";
// import { isArabic } from "@/lib/helper/language";
import { Texts, getText } from "@/lib/assets/text";
import {
  AppleIcon,
  FaceBookRoundedIcon,
  GoogleIcon,
  MailIcon,
  MobileLogo,
  PhoneIcon,
} from "@/lib/assets/svg";
import { Button } from "../../generic/ui/button";
import { PhoneLogin_Form } from "../construct/form/PhoneLogin_Form";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import { EmailLogin_Form } from "../construct/form/EmailLogin_Form";
import Page_Transition from "../part/transition/Page_Transition";

type Props = {
  storeCode: string;
  withBackBtn?: boolean;
};

export default function LoginPage({ storeCode, withBackBtn = true }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  // const isArabicLanguage = isArabic(storeCode);

  const { customer } = useUserStore((state) => state);
  useEffect(() => {
    if (customer?.id) {
      if (pathname?.includes("/checkout")) {
        router.push(`/${storeCode}/checkout/shipping`);
      } else {
        router.push(`/${storeCode}`);
      }
    }
  }, [customer]);

  const [loginType, setLoginType] = useState<string>(loginTypes.phone);

  return (
    <Page_Transition>
      <main className={`relative mx-5`}>
        {withBackBtn && (
          <Back_Btn className=" absolute left-0 top-3 rotate-180 shadow-circular_btn_inverted" />
        )}
        <Spacing value={20} />

        <MobileLogo className=" mx-auto w-36 text-accent" />

        <Spacing value={11} />
        <section>
          <p className=" text-center text-2xl font-semibold">
            {getText({ storeCode: storeCode, text: Texts.welcome })}
          </p>
          <Spacing value={1} />
          <p className=" px-4 text-center text-sm font-light text-sub_secondry_text">
            {getText({
              storeCode: storeCode,
              text: Texts.loginWithYourPhoneNumberOrThroughEmail,
            })}
          </p>
        </section>
        <Spacing value={12} />
        {/* <section>
        <p className=" px-4 text-center text-sm font-light">
          {getText({
            storeCode: storeCode,
            text: Texts.loginWith,
          })}
        </p>
        <Spacing value={5} />
        <div className=" flex items-center justify-center gap-9">
          <Button className=" aspect-square w-12 rounded-xl border border-social_login_btn_border bg-social_login_btn_background">
            <AppleIcon className="h-6 w-6" />
          </Button>
          <Button className=" aspect-square w-12 rounded-xl border border-social_login_btn_border bg-social_login_btn_background">
            <FaceBookRoundedIcon className="h-6 w-6" />
          </Button>
          <Button className=" aspect-square w-12 rounded-xl border border-social_login_btn_border bg-social_login_btn_background">
            <GoogleIcon className="h-6 w-6" />
          </Button>
        </div>
      </section> */}
        <Spacing value={9} />
        <section>
          <p className=" text-center text-2xl font-semibold ">
            {getText({ storeCode: storeCode, text: Texts.login })}
          </p>
          <Spacing value={3} />
          <div className=" flex items-center justify-center gap-4">
            <Button
              className=" bg-faint_accent px-3 py-2 text-accent"
              onClick={() => {
                setLoginType(loginTypes.phone);
              }}
            >
              <PhoneIcon />
            </Button>
            <Button
              className=" bg-faint_accent px-3 py-2 text-accent"
              onClick={() => {
                setLoginType(loginTypes.email);
              }}
            >
              <MailIcon className=" h-6 w-6" />
            </Button>
          </div>
          <Spacing value={3} />
          {loginType === loginTypes.phone && (
            <PhoneLogin_Form storeCode={storeCode} />
          )}
          {loginType === loginTypes.email && (
            <EmailLogin_Form storeCode={storeCode} />
          )}
        </section>
        <Spacing value={40} />
        <PageType pageType={pageTypes.login} />
        <HeaderOptions
          headerOptions={{
            showHeader: false,
          }}
        />
        <NavbarOptions navbarOptions={{ showNavbar: false }} />
      </main>
    </Page_Transition>
  );
}
