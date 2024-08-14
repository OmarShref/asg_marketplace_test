import { PageBuilderType } from "@/lib/data/models/CmsPageModel";

interface Props {
  html: PageBuilderType;
}

export default function Text({ html }: Props) {
  const correctedHtml = html?.html
    ?.replaceAll("&lt;", "<")
    ?.replaceAll("&gt;", ">");
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: correctedHtml ?? "",
      }}
      className=" mx-5 lg:mx-0"
    ></div>
  );
}
