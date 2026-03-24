import FamilyCard from '../components/FamilyCard/FamilyCard';
import Timeline from '../components/Timeline/Timeline';
import { useFamilyInfo } from '../hooks/useFamilyInfo';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './About.module.scss';

export default function About() {
  const { parents, kids, values, timeline, familyTagline, location, since, isLoading } = useFamilyInfo();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const storyRef = useScrollReveal<HTMLDivElement>();
  const valuesRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className={styles.page}>
      <div ref={headerRef} className={`${styles.header} reveal`}>
        <span className={styles.eyebrow}>The Jeon Family</span>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.intro}>
          {familyTagline || 'Five people, one home, and a shared belief that the best stories happen around the dinner table.'}
          {location ? ` Based in ${location}` : ''}{since ? `, together since ${since}.` : '.'}
        </p>
      </div>

      {/* Members */}
      {!isLoading && parents.length > 0 && (
        <div className={styles.membersSection}>
          <h2 className={styles.sectionLabel}>The Parents</h2>
          <div className={styles.parentsGrid}>
            {parents.map((p, i) => (
              <FamilyCard key={p.id} member={p} type="parent" delay={i * 0.1} />
            ))}
          </div>

          {kids.length > 0 && (
            <>
              <h2 className={styles.sectionLabel} style={{ marginTop: '3rem' }}>The Kids</h2>
              <div className={styles.kidsGrid}>
                {kids.map((k, i) => (
                  <FamilyCard key={k.id} member={k} type="child" delay={i * 0.1} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {isLoading && (
        <div className={styles.loadingState}>Loading the family… 💛</div>
      )}

      {/* Story */}
      <div ref={storyRef} className={`${styles.story} reveal`}>
        <div className={styles.storyInner}>
          <h2 className={styles.storyTitle}>Our Story So Far</h2>
          <p className={styles.storyText}>
            It started with two people and a whole lot of hope. James and Mia built a home
            not with money, but with late nights, inside jokes, and the belief that family
            is the most important project you&apos;ll ever work on.
          </p>
          <div className={styles.divider} />
          <p className={styles.storyText}>
            Two kids later, the house is louder. The fridge empties faster. The bathroom
            is always occupied. But so is the laughter. So is the love. The Jeons aren&apos;t
            perfect — they&apos;re just <strong>really, really real.</strong>
          </p>
          <p className={styles.storyText}>
            This site is a little corner of the internet where we keep our story safe.
            For us, and for anyone who needs a reminder that ordinary life, lived fully,
            is extraordinary.
          </p>
        </div>
      </div>

      {/* Values */}
      {values.length > 0 && (
        <div ref={valuesRef} className={`${styles.values} reveal`}>
          <h2 className={styles.valuesTitle}>What We Believe In</h2>
          <div className={styles.valuesGrid}>
            {values.map(v => (
              <div key={v.id} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3 className={styles.valueName}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      {timeline.length > 0 && (
        <div className={styles.timelineSection}>
          <div className={styles.timelineHeader}>
            <h2 className={styles.timelineTitle}>Our Timeline</h2>
            <p className={styles.timelineSubtitle}>
              From a garden wedding in Balboa Park to this very moment — every chapter matters.
            </p>
          </div>
          <Timeline events={timeline} />
        </div>
      )}
    </div>
  );
}
