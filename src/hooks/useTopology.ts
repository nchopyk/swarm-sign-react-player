import { create } from 'zustand';
import type { TopologyData } from '../types/topology';

interface TopologyState {
  topology: TopologyData | null;
  setTopology: (topology: TopologyData) => void;
}

export const useTopology = create<TopologyState>((set) => ({
  topology: null,
  setTopology: (topology) => set({ topology }),
}));
