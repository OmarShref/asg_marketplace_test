"use client";
import { Texts, getText } from "@/lib/assets/text";
import { cn } from "@/lib/utils/utils";
import BasicConfirm_Btn from "../../part/button/BasicConfirm_Btn";
import ApplePay_Btn from "../../part/button/ApplePay_Btn";
import Spacing from "@/lib/component/generic/pure/spacing";
import { CartModel } from "@/lib/data/models/CartModel";
import useUserStore from "@/lib/data/stores/UserStore";
import { usePathname, useRouter } from "next/navigation";
import { codPlaceOrder } from "@/lib/network/client/gql/cod";
import { paymentTypes } from "@/lib/core/basic/Constants";
import { tamaraPlaceOrder } from "@/lib/network/client/gql/tamara";
import { PaymentMethodInfoModel } from "@/lib/data/models/PaymentMethodInfoModel";
import { useEffect, useState } from "react";
import ApplePayProcess from "@/lib/network/client/gql/applepay";
import { checkoutcomPlaceOrder } from "@/lib/network/client/gql/checkoutcom";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import { useToast } from "@/lib/component/generic/ui/use-toast";
import { ArrowLeftIcon } from "lucide-react";
import { isArabic } from "@/lib/helper/language";
import { getValidCartShippingAddressId } from "@/lib/controller/addressController";
import { scrollToId } from "@/lib/controller/scrollController";
import { tabbyPlaceOrder } from "@/lib/network/client/gql/tabby";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
  cart: CartModel | null | undefined;
  paymentMethodInfo: PaymentMethodInfoModel;
}

