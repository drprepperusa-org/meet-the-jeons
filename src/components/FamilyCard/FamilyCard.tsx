import type { Parent, Child } from '../../api/mockData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './FamilyCard.module.scss';

type Member = (Parent | Child) & { type: 'parent' | 'child' };

interface Props {
  member: Parent | Child;
  type: 'parent' | 'child';
  delay?: number;
}

function isParent(m: Parent | Child): m is Parent {
  return 'occupation' in m;
}

export default function FamilyCard({ member, type, delay = 0 }: Props) {
  const ref = useScrollReveal<HTMLDivElement>();

  const tags = isParent(member)
    ? [member.occupation, member.birthplace]
    : (member as Child).hobbies ?? [];

  const factsToShow = isParent(member)
    ? member.funFacts.slice(0, 3)
    : (member as Child).personality ?? [];

  return (
    <div
      ref={ref}
      className={styles.card}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className={styles.avatarWrap}>
        <img src={member.avatar} alt={member.name} loading="lazy" />
      </div>

      <div className={styles.role}>
        {type === 'parent' ? (member as Parent).role : (member as Child).nickname ? `aka "${(member as Child).nickname}"` : 'Kid'}
      </div>
      <div className={styles.name}>{member.name}</div>
      <p className={styles.bio}>{member.bio}</p>

      <div className={styles.tags}>
        {tags.slice(0, 4).map((t, i) => (
          <span key={i} className={styles.tag}>{t}</span>
        ))}
      </div>

      {factsToShow.length > 0 && (
        <div className={styles.funFacts}>
          <h4>{isParent(member) ? 'Fun Facts' : 'Personality'}</h4>
          {factsToShow.map((f, i) => (
            <div key={i} className={styles.fact}>{f}</div>
          ))}
        </div>
      )}
    </div>
  );
}
