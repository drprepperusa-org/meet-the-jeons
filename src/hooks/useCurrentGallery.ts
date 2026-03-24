/**
 * useCurrentGallery.ts - Fetch paginated current gallery images
 */

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchCurrentImages } from '../api/mockData';
import { useGalleryStore } from '../stores/galleryStore';

interface Options {
  page?: number;
  pageSize?: number;
  enabled?: boolean;
}

export function useCurrentGallery({ page = 1, pageSize = 9, enabled = true }: Options = {}) {
  const initializeLikes = useGalleryStore((s) => s.initializeLikes);
  const setCurrentImages = useGalleryStore((s) => s.setCurrentImages);

  const query = useQuery({
    queryKey: ['currentGallery', page, pageSize],
    queryFn: async () => {
      const res = await fetchCurrentImages(page, pageSize);
      setCurrentImages(res.data);
      initializeLikes(res.data);
      return res;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    enabled,
  });

  return {
    images: query.data?.data ?? [],
    page: query.data?.page ?? page,
    total: query.data?.total ?? 0,
    totalPages: query.data?.totalPages ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
  };
}
