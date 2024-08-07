import { defaultCurrency, stores } from "../core/basic/Constants";

export type CurrencyType = {
  label: string;
  value: string;
};

export function getCurrency({
  storeCode = stores[0],
}: {
  currency?: string;
  storeCode?: string;
}): CurrencyType {
  const currency: CurrencyType = defaultCurrency[storeCode];
  return currency;
}
