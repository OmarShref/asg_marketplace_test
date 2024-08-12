"use client";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/lib/component/generic/ui/select";
import { getDirection } from "@/lib/helper/direction";
import { useRef } from "react";
import { SortItemType, SortModel } from "@/lib/data/models/SortModel";
import { cn } from "@/lib/utils/utils";

type Props = {
  storeCode: string;
  sort: SortItemType;
  setSort: (sort: SortItemType) => void;
};

export function Sort_Select({
  storeCode,
  sort,
  setSort,
  className,
}: Props & React.HtmlHTMLAttributes<HTMLDivElement>) {
  const direction = getDirection(storeCode);
  const sorts = useRef(new SortModel({ storeCode }));
  return (
    <Select
      value={sort?.value}
      dir={direction}
      onValueChange={(value) => {
        const sortItem = sorts.current?.options?.find(
          (sortItem) => sortItem?.value === value,
        );
        if (sortItem) {
          setSort(sortItem);
        }
      }}
    >
      <SelectTrigger
        className={cn(
          " gap-3 rounded-md px-2 py-1.5 ring-1 ring-gray-200",
          className,
        )}
      >
        {sort?.Label}
      </SelectTrigger>
      <SelectContent
        style={{ direction: direction }}
        className=" mx-auto max-w-md"
      >
        <SelectGroup className=" flex flex-col gap-1 p-2">
          {sorts.current?.options?.map((sortItem) => {
            return (
              <SelectItem
                value={sortItem?.value}
                key={sortItem?.value}
                className=""
              >
                <p className=" text-sm">{sortItem?.Label}</p>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
