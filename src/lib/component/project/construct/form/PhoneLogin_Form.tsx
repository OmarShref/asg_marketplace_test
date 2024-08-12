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
import validator from "validator";
import Spacing from "@/lib/component/generic/pure/spacing";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/component/generic/ui/select";
import { useEffect, useState } from "react";
import { Otp_Drawer } from "../drawer/Otp_Drawer";
import SignIn_Btn from "../../part/button/SignIn_Btn";
import { sendOtp } from "@/lib/network/client/gql/login";
import {
  loginTypes,
  supportedPhoneLoginCountries,
} from "@/lib/core/basic/Constants";
import { useToast } from "@/lib/component/generic/ui/use-toast";
import { PlaceInterface } from "@/lib/data/models/PlaceModel";
import { getAddressCountries } from "@/lib/network/client/gql/address";

type Props = {
  storeCode: string;
};

export function PhoneLogin_Form({ storeCode }: Props) {
  const { toast } = useToast();

  const [openOtpDrawer, setOpenOtpDrawer] = useState(false);

  // 1. Define your schema.
  const formSchema = z.object({
    prefix: z.string().trim().min(1),
    phone: z
      .string()
      .trim()
      .refine(validator.isMobilePhone, {
        message: getText({
          storeCode: storeCode,
          text: Texts.phoneNumberIsNotValid,
        }),
      }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prefix: "966",
      phone: "",
    },
  });

  function getCleanPhone({
    prefix,
    phoneNumber,
  }: {
    prefix: string;
    phoneNumber: string;
  }) {
    let phone = (prefix + phoneNumber)?.replaceAll(" ", "");
    if (phone?.at(2) === "0" || phone?.at(3) === "0") {
      phone = phone?.replace("0", "");
    }

    return phone;
  }
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
      loginType: loginTypes.phone,
      loginData: getCleanPhone({
        prefix: values.prefix,
        phoneNumber: values.phone,
      }),
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

  const [countries, setCountries] = useState<PlaceInterface[]>([]);

  async function handleGetAddressCountries() {
    const countriesData = await getAddressCountries();

    const supportedCountries = countriesData?.filter((country) =>
      supportedPhoneLoginCountries?.includes(country.code),
    );
    setCountries(supportedCountries ?? []);
  }
  useEffect(() => {
    handleGetAddressCountries();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-80 ">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className=" flex-1">
              <FormLabel>
                {getText({
                  storeCode: storeCode,
                  text: Texts.yourPhoneNumber,
                })}
              </FormLabel>
              <Spacing value={1} />
              <FormControl>
                <div
                  className="relative flex items-stretch justify-start rounded-lg bg-form_field_background py-1 ps-1"
                  dir="ltr"
                >
                  {countries?.length > 0 && (
                    <Select
                      defaultValue="966"
                      onValueChange={(value) => form.setValue("prefix", value)}
                    >
                      <SelectTrigger className="font-fontEnglish px-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className=" font-fontEnglish">
                        <SelectGroup>
                          {countries?.map?.((country, index) => {
                            return (
                              <SelectItem
                                key={`${country?.code} ${index}`}
                                value={country?.prefix ?? "966"}
                              >
                                <div className="flex items-center justify-center gap-3">
                                  <p className=" text-xl">{country?.flag}</p>
                                  <p>{country?.prefix}</p>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  <Input
                    type="tel"
                    placeholder={"xxx xxxx ..."}
                    className=" font-fontEnglish border-none bg-transparent py-1"
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
        loginType={loginTypes.phone}
        loginData={getCleanPhone({
          prefix: form?.getValues()?.prefix,
          phoneNumber: form?.getValues()?.phone,
        })}
      />
    </Form>
  );
}
