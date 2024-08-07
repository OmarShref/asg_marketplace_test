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
          (sortItem) => sortItem?.value === value
        );
        if (sortItem) {
          setSort(sortItem);
        }
      }}
    >
      <SelectTrigger
        className={cn(
          " gap-3 ring-1 ring-gray-200 py-1.5 px-2 rounded-md",
          className
        )}
      >
        {sort?.Label}
      </SelectTrigger>
      <SelectContent
        style={{ direction: direction }}
        className=" mx-auto max-w-md"
      >
        <SelectGroup className=" gap-1 p-2 flex flex-col">
          {sorts.current?.options?.map((sortItem) => {
            return (
              <SelectItem
                value={sortItem?.value}
                key={sortItem?.value}
                className="pt-1"
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
