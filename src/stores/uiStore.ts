/**
 * uiStore.ts - Zustand store for UI state
 * Manages selectedImage, modal state, and filters
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
  // Modal / image selection
  selectedImage: Image | null;
  isModalOpen: boolean;

  // Gallery filters
  filters: GalleryFilters;

  // Loading / error states (global UI-level)
  isLoading: boolean;
  error: string | null;

  // Actions
  openModal: (image: Image) => void;
  closeModal: () => void;
  setSelectedImage: (image: Image | null) => void;

  // Filter actions
  setChildFilter: (child: GalleryFilters['child']) => void;
  setDateRange: (range: { from: string; to: string } | null) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearFilters: () => void;

  // Global UI
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Reset
  reset: () => void;
}

const defaultFilters: GalleryFilters = {
  child: null,
  dateRange: null,
  tags: [],
};

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

      openModal: (image) =>
        set({ selectedImage: image, isModalOpen: true }, false, 'openModal'),

      closeModal: () =>
        set({ isModalOpen: false, selectedImage: null }, false, 'closeModal'),

      setSelectedImage: (image) =>
        set({ selectedImage: image }, false, 'setSelectedImage'),

      setChildFilter: (child) =>
        set(
          (state) => ({ filters: { ...state.filters, child } }),
          false,
          'setChildFilter'
        ),

      setDateRange: (range) =>
        set(
          (state) => ({ filters: { ...state.filters, dateRange: range } }),
          false,
          'setDateRange'
        ),

      addTag: (tag) =>
        set(
          (state) => ({
            filters: {
              ...state.filters,
              tags: state.filters.tags.includes(tag)
                ? state.filters.tags
                : [...state.filters.tags, tag],
            },
          }),
          false,
          'addTag'
        ),

      removeTag: (tag) =>
        set(
          (state) => ({
            filters: {
              ...state.filters,
              tags: state.filters.tags.filter((t) => t !== tag),
            },
          }),
          false,
          'removeTag'
        ),

      clearFilters: () =>
        set({ filters: defaultFilters }, false, 'clearFilters'),

      setLoading: (isLoading) =>
        set({ isLoading }, false, 'setLoading'),

      setError: (error) =>
        set({ error }, false, 'setError'),

      reset: () => set(initialState, false, 'reset'),
    }),
    { name: 'UIStore' }
  )
);
