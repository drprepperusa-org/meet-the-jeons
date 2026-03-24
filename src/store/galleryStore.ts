import { create } from 'zustand';

export interface Comment {
  id: string;
  imageId: string;
  displayName: string;
  text: string;
  timestamp: string;
}

interface GalleryState {
  likes: Record<string, boolean>;
  likeCounts: Record<string, number>;
  comments: Comment[];
  toggleLike: (imageId: string, initialCount?: number) => void;
  addComment: (imageId: string, displayName: string, text: string) => void;
  getCommentsForImage: (imageId: string) => Comment[];
  getLikeCount: (imageId: string, defaultCount?: number) => number;
  isLiked: (imageId: string) => boolean;
}

export const useGalleryStore = create<GalleryState>((set, get) => ({
  likes: {},
  likeCounts: {},
  comments: [],

  toggleLike: (imageId, initialCount = 0) => {
    const { likes, likeCounts } = get();
    const currentlyLiked = likes[imageId] ?? false;
    const currentCount = likeCounts[imageId] ?? initialCount;

    set({
      likes: { ...likes, [imageId]: !currentlyLiked },
      likeCounts: {
        ...likeCounts,
        [imageId]: currentlyLiked ? Math.max(0, currentCount - 1) : currentCount + 1,
      },
    });
  },

  addComment: (imageId, displayName, text) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      imageId,
      displayName: displayName.trim() || 'Anonymous',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      comments: [...state.comments, newComment],
    }));
  },

  getCommentsForImage: (imageId) => {
    return get().comments.filter((c) => c.imageId === imageId);
  },

  getLikeCount: (imageId, defaultCount = 0) => {
    const { likeCounts } = get();
    return likeCounts[imageId] ?? defaultCount;
  },

  isLiked: (imageId) => {
    return get().likes[imageId] ?? false;
  },
}));