export default function ConfirmOrder_Bar({
  storeCode,
  cart,
  paymentMethodInfo,
  className,
  ...restProps
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const { customer } = useUserStore((state) => state);

  // ================================================================

  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);

  useEffect(() => {
    if (window.ApplePaySession) {
      setIsApplePayAvailable(true);
    }
  }, []);

  // ================================================================

  function handleContinueShopping() {
    if (cart) {
      new GtmEvents({ gtmCart: CartModel?.toGtm(cart) })?.beginCheckout();
    }

    if (!customer?.token) {
      router.push(`/${storeCode}/checkout/login`);
    } else {
      if (
        !!getValidCartShippingAddressId() &&
        (cart?.shippingMethod ?? "")?.length > 1
      ) {
        router.push(`/${storeCode}/checkout/billing`);
      } else {
        router.push(`/${storeCode}/checkout/shipping`);
      }
    }
  }

  // ================================================================

  async function handlePlaceOrder(paymentMethodCode: string | undefined) {
    useUtilityStore.setState({
      generalLoading: true,
    });

    switch (paymentMethodCode) {
      case paymentTypes?.cod:
        const codPlaceOrderData = await codPlaceOrder({
          code: paymentMethodCode,
        });
        if (codPlaceOrderData?.success) {
          if (cart) {
            useUserStore.setState({
              lastOrder: {
                isWaiting: true,
                order: codPlaceOrderData?.order,
                cart: cart,
              },
            });
          }
          router.push(`/${storeCode}/checkout/success`);
        } else {
          toast({
            description: codPlaceOrderData?.errorMessage,
            variant: "destructive",
          });
          if (cart) {
            new GtmEvents({
              gtmCart: CartModel?.toGtm(cart),
              errorMessage: codPlaceOrderData?.errorMessage,
            })?.paymentFailuer();
          }
        }
        break;

      case paymentTypes?.free:
        const freePlaceOrderData = await codPlaceOrder({
          code: paymentMethodCode,
        });
        if (freePlaceOrderData?.success) {
          if (cart) {
            useUserStore.setState({
              lastOrder: {
                isWaiting: true,
                order: freePlaceOrderData?.order,
                cart: cart,
              },
            });
          }
          router.push(`/${storeCode}/checkout/success`);
        } else {
          toast({
            description: freePlaceOrderData?.errorMessage,
            variant: "destructive",
          });
          if (cart) {
            new GtmEvents({
              gtmCart: CartModel?.toGtm(cart),
              errorMessage: freePlaceOrderData?.errorMessage,
            })?.paymentFailuer();
          }
        }
        break;

      case paymentTypes?.tamara4:
        const tamaraPlaceOrderData = await tamaraPlaceOrder({
          code: paymentMethodCode,
        });
        if (tamaraPlaceOrderData?.success) {
          if (cart) {
            useUserStore.setState({
              lastOrder: {
                isWaiting: true,
                order: tamaraPlaceOrderData?.order,
                cart: cart,
              },
            });
          }
          router.push(tamaraPlaceOrderData?.redirectUrl);
        } else {
          toast({
            description: tamaraPlaceOrderData?.errorMessage,
            variant: "destructive",
          });
          if (cart) {
            new GtmEvents({
              gtmCart: CartModel?.toGtm(cart),
              errorMessage: tamaraPlaceOrderData?.errorMessage,
            })?.paymentFailuer();
          }
        }
        break;

      case paymentTypes?.tabby:
        const tabbyPlaceOrderData = await tabbyPlaceOrder({
          code: paymentMethodCode,
        });
        if (tabbyPlaceOrderData?.success) {
          if (cart) {
            useUserStore.setState({
              lastOrder: {
                isWaiting: true,
                order: tabbyPlaceOrderData?.order,
                cart: cart,
              },
            });
          }
          router.push(tabbyPlaceOrderData?.redirectUrl);
        } else {
          toast({
            description: tabbyPlaceOrderData?.errorMessage,
            variant: "destructive",
          });
          if (cart) {
            new GtmEvents({
              gtmCart: CartModel?.toGtm(cart),
              errorMessage: tabbyPlaceOrderData?.errorMessage,
            })?.paymentFailuer();
          }
        }
        break;

      default:
        break;
    }

    useUtilityStore.setState({
      generalLoading: false,
    });
  }

  async function handleApplePay() {
    const applePayProcess = new ApplePayProcess({
      paymentMethodInfo: paymentMethodInfo,
      onApplePayAuthToken: async (checkoutcomToken: string) => {
        if (checkoutcomToken) {
          const ckPlaceOrder = await checkoutcomPlaceOrder({
            code: paymentTypes?.applePay,
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
          } else {
            // validation toast message
            toast({
              description: ckPlaceOrder?.errorMessage,
              variant: "destructive",
            });

            // payment failure push to data layer
            if (cart) {
              new GtmEvents({
                gtmCart: CartModel?.toGtm(cart),
                errorMessage: ckPlaceOrder?.errorMessage,
              })?.paymentFailuer();
            }
          }
        }
      },
    });
  }

  // ================================================================

  function handleConfirmOrderButtonClick() {
    if (pathname?.includes("/cart")) {
      handleContinueShopping();
    } else if (pathname?.includes("/checkout/billing")) {
      if (
        (cart?.paymentMethod ?? "")?.length > 0 &&
        cart?.paymentMethod != paymentTypes?.applePay
      ) {
        if (cart?.paymentMethod === paymentTypes?.ckCard) {
          // open add payment card drawer
          useUtilityStore?.setState({
            openAddPaymentCardDrawer: true,
          });
        } else {
          handlePlaceOrder(cart?.paymentMethod);
        }
      } else {
        scrollToId({ id: "select-payment-method-section", block: "start" });
        toast({
          description: getText({
            storeCode: storeCode,
            text: Texts.pleaseChoosePaymentMethod,
          }),
          variant: "destructive",
        });
      }
    }
  }

  return (
    (cart?.quantity ?? 0) > 0 && (
      <section className={cn(" px-5", className)}>
        <Spacing value={2} />
        <div className=" flex items-center justify-between">
          <p className=" font-medium">
            {getText({ storeCode: storeCode, text: Texts.total })}
          </p>
          <div className=" flex items-center gap-2">
            <p className=" text-xs text-faint_text">
              {getText({ storeCode: storeCode, text: Texts.includingVat })}
            </p>
            <p className=" text-lg font-medium">{`${cart?.grandTotal} ${cart?.currency?.label}`}</p>
          </div>
        </div>
        <Spacing value={2} />
        <div className=" flex  items-stretch justify-between gap-3">
          {isApplePayAvailable &&
            !!getValidCartShippingAddressId() &&
            (cart?.shippingMethod ?? "")?.length > 1 && (
              <ApplePay_Btn
                className={` basis-1/2`}
                {...restProps}
                onClick={handleApplePay}
              >
                <p>
                  {getText({ storeCode: storeCode, text: Texts.addToCart })}
                </p>
              </ApplePay_Btn>
            )}
          <BasicConfirm_Btn
            className={`${
              isApplePayAvailable && !!getValidCartShippingAddressId()
                ? " basis-1/2"
                : ""
            }`}
            {...restProps}
            onClick={handleConfirmOrderButtonClick}
          >
            <p className=" text-lg">
              {getText({ storeCode: storeCode, text: Texts.confirmOrder })}
            </p>
            <div className=" animate-backandforward rounded bg-white">
              <ArrowLeftIcon
                className={` text-black ${
                  isArabic(storeCode) ? "" : " rotate-180"
                }`}
              />
            </div>
          </BasicConfirm_Btn>
        </div>
        <Spacing value={5} />
      </section>
    )
  );
}
