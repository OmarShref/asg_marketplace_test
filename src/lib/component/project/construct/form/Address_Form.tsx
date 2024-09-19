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
import { HomeIcon, MailIcon, ProfileIcon } from "@/lib/assets/svg";
import useUserStore from "@/lib/data/stores/UserStore";
import { AddressModel } from "@/lib/data/models/AddressModel";
import {
  addAddress,
  getCustomer,
  updateAddress,
  updateCustomerInfo,
} from "@/lib/network/repo/client_repos/gql/customer";
import SaveAddress_Btn from "../../part/button/SaveAddress_Btn";
import { useToast } from "@/lib/component/generic/ui/use-toast";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import { CustomerModel } from "@/lib/data/models/CustomerModel";
import { City_ComboBox } from "../ComboBox/City_ComboBox";
import { Region_ComboBox } from "../ComboBox/Region_ComboBox";
import { Country_ComboBox } from "../ComboBox/Country_ComboBox";
import { getAddressCountries } from "@/lib/network/repo/client_repos/gql/address";
import { PlaceInterface } from "@/lib/data/models/PlaceModel";
import { supportedShippingCountries } from "@/lib/core/basic/Constants";

type Props = {
  storeCode: string;
  choosenLocation?: AddressModel;
  editAddressId?: number | undefined | null;
  setOpenMapDrawer?: (open: boolean) => void;
  setOpenSaveAddressDrawer: (open: boolean) => void;
};

