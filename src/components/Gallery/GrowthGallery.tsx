import React, { useState, useMemo } from 'react';
import GalleryImage from './GalleryImage';
import GalleryModal from './GalleryModal';
import { growthGalleryImages, ALL_TAGS } from '../../data/galleryData';
import type { GalleryImage as GalleryImageType, Child, GalleryTag } from '../../data/galleryData';
import styles from './GrowthGallery.module.scss';

type SortOrder = 'newest' | 'oldest';

// Build list of available years from the data
const allYears = Array.from(
  new Set(growthGalleryImages.map((img) => new Date(img.date).getFullYear()))
).sort((a, b) => b - a);

const GrowthGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImageType | null>(null);

  // Filters
  const [childFilter, setChildFilter] = useState<Child | 'Both'>('Both');
  const [yearFrom, setYearFrom] = useState<number>(allYears[allYears.length - 1]);
  const [yearTo, setYearTo] = useState<number>(allYears[0]);
  const [activeTags, setActiveTags] = useState<Set<GalleryTag>>(new Set());
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  const toggleTag = (tag: GalleryTag) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  };

  const filteredImages = useMemo(() => {
    let imgs = growthGalleryImages.filter((img) => {
      const year = new Date(img.date).getFullYear();

      // Child filter
      if (childFilter !== 'Both') {
        if (img.child !== childFilter && img.child !== 'Both') return false;
      }

      // Year range
      if (year < yearFrom || year > yearTo) return false;

      // Tags (AND logic: all active tags must be present)
      if (activeTags.size > 0) {
        const hasAll = Array.from(activeTags).every((t) => img.tags.includes(t));
        if (!hasAll) return false;
      }

      return true;
    });

    // Sort
    imgs = [...imgs].sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sortOrder === 'newest' ? db - da : da - db;
    });

    return imgs;
  }, [childFilter, yearFrom, yearTo, activeTags, sortOrder]);

  const clearFilters = () => {
    setChildFilter('Both');
    setYearFrom(allYears[allYears.length - 1]);
    setYearTo(allYears[0]);
    setActiveTags(new Set());
    setSortOrder('newest');
  };

  const hasActiveFilters =
    childFilter !== 'Both' ||
    yearFrom !== allYears[allYears.length - 1] ||
    yearTo !== allYears[0] ||
    activeTags.size > 0 ||
    sortOrder !== 'newest';

  return (
    <section className={styles.section}>
      <div className={styles.headerBlock}>
        <span className={styles.eyebrow}>Growing Up</span>
        <h2 className={styles.heading}>Sofia & Liam Through the Years</h2>
        <p className={styles.subheading}>
          Watching them grow has been the greatest adventure. These are the moments we never want to forget.
        </p>
      </div>

      {/* Filters Panel */}
      <div className={styles.filtersPanel}>
        {/* Child selector */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Child</label>
          <div className={styles.pillGroup}>
            {(['Both', 'Sofia', 'Liam'] as const).map((child) => (
              <button
                key={child}
                className={`${styles.pill} ${childFilter === child ? styles.pillActive : ''} ${styles[`child${child}`]}`}
                onClick={() => setChildFilter(child)}
              >
                {child}
              </button>
            ))}
          </div>
        </div>

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
              {allYears.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <span className={styles.yearSep}>–</span>
            <select
              value={yearTo}
              onChange={(e) => setYearTo(Number(e.target.value))}
              className={styles.yearSelect}
              aria-label="To year"
            >
              {allYears.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Sort By</label>
          <div className={styles.pillGroup}>
            {(['newest', 'oldest'] as SortOrder[]).map((order) => (
              <button
                key={order}
                className={`${styles.pill} ${sortOrder === order ? styles.pillActive : ''}`}
                onClick={() => setSortOrder(order)}
              >
                {order === 'newest' ? '↓ Newest' : '↑ Oldest'}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Tags</label>
          <div className={styles.pillGroup} style={{ flexWrap: 'wrap' }}>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                className={`${styles.pill} ${activeTags.has(tag) ? styles.pillActive : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button className={styles.clearBtn} onClick={clearFilters}>
            ✕ Clear Filters
          </button>
        )}
      </div>

      {/* Results summary */}
      <p className={styles.resultCount}>
        {filteredImages.length === 0
          ? 'No photos match your filters.'
          : `Showing ${filteredImages.length} photo${filteredImages.length !== 1 ? 's' : ''}`}
      </p>

      {/* Grid */}
      {filteredImages.length > 0 ? (
        <div className={styles.grid}>
          {filteredImages.map((image) => (
            <GalleryImage
              key={image.id}
              image={image}
              onClick={setSelectedImage}
              showChild
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span>📷</span>
          <p>No photos match your current filters.</p>
          <button className={styles.clearBtn} onClick={clearFilters}>
            Reset Filters
          </button>
        </div>
      )}

      {selectedImage && (
        <GalleryModal
          image={selectedImage}
          images={filteredImages}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default GrowthGallery;
