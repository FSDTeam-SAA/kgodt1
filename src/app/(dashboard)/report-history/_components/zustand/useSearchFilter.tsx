import { create } from "zustand";

interface ISearchFilter {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  riskLevel: string;
  setRiskLevel: (value: string) => void;
  timeFilter: string;
  setTimeFilter: (value: string) => void;
  clearFilters: () => void;
}

const initialStates = {
  searchTerm: "",
  riskLevel: "",
  timeFilter: "",
};

export const useSearchFilter = create<ISearchFilter>((set) => ({
  ...initialStates,
  setSearchTerm: (value: string) => set({ searchTerm: value }),
  setRiskLevel: (value: string) => set({ riskLevel: value }),
  setTimeFilter: (value: string) => set({ timeFilter: value }),
  clearFilters: () => set({ searchTerm: "", riskLevel: "" }),
}));
