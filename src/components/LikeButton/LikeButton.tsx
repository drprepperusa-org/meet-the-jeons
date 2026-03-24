import { useState } from 'react';
import { useLikeImage } from '../../hooks/useLikeImage';
import styles from './LikeButton.module.scss';

interface Props {
  imageId: string;
}

export default function LikeButton({ imageId }: Props) {
  const { likeImage, getLikeState, isPending } = useLikeImage();
  const [showRipple, setShowRipple] = useState(false);
  const { count, liked } = getLikeState(imageId);

  const handleClick = () => {
    if (isPending) return;
    likeImage(imageId);
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 700);
  };

  return (
    <button
      className={`${styles.btn}${liked ? ` ${styles.liked}` : ''}`}
      onClick={handleClick}
      aria-label={liked ? 'Unlike photo' : 'Like photo'}
      aria-pressed={liked}
      disabled={isPending}
    >
      <span className={styles.rippleWrap} aria-hidden="true">
        {showRipple && <span className={styles.ripple} />}
      </span>
      <span className={styles.heart} aria-hidden="true">
        {liked ? '❤️' : '🤍'}
      </span>
      <span className={styles.count}>{count}</span>
    </button>
  );
}
