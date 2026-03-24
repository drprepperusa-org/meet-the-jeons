import { useState } from 'react';
import type { Image } from '../../api/mockData';
import LikeButton from '../LikeButton/LikeButton';
import CommentSection from '../CommentSection/CommentSection';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useImageModal } from '../../hooks/useImageModal';
import styles from './ImageCard.module.scss';

interface Props {
  image: Image;
  delay?: number;
  showChildBadge?: boolean;
}

export default function ImageCard({ image, delay = 0, showChildBadge = false }: Props) {
  const [showComments, setShowComments] = useState(false);
  const ref = useScrollReveal<HTMLDivElement>();
  const { open } = useImageModal();

  const dateStr = new Date(image.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article
      ref={ref}
      className={styles.card}
      style={{ transitionDelay: `${delay}s` }}
      aria-label={image.caption}
    >
      <div className={styles.imageWrap} onClick={() => open(image)}>
        <img src={image.thumbnail} alt={image.caption} loading="lazy" />
        
        {showChildBadge && image.child && (
          <span className={`${styles.childBadge} ${styles[image.child]}`}>
            {image.child === 'both' ? '👫 Both' : image.child === 'sofia' ? '🌸 Sofia' : '🦕 Liam'}
          </span>
        )}

        <div className={styles.overlay}>
          {image.tags.slice(0, 3).map(tag => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>

        <div className={styles.expandIcon} aria-hidden="true">⤢</div>
      </div>

      <div className={styles.body}>
        <p className={styles.caption}>{image.caption}</p>
        <div className={styles.footer}>
          <span className={styles.date}>{dateStr}</span>
          <div className={styles.actions}>
            <button
              className={styles.commentsToggle}
              onClick={() => setShowComments(v => !v)}
              aria-expanded={showComments}
            >
              {showComments ? 'hide' : `${image.comments.length} comment${image.comments.length !== 1 ? 's' : ''}`}
            </button>
            <LikeButton imageId={image.id} />
          </div>
        </div>
      </div>

      {showComments && (
        <CommentSection imageId={image.id} seedComments={image.comments} />
      )}
    </article>
  );
}
