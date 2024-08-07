import { PageBuilderType } from "@/lib/data/models/CmsPageModel";

type Props = {
  video: PageBuilderType;
};

export default function Video({ video }: Props) {
  const videoUrl = video?.children
    ?.at(0)
    ?.children?.at(0)
    ?.children?.at(0)
    ?.children?.at(0)?.properties?.src;
  return (
    <video muted autoPlay loop playsInline className=" w-full">
      <source src={videoUrl} type="video/mp4"></source>
    </video>
  );
}
