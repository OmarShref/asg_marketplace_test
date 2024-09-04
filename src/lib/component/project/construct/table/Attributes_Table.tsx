import { Separator } from "@/lib/component/generic/ui/separator";
import { AttributeType } from "@/lib/data/models/ProductModel";
import { cn } from "@/lib/utils/utils";

type Props = {
  attributes: AttributeType[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function Attributes_Table({ attributes, className }: Props) {
  return (
    <div
      className={cn(" relative w-full overflow-hidden rounded-lg ", className)}
    >
      {attributes
        ?.filter((attribute) => attribute?.show)
        ?.map((attribute, index) => (
          <div key={index} className={` flex  ${index !== 0 ? "" : ""}`}>
            <p
              className={` flex basis-1/2 items-center py-1 ps-3 text-sm ${index % 2 === 0 ? "bg-slate-300 " : "bg-background"}`}
            >
              {attribute?.name}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: attribute?.value ?? "" }}
              className={` flex basis-1/2 flex-col items-start py-1 ps-3 text-sm ${index % 2 != 0 ? "bg-slate-300 " : "bg-background"}`}
            ></div>
          </div>
        ))}
      <Separator orientation="vertical" className=" absolute start-1/2 top-0" />
    </div>
  );
}
