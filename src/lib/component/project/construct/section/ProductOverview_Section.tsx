import { Texts, getText } from "@/lib/assets/text";
import Spacing from "@/lib/component/generic/pure/spacing";
import { AttributeType } from "@/lib/data/models/ProductModel";
import { cn } from "@/lib/utils/utils";
import Attributes_Table from "../table/Attributes_Table";

type Props = {
  storeCode: string;
  longDescription: string;
  attributes: AttributeType[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function ProductOverview_Section({
  storeCode,
  longDescription,
  attributes = [],
  className,
}: Props) {
  return (
    <section
      className={cn(
        "rounded-xl bg-slate-50 px-5 pb-10 pt-6 lg:px-10",
        className,
      )}
    >
      <h3 className="border-b pb-3">
        {getText({ storeCode, text: Texts.overView })}
      </h3>
      <Spacing value={6} />
      <div className=" flex flex-col items-start justify-between gap-8 lg:flex-row">
        {/* long description */}
        <div className=" w-full lg:basis-1/2">
          <h5 className=" pb-3 text-slate-400">
            {getText({ storeCode, text: Texts.highlights })}
          </h5>
          <div
            dangerouslySetInnerHTML={{ __html: longDescription }}
            className="text-sm"
          ></div>
        </div>

        {/* attributes */}
        <div className=" w-full lg:basis-1/2">
          <h5 className=" pb-3 text-slate-400">
            {getText({ storeCode, text: Texts.specifications })}
          </h5>
          <Attributes_Table description={longDescription} />
        </div>
      </div>
    </section>
  );
}
