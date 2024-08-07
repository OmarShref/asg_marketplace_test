export function extractNumberFromString(text: string): number {
  return parseInt(
    text
      ?.replace(/[^٠-٩,0-9,٫]/g, "")
      ?.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString())
  );
}
