import React, { useState } from 'react';
import GalleryImage from './GalleryImage';
import GalleryModal from './GalleryModal';
import { currentGalleryImages } from '../../data/galleryData';
import type { GalleryImage as GalleryImageType } from '../../data/galleryData';
import styles from './CurrentGallery.module.scss';

const CurrentGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImageType | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.headerBlock}>
        <span className={styles.eyebrow}>Family Album</span>
        <h2 className={styles.heading}>Recent Moments</h2>
        <p className={styles.subheading}>
          A glimpse into our everyday adventures, little wins, and the moments that make life sweet.
        </p>
      </div>

      <div className={styles.grid}>
        {currentGalleryImages.map((image) => (
          <GalleryImage
            key={image.id}
            image={image}
            onClick={setSelectedImage}
          />
        ))}
      </div>

      {selectedImage && (
        <GalleryModal
          image={selectedImage}
          images={currentGalleryImages}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default CurrentGallery;
