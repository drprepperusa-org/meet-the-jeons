/**
 * GrowthGallery.tsx — Growth photos for Sofia & Liam with filtering
 * Filters: child selector, year range, tags, sort order
 */

import React, { useState, useEffect } from 'react';
import { useGrowthGallery } from '../../hooks/useGrowthGallery';
import { useGalleryFilters } from '../../hooks/useGalleryFilters';
import GalleryImage from './GalleryImage';
import GalleryModal from './GalleryModal';
import type { Image } from '../../api/mockData';
import styles from './GrowthGallery.module.scss';

const AVAILABLE_TAGS = [
  'birthday', 'milestone', 'school', 'sports', 'dance',
  'holiday', 'travel', 'siblings', 'swimming', 'reading',
];

const YEARS = Array.from({ length: 2025 - 2018 + 1 }, (_, i) => 2018 + i).reverse(); // 2025 → 2018

const GrowthGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const {
    filters,
    hasActiveFilters,
    setChildFilter,
    setDateRange,
    toggleTag,
    clearFilters,
  } = useGalleryFilters();

  // Year pickers (local state — converted to ISO dates for filters)
  const [yearFrom, setYearFrom] = useState(2018);
  const [yearTo, setYearTo] = useState(2025);

  useEffect(() => {
    if (yearFrom && yearTo) {
      setDateRange({
        from: `${yearFrom}-01-01`,
        to: `${yearTo}-12-31`,
      });
    }
  }, [yearFrom, yearTo, setDateRange]);

  const { images: rawImages, isLoading, isError, total } = useGrowthGallery({
    page: 1,
    pageSize: 50, // Load all for client-side sort
  });

  // Client-side sort (API sorts by date by default)
  const images = [...rawImages].sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return sortOrder === 'newest' ? db - da : da - db;
  });

  const handleClearFilters = () => {
    clearFilters();
    setYearFrom(2018);
    setYearTo(2025);
    setSortOrder('newest');
  };

  return (
    <section className={styles.section} aria-label="Sofia and Liam growth gallery">
      <div className={styles.headerBlock}>
        <span className={styles.eyebrow}>Growing Up</span>
        <h2 className={styles.heading}>Sofia & Liam Through the Years</h2>
        <p className={styles.subheading}>
          Watching them grow has been the greatest adventure. Filter by child, year, or milestone.
        </p>
      </div>

      {/* Filters Panel */}
      <div className={styles.filtersPanel} role="search" aria-label="Filter gallery">
        {/* Child selector */}
        <fieldset className={styles.filterGroup}>
          <legend className={styles.filterLabel}>Child</legend>
          <div className={styles.pillRow}>
            {([null, 'sofia', 'liam', 'both'] as const).map((child) => (
              <button
                key={child ?? 'all'}
                className={`${styles.pill} ${filters.child === child ? styles.pillActive : ''} ${child ? styles[`child-${child}`] : ''}`}
                onClick={() => setChildFilter(child)}
                aria-pressed={filters.child === child}
              >
                {child === null ? 'All' : child === 'sofia' ? 'Sofia' : child === 'liam' ? 'Liam' : 'Both'}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Year range */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Year Range</label>
          <div className={styles.yearRow}>
            <select
              value={yearFrom}
              onChange={(e) => setYearFrom(Number(e.target.value))}
              className={styles.yearSelect}
              aria-label="From year"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <span className={styles.yearSep} aria-hidden>–</span>
            <select
              value={yearTo}
              onChange={(e) => setYearTo(Number(e.target.value))}
              className={styles.yearSelect}
              aria-label="To year"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Sort</label>
          <div className={styles.pillRow}>
            {(['newest', 'oldest'] as const).map((order) => (
              <button
                key={order}
                className={`${styles.pill} ${sortOrder === order ? styles.pillActive : ''}`}
                onClick={() => setSortOrder(order)}
                aria-pressed={sortOrder === order}
              >
                {order === 'newest' ? '↓ Newest' : '↑ Oldest'}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <fieldset className={styles.filterGroup}>
          <legend className={styles.filterLabel}>Tags</legend>
          <div className={styles.pillRow} style={{ flexWrap: 'wrap' }}>
            {AVAILABLE_TAGS.map((tag) => (
              <button
                key={tag}
                className={`${styles.pill} ${filters.tags.includes(tag) ? styles.pillActive : ''}`}
                onClick={() => toggleTag(tag)}
                aria-pressed={filters.tags.includes(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Clear */}
        {(hasActiveFilters || sortOrder !== 'newest') && (
          <button className={styles.clearBtn} onClick={handleClearFilters} aria-label="Clear all filters">
            ✕ Clear Filters
          </button>
        )}
      </div>

      {/* Result count */}
      <p className={styles.resultCount} aria-live="polite">
        {isLoading ? 'Loading…' : `${total} photo${total !== 1 ? 's' : ''}`}
      </p>

      {/* Loading */}
      {isLoading && (
        <div className={styles.loadingGrid} aria-busy="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.loadingCard} />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className={styles.emptyState} role="alert">
          <span>😕</span>
          <p>Couldn't load photos. Please try again.</p>
        </div>
      )}

      {/* Grid */}
      {!isLoading && !isError && images.length > 0 && (
        <div className={styles.grid}>
          {images.map((image) => (
            <GalleryImage
              key={image.id}
              image={image}
              onClick={setSelectedImage}
              showChild
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && images.length === 0 && (
        <div className={styles.emptyState} role="status">
          <span>📷</span>
          <p>No photos match your filters.</p>
          <button className={styles.clearBtn} onClick={handleClearFilters}>
            Reset Filters
          </button>
        </div>
      )}

      {selectedImage && (
        <GalleryModal
          image={selectedImage}
          images={images}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default GrowthGallery;
