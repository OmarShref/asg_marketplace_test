import "./PageBuilder.css";
import { CmsPageModel, PageBuilderType } from "@/lib/data/models/CmsPageModel";
import {
  Row,
  Column,
  PageBuilder,
} from "@/lib/component/generic/pure/pageBuilder";
import { pageBuilderComponentTypes } from "@/lib/core/basic/Constants";
import Html from "./Html";
import Banner from "./Banner";
import Slider from "./Slider";
import IconCarousel from "./IconCarousel";
import Products from "./Products";
import { cn } from "@/lib/utils/utils";
import Video from "./Video";
import Heading from "./Heading";
import {
  getPageBuilderBaseJSXStyle,
  getRowWidthClassNameFromAppearance,
} from "@/lib/controller/pageBuilderController";

type Props = {
  storeCode: string;
  cms: CmsPageModel | undefined;
  classNameArray?: string[];
  isSmallDevice?: boolean;
};

// TODO:optimize image width in each component
export default function Cms({
  storeCode,
  cms,
  classNameArray,
  isSmallDevice = false,
}: Props) {
  return (
    cms && (
      <PageBuilder>
        {cms?.pageBuilder?.map((row: PageBuilderType, index: number) => {
          return (
            <Row
              key={index}
              className={cn(
                `${getRowWidthClassNameFromAppearance({ appearance: row?.properties?.appearance ?? "" })}`,
                classNameArray?.at(index),
                row?.properties?.classNames,
              )}
              style={{
                ...getPageBuilderBaseJSXStyle({
                  css: row?.properties?.css,
                }),
              }}
            >
              {row?.children
                ?.map((column: PageBuilderType, index: number) => {
                  return (
                    <Column
                      key={index}
                      className={cn(column?.properties?.classNames)}
                      style={{
                        ...getPageBuilderBaseJSXStyle({
                          css: column?.properties?.css,
                        }),
                      }}
                    >
                      {column.children?.map(
                        (child: PageBuilderType, index: number) => {
                          switch (child.componentType) {
                            case pageBuilderComponentTypes.heading:
                              return <Heading key={index} heading={child} />;

                            case pageBuilderComponentTypes.html:
                            case pageBuilderComponentTypes.text:
                              return <Html key={index} html={child} />;

                            case pageBuilderComponentTypes.banner:
                            case pageBuilderComponentTypes.image:
                              return (
                                <Banner
                                  key={index}
                                  banner={child}
                                  isSmallDevice={isSmallDevice}
                                />
                              );

                            case pageBuilderComponentTypes.slider:
                              return (
                                <Slider
                                  key={index}
                                  storeCode={storeCode}
                                  slider={child}
                                  isSmallDevice={isSmallDevice}
                                />
                              );

                            case pageBuilderComponentTypes.iconCarousel:
                              return (
                                <IconCarousel
                                  key={index}
                                  storeCode={storeCode}
                                  iconCarousel={child}
                                  isSmallDevice={isSmallDevice}
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
                })
                ?.reverse() // to solve the issue of magento reverse order
              }
            </Row>
          );
        })}
      </PageBuilder>
    )
  );
}
