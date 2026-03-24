import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGalleryStore } from '../../store/galleryStore';
import type { GalleryImage } from '../../data/galleryData';
import styles from './GalleryModal.module.scss';

interface GalleryModalProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ image, images, onClose }) => {
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(image);
  const [commentText, setCommentText] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const { toggleLike, getLikeCount, isLiked, getCommentsForImage, addComment } = useGalleryStore();

  useEffect(() => {
    setCurrentImage(image);
  }, [image]);

  const currentIndex = currentImage ? images.findIndex((img) => img.id === currentImage.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const goToPrev = useCallback(() => {
    if (hasPrev) setCurrentImage(images[currentIndex - 1]);
  }, [hasPrev, images, currentIndex]);

  const goToNext = useCallback(() => {
    if (hasNext) setCurrentImage(images[currentIndex + 1]);
  }, [hasNext, images, currentIndex]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 250);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleClose, goToPrev, goToNext]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!currentImage) return null;

  const liked = isLiked(currentImage.id);
  const likeCount = getLikeCount(currentImage.id, currentImage.likes);
  const comments = getCommentsForImage(currentImage.id);

  const formattedDate = new Date(currentImage.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(currentImage.id, displayName, commentText);
    setCommentText('');
  };

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.closing : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={currentImage.title}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
          ✕
        </button>

        {/* Navigation arrows */}
        {hasPrev && (
          <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={goToPrev} aria-label="Previous image">
            ‹
          </button>
        )}
        {hasNext && (
          <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={goToNext} aria-label="Next image">
            ›
          </button>
        )}

        <div className={styles.content}>
          {/* Image pane */}
          <div className={styles.imagePane}>
            <img
              src={currentImage.src}
              alt={currentImage.title}
              className={styles.image}
              key={currentImage.id}
            />
            {currentImage.child && (
              <span className={`${styles.childBadge} ${styles[`child${currentImage.child}`]}`}>
                {currentImage.child}
              </span>
            )}
            {/* Nav counter */}
            <span className={styles.counter}>
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {/* Info pane */}
          <div className={styles.infoPane}>
            <div className={styles.header}>
              <h2 className={styles.title}>{currentImage.title}</h2>
              <p className={styles.date}>{formattedDate}</p>
              {currentImage.description && (
                <p className={styles.description}>{currentImage.description}</p>
              )}

              <div className={styles.tagRow}>
                {currentImage.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>

              <div className={styles.actions}>
                <button
                  className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
                  onClick={() => toggleLike(currentImage.id, currentImage.likes)}
                  aria-label={liked ? 'Unlike' : 'Like'}
                >
                  <span>{liked ? '❤️' : '🤍'}</span>
                  <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
                </button>
              </div>
            </div>

            {/* Comments section */}
            <div className={styles.commentsSection}>
              <h3 className={styles.commentsTitle}>
                💬 {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
              </h3>

              <div className={styles.commentsList}>
                {comments.length === 0 && (
                  <p className={styles.noComments}>Be the first to leave a comment ✨</p>
                )}
                {comments.map((comment) => (
                  <div key={comment.id} className={styles.comment}>
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor}>{comment.displayName}</span>
                      <span className={styles.commentTime}>
                        {new Date(comment.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className={styles.commentText}>{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* Add comment form */}
              <form className={styles.commentForm} onSubmit={handleSubmitComment}>
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={styles.nameInput}
                  maxLength={50}
                />
                <textarea
                  ref={commentInputRef}
                  placeholder="Share a memory or thought…"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className={styles.commentInput}
                  rows={3}
                  maxLength={500}
                />
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={!commentText.trim()}
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
