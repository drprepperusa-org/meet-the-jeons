import { useState, useRef } from 'react';
import type { Comment } from '../../api/mockData';
import { useAddComment } from '../../hooks/useAddComment';
import styles from './CommentSection.module.scss';

interface Props {
  imageId: string;
  seedComments?: Comment[];
}

export default function CommentSection({ imageId, seedComments = [] }: Props) {
  const [text, setText] = useState('');
  const { submitComment, getComments, isPending } = useAddComment();
  const inputRef = useRef<HTMLInputElement>(null);

  // Merge seed comments with store comments, deduplicate by id
  const storeComments = getComments(imageId);
  const allIds = new Set(storeComments.map(c => c.id));
  const merged = [
    ...seedComments.filter(c => !allIds.has(c.id)),
    ...storeComments,
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isPending) return;
    submitComment(imageId, text.trim());
    setText('');
    inputRef.current?.blur();
  };

  return (
    <div className={styles.section}>
      <div className={styles.title}>
        {merged.length} {merged.length === 1 ? 'comment' : 'comments'}
      </div>

      <div className={styles.list}>
        {merged.length === 0 ? (
          <p className={styles.empty}>Be the first to say something 💛</p>
        ) : (
          merged.map((c, i) => (
            <div
              key={c.id}
              className={styles.comment}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className={styles.avatar} aria-hidden="true">
                {c.author[0]}
              </div>
              <div className={styles.bubble}>
                <div className={styles.author}>{c.author}</div>
                <div className={styles.text}>{c.text}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={e => setText(e.target.value)}
          aria-label="Comment input"
          maxLength={300}
        />
        <button
          type="submit"
          className={styles.submit}
          disabled={isPending || !text.trim()}
        >
          {isPending ? '...' : 'Post'}
        </button>
      </form>
    </div>
  );
}
