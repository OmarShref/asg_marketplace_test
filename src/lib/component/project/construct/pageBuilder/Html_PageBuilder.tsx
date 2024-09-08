import { PageBuilderType } from "@/lib/data/models/CmsPageModel";
import { correctHtml } from "@/lib/helper/html_helper";

interface Props {
  html: PageBuilderType;
}

export default function Html_PageBuilder({ html }: Props) {
  const correctedHtml = correctHtml(html?.html ?? "");
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: correctedHtml ?? "",
      }}
      className=" overflow-hidden !leading-normal"
    ></div>
  );
}
