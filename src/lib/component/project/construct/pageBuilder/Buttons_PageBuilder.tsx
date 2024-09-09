import Anchor from "@/lib/component/generic/pure/anchor";
import { getPageBuilderBaseJSXStyle } from "@/lib/controller/pageBuilderController";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";

type Props = {
  storeCode: string;
  buttons: PageBuilderType | undefined;
};

export default function Buttons_PageBuilder({ storeCode, buttons }: Props) {
  const JSXStyle = getPageBuilderBaseJSXStyle({
    css: buttons?.properties?.css,
  });

  return (
    <div style={JSXStyle}>
      {buttons?.children?.map((button, index) => {
        const JSXStyle = getPageBuilderBaseJSXStyle({
          css: button?.properties?.css,
        });

        return (
          <Anchor key={index} href={button?.url}>
            <button style={JSXStyle}>{button?.label}</button>
          </Anchor>
        );
      })}
    </div>
  );
}
