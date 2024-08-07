export function getPageNumber(pageNumber: string | undefined | number): number {
  return isNaN(Number(pageNumber)) ? 1 : Number(pageNumber);
}
