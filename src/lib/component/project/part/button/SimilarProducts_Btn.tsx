import { Texts, getText } from "@/lib/assets/text";
import { ScrollTrigger } from "@/lib/component/generic/pure/scroll";
import { cn } from "@/lib/utils/utils";
import { PackageSearchIcon } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
  id: string;
}

export default function SimilarProducts_Btn({
  storeCode,
  id,
  className,
  ...restProps
}: Props) {
  return (
    <ScrollTrigger
      id={id}
      style={{ direction: "rtl" }}
      className={cn(
        " flex items-center justify-center rounded-none bg-background",
        className,
      )}
      {...restProps}
    >
      <p className=" px-1 text-xs">
        {getText({ storeCode: storeCode, text: Texts.seeSimilarProducts })}
      </p>
      <div className=" bg-background_inverted px-2 py-1 text-background">
        <PackageSearchIcon className=" h-6 w-6" />
      </div>
    </ScrollTrigger>
  );
}
