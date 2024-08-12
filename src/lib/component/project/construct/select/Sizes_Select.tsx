"use client";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/lib/component/generic/ui/select";
import { getDirection } from "@/lib/helper/direction";
import { cn } from "@/lib/utils/utils";
import { VariantOptionType, VariantType } from "@/lib/data/models/ProductModel";
import { Texts, getText } from "@/lib/assets/text";

type Props = {
  storeCode: string;
  sizeVariant: VariantType | undefined;
  curretSizeVariantOption: VariantOptionType | undefined;
  setCurretSizeVariantOption: (option: VariantOptionType | undefined) => void;
};

export default function Sizes_Select({
  storeCode,
  sizeVariant,
  curretSizeVariantOption,
  setCurretSizeVariantOption,
  className,
}: Props & React.HtmlHTMLAttributes<HTMLDivElement>) {
  const direction = getDirection(storeCode);

  return (
    <Select
      value={curretSizeVariantOption?.value}
      dir={direction}
      onValueChange={(value) => {
        const sizeOption = sizeVariant?.options?.find(
          (option) => option?.value === value,
        );
        if (sizeOption) {
          setCurretSizeVariantOption(sizeOption);
        }
      }}
    >
      <SelectTrigger
        className={cn(
          " font-fontEnglish gap-3 rounded-md px-7 py-1.5 font-semibold ring-1 ring-gray-200",
          className,
        )}
      >
        {curretSizeVariantOption?.value ??
          getText({
            storeCode: storeCode,
            text: Texts.chooseSize,
          })?.replace(":", "")}
      </SelectTrigger>
      <SelectContent
        style={{ direction: direction }}
        className=" mx-auto max-w-md"
      >
        <SelectGroup className=" flex flex-col gap-1 p-2">
          {sizeVariant?.options?.map((option) => {
            return (
              <SelectItem
                value={option?.value}
                key={option?.value}
                className="font-fontEnglish "
              >
                <p className=" text-sm">{option?.value}</p>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
