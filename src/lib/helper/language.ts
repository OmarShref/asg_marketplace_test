export function isArabic(storeCode: string): boolean {
  return storeCode.includes("ar");
}

export function getLanguage(storeCode: string): string {
  return storeCode.split("_")[1];
}

export function getLanguageLabel(storeCode: string): string {
  return isArabic(storeCode) ? "العربية" : "English";
}
