// Meet the Jeons — Shared Types

export interface FamilyMember {
  id: string;
  name: string;
  role: string;        // e.g. "Mom", "Dad", "Eldest Son"
  age: number;
  bio: string;
  interests: string[];
  imageUrl: string;
  favoriteQuote?: string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  date: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  memberId?: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  avatar?: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  month?: number;
  title: string;
  description: string;
  imageUrl?: string;
  membersInvolved?: string[];
  type: 'milestone' | 'memory' | 'achievement' | 'travel';
}

export interface GrowthEntry {
  id: string;
  memberId: string;
  year: number;
  height?: number;      // cm
  milestone: string;
  note: string;
}

export interface AboutSection {
  title: string;
  content: string;
  imageUrl?: string;
}
