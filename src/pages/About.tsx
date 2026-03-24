import FamilyMember from '../components/FamilyMember/FamilyMember';
import { useFamilyStore } from '../store/familyStore';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './About.module.scss';

const FAMILY_VALUES = [
  {
    icon: '🍚',
    name: 'Eat Together',
    desc: 'Every major decision gets made over a meal. Seokjin insists.',
  },
  {
    icon: '📚',
    name: 'Keep Learning',
    desc: 'From Minji\'s library to Minjun\'s code — curiosity never stops here.',
  },
  {
    icon: '💛',
    name: 'Show Up',
    desc: 'Five people, five schedules. But we\'re always there for each other.',
  },
  {
    icon: '🌱',
    name: 'Grow Slowly',
    desc: 'Life\'s not a race. The Jeons take the scenic route.',
  },
];

export default function About() {
  const { members } = useFamilyStore();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const storyRef = useScrollReveal<HTMLDivElement>();
  const valuesRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className={`${styles.page} page-enter`}>
      <div ref={headerRef} className={`${styles.header} reveal`}>
        <span className={styles.eyebrow}>The Jeon Family</span>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.intro}>
          Five people, one house in Seoul, and a shared conviction that
          the best stories happen around the dinner table.
          Here's who we are.
        </p>
      </div>

      {/* Members */}
      <div className={styles.membersSection}>
        <h2 className={styles.sectionLabel}>The Cast</h2>
        <div className={styles.grid}>
          {members.map((m, i) => (
            <FamilyMember key={m.id} member={m} delay={i * 0.1} />
          ))}
        </div>
      </div>

      {/* Story section */}
      <div ref={storyRef} className={`${styles.story} reveal`}>
        <div className={styles.storyInner}>
          <h2 className={styles.storyTitle}>Our Story So Far</h2>
          <p className={styles.storyText}>
            It started in <strong>1998</strong> with two people and a lot of hope.
            Seokjin and Minji built a home brick by brick — not with money,
            but with late nights, inside jokes, and a belief that family is
            the most important project you'll ever work on.
          </p>
          <div className={styles.storyDivider} />
          <p className={styles.storyText}>
            Three kids later, the house is louder. The fridge empties faster.
            The bathroom is always occupied. But so is the laughter. So is the love.
            The Jeons aren't perfect — they're just <strong>really, really real</strong>.
          </p>
          <p className={styles.storyText}>
            This site is a little corner of the internet where we keep
            our story safe. For us, and for anyone who needs a reminder that
            ordinary life, lived fully, is extraordinary.
          </p>
        </div>
      </div>

      {/* Values */}
      <div ref={valuesRef} className={`${styles.values} reveal`}>
        <h2 className={styles.valuesTitle}>What We Believe In</h2>
        <div className={styles.valueGrid}>
          {FAMILY_VALUES.map(v => (
            <div key={v.name} className={styles.valueCard}>
              <div className={styles.valueIcon}>{v.icon}</div>
              <h3 className={styles.valueName}>{v.name}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
