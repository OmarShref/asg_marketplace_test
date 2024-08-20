import { Separator } from "@/lib/component/generic/ui/separator";
import { cn } from "@/lib/utils/utils";

type Props = {
  description: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Attributes_Table({ description, className }: Props) {
  const decriptionArray = extractTextContentArrayFromHtml(description);

  return (
    <div
      className={cn(" relative w-full overflow-hidden rounded-lg ", className)}
    >
      {decriptionArray.map((item, index) => (
        <div key={index} className={` flex  ${index !== 0 ? "" : ""}`}>
          <p
            className={` flex basis-1/2 items-center py-1 ps-3 text-sm ${index % 2 === 0 ? "bg-slate-300 " : "bg-background"}`}
          >
            {item[0]}
          </p>
          <p
            className={` flex basis-1/2 items-center py-1 ps-3 text-sm ${index % 2 != 0 ? "bg-slate-300 " : "bg-background"}`}
          >
            {item[1]}
          </p>
        </div>
      ))}
      <Separator orientation="vertical" className=" absolute start-1/2 top-0" />
    </div>
  );
}

function extractTextContentArrayFromHtml(html: string) {
  let textContentArray: string[][] = [];

  let div;

  if (typeof document != "undefined") {
    div = document.createElement("div");
  }

  if (div) {
    div.innerHTML = html;
  }

  const listItems = div?.querySelectorAll("li");

  listItems?.forEach((item) => {
    textContentArray.push(item?.textContent?.split(":") as string[]);
  });

  return textContentArray;
}
