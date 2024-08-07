"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/utils";
import { Button } from "@/lib/component/generic/ui/button";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/lib/component/generic/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/component/generic/ui/popover";
import { CheckIcon } from "lucide-react";
import { FormControl } from "@/lib/component/generic/ui/form";
import { Texts, getText } from "@/lib/assets/text";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { HomeIcon } from "@/lib/assets/svg";
import { PlaceInterface, PlaceModel } from "@/lib/data/models/PlaceModel";
import { getDirection } from "@/lib/helper/direction";
import { Input } from "@/lib/component/generic/ui/input";

type Props = {
  setValue: (city: string) => void;
  countries: PlaceInterface[];
};

export function Country_ComboBox({ setValue, countries }: Props) {
  const [open, setOpen] = useState(false);

  function stringifyCountry(country: PlaceInterface | undefined) {
    return !!country
      ? `${country?.code} | ${country?.name} | ${country?.flag}`.trim()
      : "";
  }

  const [selectedCountry, setSelectedCountry] = useState<string>();
  useEffect(() => {
    if (countries) {
      setSelectedCountry(
        stringifyCountry(
          countries?.find((country) => country?.code?.toLowerCase() === "sa"),
        ),
      );
    }
  }, [countries]);

  return countries?.length > 0 ? (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between gap-3 bg-form_field_background p-3"
          >
            <div className=" flex items-center gap-3">
              <HomeIcon className="h-5 w-5 text-accent" />
              <p>
                {selectedCountry
                  ? selectedCountry?.split("|")[1]?.trim() ?? ""
                  : getText({
                      storeCode: useUtilityStore?.getState()?.storeCode,
                      text: Texts.selectCountry,
                    })}
              </p>
            </div>
            <p className=" text-2xl leading-5">
              {selectedCountry
                ? selectedCountry?.split("|")[2]?.trim() ?? ""
                : null}
            </p>
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent
        className="w-[300px] overflow-y-scroll p-0"
        sideOffset={-44}
        side="bottom"
      >
        <Command>
          <CommandInput
            placeholder={getText({
              storeCode: useUtilityStore?.getState()?.storeCode,
              text: Texts.searchCountry,
            })}
            dir={getDirection(useUtilityStore?.getState()?.storeCode)}
            className="h-10"
          />

          <CommandList className="max-h-[140px]">
            <CommandEmpty>
              {getText({
                storeCode: useUtilityStore?.getState()?.storeCode,
                text: Texts.noCountryFound,
              })}
            </CommandEmpty>
            <CommandGroup>
              {countries?.map((country) => {
                return (
                  <CommandItem
                    key={country?.code}
                    value={stringifyCountry(country)}
                    onSelect={(currentValue) => {
                      setValue(currentValue?.split("|")[0].trim());
                      setSelectedCountry(currentValue);
                      setOpen(false);
                    }}
                    className={`${
                      selectedCountry === stringifyCountry(country)
                        ? "bg-slate-100"
                        : ""
                    }`}
                    dir={getDirection(useUtilityStore?.getState()?.storeCode)}
                  >
                    <p>{country?.name}</p>

                    <div className=" flex items-center gap-2">
                      <p className=" text-2xl">{country?.flag}</p>

                      <CheckIcon
                        className={cn(
                          "h-4 w-4",
                          selectedCountry === stringifyCountry(country)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  ) : (
    <div className="relative flex items-center justify-start gap-3 rounded-lg bg-form_field_background px-3 py-3">
      <HomeIcon className="h-5 w-5 text-accent" />
      <Input
        type="text"
        maxLength={50}
        placeholder={getText({
          storeCode: useUtilityStore?.getState()?.storeCode,
          text: Texts.country,
        })}
        className=" h-auto border-none bg-transparent p-0 text-base"
        onChange={(e: any) => setValue(e.target.value)}
      />
    </div>
  );
}
