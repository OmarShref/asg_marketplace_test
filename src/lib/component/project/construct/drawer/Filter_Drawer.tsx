"use client";
import { Texts, getText } from "@/lib/assets/text";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/lib/component/generic/ui/drawer";
import { Filter_Btn } from "@/lib/component/project/part/button/Filter_Btn";
import Close_Btn from "../../part/button/Close_Btn";
import { usePathname, useRouter } from "next/navigation";
import { turnFiltersToSearchParams } from "@/lib/controller/filterController";
import { FilterItemType, FilterModel } from "@/lib/data/models/FilterModel";
import Spacing from "@/lib/component/generic/pure/spacing";
import {
  Filter,
  FilterContent,
  FilterHeader,
  FilterOption,
  FilterOptions,
  FilterSection,
  FilterTitle,
} from "@/lib/component/generic/pure/filter";
import { getDirection } from "@/lib/helper/direction";
import { Separator } from "@/lib/component/generic/ui/separator";
import { Fragment, useState } from "react";
import { PageProps } from "@/lib/data/types/PageProps";
import Confirm_Filter_Btn from "../../part/button/Confirm_Filter_Btn";
import Clear_Filter_Btn from "../../part/button/Clear_Filter_Btn";
import { cn } from "@/lib/utils/utils";
import { PriceFilter_MultiRange_Slider } from "../slider/PriceFilter_MultiRange_Slider";

interface Props extends PageProps, React.HTMLAttributes<HTMLDivElement> {
  filters: FilterItemType[];
}

