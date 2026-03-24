/**
 * useGrowthGallery.ts
 * React Query hook for fetching growth images with filter support
 * Reads filters from uiStore; syncs results to galleryStore
 */

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchGrowthImages } from '../api/mockData';
import { useGalleryStore } from '../stores/galleryStore';
import { useUIStore } from '../stores/uiStore';

interface UseGrowthGalleryOptions {
  page?: number;
  pageSize?: number;
  enabled?: boolean;
}

export function useGrowthGallery({
  page = 1,
  pageSize = 8,
  enabled = true,
}: UseGrowthGalleryOptions = {}) {
  const filters = useUIStore((s) => s.filters);
  const initializeLikes = useGalleryStore((s) => s.initializeLikes);
  const setGrowthImages = useGalleryStore((s) => s.setGrowthImages);

  const query = useQuery({
    queryKey: ['growthGallery', page, pageSize, filters],
    queryFn: async () => {
      const response = await fetchGrowthImages({
        child: filters.child ?? undefined,
        dateRange: filters.dateRange ?? undefined,
        tags: filters.tags.length > 0 ? filters.tags : undefined,
        page,
        pageSize,
      });
      if (page === 1) {
        setGrowthImages(response.data);
      }
      initializeLikes(response.data);
      return response;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    enabled,
  });

  return {
    images: query.data?.data ?? [],
    page: query.data?.page ?? page,
    pageSize: query.data?.pageSize ?? pageSize,
    total: query.data?.total ?? 0,
    totalPages: query.data?.totalPages ?? 0,
    filters,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
