export type PageProps = {
  params: { storeCode: string; route?: string[]; searchTerm?: string };
  searchParams?: { page?: string; customFilters?: string };
};
