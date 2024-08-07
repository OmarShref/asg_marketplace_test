import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchStoreInterface {
  searchTerm: string;
  lastSearchedTerms: string[];
}

const useSearchStore = create(
  persist<SearchStoreInterface>(
    (set) => ({
      searchTerm: "",
      lastSearchedTerms: [],
    }),
    {
      name: "search",
    },
  ),
);

export default useSearchStore;
