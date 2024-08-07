interface PaymentMethodInterface {
  checkoutcom: {
    publicKey: string;
    environment: string;
    language: string;
    madaEnabled: boolean;
    appleMerchantName: string;
    appleCountryCode: string;
    appleMerchantId: string;
    appleSupportedNetworks: string[];
  };
  tamara: {
    enabled: boolean;
    publicKey: string;
  };
}

export class PaymentMethodInfoModel implements PaymentMethodInterface {
  checkoutcom: {
    publicKey: string;
    environment: string;
    language: string;
    madaEnabled: boolean;
    appleMerchantName: string;
    appleCountryCode: string;
    appleMerchantId: string;
    appleSupportedNetworks: string[];
  };
  tamara: {
    enabled: boolean;
    publicKey: string;
  };

  constructor(paymentMethodInfoData: any) {
    const paymentMethodInfo = paymentMethodInfoData?.data;
    const checkoutcom = paymentMethodInfo?.checkoutComInfo;
    const tamara = paymentMethodInfo?.tamaraData;

    this.checkoutcom = {
      publicKey: checkoutcom?.public_key,
      environment: checkoutcom?.environment,
      language: checkoutcom?.language,
      madaEnabled: checkoutcom?.mada_enabled,
      appleMerchantName: checkoutcom?.apple_merchant_name,
      appleCountryCode: checkoutcom?.apple_country_code,
      appleMerchantId: checkoutcom?.apple_merchant_id,
      appleSupportedNetworks: checkoutcom?.apple_supported_networks,
    };
    this.tamara = {
      enabled: tamara?.enabled,
      publicKey: tamara?.public_key,
    };
  }

  create(): PaymentMethodInfoModel {
    return {
      checkoutcom: this.checkoutcom,
      tamara: this.tamara,
    } as PaymentMethodInfoModel;
  }
}
