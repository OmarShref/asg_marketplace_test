"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/component/generic/ui/form";
import { Input } from "@/lib/component/generic/ui/input";
import { Texts, getText } from "@/lib/assets/text";
import Spacing from "@/lib/component/generic/pure/spacing";
import { useState } from "react";
import { Otp_Drawer } from "../drawer/Otp_Drawer";
import SignIn_Btn from "../../part/button/SignIn_Btn";
import { sendOtp } from "@/lib/network/client/gql/login";
import { loginTypes } from "@/lib/core/basic/Constants";
import { MailIcon } from "@/lib/assets/svg";
import { useToast } from "@/lib/component/generic/ui/use-toast";

type Props = {
  storeCode: string;
};

export function EmailLogin_Form({ storeCode }: Props) {
  const { toast } = useToast();

  const [openOtpDrawer, setOpenOtpDrawer] = useState(false);

  // 1. Define your schema.
  const formSchema = z.object({
    email: z
      .string()
      .trim()
      .email({
        message: getText({ storeCode: storeCode, text: Texts.emailIsNotValid }),
      }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const signinBtn = document.getElementById("signin_btn");
    if (signinBtn) {
      signinBtn.style.pointerEvents = "none";
      setTimeout(() => {
        signinBtn.style.pointerEvents = "auto";
      }, 2000);
    }

    const sendOtpData = await sendOtp({
      loginType: loginTypes.email,
      loginData: values.email?.toLowerCase(),
    });

    if (sendOtpData?.success === true) {
      setOpenOtpDrawer(true);
    } else {
      toast({
        description: sendOtpData?.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-80 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {getText({
                  storeCode: storeCode,
                  text: Texts.email,
                })}
              </FormLabel>
              <Spacing value={1} />
              <FormControl>
                <div className="relative flex items-center justify-start gap-3 rounded-lg bg-form_field_background px-3 py-3">
                  <MailIcon className=" text-accent" />
                  <Input
                    type="email"
                    placeholder={getText({
                      storeCode: storeCode,
                      text: Texts.email,
                    })}
                    className=" h-auto border-none bg-transparent p-0"
                    {...field}
                  />
                </div>
              </FormControl>
              <Spacing value={1} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Spacing value={10} />
        <SignIn_Btn id="signin_btn" storeCode={storeCode} />
      </form>
      <Otp_Drawer
        storeCode={storeCode}
        open={openOtpDrawer}
        setOpen={setOpenOtpDrawer}
        loginType={loginTypes.email}
        loginData={form.getValues("email")?.toLowerCase()}
      />
    </Form>
  );
}
