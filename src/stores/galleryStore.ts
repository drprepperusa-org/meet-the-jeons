/**
 * galleryStore.ts - Zustand store for gallery state
 * Manages currentImages, growthImages, likes, and comments
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Image, Comment } from '../api/mockData';

interface GalleryState {
  // Data
  currentImages: Image[];
  growthImages: Image[];
  likes: Record<string, { count: number; liked: boolean }>; // imageId → like state
  comments: Record<string, Comment[]>; // imageId → comments

  // Actions
  setCurrentImages: (images: Image[]) => void;
  setGrowthImages: (images: Image[]) => void;
  appendCurrentImages: (images: Image[]) => void;
  appendGrowthImages: (images: Image[]) => void;

  // Like actions
  setLike: (imageId: string, count: number, liked: boolean) => void;
  initializeLikes: (images: Image[]) => void;

  // Comment actions
  addComment: (imageId: string, comment: Comment) => void;
  setComments: (imageId: string, comments: Comment[]) => void;

  // Reset
  reset: () => void;
}

const initialState = {
  currentImages: [],
  growthImages: [],
  likes: {} as Record<string, { count: number; liked: boolean }>,
  comments: {} as Record<string, Comment[]>,
};

export const useGalleryStore = create<GalleryState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setCurrentImages: (images) =>
        set({ currentImages: images }, false, 'setCurrentImages'),

      setGrowthImages: (images) =>
        set({ growthImages: images }, false, 'setGrowthImages'),

      appendCurrentImages: (images) =>
        set(
          (state) => ({ currentImages: [...state.currentImages, ...images] }),
          false,
          'appendCurrentImages'
        ),

      appendGrowthImages: (images) =>
        set(
          (state) => ({ growthImages: [...state.growthImages, ...images] }),
          false,
          'appendGrowthImages'
        ),

      setLike: (imageId, count, liked) =>
        set(
          (state) => ({
            likes: {
              ...state.likes,
              [imageId]: { count, liked },
            },
          }),
          false,
          'setLike'
        ),

      initializeLikes: (images) => {
        const current = get().likes;
        const updates: Record<string, { count: number; liked: boolean }> = {};
        images.forEach((img) => {
          if (!current[img.id]) {
            updates[img.id] = { count: img.likes, liked: false };
          }
        });
        if (Object.keys(updates).length > 0) {
          set(
            (state) => ({ likes: { ...state.likes, ...updates } }),
            false,
            'initializeLikes'
          );
        }
      },

      addComment: (imageId, comment) =>
        set(
          (state) => ({
            comments: {
              ...state.comments,
              [imageId]: [...(state.comments[imageId] ?? []), comment],
            },
          }),
          false,
          'addComment'
        ),

      setComments: (imageId, comments) =>
        set(
          (state) => ({
            comments: { ...state.comments, [imageId]: comments },
          }),
          false,
          'setComments'
        ),

      reset: () => set(initialState, false, 'reset'),
    }),
    { name: 'GalleryStore' }
  )
);
