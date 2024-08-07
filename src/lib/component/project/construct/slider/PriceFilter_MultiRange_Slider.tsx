"use client";
import { Slider } from "@/lib/component/generic/ui/slider";
import { FilterItemType } from "@/lib/data/models/FilterModel";
import { getDirection } from "@/lib/helper/direction";
import { cn } from "@/lib/utils/utils";
import { useEffect, useMemo, useState } from "react";

type SliderProps = React.ComponentProps<typeof Slider> & {
  storeCode: string;
  filter: FilterItemType;
  setRabgeCallback: ({ range }: { range: [number, number] }) => void;
};

export function PriceFilter_MultiRange_Slider({
  className,
  storeCode,
  filter,
  setRabgeCallback,
  ...props
}: SliderProps) {
  const direction = useMemo(() => getDirection(storeCode), [storeCode]);
  const [min, setMin] = useState<number | undefined>(filter?.min);
  const [max, setMax] = useState<number | undefined>(filter?.max);
  useEffect(() => {
    setMin(filter?.min);
    setMax(filter?.max);
  }, [filter]);

  return (
    <section
      className="w-full"
      dir={direction}
      key={`${filter?.min}-${filter?.max}`}
    >
      <Slider
        defaultValue={[filter?.min, filter?.max]}
        min={filter?.min}
        max={filter?.max}
        step={1}
        dir={direction}
        className={cn("", className)}
        onValueChange={(value) => {
          setMin(value?.at(0));
          setMax(value?.at(1));
          setRabgeCallback({ range: value as [number, number] });
        }}
        {...props}
      />
      <div className="flex justify-between pt-3">
        <p className="font-montserrat-remove">{min}</p>
        <p className="font-montserrat-remove">{max}</p>
      </div>
    </section>
  );
}
