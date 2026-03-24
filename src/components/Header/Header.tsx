import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Navigation from '../Navigation/Navigation';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="The Jeons — Home">
          <div className={styles.brandOrnament}>
            <span className={styles.ornamentDot} aria-hidden="true" />
            <span className={styles.brandName}>The Jeons</span>
            <span className={styles.ornamentDot} aria-hidden="true" />
          </div>
          <span className={styles.brandTagline}>Family · Love · Growth</span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
