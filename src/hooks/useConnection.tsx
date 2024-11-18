import { create } from 'zustand';
import type { ConnectionData, ConnectionMode, MasterDevice } from '../ipc/types';

interface ConnectionInfo {
  isConnected: boolean;
  ip: string;
  port: number;
}

interface ConnectionState {
  connectionMode: 'proxy' | 'direct';
  masterConnection: ConnectionInfo;
  serverConnection: ConnectionInfo;
  availableMasters: Record<string, MasterDevice>;
  selectedMaster: MasterDevice | null;
  updateConnection: (data: ConnectionData) => void;
  setConnectionMode: (data: ConnectionMode) => void;
  setAvailableMasters: (masters: Record<string, MasterDevice>) => void;
  setSelectedMaster: (master: MasterDevice) => void;
}

export const useConnection = create<ConnectionState>((set) => ({
  connectionMode: 'proxy',
  masterConnection: {
    isConnected: false,
    ip: '',
    port: 0,
  },
  serverConnection: {
    isConnected: false,
    ip: '',
    port: 0,
  },
  availableMasters: {},
  selectedMaster: null,
  updateConnection: (data) => 
    set((state) => ({
      ...(data.type === 'master' 
        ? {
            masterConnection: {
              isConnected: true,
              ip: data.address,
              port: data.port,
            },
          }
        : {
            serverConnection: {
              isConnected: true,
              ip: data.address,
              port: data.port,
            },
          }
      ),
    })),
  setConnectionMode: (data) => set({ connectionMode: data.mode }),
  setAvailableMasters: (masters) => set({ availableMasters: masters }),
  setSelectedMaster: (master) => set({ selectedMaster: master }),
}));