import QuickSort_Btn from "../../part/button/QuickSort_Btn";
import { FireIcon, HeartIcon, StarCircleIcon } from "@/lib/assets/svg";
import { isArabic } from "@/lib/helper/language";
import { Texts, getText } from "@/lib/assets/text";
import { sortTypes } from "@/lib/core/basic/Constants";
import { SortItemType } from "@/lib/data/models/SortModel";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/utils";

type Props = {
  storeCode: string;
  setSort: ((sort: SortItemType) => void) | undefined;
};

export default function QuickSort_Bar({
  storeCode,
  setSort,
  className,
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const isArabicLanguage = isArabic(storeCode);
  return (
    !!setSort && (
      <div className={cn(" flex items-center justify-center gap-2", className)}>
        {/* <QuickSort_Btn
          onClick={() => {
            setSort({
              Label: isArabicLanguage
                ? Texts.newArrival[0]
                : Texts.newArrival[1],
              value: sortTypes.positionHighToLow,
            });
          }}
        >
          <StarCircleIcon />
          <p className=" text-[13px] font-light">
            {isArabicLanguage ? Texts.newArrival[0] : Texts.newArrival[1]}
          </p>
        </QuickSort_Btn> */}
        <QuickSort_Btn
          onClick={() => {
            setSort({
              Label: getText({ storeCode, text: Texts.sales }),
              value: sortTypes.disCountHighToLow,
            });
          }}
        >
          <FireIcon />
          <p className=" text-[13px] font-light">
            {getText({ storeCode, text: Texts.sales })}
          </p>
        </QuickSort_Btn>
        <QuickSort_Btn
          onClick={() => {
            router.push(`/${storeCode}/best-sellers.html`);
          }}
        >
          <HeartIcon />
          <p className=" text-[13px] font-light">
            {getText({ storeCode, text: Texts.mostSold })}
          </p>
        </QuickSort_Btn>
      </div>
    )
  );
}
