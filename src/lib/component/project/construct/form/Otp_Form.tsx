"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/lib/component/generic/ui/form";
import { Input } from "@/lib/component/generic/ui/input";
import validator from "validator";
import Spacing from "@/lib/component/generic/pure/spacing";
import Verify_Btn from "../../part/button/Verify_Btn";
import { useEffect } from "react";
import { verifyOtp } from "@/lib/network/client/gql/login";
import useUserStore from "@/lib/data/stores/UserStore";
import {
  getCustomer,
  getWishListProducts,
} from "@/lib/network/client/gql/customer";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import { CustomerModel } from "@/lib/data/models/CustomerModel";
import { useToast } from "@/lib/component/generic/ui/use-toast";

type Props = {
  storeCode: string;
  loginType: string;
  loginData: string;
};

export function Otp_Form({ storeCode, loginType, loginData }: Props) {
  const { toast } = useToast();

  // 1. Define your schema.
  const formSchema = z.object({
    otp: z.string().trim().length(4).refine(validator.isNumeric),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const verifyOtpData = await verifyOtp({
      loginType: loginType,
      loginData: loginData,
      otp: values.otp,
    });

    if (verifyOtpData?.success) {
      useUserStore.setState({
        customer: {
          ...useUserStore.getState().customer,
          ...verifyOtpData?.customer,
        },
      });

      const customerData = await getCustomer();

      if (customerData?.customer?.id) {
        const wishListProducts = await getWishListProducts(
          customerData?.wishList,
        );

        useUserStore.setState({
          customer: {
            ...useUserStore.getState().customer,
            ...customerData?.customer,
          },
          cart: customerData?.cart,
          wishList: wishListProducts,
          customerRewardPoints: customerData?.customerRewardPoints,
        });

        new GtmEvents({
          gtmCustomer: CustomerModel.toGtm(customerData?.customer),
        }).login();

        location.reload();
      }
    } else {
      toast({
        description: verifyOtpData?.message,
        variant: "destructive",
      });
    }
  }

  function setFocusOnOtpInput() {
    const otpInput = document.getElementById("otp");
    if (otpInput) {
      otpInput.focus();
    }
  }

  useEffect(() => {
    setFocusOnOtpInput();
  }, []);

  // otp state
  const otpState = form.watch("otp");

  useEffect(() => {
    if (otpState?.length === 4) {
      form.handleSubmit(onSubmit)();
    }
  }, [otpState]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-80 ">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className=" relative" dir="ltr">
                  <Input
                    id="otp"
                    type="tel"
                    max={4}
                    maxLength={4}
                    placeholder={"XXXX"}
                    dir="ltr"
                    className=" font-fontEnglish mx-auto w-full rounded-lg border-none py-4 text-center tracking-[12px] opacity-0 focus-visible:ring-1 focus-visible:ring-accent"
                    {...field}
                  />
                  <div
                    className=" font-fontEnglish absolute left-0 top-0 z-10 flex w-full items-center justify-center gap-4 bg-background"
                    onClick={() => {
                      setFocusOnOtpInput();
                    }}
                  >
                    <p
                      className={` flex aspect-square w-11 items-center justify-center rounded-full bg-form_field_background ${
                        otpState?.length === 0 ? "ring-1 ring-accent" : ""
                      }`}
                    >
                      {otpState?.at(0) ?? ""}
                    </p>
                    <p
                      className={` flex aspect-square w-11 items-center justify-center rounded-full bg-form_field_background ${
                        otpState?.length === 1 ? "ring-1 ring-accent" : ""
                      }`}
                    >
                      {otpState?.at(1) ?? ""}
                    </p>
                    <p
                      className={` flex aspect-square w-11 items-center justify-center rounded-full bg-form_field_background ${
                        otpState?.length === 2 ? "ring-1 ring-accent" : ""
                      }`}
                    >
                      {otpState?.at(2) ?? ""}
                    </p>
                    <p
                      className={` flex aspect-square w-11 items-center justify-center rounded-full bg-form_field_background ${
                        otpState?.length === 3 ? "ring-1 ring-accent" : ""
                      }`}
                    >
                      {otpState?.at(3) ?? ""}
                    </p>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Spacing value={10} />
        {/* <Verify_Btn storeCode={storeCode} disabled={otpState?.length !== 4} /> */}
        <Spacing value={20} />
      </form>
    </Form>
  );
}
