"use client";
import "./PageBuilder.css";
import { cn } from "@/lib/utils/utils";
import { CmsPageModel, PageBuilderType } from "@/lib/data/models/CmsPageModel";
import {
  Row,
  Column,
  PageBuilder,
} from "@/lib/component/generic/pure/pageBuilder";
import { pageBuilderComponentTypes } from "@/lib/core/basic/Constants";
import {
  getPageBuilderBaseJSXStyle,
  getRowWidthClassNameFromAppearance,
} from "@/lib/controller/pageBuilderController";
import HtmlـPageBuilder from "./Html_PageBuilder";
import BannerـPageBuilder from "./Banner_PageBuilder";
import SliderـPageBuilder from "./SliderـPageBuilder";
import IconCarouselـPageBuilder from "./IconCarousel_PageBuilder";
import ProductsـPageBuilder from "./ProductsـPageBuilder";
import VideoـPageBuilder from "./VideoـPageBuilder";
import HeadingـPageBuilder from "./Heading_PageBuilder";
import Tabs_PageBuilder from "./Tabs_PageBuilder";
import Buttons_PageBuilder from "./Buttons_PageBuilder";

type Props = {
  storeCode: string;
  cms: CmsPageModel | undefined;
  isSmallDevice?: boolean;
};

// TODO:optimize image width in each component
export default function Cms({ storeCode, cms, isSmallDevice = false }: Props) {
  return (
    cms && (
      <PageBuilder>
        {renderPageBuilderComponent({
          storeCode,
          isSmallDevice,
          child: cms?.pageBuilder,
        })}
      </PageBuilder>
    )
  );
}

export function renderPageBuilderComponent({
  storeCode,
  isSmallDevice = false,
  child,
}: {
  storeCode: string;
  isSmallDevice?: boolean;
  child: PageBuilderType | PageBuilderType[] | undefined;
}): React.ReactNode[] {
  const children = Array.isArray(child) ? child : child?.children;
  return children?.map((child: PageBuilderType, index: number) => {
    switch (child.componentType) {
      case pageBuilderComponentTypes.row:
        return (
          <Row
            key={index}
            className={cn(
              `${getRowWidthClassNameFromAppearance({ appearance: child?.properties?.appearance ?? "" })}`,
              child?.properties?.classNames,
            )}
            style={{
              ...getPageBuilderBaseJSXStyle({
                css: child?.properties?.css,
              }),
              backgroundImage: `url(${child?.properties?.desktopImage})`,
            }}
          >
            {renderPageBuilderComponent({
              storeCode,
              isSmallDevice,
              child,
            })?.reverse()}
          </Row>
        );

      case pageBuilderComponentTypes.column:
        return (
          <Column
            key={index}
            className={cn(child?.properties?.classNames)}
            style={{
              ...getPageBuilderBaseJSXStyle({
                css: child?.properties?.css,
              }),
              backgroundImage: `url(${child?.properties?.desktopImage})`,
            }}
          >
            {renderPageBuilderComponent({
              storeCode,
              isSmallDevice,
              child,
            })}
          </Column>
        );

      case pageBuilderComponentTypes.heading:
        return <HeadingـPageBuilder key={index} heading={child} />;

      case pageBuilderComponentTypes.html:
      case pageBuilderComponentTypes.text:
        return <HtmlـPageBuilder key={index} html={child} />;

      case pageBuilderComponentTypes.banner:
      case pageBuilderComponentTypes.image:
        return (
          <BannerـPageBuilder
            key={index}
            banner={child}
            isSmallDevice={isSmallDevice}
          />
        );

      case pageBuilderComponentTypes.slider:
        return (
          <SliderـPageBuilder
            key={index}
            storeCode={storeCode}
            slider={child}
            isSmallDevice={isSmallDevice}
          />
        );

      case pageBuilderComponentTypes.iconCarousel:
        return (
          <IconCarouselـPageBuilder
            key={index}
            storeCode={storeCode}
            iconCarousel={child}
            isSmallDevice={isSmallDevice}
          />
        );

      case pageBuilderComponentTypes.products:
        return (
          <ProductsـPageBuilder
            key={index}
            storeCode={storeCode}
            products={child}
          />
        );

      case pageBuilderComponentTypes.video:
        return <VideoـPageBuilder key={index} video={child} />;

      case pageBuilderComponentTypes.tabs:
        return (
          <Tabs_PageBuilder
            key={index}
            storeCode={storeCode}
            tabs={child}
            isSmallDevice={isSmallDevice}
          />
        );

      case pageBuilderComponentTypes.block:
        return renderPageBuilderComponent({
          storeCode,
          isSmallDevice,
          child,
        });

      case pageBuilderComponentTypes.buttons:
        return (
          <Buttons_PageBuilder
            key={index}
            storeCode={storeCode}
            buttons={child}
          />
        );

      default:
        return null;
    }
  }) as React.ReactNode[];
}
