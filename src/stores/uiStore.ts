import { create } from 'zustand';

interface GalleryFilters {
  child: 'all' | 'kid1' | 'kid2' | 'family';
  yearRange: [number, number];
  tags: string[];
  sortBy: 'date' | 'likes';
  sortOrder: 'asc' | 'desc';
}

interface UIState {
  galleryFilters: GalleryFilters;
  setGalleryFilter: <K extends keyof GalleryFilters>(key: K, value: GalleryFilters[K]) => void;
  resetGalleryFilters: () => void;
}

const defaultFilters: GalleryFilters = {
  child: 'all',
  yearRange: [2020, 2024],
  tags: [],
  sortBy: 'date',
  sortOrder: 'desc',
};

export const useUIStore = create<UIState>((set) => ({
  galleryFilters: defaultFilters,
  setGalleryFilter: (key, value) =>
    set((state) => ({ galleryFilters: { ...state.galleryFilters, [key]: value } })),
  resetGalleryFilters: () => set({ galleryFilters: defaultFilters }),
}));
