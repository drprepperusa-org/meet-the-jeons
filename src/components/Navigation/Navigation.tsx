import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';

const NAV_ITEMS = [
  { label: 'Home',    path: '/' },
  { label: 'Current', path: '/current' },
  { label: 'Growth',  path: '/growth' },
  { label: 'About',   path: '/about' },
];

const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const getLinkClass = (path: string) => {
    const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
    return [styles.navLink, isActive ? styles.active : ''].filter(Boolean).join(' ');
  };

  const getMobileLinkClass = (path: string) => {
    const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
    return [styles.mobileNavLink, isActive ? styles.active : ''].filter(Boolean).join(' ');
  };

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <ul className={`${styles.navList} ${styles.desktopNav}`} role="list">
        {NAV_ITEMS.map((item) => (
          <li key={item.path} className={styles.navItem}>
            <NavLink to={item.path} className={getLinkClass(item.path)}>{item.label}</NavLink>
          </li>
        ))}
      </ul>

      <button
        className={`${styles.mobileMenuBtn} ${mobileOpen ? styles.open : ''}`}
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div className={`${styles.mobileDrawer} ${mobileOpen ? styles.open : ''}`} role="dialog">
        {NAV_ITEMS.map((item, idx) => (
          <React.Fragment key={item.path}>
            <NavLink to={item.path} className={getMobileLinkClass(item.path)}>{item.label}</NavLink>
            {idx < NAV_ITEMS.length - 1 && <div className={styles.mobileDivider} />}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
