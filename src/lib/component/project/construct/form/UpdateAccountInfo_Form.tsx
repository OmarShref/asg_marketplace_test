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
import { isArabic } from "@/lib/helper/language";
import { getDirection } from "@/lib/helper/direction";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/lib/component/generic/ui/popover";
// import { cn } from "@/lib/utils/utils";
// import { Button } from "@/lib/component/generic/ui/button";
// import { Calendar } from "@/lib/component/generic/ui/calendar";
import { format } from "date-fns";
import { GenderIcon, GiftIcon, MailIcon, ProfileIcon } from "@/lib/assets/svg";
import ConfirmAccountInfo_Btn from "../../part/button/ConfirmAccountInfo_Btn";
import {
  getCustomer,
  updateCustomerInfo,
} from "@/lib/network/client/gql/customer";
import useUserStore from "@/lib/data/stores/UserStore";
import { useRouter } from "next/navigation";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import { CustomerModel } from "@/lib/data/models/CustomerModel";
import { useToast } from "@/lib/component/generic/ui/use-toast";

type Props = {
  storeCode: string;
};

export function UpdateAccountInfo_Form({ storeCode }: Props) {
  const router = useRouter();
  const isArabicLanguage = isArabic(storeCode);
  const direction = getDirection(storeCode);
  const { toast } = useToast();

  const [prefix, setPrefix] = useState("966");

  const { customer } = useUserStore((state) => state);
  const [customerState, setCustomerState] = useState<CustomerModel | null>(
    null,
  );
  useEffect(() => {
    setCustomerState(customer);
  }, [customer]);

  // 1. Define your schema.
  const formSchema = z.object({
    firstName: z.string().trim().min(2).max(50),
    lastName: z.string().trim().min(2).max(50),
    phone: z
      .string()
      .trim()
      .startsWith("5", {
        message: `${getText({
          storeCode: storeCode,
          text: Texts.phoneNumberShouldStartWith,
        })} 5`,
      })
      .length(9, {
        message: `${getText({
          storeCode: storeCode,
          text: Texts.phoneNumberLengthShouldBe,
        })} 9 ${getText({ storeCode: storeCode, text: Texts.numbers })}`,
      })
      .refine(validator.isMobilePhone, {
        message: getText({
          storeCode: storeCode,
          text: Texts.phoneNumberIsNotValid,
        }),
      }),
    email: z
      .string()
      .trim()
      .email({
        message: getText({ storeCode: storeCode, text: Texts.emailIsNotValid }),
      }),
    day: z
      .string()
      .trim()
      .max(2, { message: " " })
      .refine((value) => Number(value) <= 31 || value === "", {
        message: "",
      })
      .optional(),
    month: z
      .string()
      .trim()
      .max(2, { message: " " })
      .refine((value) => Number(value) <= 12 || value === "", {
        message: "",
      })
      .optional(),
    gender: z.enum(["MALE", "FEMALE"]),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: customer?.firstName ?? "",
      lastName: customer?.lastName ?? "",
      phone: Number(customer?.phone) ? customer?.phone?.slice(3) : "",
      email:
        !/^\d+@/.test(customer?.email ?? "") && !!customer?.email
          ? customer?.email
          : "",
      day: customer?.dateOfBirth?.split("-")?.at(2) ?? "",
      month: customer?.dateOfBirth?.split("-")?.at(1) ?? "",
      gender: (customer?.gender as "MALE" | "FEMALE") ?? "FEMALE",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updateAccountInfoData = await updateCustomerInfo({
      firstName: values.firstName,
      lastName: values.lastName,
      phone:
        (prefix + values.phone)?.replaceAll(" ", "")?.at(3) === "0"
          ? (prefix + values.phone)?.replaceAll(" ", "")?.replace("0", "")
          : (prefix + values.phone)?.replaceAll(" ", ""),
      email: values.email?.toLowerCase(),
      gender: values.gender,
      ...(values.day && values.month
        ? { dateOfBirth: `2000-${values.month}-${values.day}` }
        : {}),
    });

    if (updateAccountInfoData?.success === true) {
      const customerData = await getCustomer();

      if (customerData?.customer?.id) {
        useUserStore.setState({
          customer: customerData?.customer,
          cart: customerData?.cart,
          customerRewardPoints: customerData?.customerRewardPoints,
        });

        new GtmEvents({
          gtmCustomer: CustomerModel.toGtm(customerData?.customer),
        }).userUpdate();
        router.push(`/${storeCode}/account`);
      }
    } else {
      toast({
        description: updateAccountInfoData?.message,
        variant: "destructive",
      });
    }
  }

  return (
    customerState && (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full "
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getText({
                    storeCode: storeCode,
                    text: Texts.firstName,
                  })}
                </FormLabel>
                <Spacing value={1} />
                <FormControl>
                  <div className="relative flex items-center justify-start gap-3 rounded-lg bg-form_field_background px-3 py-3">
                    <ProfileIcon className=" text-accent " />
                    <Input
                      type="text"
                      maxLength={50}
                      placeholder={getText({
                        storeCode: storeCode,
                        text: Texts.firstName,
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
          <Spacing value={3} />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getText({
                    storeCode: storeCode,
                    text: Texts.lastName,
                  })}
                </FormLabel>
                <Spacing value={1} />
                <FormControl>
                  <div className="relative flex items-center justify-start gap-3 rounded-lg bg-form_field_background px-3 py-3">
                    <ProfileIcon className=" text-accent " />
                    <Input
                      type="text"
                      maxLength={50}
                      placeholder={getText({
                        storeCode: storeCode,
                        text: Texts.lastName,
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
          <Spacing value={3} />
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
                    className="relative flex items-center justify-start gap-3 rounded-lg bg-form_field_background px-3 py-3"
                    dir="ltr"
                  >
                    <Select
                      defaultValue="966"
                      onValueChange={(value) => setPrefix(value)}
                      disabled={!!customer?.phone}
                    >
                      <SelectTrigger className="font-montserrat-remove px-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className=" font-montserrat-remove">
                        <SelectGroup>
                          <SelectItem value="966">
                            <div className="flex flex-row items-center justify-center gap-1">
                              <p>🇸🇦</p>
                              <p>+966</p>
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Input
                      type="tel"
                      placeholder={"5x xxx xxxx"}
                      className=" font-montserrat-remove h-auto border-none bg-transparent p-0"
                      disabled={!!Number(customer?.phone)}
                      {...field}
                    />
                  </div>
                </FormControl>
                <Spacing value={1} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Spacing value={3} />
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
                      disabled={
                        !!customer?.email && !/^\d+@/.test(customer?.email)
                      }
                      {...field}
                    />
                  </div>
                </FormControl>
                <Spacing value={1} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Spacing value={3} />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getText({
                    storeCode: storeCode,
                    text: Texts.gender,
                  })}
                </FormLabel>
                <Spacing value={1} />
                <FormControl>
                  <div className="relative flex w-fit items-center justify-start gap-3 rounded-lg bg-form_field_background px-3 py-3">
                    <GenderIcon className=" h-5 text-accent " />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={`pe-2 ${
                          isArabicLanguage ? "" : "font-montserrat-remove"
                        } `}
                        dir={direction}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                        className={`${
                          isArabicLanguage ? "" : "font-montserrat-remove"
                        } `}
                        dir={direction}
                      >
                        <SelectGroup>
                          <SelectItem value="MALE">
                            <p className="ps-2">
                              {getText({
                                storeCode: storeCode,
                                text: Texts.male,
                              })}
                            </p>
                          </SelectItem>
                          <SelectItem value="FEMALE">
                            <p className="ps-2">
                              {getText({
                                storeCode: storeCode,
                                text: Texts.female,
                              })}
                            </p>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <Spacing value={1} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Spacing value={3} />
          <div className="flex w-full items-start justify-between gap-3">
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getText({
                      storeCode: storeCode,
                      text: Texts.yourGiftOnUs,
                    })}
                  </FormLabel>
                  <Spacing value={1} />
                  <FormControl>
                    <div className="relative flex items-center justify-start gap-3 rounded-lg bg-form_field_background px-3 py-3">
                      <Input
                        type="tel"
                        maxLength={2}
                        placeholder={getText({
                          storeCode: storeCode,
                          text: Texts.dayOfBirth,
                        })}
                        className=" h-auto basis-[160px] border-none bg-transparent p-0 text-center"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <Spacing value={1} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{` .`}</FormLabel>
                  <Spacing value={1} />
                  <FormControl>
                    <div className="relative flex items-center justify-start gap-3 rounded-lg bg-form_field_background px-3 py-3">
                      <Input
                        type="tel"
                        maxLength={2}
                        placeholder={getText({
                          storeCode: storeCode,
                          text: Texts.monthOfBirth,
                        })}
                        className=" h-auto basis-[160px] border-none bg-transparent p-0 text-center"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <Spacing value={1} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Spacing value={10} />
          <ConfirmAccountInfo_Btn storeCode={storeCode} />
        </form>
      </Form>
    )
  );
}
