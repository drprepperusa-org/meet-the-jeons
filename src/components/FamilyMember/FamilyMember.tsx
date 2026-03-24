import type { FC } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './FamilyMember.module.scss';

export interface FamilyMemberProps {
  name: string;
  role: string;
  age?: number;
  bio: string;
  funFact?: string;
  imageUrl?: string;
  imagePlaceholderEmoji?: string;
  interests?: string[];
  reverse?: boolean;
}

const FamilyMember: FC<FamilyMemberProps> = ({
  name,
  role,
  age,
  bio,
  funFact,
  imageUrl,
  imagePlaceholderEmoji = '👤',
  interests = [],
  reverse = false,
}) => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`${styles.member} ${reverse ? styles.reverse : ''} reveal`}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <img src={imageUrl} alt={`${name} — ${role}`} className={styles.photo} />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.emoji}>{imagePlaceholderEmoji}</span>
          </div>
        )}
        <div className={styles.badge}>
          <span className={styles.badgeName}>{name}</span>
          {age !== undefined && <span className={styles.badgeAge}>Age {age}</span>}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.role}>{role}</span>
        </div>

        <p className={styles.bio}>{bio}</p>

        {interests.length > 0 && (
          <div className={styles.interests}>
            <span className={styles.interestsLabel}>Loves:</span>
            <div className={styles.tags}>
              {interests.map((interest) => (
                <span key={interest} className={styles.tag}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {funFact && (
          <div className={styles.funFact}>
            <span className={styles.funFactIcon}>✨</span>
            <p className={styles.funFactText}>
              <strong>Fun fact:</strong> {funFact}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyMember;
