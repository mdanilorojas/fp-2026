import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { VISITABLE_ROOMS_FOR_BUZON_UNLOCK, type RoomSlug } from '@/data/rooms';

export type KeyColor = 'rose' | 'amber' | 'leaf' | 'sky';
export const KEY_COLORS: KeyColor[] = ['rose', 'amber', 'leaf', 'sky'];

type HouseState = {
  visitedRooms: Set<string>;
  firstVisit: boolean;
  audioEnabled: boolean;
  savedCoupons: string[];
  hasOpenedLetter: boolean;
  kitchenKeyColor: KeyColor | null;
  kitchenKeyUsed: boolean;
};

type HouseActions = {
  visitRoom: (slug: RoomSlug) => void;
  toggleAudio: () => void;
  saveCoupon: (id: string) => void;
  markLetterOpened: () => void;
  setKitchenKey: (color: KeyColor) => void;
  consumeKitchenKey: () => void;
  reset: () => void;
};

const initialState: HouseState = {
  visitedRooms: new Set(),
  firstVisit: true,
  audioEnabled: true,
  savedCoupons: [],
  hasOpenedLetter: false,
  kitchenKeyColor: null,
  kitchenKeyUsed: false,
};

export const useHouseStore = create<HouseState & HouseActions>()(
  persist(
    (set) => ({
      ...initialState,
      visitRoom: (slug) =>
        set((s) => {
          if (s.visitedRooms.has(slug)) return s; // no-op — prevents re-render loops
          const next = new Set(s.visitedRooms);
          next.add(slug);
          const nonBuzon = [...next].filter((r) => r !== 'buzon');
          return {
            visitedRooms: next,
            firstVisit: nonBuzon.length < VISITABLE_ROOMS_FOR_BUZON_UNLOCK,
          };
        }),
      toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
      saveCoupon: (id) =>
        set((s) => ({
          savedCoupons: s.savedCoupons.includes(id) ? s.savedCoupons : [...s.savedCoupons, id],
        })),
      markLetterOpened: () => set({ hasOpenedLetter: true }),
      setKitchenKey: (color) =>
        set((s) => (s.kitchenKeyColor ? s : { kitchenKeyColor: color })),
      consumeKitchenKey: () => set({ kitchenKeyUsed: true }),
      reset: () => set(initialState),
    }),
    {
      name: 'flor-casa-v1',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? window.localStorage : undefined as any)),
      partialize: (state) => ({
        ...state,
        visitedRooms: Array.from(state.visitedRooms),
      }),
      merge: (persistedState, currentState) => {
        const p = persistedState as Partial<HouseState> & { visitedRooms?: string[] | Set<string> };
        return {
          ...currentState,
          ...p,
          visitedRooms:
            p?.visitedRooms instanceof Set
              ? p.visitedRooms
              : new Set(Array.isArray(p?.visitedRooms) ? p.visitedRooms : []),
        } as HouseState & HouseActions;
      },
    },
  ),
);
