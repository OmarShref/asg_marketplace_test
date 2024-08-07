import Anchor from "@/lib/component/generic/pure/anchor";
import Image from "@/lib/component/generic/pure/image";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";

interface Props {
  banner: PageBuilderType;
}

export default function Banner({ banner }: Props) {
  return (
    <Anchor href={banner.url}>
      <Image src={banner?.properties?.image + "?width=1200"} alt=""></Image>
    </Anchor>
  );
}
