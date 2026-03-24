export type GalleryTag =
  | 'birthday'
  | 'holiday'
  | 'milestone'
  | 'school'
  | 'sports'
  | 'travel'
  | 'everyday'
  | 'family';

export type Child = 'Sofia' | 'Liam' | 'Both';

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  date: string; // ISO date string
  description?: string;
  likes: number;
  tags: GalleryTag[];
  child?: Child; // Only for GrowthGallery
}

// Free Unsplash images — family/cozy moments
export const currentGalleryImages: GalleryImage[] = [
  {
    id: 'current-1',
    src: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=800&auto=format&fit=crop',
    title: 'Sunday Morning Pancakes',
    date: '2024-03-10',
    description: 'The whole family crowded into the kitchen for our favorite Sunday tradition.',
    likes: 24,
    tags: ['everyday', 'family'],
  },
  {
    id: 'current-2',
    src: 'https://images.unsplash.com/photo-1609220136736-443140cfeaa8?w=800&auto=format&fit=crop',
    title: 'Backyard Adventures',
    date: '2024-02-18',
    description: "Sofia found a caterpillar. Liam wanted to keep it. We did not keep it.",
    likes: 31,
    tags: ['everyday', 'family'],
  },
  {
    id: 'current-3',
    src: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&auto=format&fit=crop',
    title: 'Movie Night',
    date: '2024-03-01',
    description: 'Popcorn, blankets, and The Lion King for the hundredth time.',
    likes: 18,
    tags: ['everyday', 'family'],
  },
  {
    id: 'current-4',
    src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&auto=format&fit=crop',
    title: 'Birthday Cake Chaos',
    date: '2024-01-22',
    description: 'Liam turned 7. The frosting ended up everywhere except the plates.',
    likes: 47,
    tags: ['birthday', 'family'],
  },
  {
    id: 'current-5',
    src: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&auto=format&fit=crop',
    title: 'Park Walk',
    date: '2024-02-28',
    description: 'First warm day of the year. We walked until our feet gave out.',
    likes: 22,
    tags: ['everyday', 'travel'],
  },
  {
    id: 'current-6',
    src: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&auto=format&fit=crop',
    title: 'Bedtime Story',
    date: '2024-03-05',
    description: 'Three chapters became five became "just one more, please."',
    likes: 36,
    tags: ['everyday', 'milestone'],
  },
  {
    id: 'current-7',
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop',
    title: 'Holiday Decorating',
    date: '2023-12-05',
    description: 'The ornaments are crooked and perfect.',
    likes: 53,
    tags: ['holiday', 'family'],
  },
  {
    id: 'current-8',
    src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop',
    title: 'Game Night',
    date: '2024-03-15',
    description: 'Dad lost at Uno. Again. He insists it was rigged.',
    likes: 29,
    tags: ['everyday', 'family'],
  },
  {
    id: 'current-9',
    src: 'https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=800&auto=format&fit=crop',
    title: 'First Snow Day',
    date: '2024-01-15',
    description: 'School was cancelled. The kids cried happy tears.',
    likes: 41,
    tags: ['holiday', 'milestone'],
  },
];

