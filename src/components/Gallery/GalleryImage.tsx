/**
 * GalleryImage.tsx — Reusable gallery card component
 * Shows image thumbnail, title, date, like count, comment count.
 * Click to expand modal.
 */

import React, { useState } from 'react';
import { useLikeImage } from '../../hooks/useLikeImage';
import { useGalleryStore } from '../../stores/galleryStore';
import type { Image, Comment } from '../../api/mockData';
import styles from './GalleryImage.module.scss';

// Stable empty array — prevents Zustand v5 getSnapshot from returning a new reference
// on every render, which causes React 19's useSyncExternalStore infinite loop check to fire.
const EMPTY_COMMENTS: Comment[] = [];

interface GalleryImageProps {
  image: Image;
  onClick: (image: Image) => void;
  showChild?: boolean;
}

const CHILD_LABEL: Record<string, string> = {
  sofia: 'Sofia',
  liam: 'Liam',
  both: 'Both',
};

const GalleryImage: React.FC<GalleryImageProps> = ({ image, onClick, showChild = false }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const { likeImage, getLikeState } = useLikeImage();
  const comments = useGalleryStore((s) => s.comments[image.id] ?? EMPTY_COMMENTS);

  const likeState = getLikeState(image.id);
  const likeCount = likeState.count || image.likes;
  const liked = likeState.liked;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    likeImage(image.id);
  };

  const formattedDate = new Date(image.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article
      className={styles.card}
      onClick={() => onClick(image)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(image)}
      aria-label={`View photo: ${image.caption}`}
    >
      <div className={styles.imageWrapper}>
        {!imgLoaded && !imgError && <div className={styles.skeleton} aria-hidden="true" />}
        {imgError && (
          <div className={styles.errorPlaceholder} aria-label="Image unavailable">
            <span>📷</span>
            <p>Image unavailable</p>
          </div>
        )}
        <img
          src={image.thumbnail}
          alt={image.caption}
          className={`${styles.image} ${imgLoaded ? styles.loaded : ''}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
          loading="lazy"
        />
        {showChild && image.child && (
          <span className={`${styles.childBadge} ${styles[`child-${image.child}`]}`} aria-label={`Child: ${CHILD_LABEL[image.child]}`}>
            {CHILD_LABEL[image.child]}
          </span>
        )}
        <div className={styles.tagRow} aria-label="Tags">
          {image.tags.slice(0, 2).map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className={styles.meta}>
        <p className={styles.caption}>{image.caption}</p>
        <p className={styles.date}>{formattedDate}</p>

        <div
          className={styles.actions}
          onClick={(e) => e.stopPropagation()}
          role="group"
          aria-label="Image actions"
        >
          <button
            className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
            onClick={handleLike}
            aria-label={liked ? `Unlike photo (${likeCount} likes)` : `Like photo (${likeCount} likes)`}
            aria-pressed={liked}
          >
            <span className={styles.icon} aria-hidden="true">{liked ? '❤️' : '🤍'}</span>
            <span className={styles.count}>{likeCount}</span>
          </button>

          <button
            className={styles.commentBtn}
            onClick={(e) => { e.stopPropagation(); onClick(image); }}
            aria-label={`${comments.length} comments — click to view`}
          >
            <span className={styles.icon} aria-hidden="true">💬</span>
            <span className={styles.count}>{comments.length}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default GalleryImage;