export function Address_Form({
  storeCode,
  choosenLocation,
  editAddressId,
  setOpenMapDrawer,
  setOpenSaveAddressDrawer,
}: Props) {
  const { toast } = useToast();

  const { customer } = useUserStore((state) => state);

  // 1. Define schema.
  const formSchema = z.object({
    firstName: z.string().trim().min(2).max(50),
    lastName: z.string().trim().min(2).max(50),
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
    email: z
      .string()
      .trim()
      .email({
        message: getText({ storeCode: storeCode, text: Texts.emailIsNotValid }),
      }),
    street: z
      .string()
      .trim()
      .min(1, {
        message: getText({
          storeCode: storeCode,
          text: Texts.pleaseChooseYourStreet,
        }),
      }),
  });

  // 1. Define form with default values.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: customer?.firstName ?? "",
      lastName: customer?.lastName ?? "",
      prefix: "966",
      phone: "",
      email:
        !/^\d+@/.test(customer?.email ?? "") && !!customer?.email
          ? customer?.email
          : "",
      street: choosenLocation?.street ?? "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let phone = (values.prefix + values.phone)?.replaceAll(" ", "");
    if (phone?.at(2) === "0" || phone?.at(3) === "0") {
      phone = phone?.replace("0", "");
    }

    const email = values.email?.trim()?.toLowerCase();

    const latLng = [1, 1];

    const address = new AddressModel({
      ...choosenLocation,
      ...values,
      street: values.street,
      latLng: latLng,
      phone: phone,
      email: email,
    });

    if ((customer?.firstName ?? "")?.length > 1) {
      // add or update address
      if (!editAddressId) {
        const addAddressData = await addAddress({
          address: address,
        });
        if (addAddressData?.id) {
          setOpenSaveAddressDrawer(false);
          setOpenMapDrawer?.(false);
          const getCustomerData = await getCustomer();
          if (getCustomerData?.customer?.id) {
            useUserStore.setState({
              customer: {
                ...useUserStore.getState().customer,
                ...getCustomerData?.customer,
              },
              cart: getCustomerData?.cart,
              customerRewardPoints: getCustomerData?.customerRewardPoints,
            });
          }
        }
      } else {
        const updateAddressData = await updateAddress({
          address: address,
          editAddressId: editAddressId,
        });
        if (updateAddressData?.id) {
          setOpenSaveAddressDrawer(false);
          setOpenMapDrawer?.(false);
          const getCustomerData = await getCustomer();
          if (getCustomerData?.customer?.id) {
            useUserStore.setState({
              customer: {
                ...useUserStore.getState().customer,
                ...getCustomerData?.customer,
              },
              cart: getCustomerData?.cart,
              customerRewardPoints: getCustomerData?.customerRewardPoints,
            });
          }
        }
      }
    }

    if (!((customer?.firstName ?? "")?.length > 1)) {
      const updateAccountInfoData = await updateCustomerInfo({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: phone,
        email: email,
        gender: "MALE",
      });

      if (updateAccountInfoData?.success === true) {
        // add or update address
        if (!editAddressId) {
          const addAddressData = await addAddress({
            address: address,
          });
          if (addAddressData?.id) {
            setOpenSaveAddressDrawer(false);
            setOpenMapDrawer?.(false);
            const getCustomerData = await getCustomer();
            if (getCustomerData?.customer?.id) {
              useUserStore.setState({
                customer: {
                  ...useUserStore.getState().customer,
                  ...getCustomerData?.customer,
                },
                cart: getCustomerData?.cart,
                customerRewardPoints: getCustomerData?.customerRewardPoints,
              });
              new GtmEvents({
                gtmCustomer: CustomerModel.toGtm(getCustomerData?.customer),
              }).userUpdate();
            }
          }
        } else {
          const updateAddressData = await updateAddress({
            address: address,
            editAddressId: editAddressId,
          });
          if (updateAddressData?.id) {
            setOpenSaveAddressDrawer(false);
            setOpenMapDrawer?.(false);
            const getCustomerData = await getCustomer();
            if (getCustomerData?.customer?.id) {
              useUserStore.setState({
                customer: {
                  ...useUserStore.getState().customer,
                  ...getCustomerData?.customer,
                },
                cart: getCustomerData?.cart,
                customerRewardPoints: getCustomerData?.customerRewardPoints,
              });
              new GtmEvents({
                gtmCustomer: CustomerModel.toGtm(getCustomerData?.customer),
              }).userUpdate();
            }
          }
        }
      } else {
        toast({
          description: updateAccountInfoData?.message,
          variant: "destructive",
        });
      }
    }
  }

  const [countries, setCountries] = useState<PlaceInterface[]>([]);
  async function handleGetAddressCountries() {
    const countriesData = await getAddressCountries();

    const supportedCountries = countriesData?.filter((country) =>
      supportedShippingCountries?.includes(country.code),
    );
    setCountries(supportedCountries ?? []);
  }
  useEffect(() => {
    handleGetAddressCountries();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-5 ">
        {/* first name */}
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
                    className=" h-auto border-none bg-transparent p-0 text-base"
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

        {/* last name */}
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
                    className=" h-auto border-none bg-transparent p-0 text-base"
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

        {/* phone number */}
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
                  {countries?.length > 0 && (
                    <Select
                      defaultValue="966"
                      onValueChange={(value) => form.setValue("prefix", value)}
                    >
                      <SelectTrigger className="px-2 font-fontEnglish">
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
                    className=" h-auto border-none bg-transparent p-0 font-fontEnglish text-base"
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

        {/* email */}
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
                    className=" h-auto border-none bg-transparent p-0 text-base"
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

        {/* address */}
        <>
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getText({
                    storeCode: storeCode,
                    text: Texts.address,
                  })}
                </FormLabel>
                <Spacing value={1} />
                <FormControl>
                  <div className="relative flex items-center justify-start gap-3 rounded-lg bg-form_field_background px-3 py-3">
                    <HomeIcon className="h-5 w-5 text-accent" />
                    <Input
                      type="text"
                      maxLength={100}
                      placeholder={getText({
                        storeCode: storeCode,
                        text: Texts.address,
                      })}
                      className=" h-auto border-none bg-transparent p-0 text-base"
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
        </>

        <div className=" sticky bottom-0 bg-background">
          <SaveAddress_Btn storeCode={storeCode} />
          <Spacing value={3} />
        </div>
      </form>
    </Form>
  );
}
