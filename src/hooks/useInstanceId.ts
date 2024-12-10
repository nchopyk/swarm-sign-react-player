import { create } from 'zustand';

interface InstanceIdState {
  instanceId: number | null;
  setInstanceId: (id: number) => void;
}

export const useInstanceId = create<InstanceIdState>((set) => ({
  instanceId: null,
  setInstanceId: (id) => set({ instanceId: id }),
}));
