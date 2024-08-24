import { PageBuilderType } from "@/lib/data/models/CmsPageModel";
import { Carousel_3 } from "../carousel/Carousel_3";
import Anchor from "@/lib/component/generic/pure/anchor";
import Image from "@/lib/component/generic/pure/image";

interface Props {
  storeCode: string;
  iconCarousel: PageBuilderType;
  isSmallDevice?: boolean;
}

export default function IconCarousel({
  storeCode,
  iconCarousel,
  isSmallDevice,
}: Props) {
  const imageRadius = iconCarousel?.properties?.css["border-radius"];
  return (
    <section
      className=" flex flex-wrap items-center justify-start gap-y-2"
      style={{
        justifyContent: `${iconCarousel?.properties?.css["text-align"]}`,
      }}
    >
      {iconCarousel?.children?.map((item, index) => {
        return (
          <Anchor
            key={index}
            href={item?.url}
            className={` px-2`}
            style={{
              flexBasis: `${iconCarousel?.properties?.css["min-height"]}`,
            }}
            target={item?.target}
          >
            <Image
              src={
                isSmallDevice
                  ? item?.properties?.mobileIamge
                  : item?.properties?.desktopImage
              }
              alt={item?.componentType + index}
              highPeriority={true}
              style={{
                borderRadius: `${imageRadius}`,
                overflow: "clip",
              }}
            />
            <p className=" py-1 text-center text-xs text-primary_text">
              {item?.name}
            </p>
          </Anchor>
        );
      })}
    </section>
  );
}
