/**
 * useFamilyInfo.ts
 * React Query hook for fetching family bio + timeline
 * Syncs to familyStore on success
 */

import { useQuery } from '@tanstack/react-query';
import { fetchFamilyData } from '../api/mockData';
import { useFamilyStore } from '../stores/familyStore';

interface UseFamilyInfoOptions {
  enabled?: boolean;
}

export function useFamilyInfo({ enabled = true }: UseFamilyInfoOptions = {}) {
  const setFamilyData = useFamilyStore((s) => s.setFamilyData);
  const storedParents = useFamilyStore((s) => s.parents);
  const storedKids = useFamilyStore((s) => s.kids);
  const storedValues = useFamilyStore((s) => s.values);
  const storedTimeline = useFamilyStore((s) => s.timeline);
  const familyTagline = useFamilyStore((s) => s.familyTagline);
  const location = useFamilyStore((s) => s.location);
  const since = useFamilyStore((s) => s.since);
  const lastFetched = useFamilyStore((s) => s.lastFetched);

  const query = useQuery({
    queryKey: ['familyInfo'],
    queryFn: async () => {
      const response = await fetchFamilyData();
      if (response.success) {
        setFamilyData(response.data);
      }
      return response;
    },
    staleTime: 1000 * 60 * 30,
    enabled,
  });

  return {
    parents: storedParents.length > 0 ? storedParents : (query.data?.data.parents ?? []),
    kids: storedKids.length > 0 ? storedKids : (query.data?.data.kids ?? []),
    values: storedValues.length > 0 ? storedValues : (query.data?.data.values ?? []),
    timeline: storedTimeline.length > 0 ? storedTimeline : (query.data?.data.timeline ?? []),
    familyTagline: familyTagline || query.data?.data.familyTagline || '',
    location: location || query.data?.data.location || '',
    since: since || query.data?.data.since || '',
    lastFetched,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
