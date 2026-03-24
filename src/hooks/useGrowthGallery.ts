/**
 * useGrowthGallery.ts - Fetch growth images with filter support
 */

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchGrowthImages } from '../api/mockData';
import { useGalleryStore } from '../stores/galleryStore';
import { useUIStore } from '../stores/uiStore';

interface Options {
  page?: number;
  pageSize?: number;
  enabled?: boolean;
}

export function useGrowthGallery({ page = 1, pageSize = 50, enabled = true }: Options = {}) {
  const filters = useUIStore((s) => s.filters);
  const initializeLikes = useGalleryStore((s) => s.initializeLikes);
  const setGrowthImages = useGalleryStore((s) => s.setGrowthImages);

  const query = useQuery({
    queryKey: ['growthGallery', page, pageSize, filters],
    queryFn: async () => {
      const res = await fetchGrowthImages({
        child: filters.child ?? undefined,
        dateRange: filters.dateRange ?? undefined,
        tags: filters.tags.length > 0 ? filters.tags : undefined,
        page,
        pageSize,
      });
      setGrowthImages(res.data);
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
