"use client";
import { cn } from "@/lib/utils/utils";
import { useEffect, useState } from "react";

type Props = {
  description: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Description_Table({ description, className }: Props) {
  const [decriptionArray, setDecriptionArray] = useState<string[][]>();
  useEffect(() => {
    setDecriptionArray(extractTextContentArrayFromHtml(description));
  }, []);

  return (
    <div
      className={cn(
        " relative w-full overflow-hidden rounded-lg border",
        className,
      )}
    >
      {decriptionArray?.map((item, index) => (
        <div key={index} className={` flex `}>
          <p
            className={` flex basis-1/2 items-center py-1 ps-3 text-sm ${index % 2 === 0 ? "bg-slate-200" : ""}`}
          >
            {item[0]}
          </p>
          <p
            className={` flex basis-1/2 items-center py-1 ps-3 text-sm ${index % 2 != 0 ? "bg-slate-200" : ""}`}
          >
            {item[1]}
          </p>
        </div>
      ))}
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

  const listItems =
    (div?.querySelectorAll("li")?.length ?? 0) > 0
      ? div?.querySelectorAll("li")
      : div?.querySelectorAll("p");

  listItems?.forEach((item) => {
    textContentArray.push(item?.textContent?.split(":") as string[]);
  });

  return textContentArray;
}
