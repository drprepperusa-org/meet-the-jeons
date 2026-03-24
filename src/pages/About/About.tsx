import type { FC } from 'react';
import { Link } from 'react-router-dom';
import FamilyMember from '../../components/FamilyMember';
import Timeline from '../../components/Timeline';
import type { TimelineMilestone } from '../../components/Timeline';
import styles from './About.module.scss';

// ─── Data ─────────────────────────────────────────────────────────────────────

const timelineMilestones: TimelineMilestone[] = [
  {
    year: '2010',
    title: 'We Said "I Do"',
    description: 'Jin and Mirae exchanged vows on a warm autumn afternoon in Seoul, surrounded by family and cherry blossoms.',
    icon: '💍',
    highlight: true,
  },
  {
    year: '2013',
    title: 'Sofia Joins the World',
    description: 'Our eldest, Sofia, arrived and immediately stole every heart in the room. Life was never the same — in the best way.',
    icon: '🌸',
    highlight: true,
  },
  {
    year: '2015',
    title: 'New Horizons — Moving Abroad',
    description: 'We packed our lives into a few suitcases and moved to San Diego, chasing sunshine, waves, and new adventures.',
    icon: '✈️',
  },
  {
    year: '2017',
    title: 'Liam Completes the Family',
    description: 'Little Liam arrived loud, curious, and ready to explore everything. Our family of four was complete.',
    icon: '🌟',
    highlight: true,
  },
  {
    year: '2019',
    title: 'Road-Tripping the Pacific Coast',
    description: 'Three weeks, one minivan, and memories that will last a lifetime — from Big Sur to the Oregon coast.',
    icon: '🚐',
  },
  {
    year: '2021',
    title: 'Started This Site',
    description: 'We decided to stop keeping our adventures to ourselves. Meet The Jeons was born — a place to share our story.',
    icon: '📖',
    highlight: true,
  },
  {
    year: '2023',
    title: 'Japan Family Trip',
    description: 'Two weeks in Japan — temples in Kyoto, ramen in Tokyo, and Sofia teaching Liam the art of the perfect bow.',
    icon: '🗾',
  },
];

