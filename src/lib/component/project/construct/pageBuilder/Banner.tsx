import Anchor from "@/lib/component/generic/pure/anchor";
import Image from "@/lib/component/generic/pure/image";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";
import { getPageBuilderBaseJSXStyle } from "@/lib/controller/pageBuilderController";
import { cn } from "@/lib/utils/utils";

interface Props {
  banner: PageBuilderType;
  isSmallDevice?: boolean;
}

export default function Banner({ banner, isSmallDevice }: Props) {
  return (
    <Anchor
      href={banner?.url}
      className={cn("h-full")}
      style={getPageBuilderBaseJSXStyle({
        css: banner?.properties?.css,
      })}
    >
      <Image
        src={
          isSmallDevice
            ? banner?.properties?.mobileIamge
            : banner?.properties?.desktopImage
        }
        alt=""
      ></Image>
    </Anchor>
  );
}
