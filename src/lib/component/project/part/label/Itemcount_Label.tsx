import { Label } from "@/lib/component/generic/pure/label";

type Props = {
  value: string;
  className?: string;
};

export default function Itemcount_Label({ value, className }: Props) {
  return (
    <Label
      className={` font-montserrat-remove absolute flex h-5 w-5 items-center justify-center rounded-full bg-label_itemcount_background text-xs font-light ${className}`}
    >
      {value}
    </Label>
  );
}
