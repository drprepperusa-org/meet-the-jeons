import { useRef, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { TimelineEvent } from '../types';
import GrowthGallery from '../components/Gallery/GrowthGallery';
import styles from './Growth.module.scss';

const TIMELINE: TimelineEvent[] = [
  {
    id: 'e1',
    year: 1998,
    title: 'Seokjin & Minji Tie the Knot',
    description: 'A small, beautiful ceremony in Busan — the first chapter of the Jeon family story. They honeymooned in Jeju and ate so much seafood they still talk about it.',
    type: 'milestone',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=200&fit=crop',
  },
  {
    id: 'e2',
    year: 2000,
    title: 'Taehyung Arrives',
    description: 'The eldest joins the family — three weeks early and already impatient. He came out with his fists clenched like he had deadlines to meet. Some things never change.',
    type: 'memory',
  },
  {
    id: 'e3',
    year: 2003,
    title: 'Yuna Makes Four',
    description: 'Middle child energy from day one. Yuna arrived on a rainy Tuesday, and by Wednesday she already had her parents wrapped around her finger.',
    type: 'memory',
  },
  {
    id: 'e4',
    year: 2008,
    title: 'Minjun Completes the Set',
    description: 'The youngest, the loudest, and the most dramatic. He learned to say "not fair" before he learned to walk.',
    type: 'memory',
  },
  {
    id: 'e5',
    year: 2010,
    title: 'First Family Vacation Abroad',
    description: 'Japan. Cherry blossom season. Dad got lost three times. Mom found the best ramen shop by accident. Taehyung filled two sketchbooks.',
    type: 'travel',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=200&fit=crop',
  },
  {
    id: 'e6',
    year: 2015,
    title: 'Dad Wins Regional Cooking Competition',
    description: 'His doenjang jjigae took first place. He still brings this up at least once per family dinner. We love him for it.',
    type: 'achievement',
  },
  {
    id: 'e7',
    year: 2018,
    title: 'Taehyung Gets Into Architecture School',
    description: 'We all cried. Even Minjun, who claimed it was allergies. Seokjin made a seven-course dinner to celebrate.',
    type: 'achievement',
  },
  {
    id: 'e8',
    year: 2021,
    title: 'Yuna Declares Pre-Med',
    description: 'She\'d been planning it since age 10. The family wasn\'t surprised, just proud. Mom immediately started calling her "Dr. Jeon."',
    type: 'milestone',
  },
  {
    id: 'e9',
    year: 2023,
    title: 'Minjun Wins Coding Hackathon',
    description: 'First place at a regional high school coding competition. He built a music recommendation app in 24 hours. The whole family showed up with a banner.',
    type: 'achievement',
  },
  {
    id: 'e10',
    year: 2024,
    title: 'Family Busan Reunion Trip',
    description: 'Back to where it all started. Five days, forty-something photos, one memorable sunset, and a vow to do it again every year.',
    type: 'travel',
    imageUrl: 'https://images.unsplash.com/photo-1452827073306-6e6e661baf57?w=600&h=200&fit=crop',
  },
];

const TYPE_ICONS: Record<string, string> = {
  milestone:   '🌟',
  memory:      '💛',
  achievement: '🏆',
  travel:      '✈️',
};

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
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
      { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={styles.event}
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <div className={styles.dot}>{TYPE_ICONS[event.type]}</div>
      <div className={styles.content}>
        <span className={`${styles.typeBadge} ${styles[event.type]}`}>
          {event.type}
        </span>
        <div className={styles.year}>{event.year}</div>
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

export default function Growth() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className={`${styles.page} page-enter`}>
      <div ref={headerRef} className={`${styles.header} reveal`}>
        <span className={styles.eyebrow}>Family Timeline</span>
        <h1 className={styles.title}>Growing Up</h1>
        <p className={styles.subtitle}>
          From a small ceremony in Busan to five complete, chaotic, wonderful people.
          This is how we got here.
        </p>
      </div>

      <div className={styles.timeline}>
        {TIMELINE.map((event, i) => (
          <TimelineItem key={event.id} event={event} index={i} />
        ))}
      </div>

      <GrowthGallery />
    </div>
  );
}
