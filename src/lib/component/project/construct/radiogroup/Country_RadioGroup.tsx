import {
  RadioGroup,
  RadioGroupItem,
} from "@/lib/component/generic/ui/radio-group";
import { DrawerClose } from "@/lib/component/generic/ui/drawer";
import Anchor from "@/lib/component/generic/pure/anchor";
import { getDirection } from "@/lib/helper/direction";
import { Separator } from "@/lib/component/generic/ui/separator";
import { Label } from "@/lib/component/generic/ui/label";
import { Fragment } from "react";
import Image from "@/lib/component/generic/pure/image";
import { CountryInfoType } from "@/lib/data/models/ConfigurationModel";

type Props = {
  storeCode: string;
  countries: CountryInfoType[];
};

export default function Country_RadioGroup({ storeCode, countries }: Props) {
  const direction = getDirection(storeCode);
  return (
    <RadioGroup
      defaultValue={storeCode.slice(0, 2)}
      style={{ direction: direction }}
      className=" mx-5 gap-3"
    >
      {countries.map((country, index) => {
        return (
          <Fragment key={index}>
            <DrawerClose asChild>
              <Anchor
                href={`/${country?.code + storeCode.slice(2, 5)}`}
                className="flex cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value={country?.code} />
                  <p className=" text-sm">{country?.name}</p>
                </div>
                <Image
                  src={country?.flag}
                  alt={`${country?.name} flag`}
                  className=" h-auto w-6 object-contain"
                />
              </Anchor>
            </DrawerClose>
            <Separator />
          </Fragment>
        );
      })}
    </RadioGroup>
  );
}
