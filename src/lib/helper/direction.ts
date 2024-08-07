export function getDirection(storeCode: string) {
  return storeCode.includes("ar") ? "rtl" : "ltr";
}
