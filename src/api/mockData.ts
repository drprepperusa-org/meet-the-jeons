// =============================================================================
// mockData.ts — API types and mock data for Meet The Jeons
// =============================================================================

export interface Image {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  tags: string[];
  child?: 'kid1' | 'kid2' | 'family';
  year?: number;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  imageId: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Parent {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  bio: string;
  photo: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
  type: 'milestone' | 'memory' | 'adventure';
}

// Mock image data
const UNSPLASH_FAMILY = [
  'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=800&q=80',
  'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=800&q=80',
  'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
  'https://images.unsplash.com/photo-1543342384-1f1350e27861?w=800&q=80',
  'https://images.unsplash.com/photo-1602629786997-3b24f5d11ffd?w=800&q=80',
  'https://images.unsplash.com/photo-1537365587684-f490102e1225?w=800&q=80',
];

const mockImages: Image[] = UNSPLASH_FAMILY.map((src, i) => ({
  id: `img-${i + 1}`,
  src,
  alt: `Family moment ${i + 1}`,
  caption: `A warm family memory`,
  tags: ['family', 'love', 'memories'],
  child: i % 3 === 0 ? 'kid1' : i % 3 === 1 ? 'kid2' : 'family',
  year: 2024,
  likes: Math.floor(Math.random() * 50),
  comments: [],
  createdAt: new Date(2024, i % 12, (i * 5) + 1).toISOString(),
}));

const likeData: Record<string, { count: number; liked: boolean }> = {};

export const fetchCurrentImages = async (page = 1, pageSize = 12) => {
  await new Promise((r) => setTimeout(r, 200));
  const start = (page - 1) * pageSize;
  const data = mockImages.slice(start, start + pageSize);
  return { data, total: mockImages.length };
};

export const fetchGrowthImages = async (filters?: any) => {
  await new Promise((r) => setTimeout(r, 200));
  let data = [...mockImages];
  if (filters?.child && filters.child !== 'all') {
    data = data.filter((img) => img.child === filters.child);
  }
  return { data, total: data.length };
};

export const toggleLike = async (imageId: string, currentCount: number, currentLiked: boolean) => {
  await new Promise((r) => setTimeout(r, 100));
  const newLiked = !currentLiked;
  const newCount = newLiked ? currentCount + 1 : Math.max(0, currentCount - 1);
  likeData[imageId] = { count: newCount, liked: newLiked };
  return { imageId, count: newCount, liked: newLiked };
};

export const getImages = async () => ({ data: mockImages, total: mockImages.length });

export const likeImage = async (id: string) => {
  const current = likeData[id] ?? { count: 0, liked: false };
  return toggleLike(id, current.count, current.liked);
};

export const addComment = async (imageId: string, text: string): Promise<Comment> => {
  await new Promise((r) => setTimeout(r, 150));
  return {
    id: `comment-${Date.now()}`,
    imageId,
    author: 'Guest',
    text,
    createdAt: new Date().toISOString(),
  };
};
