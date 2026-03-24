import type { FC } from 'react';
import styles from './Timeline.module.scss';

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

interface TimelineProps {
  milestones: TimelineMilestone[];
}

const Timeline: FC<TimelineProps> = ({ milestones }) => {
  return (
    <section className={styles.timeline}>
      <div className={styles.track}>
        {milestones.map((milestone, index) => (
          <div
            key={`${milestone.year}-${index}`}
            className={`${styles.item} ${milestone.highlight ? styles.highlighted : ''} ${
              index % 2 === 0 ? styles.left : styles.right
            }`}
          >
            {/* Connector dot */}
            <div className={styles.dot}>
              <span className={styles.dotIcon}>{milestone.icon}</span>
            </div>

            {/* Card */}
            <div className={styles.card}>
              <span className={styles.year}>{milestone.year}</span>
              <h4 className={styles.title}>{milestone.title}</h4>
              <p className={styles.description}>{milestone.description}</p>
            </div>
          </div>
        ))}

        {/* Vertical line */}
        <div className={styles.line} />
      </div>
    </section>
  );
};

export default Timeline;
