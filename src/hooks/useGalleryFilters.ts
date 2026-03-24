import { useUIStore } from '../stores/uiStore';

export function useGalleryFilters() {
  const filters = useUIStore((s) => s.filters);
  const setChildFilter = useUIStore((s) => s.setChildFilter);
  const setDateRange = useUIStore((s) => s.setDateRange);
  const addTag = useUIStore((s) => s.addTag);
  const removeTag = useUIStore((s) => s.removeTag);
  const clearFilters = useUIStore((s) => s.clearFilters);

  const hasActiveFilters =
    filters.child !== null ||
    filters.dateRange !== null ||
    filters.tags.length > 0;

  const toggleTag = (tag: string) => {
    if (filters.tags.includes(tag)) removeTag(tag);
    else addTag(tag);
  };

  return { filters, hasActiveFilters, setChildFilter, setDateRange, addTag, removeTag, toggleTag, clearFilters } as const;
}
