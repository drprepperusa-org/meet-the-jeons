import { useMutation } from '@tanstack/react-query';
import { addComment as apiAddComment } from '../api/mockData';
import { useGalleryStore } from '../stores/galleryStore';

interface AddCommentPayload {
  imageId: string;
  text: string;
}

export function useAddComment() {
  const storeAddComment = useGalleryStore((s) => s.addComment);
  const comments = useGalleryStore((s) => s.comments);

  const mutation = useMutation({
    mutationFn: ({ imageId, text }: AddCommentPayload) => apiAddComment(imageId, text),
    onSuccess: (response) => {
      if (response.success) {
        storeAddComment(response.data.imageId, response.data);
      }
    },
  });

  const submitComment = (imageId: string, text: string) =>
    mutation.mutate({ imageId, text });

  const getComments = (imageId: string) => comments[imageId] ?? [];

  return {
    submitComment,
    getComments,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
