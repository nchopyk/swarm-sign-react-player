import { create } from 'zustand';
import type { MasterRatingData } from '../types/master';

interface MasterRatingState {
  rating: MasterRatingData | null;
  setRating: (rating: MasterRatingData) => void;
}

export const useMasterRating = create<MasterRatingState>((set) => ({
  rating: null,
  setRating: (rating) => set({ rating }),
}));
