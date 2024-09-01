import Anchor from "@/lib/component/generic/pure/anchor";
import Image from "@/lib/component/generic/pure/image";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";
import { getPageBuilderBaseJSXStyle } from "@/lib/controller/pageBuilderController";
import { cn } from "@/lib/utils/utils";

interface Props {
  banner: PageBuilderType;
  isSmallDevice?: boolean;
}

export default function Banner_PageBuilder({ banner, isSmallDevice }: Props) {
  const JSXStyle = getPageBuilderBaseJSXStyle({
    css: banner?.properties?.css,
  });
  return (
    <Anchor href={banner?.url} className={cn("h-full")} style={JSXStyle}>
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
