import { useNavigate } from 'react-router-dom';
import { useParallax } from '../../hooks/useScrollReveal';
import styles from './Hero.module.scss';

export default function Hero() {
  const parallaxRef = useParallax(0.3);
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div ref={parallaxRef} className={styles.parallaxBg} />
      
      {/* Decorative circles */}
      <div className={`${styles.decorCircle} ${styles.decorCircle1}`} />
      <div className={`${styles.decorCircle} ${styles.decorCircle2}`} />

      <div className={styles.content}>
        <span className={styles.eyebrow}>A Family Story</span>
        <h1 className={styles.title}>
          Meet the <span>Jeons</span>
        </h1>
        <p className={styles.subtitle}>
          Five people. One home. Endless stories. Come see what Sunday mornings,
          midnight snacks, and a whole lot of love looks like.
        </p>
        <div className={styles.cta}>
          <button className={styles.btnPrimary} onClick={() => navigate('/current')}>
            See What We're Up To
          </button>
          <button className={styles.btnSecondary} onClick={() => navigate('/about')}>
            Meet the Family
          </button>
        </div>
      </div>

      <div className={styles.scroll}>
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </div>
    </section>
  );
}
