/**
 * CurrentGallery.tsx — Grid of recent family moments
 * Uses React Query (useCurrentGallery) + Zustand gallery store
 */

import React, { useState } from 'react';
import { useCurrentGallery } from '../../hooks/useCurrentGallery';
import GalleryImage from './GalleryImage';
import GalleryModal from './GalleryModal';
import type { Image } from '../../api/mockData';
import styles from './CurrentGallery.module.scss';

const CurrentGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [page, setPage] = useState(1);

  const { images, isLoading, isError, total, totalPages } = useCurrentGallery({
    page,
    pageSize: 9,
  });

  return (
    <section className={styles.section} aria-label="Recent family moments gallery">
      <div className={styles.headerBlock}>
        <span className={styles.eyebrow}>Family Album</span>
        <h2 className={styles.heading}>Recent Moments</h2>
        <p className={styles.subheading}>
          A glimpse into our everyday adventures, little wins, and the moments that make life sweet.
        </p>
      </div>

      {isLoading && (
        <div className={styles.loadingGrid} aria-busy="true" aria-label="Loading photos">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={styles.loadingCard} />
          ))}
        </div>
      )}

      {isError && (
        <div className={styles.error} role="alert">
          <span>😕</span>
          <p>Couldn't load photos. Please try again.</p>
        </div>
      )}

      {!isLoading && !isError && images.length > 0 && (
        <>
          <div className={styles.grid}>
            {images.map((image) => (
              <GalleryImage
                key={image.id}
                image={image}
                onClick={setSelectedImage}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                ← Prev
              </button>
              <span className={styles.pageInfo} aria-live="polite">
                Page {page} of {totalPages} · {total} photos
              </span>
              <button
                className={styles.pageBtn}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                Next →
              </button>
            </div>
          )}
        </>
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

export default CurrentGallery;
