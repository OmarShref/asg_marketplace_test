import { CmsPageModel, PageBuilderType } from "@/lib/data/models/CmsPageModel";
import {
  Row,
  Column,
  PageBuilder,
} from "@/lib/component/generic/pure/pageBuilder";
import { pageBuilderComponentTypes } from "@/lib/core/basic/Constants";
import Text from "./Text";
import { Fragment } from "react";
import Banner from "./Banner";
import Slider from "./Slider";
import IconCarousel from "./IconCarousel";
import Products from "./Products";
import { cn } from "@/lib/utils/utils";
import Video from "./Video";

type Props = {
  storeCode: string;
  cms: CmsPageModel | undefined;
  classNameArray?: string[];
};

// TODO:optimize image width in each component
export default function Cms({ storeCode, cms, classNameArray }: Props) {
  return (
    cms && (
      <PageBuilder>
        {cms?.pageBuilder?.map((item: PageBuilderType, index: number) => {
          return (
            <Row
              key={index}
              className={cn(
                `${
                  item?.children
                    ?.at(0)
                    ?.children?.at(0)
                    ?.children?.at(0)
                    ?.children?.at(0)?.componentType ===
                  pageBuilderComponentTypes.banner
                    ? "px-5"
                    : "px-0"
                } md:mx-auto md:max-w-project`,
                classNameArray?.at(index),
              )}
            >
              {item?.children
                ?.at(0)
                ?.children?.at(0)
                ?.children?.at(0)
                ?.children?.map((child: PageBuilderType, index: number) => {
                  const marginRight = child?.properties?.css?.["margin-right"];
                  const marginleft = child?.properties?.css?.["margin-left"];

                  return (
                    <Fragment key={index}>
                      <Column
                        style={{
                          width: child?.properties?.css?.width ?? "100%",
                          marginRight: marginleft,
                          marginLeft: marginRight,
                        }}
                      >
                        {child.children?.map(
                          (child: PageBuilderType, index: number) => {
                            switch (child.componentType) {
                              case pageBuilderComponentTypes.text:
                                return <Text key={index} text={child} />;

                              case pageBuilderComponentTypes.banner:
                                return <Banner key={index} banner={child} />;

                              case pageBuilderComponentTypes.slider:
                                return (
                                  <Slider
                                    key={index}
                                    storeCode={storeCode}
                                    slider={child}
                                  />
                                );

                              case pageBuilderComponentTypes.iconCarousel:
                                return (
                                  <IconCarousel
                                    key={index}
                                    storeCode={storeCode}
                                    iconCarousel={child}
                                  />
                                );

                              case pageBuilderComponentTypes.products:
                                return (
                                  <Products
                                    key={index}
                                    storeCode={storeCode}
                                    products={child}
                                  />
                                );

                              case pageBuilderComponentTypes.video:
                                return <Video key={index} video={child} />;

                              default:
                                return null;
                            }
                          },
                        )}
                      </Column>
                    </Fragment>
                  );
                })}
            </Row>
          );
        })}
      </PageBuilder>
    )
  );
}
