import {
  RadioGroup,
  RadioGroupItem,
} from "@/lib/component/generic/ui/radio-group";
import { DrawerClose } from "@/lib/component/generic/ui/drawer";
import Anchor from "@/lib/component/generic/pure/anchor";

import { getDirection } from "@/lib/helper/direction";
import { Separator } from "@/lib/component/generic/ui/separator";
import { Label } from "@/lib/component/generic/ui/label";

type Props = {
  storeCode: string;
};

export default function Language_RadioGroup({ storeCode }: Props) {
  const direction = getDirection(storeCode);
  return (
    <RadioGroup
      defaultValue={storeCode.slice(3, 5)}
      style={{ direction: direction }}
      className=" mx-5 gap-3"
    >
      <DrawerClose asChild>
        <Anchor
          href={`/${storeCode.replace("en", "ar")}`}
          className="flex items-center gap-2"
        >
          <RadioGroupItem value="ar" id="language-radio-item-1" />
          <Label htmlFor="language-radio-item-1">العربية</Label>
        </Anchor>
      </DrawerClose>
      <Separator />
      <DrawerClose asChild>
        <Anchor
          href={`/${storeCode.replace("ar", "en")}`}
          className="flex items-center gap-2"
        >
          <RadioGroupItem value="en" id="language-radio-item-2" />
          <Label htmlFor="language-radio-item-2">English</Label>
        </Anchor>
      </DrawerClose>
      <Separator />
    </RadioGroup>
  );
}