// TODO: add submit button to project buttons
export function FilterDrawer({
  params,
  searchParams,
  filters,
  className,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const direction = getDirection(params.storeCode);

  const [stagedFilters, setStagedFilters] = useState<FilterItemType[]>(
    new FilterModel(searchParams?.customFilter).filters
  );

  function isStaged({
    filter,
    optionValue,
  }: {
    filter: FilterItemType;
    optionValue: string;
  }): boolean {
    if (filter.code === "price") {
      const priceStagedFilter = stagedFilters?.find(
        (stagedFilter) => stagedFilter?.code === "price"
      );
      return (
        (priceStagedFilter?.min ?? 999999) === (filter?.min ?? 0) &&
        (priceStagedFilter?.max ?? 999999) === (filter?.max ?? 0)
      );
    } else {
      return (
        (stagedFilters
          ?.find((stagedFilter) => stagedFilter?.code === filter.code)
          ?.options?.findIndex(
            (stagedOption) => stagedOption?.value === optionValue
          ) ?? -1) >= 0
      );
    }
  }

  function createNonExistingStagedFilter({
    filter,
    optionValue,
  }: {
    filter: FilterItemType;
    optionValue: string;
  }): FilterItemType {
    return {
      code: filter?.code,
      correspondingFilter: "", // no use
      min: filter?.min ?? 0,
      max: filter?.max ?? 999999,
      options: [
        {
          value: optionValue,
        },
      ],
    };
  }

  function setOrRemoveOption({
    filter,
    optionValue,
  }: {
    filter: FilterItemType;
    optionValue: string;
  }): void {
    let targetFilterIndex = stagedFilters?.findIndex(
      (stagedFilter) => stagedFilter?.code === filter?.code
    );
    let targetFilter =
      targetFilterIndex >= 0 ? stagedFilters?.at(targetFilterIndex) : null;

    if (targetFilter) {
      if (targetFilter.code === "price") {
        if (
          targetFilter.min === filter.min &&
          targetFilter.max === filter.max
        ) {
          targetFilter = null;
        } else {
          targetFilter.min = filter.min;
          targetFilter.max = filter.max;
        }
      } else {
        let targetOptionIndex = targetFilter?.options?.findIndex(
          (option) => option?.value === optionValue
        );
        targetOptionIndex >= 0
          ? targetFilter?.options?.splice(targetOptionIndex, 1)
          : targetFilter?.options?.push({
              value: optionValue,
            });
      }
    } else {
      targetFilter = createNonExistingStagedFilter({
        filter,
        optionValue,
      });
    }

    if (targetFilter) {
      setStagedFilters([
        ...stagedFilters?.filter(
          (stagedFilter) => stagedFilter?.code !== filter?.code
        ),
        targetFilter,
      ]);
    } else {
      setStagedFilters([
        ...stagedFilters?.filter(
          (stagedFilter) => stagedFilter?.code !== filter?.code
        ),
      ]);
    }
  }

  function confirmFilters(): void {
    router.push(
      pathname + turnFiltersToSearchParams({ filters: stagedFilters })
    );
  }

  function clearFilters(): void {
    setStagedFilters([]);
    router.push(pathname);
  }

  return (
    <section className={cn("", className)}>
      <Drawer>
        <DrawerTrigger asChild>
          <Filter_Btn
            params={params}
            searchParams={searchParams}
            className=" text-background"
          />
        </DrawerTrigger>
        <DrawerContent
          style={{ direction: direction }}
          className=" mx-auto max-w-md"
        >
          <DrawerHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
            <DrawerTitle>
              {getText({ storeCode: params.storeCode, text: Texts.filter })}
            </DrawerTitle>
            <DrawerClose
              asChild
              className=" absolute left-3 top-1/2 -translate-y-1/2"
            >
              <Close_Btn />
            </DrawerClose>
          </DrawerHeader>
          <Spacing value={3} />
          <Filter className=" overflow-y-auto">
            {filters
              .map((filter, index) => {
                return (
                  <Fragment key={filter.code}>
                    <FilterSection>
                      <FilterHeader>
                        <FilterTitle>{filter.label}</FilterTitle>
                      </FilterHeader>
                      <Spacing value={3} />
                      <FilterContent>
                        {filter.code === "price" ? (
                          <FilterOptions>
                            <PriceFilter_MultiRange_Slider
                              storeCode={params?.storeCode}
                              filter={filter}
                              setRabgeCallback={({ range }) => {
                                const priceFilter = {
                                  filter: {
                                    code: filter?.code,
                                    correspondingFilter:
                                      filter?.correspondingFilter,
                                    min: range?.at(0) ?? 0,
                                    max: range?.at(1) ?? 999999,
                                    options: filter?.options,
                                  },
                                  optionValue: "NA",
                                };
                                setOrRemoveOption(priceFilter);
                              }}
                            />
                          </FilterOptions>
                        ) : (
                          <FilterOptions>
                            {filter.options.map((option) => {
                              switch (filter.code) {
                                case "color":
                                case "brand":
                                  return (
                                    <FilterOption
                                      key={option.value}
                                      variant={"swatch"}
                                      isStaged={isStaged({
                                        filter: filter,
                                        optionValue: option.value,
                                      })}
                                      onClick={() => {
                                        setOrRemoveOption({
                                          filter: filter,
                                          optionValue: option.value,
                                        });
                                      }}
                                      filterOption={option}
                                    ></FilterOption>
                                  );
                                default:
                                  return (
                                    <FilterOption
                                      key={option.value}
                                      isStaged={isStaged({
                                        filter: filter,
                                        optionValue: option.value,
                                      })}
                                      onClick={() => {
                                        setOrRemoveOption({
                                          filter: filter,
                                          optionValue: option.value,
                                        });
                                      }}
                                      filterOption={option}
                                    ></FilterOption>
                                  );
                              }
                            })}
                          </FilterOptions>
                        )}
                      </FilterContent>
                    </FilterSection>
                    {index != 0 && <Separator className=" h-2" />}
                  </Fragment>
                );
              })
              .reverse()}
          </Filter>
          <Spacing value={3} />
          <DrawerFooter className=" flex flex-row items-center justify-between gap-3">
            <DrawerClose asChild className=" basis-1/2 rounded-lg">
              <Confirm_Filter_Btn
                onClick={() => {
                  confirmFilters();
                }}
              >
                {getText({
                  storeCode: params.storeCode,
                  text: Texts.submit,
                })}
              </Confirm_Filter_Btn>
            </DrawerClose>
            <DrawerClose
              asChild
              className=" basis-1/2 rounded-lg ring-1 ring-accent"
            >
              <Clear_Filter_Btn
                onClick={() => {
                  clearFilters();
                }}
              >
                {getText({
                  storeCode: params.storeCode,
                  text: Texts.remove,
                })}
              </Clear_Filter_Btn>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
