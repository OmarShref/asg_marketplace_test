import { PageBuilderType } from "@/lib/data/models/CmsPageModel";

interface Props {
  text: PageBuilderType;
}

export default function Text({ text }: Props) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: text.html ?? "",
      }}
      className=" mx-5"
    ></div>
  );
}
