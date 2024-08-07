export type PageProps = {
  params: { storeCode: string; route?: string[]; searchTerm?: string };
  searchParams?: { page?: string; customFilter?: string };
};
