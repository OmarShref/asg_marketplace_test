import { PaymentMethodInfoModel } from "@/lib/data/models/PaymentMethodInfoModel";
import { ClientGqlRequest } from "./base-request/ClientGqlRequest";
import useUserStore from "@/lib/data/stores/UserStore";
import { getCheckoutcomToken } from "../rest/checkoutcom";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { setCartPayment } from "./cart";
import { paymentTypes } from "@/lib/core/basic/Constants";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import { CartModel } from "@/lib/data/models/CartModel";

async function getAppleMerchantValidation({ url }: { url: string }) {
  const appleMerchantValidationMutation = `
    mutation {
      appleMerchantValidation(validation_url: "${url}") {
          apple_json_response
      }
    }
  `;

  const data = await new ClientGqlRequest({
    query: appleMerchantValidationMutation,
    headers: {
      store: useUtilityStore.getState()?.storeCode,
      "Content-Type": "application/json",
    },
  })?.postRequest();

  const appleJsonResponse =
    data?.data?.appleMerchantValidation?.apple_json_response;

  return appleJsonResponse;
}

interface ApplePayInterFace {
  session: any;
  appleApiVersion: number;
  paymentMethodInfo: PaymentMethodInfoModel;
}

export class ApplePayProcess implements ApplePayInterFace {
  session: any = null;
  appleApiVersion = 6;
  paymentMethodInfo: PaymentMethodInfoModel;

  constructor({
    paymentMethodInfo,
    onApplePayAuthToken,
  }: {
    paymentMethodInfo: PaymentMethodInfoModel;
    onApplePayAuthToken: Function;
  }) {
    this.paymentMethodInfo = paymentMethodInfo;
    (async () => {
      await this.#initSession(onApplePayAuthToken);
    })();
  }

  async #initSession(onApplePayAuthToken: Function) {
    const { ApplePaySession } = window;

    if (!window.ApplePaySession) {
      alert("Please use Safari Browser to Pay with ApplePay");
      /* onApplePayAuthToken({
                type: 'applepay',
                token: 'tok_rmtmjktaihfurb5qqt25xw7sce',
                expires_on: '2022-08-15T12:28:44Z',
                expiry_month: 2,
                expiry_year: 2024,
                scheme: 'Mastercard',
                last4: '6843',
                bin: '506968',
                card_type: 'Debit',
                card_category: 'Consumer',
                issuer: 'Al Rajhi Banking & Inv. Corp.',
                issuer_country: 'SA',
                token_format: 'cryptogram_3ds'
            }); */
    } else {
      const isAllowed = window.ApplePaySession.canMakePayments(
        this.paymentMethodInfo?.checkoutcom?.appleMerchantId,
      );

      if (isAllowed) {
        const requestData = {
          countryCode: this.paymentMethodInfo?.checkoutcom?.appleCountryCode,
          currencyCode: useUserStore?.getState()?.cart?.currency?.value,
          supportedNetworks:
            this.paymentMethodInfo?.checkoutcom?.appleSupportedNetworks,
          merchantCapabilities: ["supports3DS"],
          total: {
            label: this.paymentMethodInfo?.checkoutcom?.appleMerchantName,
            type: "final",
            amount: useUserStore?.getState()?.cart?.grandTotal?.toFixed(2),
          },
        };

        if (!this.session) {
          try {
            this.session = new ApplePaySession(
              this.appleApiVersion,
              requestData,
            );

            // Begin session
            this.session.begin();

            // Merchant Validation
            this.session.onvalidatemerchant = async (event: any) => {
              const appleJsonResponse = await getAppleMerchantValidation({
                url: event.validationURL,
              });

              if (appleJsonResponse) {
                let merchantSession;
                try {
                  merchantSession = JSON.parse(appleJsonResponse);
                } catch (error) {
                  console.error(error);
                }
                console.info("merchantSession", merchantSession);
                this.session.completeMerchantValidation(merchantSession);
              }
            };

            // Shipping contact
            this.session.onshippingcontactselected = (event: any) => {
              const newTotal = requestData.total;

              this.session.completeShippingContactSelection({
                newTotal,
              });
            };

            // Shipping method selection
            this.session.onshippingmethodselected = () => {
              const status = ApplePaySession.STATUS_SUCCESS;
              const newTotal = requestData.total;

              console.info("onshippingmethodselected", status, newTotal, []);

              this.session.completeShippingMethodSelection({
                newTotal,
              });
            };

            // Payment method selection
            this.session.onpaymentmethodselected = () => {
              const newTotal = requestData.total;

              console.info(
                "onpaymentmethodselected",
                newTotal,
                [],
                this.session,
              );

              setCartPayment({
                code: paymentTypes?.applePay,
              })
                .then((setApplePayOnCart) => {
                  if (setApplePayOnCart?.success) {
                    useUserStore.setState({ cart: setApplePayOnCart?.cart });
                    newTotal.amount =
                      setApplePayOnCart?.cart?.grandTotal?.toFixed(2);
                    this.session.completePaymentMethodSelection({
                      newTotal,
                      newLineItems: [],
                    });

                    if (setApplePayOnCart?.cart) {
                      new GtmEvents({
                        gtmCart: CartModel?.toGtm(setApplePayOnCart?.cart),
                      })?.addPaymentInfo();
                    }
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            };

            // Payment method authorization
            this.session.onpaymentauthorized = async (event: any) => {
              const appleCardToken = event?.payment?.token;
              const checkoutcomToken = await getCheckoutcomToken({
                authorization: this.paymentMethodInfo?.checkoutcom?.publicKey,
                query: {
                  type: "applepay",
                  tokenData: appleCardToken.paymentData,
                },
              });

              let status;
              if (checkoutcomToken) {
                status = ApplePaySession.STATUS_SUCCESS;
                onApplePayAuthToken(checkoutcomToken);
              } else {
                status = ApplePaySession.STATUS_FAILURE;
              }
              this.session.completePayment(status);
            };

            // Session cancellation
            this.session.oncancel = () => {
              console.info("ApplePay Canceled...");
            };
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        alert("Please review your ApplePay wallet configuration");
      }
    }
  }
}

export default ApplePayProcess;
