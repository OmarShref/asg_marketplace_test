import { PageBuilderType } from "@/lib/data/models/CmsPageModel";

interface Props {
  html: PageBuilderType;
}

export default function Html({ html }: Props) {
  const correctedHtml = html?.html
    ?.replaceAll("&lt;", "<")
    ?.replaceAll("&gt;", ">");
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: correctedHtml ?? "",
      }}
      className=" overflow-hidden !leading-normal"
    ></div>
  );
}
