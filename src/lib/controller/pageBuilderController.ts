import { getStyleJSXObjectFromString } from "../helper/style";

export function getPageBuilderJSXStyle({ css }: { css: string }) {
  const cssJSXObject = getStyleJSXObjectFromString({
    styleString: JSON.stringify(css),
    separator: ",",
  });
  return cssJSXObject;
}

export function getRowWidthClassNameFromAppearance({
  appearance,
}: {
  appearance: string;
}) {
  switch (appearance) {
    case "contained":
      return " max-w-project mx-auto";
    case "full-width":
      return "";
    default:
      return "";
  }
}
