import { PageBuilderType } from "@/lib/data/models/CmsPageModel";

interface Props {
  heading: PageBuilderType;
}

export default function Heading_PageBuilder({ heading }: Props) {
  const HeadingType = heading?.properties?.headingType as
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";
  return <HeadingType className=" mx-5 lg:mx-0">{heading?.value}</HeadingType>;
}
