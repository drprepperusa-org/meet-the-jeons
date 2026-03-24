import { useEffect } from 'react';
import { useImageModal } from '../../hooks/useImageModal';
import LikeButton from '../LikeButton/LikeButton';
import CommentSection from '../CommentSection/CommentSection';
import styles from './Modal.module.scss';

export default function Modal() {
  const { selectedImage, isModalOpen, close } = useImageModal();

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (isModalOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isModalOpen, close]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  if (!isModalOpen || !selectedImage) return null;

  const dateStr = new Date(selectedImage.date).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      role="dialog"
      aria-modal="true"
      aria-label={selectedImage.caption}
    >
      <div className={styles.modal}>
        <button className={styles.close} onClick={close} aria-label="Close">✕</button>
        <img
          src={selectedImage.url}
          alt={selectedImage.caption}
          className={styles.image}
          loading="eager"
        />
        <div className={styles.body}>
          <h2 className={styles.caption}>{selectedImage.caption}</h2>
          <div className={styles.meta}>
            <span className={styles.date}>{dateStr}</span>
            <div className={styles.tags}>
              {selectedImage.tags.map(tag => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <LikeButton imageId={selectedImage.id} />
        </div>
        <CommentSection imageId={selectedImage.id} seedComments={selectedImage.comments} />
      </div>
    </div>
  );
}
