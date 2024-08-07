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
import useUserStore from "@/lib/data/stores/UserStore";
import { CreditCardIcon } from "lucide-react";
import ConfirmCardInfo_Btn from "../../part/button/ConfirmCardInfo_Btn";
import { PaymentMethodInfoModel } from "@/lib/data/models/PaymentMethodInfoModel";
import { getCheckoutcomToken } from "@/lib/network/client/rest/checkoutcom";
import { checkoutcomPlaceOrder } from "@/lib/network/client/gql/checkoutcom";
import { useRouter } from "next/navigation";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import { CartModel } from "@/lib/data/models/CartModel";
import { useToast } from "@/lib/component/generic/ui/use-toast";

type Props = {
  storeCode: string;
  selectedPaymentMethod: string;
  paymentMethodInfo: PaymentMethodInfoModel;
  setOpenAddPaymentDrawer: (open: boolean) => void;
};

export function AddPaymentCard_Form({
  storeCode,
  selectedPaymentMethod,
  paymentMethodInfo,
  setOpenAddPaymentDrawer,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const { cart } = useUserStore((state) => state);

  const formSchema = z.object({
    cardNumber: z
      .string()
      .trim()
      .refine(validator?.isCreditCard, {
        message: getText({
          storeCode: storeCode,
          text: Texts.creditCardisnotValid,
        }),
      }),
    maxMonth: z
      .string()
      .trim()
      .length(2, { message: " " })
      .refine(validator.isNumeric, {
        message: "",
      }),
    maxYear: z
      .string()
      .trim()
      .length(2, { message: " " })
      .refine(validator.isNumeric, {
        message: "",
      }),
    cvv: z
      .string()
      .trim()
      .length(3, { message: " " })
      .refine(validator.isNumeric, {
        message: "",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      maxMonth: "",
      maxYear: "",
      cvv: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const checkoutcomToken = await getCheckoutcomToken({
      query: {
        type: "card",
        ...values,
      },
      authorization: paymentMethodInfo?.checkoutcom?.publicKey,
    });

    if (checkoutcomToken) {
      const ckPlaceOrder = await checkoutcomPlaceOrder({
        code: selectedPaymentMethod,
        token: checkoutcomToken,
      });
      if (ckPlaceOrder?.success) {
        if (cart) {
          useUserStore.setState({
            lastOrder: {
              isWaiting: true,
              order: ckPlaceOrder?.order,
              cart: cart,
            },
          });
        }
        router.push(ckPlaceOrder?.redirectUrl);
        setOpenAddPaymentDrawer(false);
      } else {
        toast({
          description: ckPlaceOrder?.errorMessage,
          variant: "destructive",
        });
        if (cart) {
          new GtmEvents({
            gtmCart: CartModel?.toGtm(cart),
            errorMessage: ckPlaceOrder?.errorMessage,
          })?.paymentFailuer();
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-5 ">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {getText({
                  storeCode: storeCode,
                  text: Texts.cardNumber,
                })}
              </FormLabel>
              <Spacing value={1} />
              <FormControl>
                <div
                  className="relative flex items-center justify-start gap-3 rounded-lg bg-form_field_background px-3 py-3"
                  style={{ direction: "ltr" }}
                >
                  <CreditCardIcon className=" text-accent " />
                  <Input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    pattern="[0-9\s]{13,19}"
                    placeholder={getText({
                      storeCode: storeCode,
                      text: Texts.cardNumber,
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
        <div className="flex w-full items-start justify-between gap-3">
          <FormField
            control={form.control}
            name="maxMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getText({
                    storeCode: storeCode,
                    text: Texts.expiryMonth,
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
                        text: Texts.expiryMonth,
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
            name="maxYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getText({
                    storeCode: storeCode,
                    text: Texts.expiryYear,
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
                        text: Texts.expiryYear,
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
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getText({
                    storeCode: storeCode,
                    text: Texts.cvv,
                  })}
                </FormLabel>
                <Spacing value={1} />
                <FormControl>
                  <div className="relative flex items-center justify-start gap-3 rounded-lg bg-form_field_background px-3 py-3">
                    <Input
                      type="tel"
                      maxLength={3}
                      placeholder={getText({
                        storeCode: storeCode,
                        text: Texts.cvv,
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
        <ConfirmCardInfo_Btn storeCode={storeCode} />
        <Spacing value={10} />
      </form>
    </Form>
  );
}
