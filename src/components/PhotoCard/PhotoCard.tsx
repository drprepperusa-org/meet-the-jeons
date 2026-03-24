import { useState } from 'react';
import type { Photo } from '../../types';
import LikeButton from '../LikeButton/LikeButton';
import CommentSection from '../CommentSection/CommentSection';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './PhotoCard.module.scss';

interface Props {
  photo: Photo;
  delay?: number;
}

export default function PhotoCard({ photo, delay = 0 }: Props) {
  const [showComments, setShowComments] = useState(false);
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.card} reveal`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className={styles.imageWrap}>
        <img src={photo.url} alt={photo.caption} loading="lazy" />
        <div className={styles.overlay}>
          {photo.tags.slice(0, 3).map(tag => (
            <span key={tag} className={styles.overlayTag}>#{tag}</span>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.caption}>{photo.caption}</p>
        <div className={styles.meta}>
          <span className={styles.date}>
            {new Date(photo.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <div className={styles.actions}>
            <button
              className={styles.toggleComments}
              onClick={() => setShowComments(v => !v)}
            >
              {showComments ? 'hide' : `${photo.comments.length} comments`}
            </button>
            <LikeButton photoId={photo.id} count={photo.likes} />
          </div>
        </div>
      </div>

      {showComments && (
        <CommentSection photoId={photo.id} comments={photo.comments} />
      )}
    </div>
  );
}
