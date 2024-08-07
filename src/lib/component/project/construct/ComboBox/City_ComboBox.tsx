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
import { PlaceModel } from "@/lib/data/models/PlaceModel";
import { getAddressCities } from "@/lib/network/client/gql/address";
import { getDirection } from "@/lib/helper/direction";
import { Input } from "@/lib/component/generic/ui/input";

type Props = {
  setValue: (city: string) => void;
  regionId: number | undefined;
};

export function City_ComboBox({ setValue, regionId }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const [cities, setCities] = useState<PlaceModel[]>([]);
  async function handleGetAddressyRegions(regionId: number) {
    const citiesData = await getAddressCities({ regionId });

    setCities(citiesData ?? []);
  }
  useEffect(() => {
    if (!!regionId) {
      handleGetAddressyRegions(regionId);
    }
  }, [regionId]);

  function stringifyCity(city: PlaceModel) {
    return `${city?.code} | ${city?.name}`.trim();
  }

  return cities?.length > 0 ? (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            role="combobox"
            aria-expanded={open}
            className="w-full justify-start gap-3 bg-form_field_background p-3"
          >
            <HomeIcon className="h-5 w-5 text-accent" />
            <p>
              {selectedCity
                ? cities?.find((city) => selectedCity === stringifyCity(city))
                    ?.name
                : getText({
                    storeCode: useUtilityStore?.getState()?.storeCode,
                    text: Texts.selectDistrict,
                  })}
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
              text: Texts.searchDistrict,
            })}
            dir={getDirection(useUtilityStore?.getState()?.storeCode)}
            className="h-10"
          />

          <CommandList className="max-h-[140px]">
            <CommandEmpty>
              {getText({
                storeCode: useUtilityStore?.getState()?.storeCode,
                text: Texts.noDistrictFound,
              })}
            </CommandEmpty>
            <CommandGroup>
              {cities?.map((city) => {
                return (
                  <CommandItem
                    key={city?.code}
                    value={stringifyCity(city)}
                    onSelect={(currentValue) => {
                      setValue(currentValue?.split("|")[0].trim());
                      setSelectedCity(currentValue);
                      setOpen(false);
                    }}
                    className={`${
                      selectedCity === stringifyCity(city) ? "bg-slate-100" : ""
                    }`}
                    dir={getDirection(useUtilityStore?.getState()?.storeCode)}
                  >
                    {city?.name}
                    <CheckIcon
                      className={cn(
                        "h-4 w-4",
                        selectedCity === stringifyCity(city)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
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
          text: Texts.district,
        })}
        className=" h-auto border-none bg-transparent p-0 text-base"
        onChange={(e: any) => setValue(e.target.value)}
      />
    </div>
  );
}
