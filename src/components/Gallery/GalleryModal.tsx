/**
 * GalleryModal.tsx — Fullscreen image viewer with like/comment controls
 * Navigation: prev/next arrows + ESC key + backdrop click to close
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useLikeImage } from '../../hooks/useLikeImage';
import { useGalleryStore } from '../../stores/galleryStore';
import * as mockApi from '../../api/mockData';
import type { Image, Comment } from '../../api/mockData';
import styles from './GalleryModal.module.scss';

interface GalleryModalProps {
  image: Image | null;
  images: Image[];
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ image, images, onClose }) => {
  const [currentImage, setCurrentImage] = useState<Image | null>(image);
  const [displayName, setDisplayName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [closing, setClosing] = useState(false);

  const { likeImage, getLikeState } = useLikeImage();
  const storeComments = useGalleryStore((s) => s.comments);
  const storeAddComment = useGalleryStore((s) => s.addComment);

  useEffect(() => { setCurrentImage(image); }, [image]);

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
    setClosing(true);
    setTimeout(onClose, 240);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      handleClose();
      if (e.key === 'ArrowLeft')   goToPrev();
      if (e.key === 'ArrowRight')  goToNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose, goToPrev, goToNext]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!currentImage) return null;

  const likeState = getLikeState(currentImage.id);
  const likeCount = likeState.count || currentImage.likes;
  const liked = likeState.liked;
  const comments: Comment[] = storeComments[currentImage.id] ?? [];

  const formattedDate = new Date(currentImage.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await mockApi.addComment(currentImage.id, commentText);
      if (result.success) {
        // Override author with user's display name
        const comment: Comment = {
          ...result.data,
          author: displayName.trim() || 'Anonymous',
        };
        storeAddComment(currentImage.id, comment);
        setCommentText('');
      }
    } catch (err) {
      console.error('Failed to add comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const CHILD_LABEL: Record<string, string> = { sofia: 'Sofia', liam: 'Liam', both: 'Both' };

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.closing : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${currentImage.caption}`}
    >
      <div
        className={`${styles.modal} ${closing ? styles.modalClosing : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close modal">
          ✕
        </button>

        {/* Prev / Next */}
        {hasPrev && (
          <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={goToPrev} aria-label="Previous photo">
            ‹
          </button>
        )}
        {hasNext && (
          <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={goToNext} aria-label="Next photo">
            ›
          </button>
        )}

        <div className={styles.content}>
          {/* Image pane */}
          <div className={styles.imagePane}>
            <img
              key={currentImage.id}
              src={currentImage.url}
              alt={currentImage.caption}
              className={styles.image}
            />
            {currentImage.child && (
              <span className={`${styles.childBadge} ${styles[`child-${currentImage.child}`]}`}>
                {CHILD_LABEL[currentImage.child]}
              </span>
            )}
            <span className={styles.counter} aria-live="polite">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {/* Info pane */}
          <aside className={styles.infoPane}>
            <div className={styles.header}>
              <p className={styles.caption}>{currentImage.caption}</p>
              <p className={styles.date}>{formattedDate}</p>

              <div className={styles.tagRow}>
                {currentImage.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>

              <div className={styles.likeRow}>
                <button
                  className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
                  onClick={() => likeImage(currentImage.id)}
                  aria-label={liked ? `Unlike (${likeCount} likes)` : `Like (${likeCount} likes)`}
                  aria-pressed={liked}
                >
                  <span aria-hidden>{liked ? '❤️' : '🤍'}</span>
                  <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
                </button>
              </div>
            </div>

            {/* Comments */}
            <section className={styles.commentsSection} aria-label="Comments">
              <h3 className={styles.commentsHeading}>
                💬 {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
              </h3>

              <div className={styles.commentList} role="list">
                {comments.length === 0 && (
                  <p className={styles.noComments}>Be the first to share a memory ✨</p>
                )}
                {comments.map((c) => (
                  <div key={c.id} className={styles.comment} role="listitem">
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor}>{c.author}</span>
                      <time className={styles.commentTime} dateTime={c.date}>
                        {new Date(c.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <p className={styles.commentBody}>{c.text}</p>
                  </div>
                ))}
              </div>

              {/* Add comment form */}
              <form className={styles.commentForm} onSubmit={handleSubmit} aria-label="Add a comment">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={styles.nameInput}
                  maxLength={60}
                  aria-label="Display name"
                />
                <textarea
                  placeholder="Share a memory or thought…"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className={styles.commentInput}
                  rows={3}
                  maxLength={500}
                  aria-label="Comment text"
                  aria-required="true"
                />
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={!commentText.trim() || isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? 'Posting…' : 'Post Comment'}
                </button>
              </form>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
