/**
 * familyStore.ts - Zustand store for family data
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { FamilyData, Parent, Child, FamilyValue, TimelineEvent } from '../api/mockData';

interface FamilyState {
  parents: Parent[];
  kids: Child[];
  values: FamilyValue[];
  timeline: TimelineEvent[];
  familyTagline: string;
  location: string;
  since: string;
  lastFetched: number | null;

  setFamilyData: (data: FamilyData) => void;
  setParents: (parents: Parent[]) => void;
  setKids: (kids: Child[]) => void;
  setValues: (values: FamilyValue[]) => void;
  setTimeline: (timeline: TimelineEvent[]) => void;

  getChildById: (id: string) => Child | undefined;
  getParentById: (id: string) => Parent | undefined;
  getTimelineByCategory: (category: TimelineEvent['category']) => TimelineEvent[];

  reset: () => void;
}

const initialState = {
  parents: [] as Parent[],
  kids: [] as Child[],
  values: [] as FamilyValue[],
  timeline: [] as TimelineEvent[],
  familyTagline: '',
  location: '',
  since: '',
  lastFetched: null as number | null,
};

export const useFamilyStore = create<FamilyState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setFamilyData: (data) =>
        set({
          parents: data.parents,
          kids: data.kids,
          values: data.values,
          timeline: data.timeline,
          familyTagline: data.familyTagline,
          location: data.location,
          since: data.since,
          lastFetched: Date.now(),
        }, false, 'setFamilyData'),

      setParents: (parents) => set({ parents }, false, 'setParents'),
      setKids: (kids) => set({ kids }, false, 'setKids'),
      setValues: (values) => set({ values }, false, 'setValues'),
      setTimeline: (timeline) => set({ timeline }, false, 'setTimeline'),

      getChildById: (id) => get().kids.find((k) => k.id === id),
      getParentById: (id) => get().parents.find((p) => p.id === id),
      getTimelineByCategory: (category) => get().timeline.filter((t) => t.category === category),

      reset: () => set(initialState, false, 'reset'),
    }),
    { name: 'FamilyStore' }
  )
);
