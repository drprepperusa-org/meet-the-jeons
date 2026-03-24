import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Navigation from '../Navigation/Navigation';

const SCROLL_THRESHOLD = 60;

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass = [
    styles.header,
    scrolled ? styles.scrolled : styles.transparent,
  ].join(' ');

  return (
    <header className={headerClass} role="banner">
      <div className={styles.inner}>
        {/* Brand / Logo */}
        <Link to="/" className={styles.brand} aria-label="Meet The Jeons — Home">
          <div className={styles.brandOrnament}>
            <span className={styles.ornamentDot} aria-hidden="true" />
            <span className={styles.brandName}>The Jeons</span>
            <span className={styles.ornamentDot} aria-hidden="true" />
          </div>
          <span className={styles.brandTagline}>Family · Love · Growth</span>
        </Link>

        {/* Navigation */}
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
