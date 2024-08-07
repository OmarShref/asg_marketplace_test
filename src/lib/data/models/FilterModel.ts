export type FilterOptionType = {
  count?: number;
  label?: string;
  value: string;
  isSwatch?: boolean;
  swatchType?: string;
  swatchValue?: string;
};
export type FilterItemType = {
  count?: number;
  label?: string;
  code: string;
  correspondingFilter: string;
  min: number;
  max: number;
  position?: number;
  options: FilterOptionType[];
};

interface FilterInterface {
  filters: FilterItemType[];
}

export class FilterModel implements FilterInterface {
  filters: FilterItemType[] = [
    {
      code: "",
      correspondingFilter: "",
      min: 0,
      max: 0,
      options: [
        {
          value: "",
        },
      ],
    },
  ];

  #getCorrespondingFilter = (code: string) => {
    switch (code) {
      case "color":
        return "Configurable_optionsColorValuesValue_dataOption_id";
      case "size":
        return "Configurable_optionsSizeValuesValue_dataOption_id";
      case "material":
        return "AttributesMaterialOption_id";
      case "brand":
        return "AttributesBrandOption_id";
      case "function":
        return "AttributesFunctionOption_id";
      case "price":
        return "Price_rangeMinimum_priceFinal_priceValue";
      default:
        return "";
    }
  };

  constructor(filterData?: string | []) {
    if (typeof filterData === "string") {
      this.filters = filterData?.split(";")?.map((option) => {
        const key = option?.split(":")?.at(0);
        const value = option?.split(":")?.at(1);
        const min = value?.split("_")[0];
        const max = value?.split("_")[1];
        return {
          code: key ?? "",
          correspondingFilter: this.#getCorrespondingFilter(key ?? ""),
          min: Number(min) ? Number(min) : 0,
          max: Number(max) ? Number(max) : 0,
          options: value?.split(",")?.map((value) => {
            return {
              value: value ?? "",
            };
          }) ?? [
            {
              value: "",
            },
          ],
        };
      });
    } else if (typeof filterData === "object") {
      this.filters = filterData?.map((aggrigation: any, index: number) => {
        return {
          count: aggrigation?.count ?? 0,
          label: aggrigation?.label ?? "",
          code: aggrigation?.attribute_code ?? "",
          correspondingFilter: aggrigation?.filter_attribute ?? "",
          min: aggrigation?.min ?? 0,
          max: aggrigation?.max ?? 0,
          position: aggrigation?.position ?? index,
          options: aggrigation?.options?.map((option: any) => {
            return {
              count: option?.count ?? 0,
              label: option?.label ?? "",
              value: option?.value ?? "",
              isSwatch: option?.is_swatch ?? false,
              swatchType: option?.swatch_type ?? "",
              swatchValue: option?.swatch_value ?? "",
            };
          }),
        };
      });
    }
  }
}
