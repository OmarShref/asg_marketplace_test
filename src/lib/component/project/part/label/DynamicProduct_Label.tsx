import Anchor from "@/lib/component/generic/pure/anchor";
import Image from "@/lib/component/generic/pure/image";
import { LabelType } from "@/lib/data/models/ProductModel";
import { isNowBetweenDates } from "@/lib/helper/dateTime";
import { getStyleObjectFromString } from "@/lib/helper/style";
import { cn } from "@/lib/utils/utils";
import { useRef } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: LabelType | undefined;
}

export default function DynamicProduct_Label({ label, className }: Props) {
  function getLabelPosition(): string {
    let position = "top-0 right-0";

    switch (label?.position) {
      case "TopLeft":
        position = "top-0 left-0";
        break;

      case "TopCenter":
        position = "top-0 left-1/2 -translate-x-1/2";
        break;

      case "TopRight":
        position = "top-0 right-0";
        break;

      case "MiddleLeft":
        position = "top-1/2 left-0 -translate-y-1/2";
        break;

      case "MiddleCenter":
        position = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
        break;

      case "MiddleRight":
        position = "top-1/2 right-0 -translate-y-1/2";
        break;

      case "BottomLeft":
        position = "bottom-0 left-0";
        break;

      case "BottomCenter":
        position = "bottom-0 left-1/2 -translate-x-1/2";
        break;

      case "BottomRight":
        position = "bottom-0 right-0";
        break;
    }

    return position;
  }

  const isActiveLabel = useRef(
    isNowBetweenDates({ from: label?.activeFrom, to: label?.activeTo }),
  );

  const textStyle = useRef(getStyleObjectFromString(label?.textStyle ?? ""));

  return (
    !!label &&
    isActiveLabel?.current &&
    (!!label?.image ? (
      // image label
      <Anchor
        href={label?.redirectUrl}
        className={cn(` absolute z-10 ${getLabelPosition()}`, className)}
        style={{ width: `${label?.imageSize}%` }}
      >
        <Image src={label?.image} alt="" />
      </Anchor>
    ) : (
      // text label
      <Anchor
        href={label?.redirectUrl}
        className={cn(` absolute z-10 ${getLabelPosition()}`, className)}
      >
        <p style={textStyle?.current}>{label?.labelText ?? ""}</p>
      </Anchor>
    ))
  );
}
