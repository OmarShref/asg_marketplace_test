import Anchor from "@/lib/component/generic/pure/anchor";
import { getPageBuilderBaseJSXStyle } from "@/lib/controller/pageBuilderController";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";
import { cn } from "@/lib/utils/utils";

type Props = {
  storeCode: string;
  buttons: PageBuilderType | undefined;
};

export default function Buttons_PageBuilder({ storeCode, buttons }: Props) {
  const JSXStyle = getPageBuilderBaseJSXStyle({
    css: buttons?.properties?.css,
  });

  return (
    <div style={JSXStyle} className="flex items-center justify-start gap-2.5">
      {buttons?.children?.map((button, index) => {
        const JSXStyle = getPageBuilderBaseJSXStyle({
          css: button?.properties?.css,
        });

        return (
          <Anchor key={index} href={button?.url}>
            <button
              style={JSXStyle}
              className={cn(
                "flex items-center justify-center",
                button?.properties?.classNames,
              )}
            >
              {button?.label}
            </button>
          </Anchor>
        );
      })}
    </div>
  );
}
