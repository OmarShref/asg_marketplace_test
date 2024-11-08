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
import { getAddressyRegions } from "@/lib/network/repo/client_repos/gql/address";
import { AddressModel } from "@/lib/data/models/AddressModel";
import { getDirection } from "@/lib/helper/direction";
import { Input } from "@/lib/component/generic/ui/input";

type Props = {
  setValue: (city: string) => void;
  countryCode: string | undefined;
};

export function Region_ComboBox({ setValue, countryCode }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  const [regions, setRegions] = useState<PlaceModel[]>([]);
  async function handleGetAddressyRegions(countryCode: string) {
    const regionsData = await getAddressyRegions({ countryCode });

    setRegions(regionsData ?? []);
  }
  useEffect(() => {
    if (!!countryCode) {
      handleGetAddressyRegions(countryCode);
    }
  }, [countryCode]);

  function stringifyRegion(region: PlaceModel) {
    return `${region?.code} | ${region?.name} | ${region?.id}`.trim();
  }

  return regions?.length > 0 ? (
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
              {selectedRegion
                ? regions?.find(
                    (region) => selectedRegion === stringifyRegion(region),
                  )?.name
                : getText({
                    storeCode: useUtilityStore?.getState()?.storeCode,
                    text: Texts.selectCity,
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
              text: Texts.searchCity,
            })}
            dir={getDirection(useUtilityStore?.getState()?.storeCode)}
            className="h-10"
          />

          <CommandList className="max-h-[140px]">
            <CommandEmpty>
              {getText({
                storeCode: useUtilityStore?.getState()?.storeCode,
                text: Texts.noCityFound,
              })}
            </CommandEmpty>
            <CommandGroup>
              {regions?.map((region) => {
                return (
                  <CommandItem
                    key={region?.code}
                    value={stringifyRegion(region)}
                    onSelect={(currentValue) => {
                      setValue(currentValue);
                      setSelectedRegion(currentValue);
                      setOpen(false);
                    }}
                    className={`${
                      selectedRegion === stringifyRegion(region)
                        ? "bg-secondary"
                        : ""
                    }`}
                    dir={getDirection(useUtilityStore?.getState()?.storeCode)}
                  >
                    {region?.name}
                    <CheckIcon
                      className={cn(
                        "h-4 w-4",
                        selectedRegion === stringifyRegion(region)
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
          text: Texts.city,
        })}
        className=" h-auto border-none bg-transparent p-0 text-base"
        onChange={(e: any) => setValue(e.target.value)}
      />
    </div>
  );
}
