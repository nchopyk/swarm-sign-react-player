import { create } from 'zustand';
import type { ConnectionData, ConnectionMode, MasterDevice } from '../ipc/types';

interface ConnectionInfo {
  isConnected: boolean;
  ip: string;
  port: number;
  lastError?: string;
}

interface ConnectionState {
  connectionMode: 'proxy' | 'direct';
  masterConnection: ConnectionInfo;
  serverConnection: ConnectionInfo;
  availableMasters: Record<string, MasterDevice>;
  selectedMaster: MasterDevice | null;
  updateConnection: (data: ConnectionData) => void;
  closeConnection: (type: 'master' | 'server', reason: string) => void;
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
              lastError: undefined,
            },
          }
          : {
            serverConnection: {
              isConnected: true,
              ip: data.address,
              port: data.port,
              lastError: undefined,
            },
          }
      ),
    })),
  closeConnection: (type, reason) =>
    set((state) => ({
      ...(type === 'master'
          ? {
            masterConnection: {
              ...state.masterConnection,
              isConnected: false,
              lastError: reason,
            },
          }
          : {
            serverConnection: {
              ...state.serverConnection,
              isConnected: false,
              lastError: reason,
            },
          }
      ),
    })),
  setConnectionMode: (data) => set({ connectionMode: data.mode }),
  setAvailableMasters: (masters) => set({ availableMasters: masters }),
  setSelectedMaster: (master) => set({ selectedMaster: master }),
}));
