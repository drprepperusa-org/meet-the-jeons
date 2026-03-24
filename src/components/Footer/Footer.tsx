import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const CURRENT_YEAR = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* Brand column */}
        <div className={styles.brandCol}>
          <div>
            <Link to="/" className={styles.footerBrand} aria-label="The Jeons — Home">
              The Jeons
            </Link>
            <p className={styles.footerBrandSub}>Family · Love · Growth</p>
          </div>
          <p className={styles.footerTagline}>
            A warm corner of the internet dedicated to our family's story — the everyday moments,
            milestones, and memories we cherish together.
          </p>
        </div>

        {/* Navigation column */}
        <div className={styles.navCol}>
          <h3 className={styles.navColTitle}>Explore</h3>
          <nav className={styles.navColLinks} aria-label="Footer navigation">
            <Link to="/" className={styles.navColLink}>Home</Link>
            <Link to="/current" className={styles.navColLink}>Current</Link>
            <Link to="/growth" className={styles.navColLink}>Growth</Link>
            <Link to="/about" className={styles.navColLink}>About</Link>
          </nav>
        </div>

        {/* Story column */}
        <div className={styles.navCol}>
          <h3 className={styles.navColTitle}>Our Story</h3>
          <div className={styles.navColLinks}>
            <span className={styles.navColLink} style={{ cursor: 'default', pointerEvents: 'none' }}>
              Family Gallery
            </span>
            <span className={styles.navColLink} style={{ cursor: 'default', pointerEvents: 'none' }}>
              Milestones
            </span>
            <span className={styles.navColLink} style={{ cursor: 'default', pointerEvents: 'none' }}>
              Memories
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          © {CURRENT_YEAR} The Jeons. All rights reserved.
        </p>
        <div className={styles.footerDots} aria-hidden="true">
          <div className={styles.footerDot} />
          <div className={styles.footerDot} />
          <div className={styles.footerDot} />
        </div>
        <p className={styles.copyright}>
          Made with warmth &amp; love
        </p>
      </div>
    </footer>
  );
};

export default Footer;
