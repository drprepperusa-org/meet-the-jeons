/**
 * useCurrentGallery.ts
 * React Query hook for fetching paginated current gallery images
 * Updates galleryStore on success
 */

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchCurrentImages } from '../api/mockData';
import { useGalleryStore } from '../stores/galleryStore';

interface UseCurrentGalleryOptions {
  page?: number;
  pageSize?: number;
  enabled?: boolean;
}

export function useCurrentGallery({
  page = 1,
  pageSize = 6,
  enabled = true,
}: UseCurrentGalleryOptions = {}) {
  const initializeLikes = useGalleryStore((s) => s.initializeLikes);
  const setCurrentImages = useGalleryStore((s) => s.setCurrentImages);

  const query = useQuery({
    queryKey: ['currentGallery', page, pageSize],
    queryFn: async () => {
      const response = await fetchCurrentImages(page, pageSize);
      // Sync to Zustand store
      if (page === 1) {
        setCurrentImages(response.data);
      } else {
        // For pages > 1, append (load-more pattern)
        // Components can decide; here we just store page 1 baseline
      }
      initializeLikes(response.data);
      return response;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled,
  });

  return {
    images: query.data?.data ?? [],
    page: query.data?.page ?? page,
    pageSize: query.data?.pageSize ?? pageSize,
    total: query.data?.total ?? 0,
    totalPages: query.data?.totalPages ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
