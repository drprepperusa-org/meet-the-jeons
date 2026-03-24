/**
 * uiStore.ts - Zustand store for UI state
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Image } from '../api/mockData';

export interface GalleryFilters {
  child: 'sofia' | 'liam' | 'both' | null;
  dateRange: { from: string; to: string } | null;
  tags: string[];
}

interface UIState {
  selectedImage: Image | null;
  isModalOpen: boolean;
  filters: GalleryFilters;
  isLoading: boolean;
  error: string | null;

  openModal: (image: Image) => void;
  closeModal: () => void;
  setSelectedImage: (image: Image | null) => void;

  setChildFilter: (child: GalleryFilters['child']) => void;
  setDateRange: (range: { from: string; to: string } | null) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearFilters: () => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const defaultFilters: GalleryFilters = { child: null, dateRange: null, tags: [] };

const initialState = {
  selectedImage: null,
  isModalOpen: false,
  filters: defaultFilters,
  isLoading: false,
  error: null,
};

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      ...initialState,

      openModal: (image) => set({ selectedImage: image, isModalOpen: true }, false, 'openModal'),
      closeModal: () => set({ isModalOpen: false, selectedImage: null }, false, 'closeModal'),
      setSelectedImage: (image) => set({ selectedImage: image }, false, 'setSelectedImage'),

      setChildFilter: (child) => set((s) => ({ filters: { ...s.filters, child } }), false, 'setChildFilter'),
      setDateRange: (range) => set((s) => ({ filters: { ...s.filters, dateRange: range } }), false, 'setDateRange'),
      addTag: (tag) => set((s) => ({
        filters: { ...s.filters, tags: s.filters.tags.includes(tag) ? s.filters.tags : [...s.filters.tags, tag] },
      }), false, 'addTag'),
      removeTag: (tag) => set((s) => ({
        filters: { ...s.filters, tags: s.filters.tags.filter((t) => t !== tag) },
      }), false, 'removeTag'),
      clearFilters: () => set({ filters: defaultFilters }, false, 'clearFilters'),

      setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
      setError: (error) => set({ error }, false, 'setError'),
      reset: () => set(initialState, false, 'reset'),
    }),
    { name: 'UIStore' }
  )
);
