/**
 * mockData.ts - Mock data layer for Meet the Jeons
 * Structured to match real API response shape for easy swap to real endpoints
 */

// ============================================================
// TYPES / INTERFACES
// ============================================================

export interface Image {
  id: string;
  url: string;
  thumbnail: string;
  caption: string;
  date: string; // ISO date string
  tags: string[];
  child?: 'sofia' | 'liam' | 'both';
  likes: number;
  comments: Comment[];
  width: number;
  height: number;
}

export interface Comment {
  id: string;
  imageId: string;
  author: string;
  text: string;
  date: string;
}

export interface Parent {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  birthplace: string;
  occupation: string;
  funFacts: string[];
}

export interface Child {
  id: string;
  name: string;
  nickname: string;
  birthdate: string;
  bio: string;
  avatar: string;
  personality: string[];
  hobbies: string[];
  milestones: Milestone[];
}

export interface Milestone {
  date: string;
  title: string;
  description: string;
}

export interface FamilyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: 'family' | 'travel' | 'milestone' | 'celebration';
}

export interface FamilyData {
  parents: Parent[];
  kids: Child[];
  values: FamilyValue[];
  timeline: TimelineEvent[];
  familyTagline: string;
  location: string;
  since: string;
}

// API Response wrappers
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// ============================================================
// PICSUM PHOTO HELPERS (free, no API key needed)
// ============================================================
const picsum = (seed: string | number, w = 800, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const picsumThumb = (seed: string | number) =>
  `https://picsum.photos/seed/${seed}/400/300`;

// ============================================================
// CURRENT IMAGES (12–15 family moment photos)
// ============================================================

export const CURRENT_IMAGES: Image[] = [
  {
    id: 'cur-001',
    url: picsum('jeon-family-1'),
    thumbnail: picsumThumb('jeon-family-1'),
    caption: 'Sunday morning pancakes – the Jeon family tradition 🥞',
    date: '2025-03-10',
    tags: ['food', 'home', 'sunday'],
    likes: 42,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'cur-002',
    url: picsum('jeon-park-spring'),
    thumbnail: picsumThumb('jeon-park-spring'),
    caption: 'Cherry blossoms at Riverside Park 🌸',
    date: '2025-03-15',
    tags: ['outdoors', 'spring', 'park'],
    likes: 67,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'cur-003',
    url: picsum('jeon-beach-2025'),
    thumbnail: picsumThumb('jeon-beach-2025'),
    caption: 'Spring break at the beach! ☀️',
    date: '2025-03-18',
    tags: ['beach', 'vacation', 'travel'],
    likes: 93,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'cur-004',
    url: picsum('jeon-library'),
    thumbnail: picsumThumb('jeon-library'),
    caption: 'Saturday reading hour at the community library 📚',
    date: '2025-03-08',
    tags: ['books', 'learning', 'saturday'],
    likes: 28,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'cur-005',
    url: picsum('jeon-garden-spring'),
    thumbnail: picsumThumb('jeon-garden-spring'),
    caption: 'Planting our spring garden together 🌱',
    date: '2025-03-20',
    tags: ['garden', 'spring', 'home'],
    likes: 55,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'cur-006',
    url: picsum('jeon-cooking'),
    thumbnail: picsumThumb('jeon-cooking'),
    caption: 'Learning Mom\'s tteokbokki recipe tonight! 🌶️',
    date: '2025-03-12',
    tags: ['food', 'korean', 'cooking'],
    likes: 81,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'cur-007',
    url: picsum('jeon-bike-ride'),
    thumbnail: picsumThumb('jeon-bike-ride'),
    caption: 'Family bike ride on the trail 🚴',
    date: '2025-03-14',
    tags: ['outdoors', 'exercise', 'weekend'],
    likes: 37,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'cur-008',
    url: picsum('jeon-movie-night'),
    thumbnail: picsumThumb('jeon-movie-night'),
    caption: 'Friday movie night with popcorn 🎬🍿',
    date: '2025-03-07',
    tags: ['home', 'movies', 'friday'],
    likes: 49,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'cur-009',
    url: picsum('jeon-dog-walk'),
    thumbnail: picsumThumb('jeon-dog-walk'),
    caption: 'Morning walk with Bomi the golden retriever 🐕',
    date: '2025-03-09',
    tags: ['pet', 'outdoors', 'morning'],
    likes: 112,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'cur-010',
    url: picsum('jeon-art-project'),
    thumbnail: picsumThumb('jeon-art-project'),
    caption: 'Weekend art project – mixed media collage 🎨',
    date: '2025-03-16',
    tags: ['art', 'craft', 'weekend'],
    likes: 60,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'cur-011',
    url: picsum('jeon-dinner-out'),
    thumbnail: picsumThumb('jeon-dinner-out'),
    caption: 'Date night + kids at our favourite Korean BBQ 🥩',
    date: '2025-03-13',
    tags: ['food', 'restaurant', 'korean'],
    likes: 74,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'cur-012',
    url: picsum('jeon-sunset-deck'),
    thumbnail: picsumThumb('jeon-sunset-deck'),
    caption: 'Golden hour on the back deck 🌅',
    date: '2025-03-19',
    tags: ['home', 'sunset', 'outdoor'],
    likes: 88,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'cur-013',
    url: picsum('jeon-farmers-market'),
    thumbnail: picsumThumb('jeon-farmers-market'),
    caption: 'Saturday farmers market haul 🥦🍓',
    date: '2025-03-22',
    tags: ['food', 'market', 'saturday'],
    likes: 33,
    comments: [],
    width: 800,
    height: 600,
  },
];

// ============================================================
// GROWTH IMAGES (20–30 photos of Sofia & Liam, dated)
// ============================================================

export const GROWTH_IMAGES: Image[] = [
  // Sofia — early years
  {
    id: 'grow-001',
    url: picsum('sofia-newborn'),
    thumbnail: picsumThumb('sofia-newborn'),
    caption: "Sofia's first day home 💕",
    date: '2018-06-02',
    tags: ['newborn', 'home', 'milestone'],
    child: 'sofia',
    likes: 204,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-002',
    url: picsum('sofia-3months'),
    thumbnail: picsumThumb('sofia-3months'),
    caption: 'Sofia at 3 months – first real smile 😊',
    date: '2018-09-02',
    tags: ['baby', 'smile', 'milestone'],
    child: 'sofia',
    likes: 178,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-003',
    url: picsum('sofia-1stbday'),
    thumbnail: picsumThumb('sofia-1stbday'),
    caption: 'Sofia\'s 1st Birthday 🎂',
    date: '2019-06-02',
    tags: ['birthday', 'milestone', 'cake'],
    child: 'sofia',
    likes: 253,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-004',
    url: picsum('sofia-walking'),
    thumbnail: picsumThumb('sofia-walking'),
    caption: 'First steps! Sofia is walking! 👶',
    date: '2019-08-14',
    tags: ['milestone', 'walking', 'toddler'],
    child: 'sofia',
    likes: 310,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-005',
    url: picsum('sofia-2yrs'),
    thumbnail: picsumThumb('sofia-2yrs'),
    caption: 'Terrific twos! Sofia turns 2 🌟',
    date: '2020-06-02',
    tags: ['birthday', 'toddler', 'milestone'],
    child: 'sofia',
    likes: 189,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-006',
    url: picsum('sofia-preschool'),
    thumbnail: picsumThumb('sofia-preschool'),
    caption: 'First day of preschool! 🎒',
    date: '2021-09-07',
    tags: ['school', 'milestone', 'preschool'],
    child: 'sofia',
    likes: 221,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-007',
    url: picsum('sofia-4thbday'),
    thumbnail: picsumThumb('sofia-4thbday'),
    caption: 'Sofia turns 4 – princess party 👑',
    date: '2022-06-02',
    tags: ['birthday', 'party', 'milestone'],
    child: 'sofia',
    likes: 267,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-008',
    url: picsum('sofia-dance-recital'),
    thumbnail: picsumThumb('sofia-dance-recital'),
    caption: 'Sofia\'s first dance recital 💃',
    date: '2022-12-10',
    tags: ['dance', 'performance', 'milestone'],
    child: 'sofia',
    likes: 298,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-009',
    url: picsum('sofia-5yrs-kindergarten'),
    thumbnail: picsumThumb('sofia-5yrs-kindergarten'),
    caption: 'Kindergarten first day! Sofia is 5 🏫',
    date: '2023-09-05',
    tags: ['school', 'kindergarten', 'milestone'],
    child: 'sofia',
    likes: 312,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-010',
    url: picsum('sofia-6thbday'),
    thumbnail: picsumThumb('sofia-6thbday'),
    caption: 'Happy 6th Birthday Sofia! 🎉',
    date: '2024-06-02',
    tags: ['birthday', 'milestone'],
    child: 'sofia',
    likes: 340,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-011',
    url: picsum('sofia-reading-2024'),
    thumbnail: picsumThumb('sofia-reading-2024'),
    caption: 'Sofia read her first chapter book! 📖',
    date: '2024-10-20',
    tags: ['reading', 'milestone', 'school'],
    child: 'sofia',
    likes: 215,
    comments: [],
    width: 800,
    height: 600,
  },
  // Liam — early years
  {
    id: 'grow-012',
    url: picsum('liam-newborn'),
    thumbnail: picsumThumb('liam-newborn'),
    caption: 'Welcome to the world, Liam! 💙',
    date: '2020-11-18',
    tags: ['newborn', 'home', 'milestone'],
    child: 'liam',
    likes: 287,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-013',
    url: picsum('liam-3months'),
    thumbnail: picsumThumb('liam-3months'),
    caption: 'Liam at 3 months – chubby cheeks edition 😍',
    date: '2021-02-18',
    tags: ['baby', 'cute', 'milestone'],
    child: 'liam',
    likes: 196,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-014',
    url: picsum('liam-1stbday'),
    thumbnail: picsumThumb('liam-1stbday'),
    caption: 'Liam\'s 1st Birthday – cake smash! 🎂',
    date: '2021-11-18',
    tags: ['birthday', 'milestone', 'cake'],
    child: 'liam',
    likes: 334,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-015',
    url: picsum('siblings-first-meet'),
    thumbnail: picsumThumb('siblings-first-meet'),
    caption: 'Sofia meets baby Liam for the first time 🥹',
    date: '2020-11-19',
    tags: ['siblings', 'milestone', 'sweet'],
    child: 'both',
    likes: 445,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-016',
    url: picsum('liam-walking-2022'),
    thumbnail: picsumThumb('liam-walking-2022'),
    caption: 'Liam takes his first steps – Sofia cheering him on! 👏',
    date: '2022-02-03',
    tags: ['milestone', 'walking', 'siblings'],
    child: 'liam',
    likes: 372,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-017',
    url: picsum('liam-2ndbirthday'),
    thumbnail: picsumThumb('liam-2ndbirthday'),
    caption: 'Liam is 2! Dinosaur birthday party 🦕',
    date: '2022-11-18',
    tags: ['birthday', 'toddler', 'milestone'],
    child: 'liam',
    likes: 248,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-018',
    url: picsum('sibs-swimming'),
    thumbnail: picsumThumb('sibs-swimming'),
    caption: 'First swimming lessons together 🏊',
    date: '2023-07-12',
    tags: ['swimming', 'summer', 'siblings'],
    child: 'both',
    likes: 289,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-019',
    url: picsum('liam-preschool-2023'),
    thumbnail: picsumThumb('liam-preschool-2023'),
    caption: 'Liam\'s first day of preschool 🎒',
    date: '2023-09-05',
    tags: ['school', 'milestone', 'preschool'],
    child: 'liam',
    likes: 263,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-020',
    url: picsum('sibs-halloween-2023'),
    thumbnail: picsumThumb('sibs-halloween-2023'),
    caption: 'Halloween 2023 – Sofia the witch and Liam the dino 🎃',
    date: '2023-10-31',
    tags: ['halloween', 'costumes', 'siblings'],
    child: 'both',
    likes: 401,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-021',
    url: picsum('liam-3rdbday'),
    thumbnail: picsumThumb('liam-3rdbday'),
    caption: 'Liam turns 3 – officially a little boy now! 🚂',
    date: '2023-11-18',
    tags: ['birthday', 'milestone'],
    child: 'liam',
    likes: 290,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-022',
    url: picsum('sibs-christmas-2023'),
    thumbnail: picsumThumb('sibs-christmas-2023'),
    caption: 'Christmas morning 2023 🎄',
    date: '2023-12-25',
    tags: ['christmas', 'holiday', 'siblings'],
    child: 'both',
    likes: 487,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-023',
    url: picsum('sofia-7bday-2025'),
    thumbnail: picsumThumb('sofia-7bday-2025'),
    caption: 'Sofia turns 7! Science-themed party 🔬',
    date: '2025-06-02',
    tags: ['birthday', 'milestone', 'science'],
    child: 'sofia',
    likes: 358,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-024',
    url: picsum('liam-4bday-2024'),
    thumbnail: picsumThumb('liam-4bday-2024'),
    caption: 'Liam turns 4 – all things LEGO 🧱',
    date: '2024-11-18',
    tags: ['birthday', 'lego', 'milestone'],
    child: 'liam',
    likes: 275,
    comments: [],
    width: 800,
    height: 600,
  },
  {
    id: 'grow-025',
    url: picsum('sibs-snowday-2025'),
    thumbnail: picsumThumb('sibs-snowday-2025'),
    caption: 'First snowday of 2025 ❄️⛄',
    date: '2025-01-22',
    tags: ['snow', 'winter', 'siblings'],
    child: 'both',
    likes: 322,
    comments: [],
    width: 800,
    height: 600,
  },
];

// ============================================================
// FAMILY DATA
// ============================================================

export const FAMILY_DATA: FamilyData = {
  familyTagline: 'Rooted in love, growing together 🌱',
  location: 'San Diego, California',
  since: '2014',

  parents: [
    {
      id: 'parent-dad',
      name: 'James Jeon',
      role: 'Dad',
      bio: 'James grew up between Seoul and Los Angeles, which gave him a deep love of both cultures — and a killer recipe for kimchi fried rice. He works as a UX designer and spends his weekends either hiking with the kids or coaching their little-league soccer team.',
      avatar: picsum('james-jeon-avatar', 300, 300),
      birthplace: 'Seoul, South Korea',
      occupation: 'UX Designer',
      funFacts: [
        'Makes the best kimchi fried rice in San Diego (self-proclaimed)',
        'Completed a half-marathon in 2023',
        'Secretly great at Mario Kart',
        'Can name every dinosaur species Sofia asks about',
      ],
    },
    {
      id: 'parent-mom',
      name: 'Mia Jeon',
      role: 'Mom',
      bio: 'Mia is a pediatric nurse and the warm, organised heart of the family. Born in San Diego to a Vietnamese-American family, she brings incredible food, deep empathy, and a knack for turning any chaotic morning into a smooth school run. She\'s also a passionate gardener.',
      avatar: picsum('mia-jeon-avatar', 300, 300),
      birthplace: 'San Diego, California',
      occupation: 'Pediatric Nurse',
      funFacts: [
        'Can grow any plant from a cutting',
        'Fluent in English, Vietnamese, and conversational Korean',
        'Coffee snob (in the best way) ☕',
        'Collects vintage children\'s books',
      ],
    },
  ],

  kids: [
    {
      id: 'kid-sofia',
      name: 'Sofia Jeon',
      nickname: 'Sof',
      birthdate: '2018-06-02',
      bio: 'Sofia is 6 (almost 7!) going on 27. She is endlessly curious, loves science experiments, books about space, and performing dance routines for anyone who will watch.',
      avatar: picsum('sofia-avatar', 300, 300),
      personality: ['curious', 'dramatic', 'sweet', 'leader'],
      hobbies: ['dancing', 'reading', 'science kits', 'drawing'],
      milestones: [
        { date: '2018-06-02', title: 'Born! 🌸', description: '7 lbs 4 oz — already with strong opinions.' },
        { date: '2019-08-14', title: 'First Steps', description: 'Walked straight across the living room like she owned it.' },
        { date: '2021-09-07', title: 'Preschool Starts', description: 'Made three best friends on day one.' },
        { date: '2022-12-10', title: 'First Dance Recital', description: 'Performed a full routine and took three bows.' },
        { date: '2023-09-05', title: 'Kindergarten!', description: 'Excited, prepared, and already helping classmates with the alphabet.' },
        { date: '2024-10-20', title: 'Chapter Book Reader', description: 'Finished her first chapter book — Magic Tree House.' },
      ],
    },
    {
      id: 'kid-liam',
      name: 'Liam Jeon',
      nickname: 'Li-Li',
      birthdate: '2020-11-18',
      bio: 'Liam is 4 and has the energy of a golden retriever. He is obsessed with dinosaurs, LEGO, and following Sofia everywhere. His laugh is absolutely contagious.',
      avatar: picsum('liam-avatar', 300, 300),
      personality: ['energetic', 'silly', 'loving', 'adventurous'],
      hobbies: ['LEGO', 'dinosaurs', 'running', 'pretend play'],
      milestones: [
        { date: '2020-11-18', title: 'Born! 💙', description: '8 lbs 1 oz — immediately charming everyone.' },
        { date: '2021-02-03', title: 'First Smile', description: 'Smiled at Dad and everything changed.' },
        { date: '2022-02-03', title: 'First Steps', description: 'Sofia cheered the whole time. He kept stopping to clap for himself.' },
        { date: '2023-09-05', title: 'Preschool Starts', description: 'Cried for exactly one minute, then ran to play with trucks.' },
        { date: '2024-11-18', title: '4th Birthday', description: 'Full LEGO party. Built a 200-piece set on his birthday.' },
      ],
    },
  ],

  values: [
    {
      id: 'val-1',
      title: 'Curiosity First',
      description: 'Every question deserves an honest answer, and every discovery deserves a celebration. We say "let\'s find out together" a lot.',
      icon: '🔍',
    },
    {
      id: 'val-2',
      title: 'Roots & Wings',
      description: 'We honour where we come from — Korea, Vietnam, California — and give our kids wings to become whoever they\'re meant to be.',
      icon: '🌍',
    },
    {
      id: 'val-3',
      title: 'Dinner Together',
      description: 'No phones, no rushing. The dinner table is our daily reset — the place where we reconnect, share, and laugh.',
      icon: '🍽️',
    },
    {
      id: 'val-4',
      title: 'Kind Before Cool',
      description: 'We consistently teach that being kind matters more than being impressive. Empathy is the skill we practice most.',
      icon: '💛',
    },
    {
      id: 'val-5',
      title: 'Adventure is Close',
      description: 'You don\'t need a plane ticket to have an adventure. A new trail, a new recipe, a new book — we find wonder in the everyday.',
      icon: '🏕️',
    },
  ],

  timeline: [
    {
      id: 'tl-01',
      date: '2014-08-22',
      title: 'James & Mia Get Married 💍',
      description: 'A garden wedding in Balboa Park with 80 guests and Mia\'s aunt\'s legendary bun bò Huế.',
      category: 'milestone',
    },
    {
      id: 'tl-02',
      date: '2016-05-10',
      title: 'We Bought Our House 🏠',
      description: 'A 3-bedroom craftsman in Normal Heights. Took 14 months of searching. Absolutely worth it.',
      category: 'milestone',
    },
    {
      id: 'tl-03',
      date: '2018-06-02',
      title: 'Sofia Arrives! 🌸',
      description: 'Our first baby, our first love. 7 lbs 4 oz of pure wonder.',
      category: 'milestone',
      imageUrl: picsum('sofia-newborn'),
    },
    {
      id: 'tl-04',
      date: '2019-07-20',
      title: 'Family Trip to Korea 🇰🇷',
      description: 'Sofia met her Korean grandparents for the first time. James cried. Mia photographed everything.',
      category: 'travel',
    },
    {
      id: 'tl-05',
      date: '2020-03-15',
      title: 'Pandemic Home Life Begins',
      description: 'We turned our home into a school, a gym, a garden project, and a very serious puzzle-completion lab.',
      category: 'family',
    },
    {
      id: 'tl-06',
      date: '2020-11-18',
      title: 'Liam Arrives! 💙',
      description: 'Our second miracle. 8 lbs 1 oz and he immediately had us wrapped around his tiny finger.',
      category: 'milestone',
      imageUrl: picsum('liam-newborn'),
    },
    {
      id: 'tl-07',
      date: '2021-09-07',
      title: 'Sofia Starts Preschool 🎒',
      description: 'She walked in like she\'d been going for years. Mia cried in the parking lot.',
      category: 'milestone',
    },
    {
      id: 'tl-08',
      date: '2022-06-15',
      title: 'Camping in Yosemite ⛺',
      description: 'First family camping trip. Sofia loved it; Liam was confused by the absence of his LEGO.',
      category: 'travel',
    },
    {
      id: 'tl-09',
      date: '2023-09-05',
      title: 'Both Kids in School! 🏫',
      description: 'Sofia to kindergarten, Liam to preschool — same drop-off, same parking spot, whole new era.',
      category: 'milestone',
    },
    {
      id: 'tl-10',
      date: '2024-07-04',
      title: 'Hawaii Family Vacation 🌺',
      description: 'Seven days on Maui. Best vacation yet. Liam\'s snorkelling face will live in our hearts forever.',
      category: 'travel',
    },
    {
      id: 'tl-11',
      date: '2024-12-25',
      title: 'Best Christmas Ever (They All Are) 🎄',
      description: 'Sofia got a telescope. Liam got the LEGO Millennium Falcon. The house has not been the same since.',
      category: 'celebration',
    },
    {
      id: 'tl-12',
      date: '2025-01-01',
      title: '2025 — Year of New Adventures 🎉',
      description: 'James and Mia\'s 11th year together. Sofia almost 7. Liam almost 5. We can\'t wait to see what comes next.',
      category: 'celebration',
    },
  ],
};

// ============================================================
// MOCK API FUNCTIONS (easy-swap layer)
// ============================================================

const SIMULATED_DELAY = 400; // ms — realistic feel

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchCurrentImages(
  page = 1,
  pageSize = 6
): Promise<PaginatedResponse<Image>> {
  await delay(SIMULATED_DELAY);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: CURRENT_IMAGES.slice(start, end),
    page,
    pageSize,
    total: CURRENT_IMAGES.length,
    totalPages: Math.ceil(CURRENT_IMAGES.length / pageSize),
  };
}

