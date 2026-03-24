import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/current', label: 'Right Now' },
  { to: '/growth', label: 'Growing Up' },
  { to: '/about', label: 'About Us' },
];

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          Meet the <span>Jeons</span>
        </div>
        <div className={styles.links}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.link}${isActive ? ` ${styles.active}` : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
