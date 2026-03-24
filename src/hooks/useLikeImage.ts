/**
 * useLikeImage.ts - Toggle image like with optimistic update
 */

import { useMutation } from '@tanstack/react-query';
import { toggleLike } from '../api/mockData';
import { useGalleryStore } from '../stores/galleryStore';

export function useLikeImage() {
  const likes = useGalleryStore((s) => s.likes);
  const setLike = useGalleryStore((s) => s.setLike);

  const mutation = useMutation({
    mutationFn: async (imageId: string) => {
      const current = likes[imageId] ?? { count: 0, liked: false };
      return toggleLike(imageId, current.count, current.liked);
    },
    onMutate: (imageId: string) => {
      // Optimistic update
      const prev = likes[imageId] ?? { count: 0, liked: false };
      setLike(imageId, prev.liked ? prev.count - 1 : prev.count + 1, !prev.liked);
      return { prev, imageId };
    },
    onError: (_err, _id, context) => {
      if (context) {
        setLike(context.imageId, context.prev.count, context.prev.liked);
      }
    },
    onSuccess: (response) => {
      if (response.success) {
        setLike(response.data.imageId, response.data.likes, response.data.liked);
      }
    },
  });

  const likeImage = (imageId: string) => mutation.mutate(imageId);
  const getLikeState = (imageId: string) => likes[imageId] ?? { count: 0, liked: false };

  return { likeImage, getLikeState, isPending: mutation.isPending };
}
