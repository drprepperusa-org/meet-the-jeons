import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import PhotoCard from '../components/PhotoCard/PhotoCard';
import { useFamilyStore } from '../store/familyStore';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Home.module.scss';

export default function Home() {
  const { photos } = useFamilyStore();
  const navigate = useNavigate();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const bannerRef = useScrollReveal<HTMLDivElement>();

  const preview = photos.slice(0, 3);

  return (
    <div className={styles.page}>
      <Hero />

      {/* Recent Photos Preview */}
      <section className={styles.preview}>
        <div ref={headerRef} className={`${styles.sectionHeader} reveal`}>
          <span className={styles.eyebrow}>Recent Moments</span>
          <h2 className={styles.sectionTitle}>What We've Been Up To</h2>
          <p className={styles.sectionSubtitle}>
            Snapshots of the everyday magic that makes this family ours.
          </p>
        </div>

        <div className={styles.grid}>
          {preview.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} delay={i * 0.1} />
          ))}
        </div>

        <div className={styles.viewAll}>
          <button className={styles.btn} onClick={() => navigate('/current')}>
            See All Moments →
          </button>
        </div>
      </section>

      {/* Family CTA Banner */}
      <div ref={bannerRef} className={`${styles.familyBanner} reveal`}>
        <h2>Five people. One wild adventure.</h2>
        <p>
          We're the Jeons. Come meet us, learn about us,
          and watch us grow — one chaotic, beautiful day at a time.
        </p>
        <button className={styles.bannerBtn} onClick={() => navigate('/about')}>
          Meet the Family
        </button>
      </div>
    </div>
  );
}
