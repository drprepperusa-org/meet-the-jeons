import React, { useState } from 'react';
import { useGalleryStore } from '../../store/galleryStore';
import type { GalleryImage as GalleryImageType } from '../../data/galleryData';
import styles from './GalleryImage.module.scss';

interface GalleryImageProps {
  image: GalleryImageType;
  onClick: (image: GalleryImageType) => void;
  showChild?: boolean;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image, onClick, showChild = false }) => {
  const { toggleLike, getLikeCount, isLiked, getCommentsForImage } = useGalleryStore();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const liked = isLiked(image.id);
  const likeCount = getLikeCount(image.id, image.likes);
  const commentCount = getCommentsForImage(image.id).length;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(image.id, image.likes);
  };

  const formattedDate = new Date(image.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={styles.card} onClick={() => onClick(image)} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(image)}
      aria-label={`View ${image.title}`}
    >
      <div className={styles.imageWrapper}>
        {!imgLoaded && !imgError && <div className={styles.skeleton} />}
        {imgError && (
          <div className={styles.errorPlaceholder}>
            <span>📷</span>
            <p>Image unavailable</p>
          </div>
        )}
        <img
          src={image.src}
          alt={image.title}
          className={`${styles.image} ${imgLoaded ? styles.loaded : ''}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
          loading="lazy"
        />
        {showChild && image.child && (
          <span className={`${styles.childBadge} ${styles[`child${image.child}`]}`}>
            {image.child}
          </span>
        )}
        <div className={styles.tagRow}>
          {image.tags.slice(0, 2).map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className={styles.meta}>
        <h3 className={styles.title}>{image.title}</h3>
        <p className={styles.date}>{formattedDate}</p>

        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
          <button
            className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
            onClick={handleLike}
            aria-label={liked ? 'Unlike' : 'Like'}
          >
            <span className={styles.heart}>{liked ? '❤️' : '🤍'}</span>
            <span className={styles.count}>{likeCount}</span>
          </button>

          <button
            className={styles.commentBtn}
            onClick={(e) => { e.stopPropagation(); onClick(image); }}
            aria-label={`${commentCount} comments`}
          >
            <span>💬</span>
            <span className={styles.count}>{commentCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryImage;