// Growth gallery — Sofia and Liam photos over the years
export const growthGalleryImages: GalleryImage[] = [
  // Sofia - Early years
  {
    id: 'growth-sofia-1',
    src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop',
    title: "Sofia's First Steps",
    date: '2018-03-14',
    description: 'Ten months old. Twelve steps. Pure joy.',
    likes: 62,
    tags: ['milestone'],
    child: 'Sofia',
  },
  {
    id: 'growth-sofia-2',
    src: 'https://images.unsplash.com/photo-1468489273009-54c5ed6c64a4?w=800&auto=format&fit=crop',
    title: "Sofia's 3rd Birthday",
    date: '2020-06-08',
    description: 'Princess themed. She wore the crown for three days straight.',
    likes: 45,
    tags: ['birthday', 'milestone'],
    child: 'Sofia',
  },
  {
    id: 'growth-sofia-3',
    src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop',
    title: 'First Day of Kindergarten',
    date: '2021-09-07',
    description: 'She was ready. We were not.',
    likes: 78,
    tags: ['milestone', 'school'],
    child: 'Sofia',
  },
  {
    id: 'growth-sofia-4',
    src: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&auto=format&fit=crop',
    title: "Sofia's Dance Recital",
    date: '2022-05-20',
    description: 'Second grade ballet. She forgot one move and improvised the whole rest.',
    likes: 34,
    tags: ['milestone', 'sports'],
    child: 'Sofia',
  },
  {
    id: 'growth-sofia-5',
    src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&auto=format&fit=crop',
    title: "Sofia's 6th Birthday",
    date: '2023-06-08',
    description: 'Unicorn cake, unicorn balloons, unicorn everything.',
    likes: 51,
    tags: ['birthday'],
    child: 'Sofia',
  },
  {
    id: 'growth-sofia-6',
    src: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop',
    title: 'Sofia Learns to Ride',
    date: '2023-04-15',
    description: 'No training wheels. Scraped knee. Unstoppable smile.',
    likes: 67,
    tags: ['milestone'],
    child: 'Sofia',
  },

  // Liam - Early years
  {
    id: 'growth-liam-1',
    src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&auto=format&fit=crop',
    title: "Liam's Homecoming",
    date: '2017-05-22',
    description: 'Three days old. Already running the household.',
    likes: 89,
    tags: ['milestone'],
    child: 'Liam',
  },
  {
    id: 'growth-liam-2',
    src: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=800&auto=format&fit=crop',
    title: "Liam's First Soccer Game",
    date: '2021-09-18',
    description: 'Scored two goals. Ran the wrong way once. Still counts.',
    likes: 43,
    tags: ['sports', 'milestone'],
    child: 'Liam',
  },
  {
    id: 'growth-liam-3',
    src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop',
    title: "Liam's 5th Birthday",
    date: '2022-05-22',
    description: 'Dinosaur everything. Roared all day. We loved it.',
    likes: 38,
    tags: ['birthday'],
    child: 'Liam',
  },
  {
    id: 'growth-liam-4',
    src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop',
    title: 'First Grade Graduation',
    date: '2023-06-15',
    description: 'Tiny cap. Giant smile. Growing up too fast.',
    likes: 56,
    tags: ['milestone', 'school'],
    child: 'Liam',
  },
  {
    id: 'growth-liam-5',
    src: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=800&auto=format&fit=crop',
    title: "Liam's Halloween Costume",
    date: '2023-10-31',
    description: 'Spider-Man. Refused to take it off for a week.',
    likes: 72,
    tags: ['holiday'],
    child: 'Liam',
  },
  {
    id: 'growth-liam-6',
    src: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&auto=format&fit=crop',
    title: 'Liam Learns to Swim',
    date: '2024-07-10',
    description: 'Cannonball champion of the neighborhood pool.',
    likes: 44,
    tags: ['milestone', 'sports'],
    child: 'Liam',
  },

  // Both
  {
    id: 'growth-both-1',
    src: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&auto=format&fit=crop',
    title: 'Sibling Adventure',
    date: '2022-08-04',
    description: 'Building a fort that would put architects to shame.',
    likes: 91,
    tags: ['everyday', 'milestone'],
    child: 'Both',
  },
  {
    id: 'growth-both-2',
    src: 'https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=800&auto=format&fit=crop',
    title: 'First Snow Together',
    date: '2022-01-12',
    description: 'Sofia showed Liam how to make a snow angel. His version had eight arms.',
    likes: 84,
    tags: ['holiday', 'everyday'],
    child: 'Both',
  },
  {
    id: 'growth-both-3',
    src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop',
    title: 'Beach Day',
    date: '2023-07-20',
    description: 'Sandcastles, sunscreen fights, and frozen treats.',
    likes: 103,
    tags: ['travel', 'family'],
    child: 'Both',
  },
  {
    id: 'growth-both-4',
    src: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=800&auto=format&fit=crop',
    title: 'Christmas Morning 2023',
    date: '2023-12-25',
    description: '5am. Wide awake. The house looked like a tornado of wrapping paper.',
    likes: 117,
    tags: ['holiday', 'family'],
    child: 'Both',
  },
];

export const ALL_TAGS: GalleryTag[] = [
  'birthday',
  'holiday',
  'milestone',
  'school',
  'sports',
  'travel',
  'everyday',
  'family',
];
