function formatStyleStringKeyToCamelCase(str: string): string {
  const splitted = str?.split("-");
  if (splitted?.length === 1) return splitted?.at(0) ?? "";
  return (
    splitted?.at(0) +
    splitted
      ?.slice(1)
      ?.map((word) => word?.at(0)?.toUpperCase() + word?.slice(1))
      ?.join("")
  );
}

export const getStyleObjectFromString = (styleString: string) => {
  const style: { [key: string]: string } = {};

  styleString?.split(";")?.forEach((el: string) => {
    const [property, value] = el.split(":");
    if (!property) return;

    const formattedProperty = formatStyleStringKeyToCamelCase(property?.trim());
    style[formattedProperty] = value?.trim();
  });

  return style;
};