const familyValues = [
  {
    icon: '🏡',
    title: 'Family First',
    description: 'Every decision we make starts with one question: is this good for our family? From big moves to weekend plans — family comes first.',
  },
  {
    icon: '📚',
    title: 'Lifelong Learning',
    description: 'We believe every experience is a lesson. We encourage curiosity, celebrate mistakes, and never stop learning — together.',
  },
  {
    icon: '🌄',
    title: 'Adventure Awaits',
    description: 'Life is too short for the same routine. We seek out new places, new foods, and new experiences every chance we get.',
  },
  {
    icon: '🌱',
    title: 'Growth Together',
    description: 'We grow as individuals and as a family. We cheer each other on, push each other forward, and celebrate every milestone — big or small.',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const About: FC = () => {
  return (
    <main className={styles.page}>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <div className={styles.heroImagePlaceholder}>
            <span className={styles.heroEmoji}>👨‍👩‍👧‍👦</span>
          </div>
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Our Family</p>
          <h1 className={styles.heroTitle}>About The Jeons</h1>
          <p className={styles.heroSubtitle}>
            A family of four exploring the world, making memories, and sharing the journey — one adventure at a time.
          </p>
        </div>
      </header>

      {/* ── Our Story ─────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={styles.storyText}>
              <span className={styles.sectionEyebrow}>Our Story</span>
              <h2 className={styles.sectionTitle}>Where It All Began</h2>
              <div className={styles.storyParagraphs}>
                <p>
                  We are the Jeons — Jin, Mirae, Sofia, and Liam. What started as two young dreamers who fell in love in Seoul has grown into a family bound by curiosity, warmth, and an unshakeable love for adventure. We met over terrible coffee and great conversation, and somewhere between the laughs and the long walks, we built a life together.
                </p>
                <p>
                  When we moved to San Diego in 2015, we didn't just change addresses — we changed our entire way of seeing the world. Surrounded by the Pacific, incredible food, and a community of people from everywhere, we leaned into a lifestyle that blends Korean roots with California soul. Our home is always a little loud, always smells like something delicious, and the door is always open.
                </p>
                <p>
                  This site exists because we believe stories are meant to be shared. The late-night road trips, the misadventures in foreign kitchens, the quiet Sunday mornings — these are the moments that make a life. Meet The Jeons is our way of holding onto them, and maybe inspiring you to create a few of your own.
                </p>
              </div>
            </div>
            <div className={styles.storyImageGroup}>
              <div className={`${styles.storyImage} ${styles.storyImage1}`}>
                <div className={styles.imagePlaceholder}>
                  <span>🏖️</span>
                  <small>Beach Days</small>
                </div>
              </div>
              <div className={`${styles.storyImage} ${styles.storyImage2}`}>
                <div className={styles.imagePlaceholder}>
                  <span>🍜</span>
                  <small>Family Dinners</small>
                </div>
              </div>
              <div className={`${styles.storyImage} ${styles.storyImage3}`}>
                <div className={styles.imagePlaceholder}>
                  <span>🌄</span>
                  <small>Sunrise Hikes</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Meet The Family ───────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>The People</span>
            <h2 className={styles.sectionTitle}>Meet The Family</h2>
            <p className={styles.sectionSubtitle}>
              Four people. Four personalities. One very full, very happy life.
            </p>
          </div>

          <div className={styles.members}>
            <FamilyMember
              name="Jin Jeon"
              role="Dad · Photographer · Weekend Chef"
              bio="Jin is the quiet engine behind the family adventures. By day he's a software engineer; by weekend he's the guy with the camera around his neck, hunting for the perfect light. He cooks Korean BBQ that would make his halmeoni proud and has an inexplicable ability to find the best coffee in any city on earth."
              interests={['Photography', 'Cooking', 'Coffee', 'Hiking']}
              funFact="He learned to surf at 35 and hasn't stopped talking about it since."
              imagePlaceholderEmoji="👨"
            />

            <FamilyMember
              name="Mirae Jeon"
              role="Mom · Educator · Community Builder"
              bio="Mirae brings warmth to every room she enters. A former teacher turned curriculum designer, she's the one who plans the itineraries, finds the hidden gem restaurants, and makes sure everyone has snacks for the road. She's the reason the Jeon household runs like a well-loved machine — gracefully, joyfully, and usually with music playing."
              interests={['Teaching', 'Travel Planning', 'Gardening', 'Yoga']}
              funFact="She's visited 24 countries and has a journal entry from every single one."
              imagePlaceholderEmoji="👩"
              reverse
            />

            <FamilyMember
              name="Sofia Jeon"
              role="Eldest · Artist · Animal Lover"
              age={11}
              bio="Sofia is eleven going on forty. She keeps a sketchbook wherever she goes, speaks three languages (working on a fourth), and has an encyclopedic knowledge of marine life that regularly embarrasses her teachers in the best way. She's fiercely protective of her little brother and equally fiercely independent."
              interests={['Drawing', 'Marine Biology', 'Languages', 'Reading']}
              funFact="She once convinced her entire class to do a beach cleanup by making it sound like a treasure hunt."
              imagePlaceholderEmoji="👧"
            />

            <FamilyMember
              name="Liam Jeon"
              role="Youngest · Explorer · Future Astronaut"
              age={7}
              bio="Liam is all energy, all the time. He's the first one up on hike days, the last one to stop asking questions, and the undisputed champion of family card games (a title he takes very seriously). He's decided he's going to be an astronaut, and nobody in this family has the heart — or the evidence — to argue with him."
              interests={['Space', 'LEGO', 'Soccer', 'Dinosaurs']}
              funFact="He built a working model of the solar system entirely from household items at age 6."
              imagePlaceholderEmoji="👦"
              reverse
            />
          </div>
        </div>
      </section>

      {/* ── Our Values ────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>What We Believe</span>
            <h2 className={styles.sectionTitle}>Our Values</h2>
            <p className={styles.sectionSubtitle}>
              The principles we come back to, no matter where the road takes us.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            {familyValues.map((value) => (
              <div key={value.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Our Journey</span>
            <h2 className={styles.sectionTitle}>Milestones Along the Way</h2>
            <p className={styles.sectionSubtitle}>
              From a first date in Seoul to adventures on three continents — here's how we got here.
            </p>
          </div>

          <Timeline milestones={timelineMilestones} />
        </div>
      </section>

      {/* ── Call to Action ────────────────────────────────────────────────── */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaDecor}>
            <span>🌄</span>
            <span>📸</span>
            <span>🗺️</span>
          </div>
          <h2 className={styles.ctaTitle}>See Our Journey in Photos</h2>
          <p className={styles.ctaText}>
            The stories are here — but the best memories live in the gallery. Browse through our adventures, one frame at a time.
          </p>
          <Link to="/gallery" className={styles.ctaButton}>
            Explore the Gallery
            <span className={styles.ctaArrow}>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
