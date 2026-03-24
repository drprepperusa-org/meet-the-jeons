import { create } from 'zustand';
import type { Image } from '../api/mockData';

interface LikeState { count: number; liked: boolean; }

interface GalleryState {
  currentImages: Image[];
  growthImages: Image[];
  selectedImage: Image | null;
  likes: Record<string, LikeState>;
  setCurrentImages: (images: Image[]) => void;
  setGrowthImages: (images: Image[]) => void;
  setSelectedImage: (image: Image | null) => void;
  setLike: (imageId: string, state: LikeState) => void;
  initializeLikes: (images: Image[]) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  currentImages: [],
  growthImages: [],
  selectedImage: null,
  likes: {},

  setCurrentImages: (images) => set({ currentImages: images }),
  setGrowthImages: (images) => set({ growthImages: images }),
  setSelectedImage: (image) => set({ selectedImage: image }),

  setLike: (imageId, state) =>
    set((prev) => ({ likes: { ...prev.likes, [imageId]: state } })),

  initializeLikes: (images) =>
    set((prev) => {
      const newLikes = { ...prev.likes };
      images.forEach((img) => {
        if (!newLikes[img.id]) {
          newLikes[img.id] = { count: img.likes, liked: false };
        }
      });
      return { likes: newLikes };
    }),
}));
