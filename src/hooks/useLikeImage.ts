import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike } from '../api/mockData';
import { useGalleryStore } from '../stores/galleryStore';

export function useLikeImage() {
  const queryClient = useQueryClient();
  const likes = useGalleryStore((s) => s.likes);
  const setLike = useGalleryStore((s) => s.setLike);

  const mutation = useMutation({
    mutationFn: async (imageId: string) => {
      const current = likes[imageId] ?? { count: 0, liked: false };
      return toggleLike(imageId, current.count, current.liked);
    },

    onMutate: async (imageId: string) => {
      const previous = likes[imageId] ?? { count: 0, liked: false };
      setLike(imageId, previous.liked ? previous.count - 1 : previous.count + 1, !previous.liked);
      return { previous, imageId };
    },

    onError: (_err, _imageId, context) => {
      if (context) setLike(context.imageId, context.previous.count, context.previous.liked);
    },

    onSuccess: (response) => {
      if (response.success) {
        setLike(response.data.imageId, response.data.likes, response.data.liked);
        queryClient.invalidateQueries({ queryKey: ['currentGallery'] });
        queryClient.invalidateQueries({ queryKey: ['growthGallery'] });
      }
    },
  });

  const likeImage = (imageId: string) => mutation.mutate(imageId);
  const getLikeState = (imageId: string) => likes[imageId] ?? { count: 0, liked: false };

  return { likeImage, getLikeState, isPending: mutation.isPending, isError: mutation.isError, error: mutation.error };
}
