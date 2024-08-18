import { CmsPageModel, PageBuilderType } from "@/lib/data/models/CmsPageModel";
import {
  Row,
  Column,
  PageBuilder,
} from "@/lib/component/generic/pure/pageBuilder";
import { pageBuilderComponentTypes } from "@/lib/core/basic/Constants";
import Text from "./Text";
import Banner from "./Banner";
import Slider from "./Slider";
import IconCarousel from "./IconCarousel";
import Products from "./Products";
import { cn } from "@/lib/utils/utils";
import Video from "./Video";
import Heading from "./Heading";
import {
  getPageBuilderJSXStyle,
  getRowWidthClassNameFromAppearance,
} from "@/lib/controller/pageBuilderController";
import { it } from "node:test";

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
                `${getRowWidthClassNameFromAppearance({ appearance: item?.properties?.appearance ?? "" })}`,
                classNameArray?.at(index),
              )}
              style={getPageBuilderJSXStyle({
                css: item?.properties?.css,
              })}
            >
              {item?.children?.map((child: PageBuilderType, index: number) => {
                return (
                  <Column
                    key={index}
                    style={getPageBuilderJSXStyle({
                      css: child?.properties?.css,
                    })}
                  >
                    {child.children?.map(
                      (child: PageBuilderType, index: number) => {
                        switch (child.componentType) {
                          case pageBuilderComponentTypes.heading:
                            return <Heading key={index} heading={child} />;

                          case pageBuilderComponentTypes.html:
                          case pageBuilderComponentTypes.text:
                            return <Text key={index} html={child} />;

                          case pageBuilderComponentTypes.banner:
                          case pageBuilderComponentTypes.image:
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
                );
              })}
            </Row>
          );
        })}
      </PageBuilder>
    )
  );
}
