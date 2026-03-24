import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <div>
            <Link to="/" className={styles.footerBrand}>The Jeons</Link>
            <p className={styles.footerBrandSub}>Family · Love · Growth</p>
          </div>
          <p className={styles.footerTagline}>
            A warm corner of the internet dedicated to our family&apos;s story — the everyday moments,
            milestones, and memories we cherish together.
          </p>
        </div>

        <div className={styles.navCol}>
          <h3 className={styles.navColTitle}>Explore</h3>
          <nav className={styles.navColLinks}>
            <Link to="/" className={styles.navColLink}>Home</Link>
            <Link to="/current" className={styles.navColLink}>Current</Link>
            <Link to="/growth" className={styles.navColLink}>Growth</Link>
            <Link to="/about" className={styles.navColLink}>About</Link>
          </nav>
        </div>

        <div className={styles.navCol}>
          <h3 className={styles.navColTitle}>Our Story</h3>
          <div className={styles.navColLinks}>
            <span className={styles.navColLink}>Family Gallery</span>
            <span className={styles.navColLink}>Milestones</span>
            <span className={styles.navColLink}>Memories</span>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>© {year} The Jeons. All rights reserved.</p>
        <div className={styles.footerDots} aria-hidden="true">
          <div className={styles.footerDot} />
          <div className={styles.footerDot} />
          <div className={styles.footerDot} />
        </div>
        <p className={styles.copyright}>Made with warmth &amp; love</p>
      </div>
    </footer>
  );
};

export default Footer;
