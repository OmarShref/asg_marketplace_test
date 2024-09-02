"use client";
import { Texts, getText } from "@/lib/assets/text";
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
import { Separator } from "@/lib/component/generic/ui/separator";
import { Fragment, useState } from "react";
import { PageProps } from "@/lib/data/types/PageProps";
import Confirm_Filter_Btn from "../../part/button/Confirm_Filter_Btn";
import Clear_Filter_Btn from "../../part/button/Clear_Filter_Btn";
import { cn } from "@/lib/utils/utils";
import { PriceFilter_MultiRange_Slider } from "../slider/PriceFilter_MultiRange_Slider";

interface Props extends PageProps, React.HtmlHTMLAttributes<HTMLDivElement> {
  filters: FilterItemType[];
}

export default function Filter_Section({
  params,
  searchParams,
  filters,
  className,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [stagedFilters, setStagedFilters] = useState<FilterItemType[]>(
    new FilterModel(searchParams?.customFilters).filters,
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
        (stagedFilter) => stagedFilter?.code === "price",
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
            (stagedOption) => stagedOption?.value === optionValue,
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
      (stagedFilter) => stagedFilter?.code === filter?.code,
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
          (option) => option?.value === optionValue,
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
          (stagedFilter) => stagedFilter?.code !== filter?.code,
        ),
        targetFilter,
      ]);
    } else {
      setStagedFilters([
        ...stagedFilters?.filter(
          (stagedFilter) => stagedFilter?.code !== filter?.code,
        ),
      ]);
    }
  }

  function confirmFilters(): void {
    router.push(
      pathname + turnFiltersToSearchParams({ filters: stagedFilters }),
    );
  }

  function clearFilters(): void {
    setStagedFilters([]);
    router.push(pathname);
  }

  return (
    <section
      className={cn(
        " sticky top-36 hidden h-fit max-h-[calc(100vh-170px)] overflow-y-auto rounded-xl border border-stone-200 px-2 pb-0 md:block",
        className,
      )}
    >
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
                    {filter?.code === "price" ? (
                      <FilterOptions>
                        <PriceFilter_MultiRange_Slider
                          storeCode={params?.storeCode}
                          filter={filter}
                          setRangeCallback={({ range }) => {
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
                        })}
                      </FilterOptions>
                    )}
                  </FilterContent>
                </FilterSection>
                {index != 0 && <Separator className=" h-1 rounded-full" />}
              </Fragment>
            );
          })
          ?.reverse()}
      </Filter>
      <Spacing value={3} />
      <section className=" sticky bottom-0 flex flex-row items-center justify-between gap-3 bg-white pb-2">
        <Confirm_Filter_Btn
          className=" basis-1/2 rounded-lg"
          onClick={() => {
            confirmFilters();
          }}
        >
          {getText({
            storeCode: params.storeCode,
            text: Texts.submit,
          })}
        </Confirm_Filter_Btn>

        {/* ======================================================================================================================== */}

        <Clear_Filter_Btn
          className=" basis-1/2 rounded-lg ring-1 ring-accent "
          onClick={() => {
            clearFilters();
          }}
        >
          {getText({
            storeCode: params.storeCode,
            text: Texts.remove,
          })}
        </Clear_Filter_Btn>
      </section>
    </section>
  );
}
