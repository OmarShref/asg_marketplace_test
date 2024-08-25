import { SortDrawer } from "../drawer/Sort_Drawer";
import { FilterDrawer } from "../drawer/Filter_Drawer";
import { CategoryQuantity } from "@/lib/component/generic/pure/category";
import { SortItemType } from "@/lib/data/models/SortModel";
import { FilterItemType } from "@/lib/data/models/FilterModel";
import { PageProps } from "@/lib/data/types/PageProps";
import { Texts, getText } from "@/lib/assets/text";
import { Sort_Select } from "../select/Sort_Select";

interface Props extends PageProps {
  totalCount: number;
  filters?: FilterItemType[];
  sort?: SortItemType;
  setSort?: (sort: SortItemType) => void;
}

export default function ProductListUtility_Bar({
  params,
  searchParams,
  totalCount,
  filters,
  sort,
  setSort,
}: Props) {
  return (
    <div className=" mx-5 flex max-w-project items-center justify-between lg:mx-auto">
      <CategoryQuantity className=" text-xs font-light text-secondry_text md:text-base">{`${totalCount} ${getText(
        { storeCode: params.storeCode, text: Texts.products },
      )}`}</CategoryQuantity>

      {/* ================================================================================================ */}

      <div className=" flex items-center justify-center gap-2">
        {/* mobile only */}
        {!!setSort && (
          <SortDrawer
            storeCode={params.storeCode}
            sort={sort ?? { Label: "", value: "" }}
            setSort={setSort ?? (() => {})}
            className=" md:hidden"
          />
        )}

        {/* desktop only */}
        {!!setSort && (
          <Sort_Select
            storeCode={params.storeCode}
            sort={sort ?? { Label: "", value: "" }}
            setSort={setSort ?? (() => {})}
            className=" hidden md:flex"
          />
        )}

        {/* ================================================================================================ */}

        {/* mobile only */}
        <FilterDrawer
          params={params}
          searchParams={searchParams}
          filters={filters ?? []}
          className=" md:hidden"
        />
      </div>
    </div>
  );
}
