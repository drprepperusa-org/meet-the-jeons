import { useState, useRef } from 'react';
import { useFamilyStore } from '../../store/familyStore';
import type { Comment } from '../../types';
import styles from './CommentSection.module.scss';

interface Props {
  photoId: string;
  comments: Comment[];
}

export default function CommentSection({ photoId, comments }: Props) {
  const [text, setText] = useState('');
  const { addComment } = useFamilyStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(photoId, {
      author: 'You',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    });
    setText('');
    inputRef.current?.blur();
  };

  return (
    <div className={styles.section}>
      <div className={styles.title}>
        {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
      </div>

      <div className={styles.list}>
        {comments.length === 0 && (
          <p className={styles.empty}>Be the first to say something 💛</p>
        )}
        {comments.map((c, i) => (
          <div
            key={c.id}
            className={styles.comment}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className={styles.avatar}>
              {c.author[0].toUpperCase()}
            </div>
            <div className={styles.bubble}>
              <div className={styles.author}>{c.author}</div>
              <div className={styles.text}>{c.text}</div>
            </div>
          </div>
        ))}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit" className={styles.submit}>Post</button>
      </form>
    </div>
  );
}
