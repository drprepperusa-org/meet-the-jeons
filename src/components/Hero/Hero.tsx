import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.scss';

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);

  const handleParallax = useCallback(() => {
    if (!bgRef.current) return;
    bgRef.current.style.transform = `translate3d(0, ${scrollYRef.current * 0.4}px, 0)`;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      scrollYRef.current = window.scrollY;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleParallax);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleParallax]);

  const scrollDown = () => {
    const next = document.getElementById('main-content');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} aria-label="Hero section">
      <div ref={bgRef} className={styles.heroBg} role="img" aria-label="Warm family lifestyle scene" />
      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={styles.heroContent}>
        <span className={styles.eyebrow} aria-hidden="true">
          Est. 2024 &nbsp;·&nbsp; Our Family Story
        </span>

        <h1 className={styles.title}>
          Meet{' '}
          <span className={styles.titleAccent}>The Jeons</span>
        </h1>

        <div className={styles.divider} aria-hidden="true" />

        <p className={styles.subtitle}>
          A family built on love, laughter, and the everyday moments that matter most.
          Follow our journey of growth, connection, and life lived warmly together.
        </p>

        <div className={styles.ctas}>
          <Link to="/current" className={styles.ctaPrimary}>
            <span>Browse Gallery</span>
            <svg className={styles.ctaIcon} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link to="/about" className={styles.ctaSecondary}>
            <span>About Us</span>
          </Link>
        </div>
      </div>

      <button className={styles.scrollIndicator} onClick={scrollDown} aria-label="Scroll down">
        <div className={styles.scrollMouse} aria-hidden="true">
          <div className={styles.scrollWheel} />
        </div>
        <span className={styles.scrollLabel}>Scroll</span>
      </button>
    </section>
  );
};

export default Hero;