export async function fetchGrowthImages(filters?: {
  child?: 'sofia' | 'liam' | 'both';
  dateRange?: { from: string; to: string };
  tags?: string[];
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResponse<Image>> {
  await delay(SIMULATED_DELAY);
  let results = [...GROWTH_IMAGES];

  if (filters?.child) {
    results = results.filter(
      img => img.child === filters.child || img.child === 'both'
    );
  }
  if (filters?.dateRange) {
    const from = new Date(filters.dateRange.from).getTime();
    const to = new Date(filters.dateRange.to).getTime();
    results = results.filter(img => {
      const d = new Date(img.date).getTime();
      return d >= from && d <= to;
    });
  }
  if (filters?.tags?.length) {
    results = results.filter(img =>
      filters.tags!.some(tag => img.tags.includes(tag))
    );
  }

  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 8;
  const start = (page - 1) * pageSize;
  return {
    data: results.slice(start, start + pageSize),
    page,
    pageSize,
    total: results.length,
    totalPages: Math.ceil(results.length / pageSize),
  };
}

export async function fetchFamilyData(): Promise<ApiResponse<FamilyData>> {
  await delay(SIMULATED_DELAY);
  return { data: FAMILY_DATA, success: true };
}

export async function toggleLike(
  imageId: string,
  currentLikes: number,
  liked: boolean
): Promise<ApiResponse<{ imageId: string; likes: number; liked: boolean }>> {
  await delay(200);
  return {
    data: {
      imageId,
      likes: liked ? currentLikes - 1 : currentLikes + 1,
      liked: !liked,
    },
    success: true,
  };
}

export async function addComment(
  imageId: string,
  text: string
): Promise<ApiResponse<Comment>> {
  await delay(300);
  const comment: Comment = {
    id: `comment-${Date.now()}`,
    imageId,
    author: 'Guest',
    text,
    date: new Date().toISOString(),
  };
  return { data: comment, success: true };
}
