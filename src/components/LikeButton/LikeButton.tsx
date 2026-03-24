import { useState } from 'react';
import { useFamilyStore } from '../../store/familyStore';
import styles from './LikeButton.module.scss';

interface Props {
  photoId: string;
  count: number;
}

export default function LikeButton({ photoId, count }: Props) {
  const { likedPhotos, likePhoto } = useFamilyStore();
  const [showRipple, setShowRipple] = useState(false);
  const liked = likedPhotos.has(photoId);

  const handleClick = () => {
    likePhoto(photoId);
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 700);
  };

  return (
    <button
      className={`${styles.btn}${liked ? ` ${styles.liked}` : ''}`}
      onClick={handleClick}
      aria-label={liked ? 'Unlike photo' : 'Like photo'}
    >
      <span className={styles.rippleWrap}>
        {showRipple && <span className={styles.ripple} />}
      </span>
      <span className={styles.heart}>{liked ? '❤️' : '🤍'}</span>
      <span className={styles.count}>{count}</span>
    </button>
  );
}
