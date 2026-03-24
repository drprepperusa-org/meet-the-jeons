import { create } from 'zustand';
import type { Photo, Comment, FamilyMember } from '../types';

// ── Mock Data ────────────────────────────────────────────────
const MOCK_MEMBERS: FamilyMember[] = [
  {
    id: 'jeon-dad',
    name: 'Jeon Seokjin',
    role: 'Dad',
    age: 48,
    bio: 'The heart of the family. Loves cooking, terrible dad jokes, and early morning hikes. Has a laugh that fills the whole house.',
    interests: ['Cooking', 'Hiking', 'Chess', 'Gardening'],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    favoriteQuote: '"The family that eats together, stays together."',
  },
  {
    id: 'jeon-mom',
    name: 'Jeon Minji',
    role: 'Mom',
    age: 46,
    bio: 'A storyteller at heart. Works as a librarian and fills our home with books, music, and the best kimchi in the neighborhood.',
    interests: ['Reading', 'Piano', 'Pottery', 'Photography'],
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=400&fit=crop',
    favoriteQuote: '"Every book is a new world to explore."',
  },
  {
    id: 'jeon-eldest',
    name: 'Jeon Taehyung',
    role: 'Eldest Son',
    age: 24,
    bio: 'Architecture student by day, midnight snacker by night. Dreams of designing a home big enough for everyone.',
    interests: ['Architecture', 'Skateboarding', 'Film Photography', 'Coffee'],
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    favoriteQuote: '"Design is not just what it looks like. It\'s how it works."',
  },
  {
    id: 'jeon-middle',
    name: 'Jeon Yuna',
    role: 'Middle Child',
    age: 21,
    bio: 'Pre-med student and the family\'s unofficial therapist. Makes everyone feel seen and heard.',
    interests: ['Medicine', 'Dance', 'Cooking', 'Journaling'],
    imageUrl: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop',
    favoriteQuote: '"Healing starts with listening."',
  },
  {
    id: 'jeon-youngest',
    name: 'Jeon Minjun',
    role: 'Youngest',
    age: 16,
    bio: 'The family tech wizard. Can fix any device, breaks every curfew, and has a heart of gold.',
    interests: ['Gaming', 'Coding', 'Basketball', 'Music Production'],
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    favoriteQuote: '"Life is a game. Play it well."',
  },
];

const MOCK_PHOTOS: Photo[] = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600&h=400&fit=crop',
    caption: 'Sunday morning pancakes — a Jeon family tradition 🥞',
    date: '2024-11-12',
    tags: ['food', 'tradition', 'sunday'],
    likes: 47,
    comments: [
      { id: 'c1', author: 'Grandma Jeon', text: 'My recipe! So proud 💛', timestamp: '2024-11-12T10:30:00Z' },
      { id: 'c2', author: 'Taehyung', text: 'I ate seven. No regrets.', timestamp: '2024-11-12T11:00:00Z' },
    ],
    memberId: 'jeon-dad',
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
    caption: 'Busan trip — the whole crew, salty air and all 🌊',
    date: '2024-08-20',
    tags: ['travel', 'summer', 'beach', 'busan'],
    likes: 89,
    comments: [
      { id: 'c3', author: 'Yuna', text: 'Best summer ever!! 🏖️', timestamp: '2024-08-21T09:00:00Z' },
    ],
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1484723091739-30990a14ac61?w=600&h=400&fit=crop',
    caption: 'Mom\'s famous kimchi jjigae. The smell alone is nostalgia.',
    date: '2024-10-05',
    tags: ['food', 'mom', 'recipe'],
    likes: 63,
    comments: [],
    memberId: 'jeon-mom',
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
    caption: 'Dad\'s birthday hike. He made us wake up at 5am for this view.',
    date: '2024-09-15',
    tags: ['hiking', 'birthday', 'dad', 'nature'],
    likes: 34,
    comments: [
      { id: 'c4', author: 'Minjun', text: '5am was CRIMINAL but ok worth it 😤', timestamp: '2024-09-15T14:00:00Z' },
    ],
    memberId: 'jeon-dad',
  },
  {
    id: 'photo-5',
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=400&fit=crop',
    caption: 'Taehyung\'s first architecture portfolio review 🏛️',
    date: '2024-12-01',
    tags: ['achievement', 'taehyung', 'milestone'],
    likes: 71,
    comments: [
      { id: 'c5', author: 'Mom', text: 'So so proud of you 🥲', timestamp: '2024-12-01T19:00:00Z' },
    ],
    memberId: 'jeon-eldest',
  },
  {
    id: 'photo-6',
    url: 'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=600&h=400&fit=crop',
    caption: 'Library night with Mom — the best Saturday ritual 📚',
    date: '2024-07-08',
    tags: ['books', 'mom', 'weekend'],
    likes: 52,
    comments: [],
    memberId: 'jeon-mom',
  },
];

// ── Store Types ───────────────────────────────────────────────
interface FamilyStore {
  members: FamilyMember[];
  photos: Photo[];
  likedPhotos: Set<string>;
  activeFilter: string | null;

  // Actions
  likePhoto: (photoId: string) => void;
  addComment: (photoId: string, comment: Omit<Comment, 'id'>) => void;
  setFilter: (filter: string | null) => void;
}

export const useFamilyStore = create<FamilyStore>((set, get) => ({
  members: MOCK_MEMBERS,
  photos: MOCK_PHOTOS,
  likedPhotos: new Set(),
  activeFilter: null,

  likePhoto: (photoId) => {
    const { likedPhotos, photos } = get();
    const alreadyLiked = likedPhotos.has(photoId);
    const newLiked = new Set(likedPhotos);

    if (alreadyLiked) {
      newLiked.delete(photoId);
    } else {
      newLiked.add(photoId);
    }

    set({
      likedPhotos: newLiked,
      photos: photos.map(p =>
        p.id === photoId
          ? { ...p, likes: alreadyLiked ? p.likes - 1 : p.likes + 1 }
          : p
      ),
    });
  },

  addComment: (photoId, comment) => {
    const { photos } = get();
    const newComment: Comment = {
      ...comment,
      id: `c-${Date.now()}`,
    };
    set({
      photos: photos.map(p =>
        p.id === photoId
          ? { ...p, comments: [...p.comments, newComment] }
          : p
      ),
    });
  },

  setFilter: (filter) => set({ activeFilter: filter }),
}));

export { MOCK_MEMBERS, MOCK_PHOTOS };
