import { create } from "zustand";

interface FolderState {
  selectedFolderId: number | null;
  setSelectedFolderId: (id: number | null) => void;
}

export const useFolderStore = create<FolderState>((set) => ({
  selectedFolderId: null,
  setSelectedFolderId: (id) => set({ selectedFolderId: id }),
}));
