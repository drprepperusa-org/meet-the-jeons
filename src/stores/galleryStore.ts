/**
 * galleryStore.ts - Zustand store for gallery state
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Image, Comment } from '../api/mockData';

interface GalleryState {
  currentImages: Image[];
  growthImages: Image[];
  likes: Record<string, { count: number; liked: boolean }>;
  comments: Record<string, Comment[]>;

  setCurrentImages: (images: Image[]) => void;
  setGrowthImages: (images: Image[]) => void;
  appendCurrentImages: (images: Image[]) => void;
  appendGrowthImages: (images: Image[]) => void;

  setLike: (imageId: string, count: number, liked: boolean) => void;
  initializeLikes: (images: Image[]) => void;

  addComment: (imageId: string, comment: Comment) => void;
  setComments: (imageId: string, comments: Comment[]) => void;

  reset: () => void;
}

const initialState = {
  currentImages: [] as Image[],
  growthImages: [] as Image[],
  likes: {} as Record<string, { count: number; liked: boolean }>,
  comments: {} as Record<string, Comment[]>,
};

export const useGalleryStore = create<GalleryState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setCurrentImages: (images) => set({ currentImages: images }, false, 'setCurrentImages'),
      setGrowthImages: (images) => set({ growthImages: images }, false, 'setGrowthImages'),
      appendCurrentImages: (images) => set((s) => ({ currentImages: [...s.currentImages, ...images] }), false, 'appendCurrentImages'),
      appendGrowthImages: (images) => set((s) => ({ growthImages: [...s.growthImages, ...images] }), false, 'appendGrowthImages'),

      setLike: (imageId, count, liked) =>
        set((s) => ({ likes: { ...s.likes, [imageId]: { count, liked } } }), false, 'setLike'),

      initializeLikes: (images) => {
        const current = get().likes;
        const updates: Record<string, { count: number; liked: boolean }> = {};
        images.forEach((img) => {
          if (!current[img.id]) updates[img.id] = { count: img.likes, liked: false };
        });
        if (Object.keys(updates).length > 0) {
          set((s) => ({ likes: { ...s.likes, ...updates } }), false, 'initializeLikes');
        }
      },

      addComment: (imageId, comment) =>
        set((s) => ({
          comments: { ...s.comments, [imageId]: [...(s.comments[imageId] ?? []), comment] },
        }), false, 'addComment'),

      setComments: (imageId, comments) =>
        set((s) => ({ comments: { ...s.comments, [imageId]: comments } }), false, 'setComments'),

      reset: () => set(initialState, false, 'reset'),
    }),
    { name: 'GalleryStore' }
  )
);
