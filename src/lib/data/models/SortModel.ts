import { sortTypes } from "@/lib/core/basic/Constants";
import { Texts, getText } from "@/lib/assets/text";
import { isArabic } from "@/lib/helper/language";

export type SortItemType = {
  Label: string;
  value: string;
};
interface SortInterface {
  defaultSort: SortItemType;
  options: SortItemType[];
}
export class SortModel implements SortInterface {
  defaultSort: SortItemType;
  options: SortItemType[];

  constructor({ storeCode }: { storeCode: string }) {
    const isArabicLanguage = isArabic(storeCode);
    this.defaultSort = {
      Label: getText({ storeCode, text: Texts.sortBy }),
      value: sortTypes.merchandising,
    };
    this.options = [
      {
        Label: isArabicLanguage ? Texts.sales[0] : Texts.sales[1],
        value: sortTypes.disCountHighToLow,
      },
      {
        Label: isArabicLanguage
          ? Texts.priceFromLowToHigh[0]
          : Texts.priceFromLowToHigh[1],
        value: sortTypes.priceLowToHigh,
      },
      {
        Label: isArabicLanguage
          ? Texts.priceFromHighToLow[0]
          : Texts.priceFromHighToLow[1],
        value: sortTypes.priceHighToLow,
      },
    ];
  }
}
