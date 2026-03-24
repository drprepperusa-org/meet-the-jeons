import { useRef, useEffect } from 'react';
import type { TimelineEvent } from '../../api/mockData';
import styles from './Timeline.module.scss';

const CATEGORY_ICONS: Record<string, string> = {
  milestone:   '🌟',
  travel:      '✈️',
  family:      '💛',
  celebration: '🎉',
};

interface EventItemProps {
  event: TimelineEvent;
  index: number;
}

function EventItem({ event, index }: EventItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.revealed);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const dateStr = new Date(event.date).toLocaleDateString('en-US', {
    month: 'long', year: 'numeric',
  });

  return (
    <div
      ref={ref}
      className={styles.event}
      style={{ transitionDelay: `${index * 0.04}s` }}
    >
      <div className={styles.dot} aria-hidden="true">
        {CATEGORY_ICONS[event.category] ?? '📍'}
      </div>
      <div className={styles.content}>
        <span className={`${styles.categoryBadge} ${styles[event.category]}`}>
          {event.category}
        </span>
        <div className={styles.date}>{dateStr}</div>
        <h3 className={styles.eventTitle}>{event.title}</h3>
        <p className={styles.eventDesc}>{event.description}</p>
        {event.imageUrl && (
          <div className={styles.eventImage}>
            <img src={event.imageUrl} alt={event.title} loading="lazy" />
          </div>
        )}
      </div>
    </div>
  );
}

interface Props {
  events: TimelineEvent[];
}

export default function Timeline({ events }: Props) {
  return (
    <div className={styles.wrap}>
      {events.map((event, i) => (
        <EventItem key={event.id} event={event} index={i} />
      ))}
    </div>
  );
}
