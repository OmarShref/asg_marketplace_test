import Anchor from "@/lib/component/generic/pure/anchor";
import Image from "@/lib/component/generic/pure/image";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";
import { getPageBuilderJSXStyle } from "@/lib/controller/pageBuilderController";

interface Props {
  banner: PageBuilderType;
}

export default function Banner({ banner }: Props) {
  return (
    <Anchor
      href={banner?.url}
      className="h-full"
      style={getPageBuilderJSXStyle({
        css: banner?.properties?.css,
      })}
    >
      <Image src={banner?.properties?.image} alt=""></Image>
    </Anchor>
  );
}
