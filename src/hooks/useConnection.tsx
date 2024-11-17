import { create } from 'zustand';
import type { ConnectionData } from '../ipc/types';

interface ConnectionInfo {
  isConnected: boolean;
  ip: string;
  port: number;
}

interface ConnectionState {
  masterConnection: ConnectionInfo;
  serverConnection: ConnectionInfo;
  updateConnection: (data: ConnectionData) => void;
}

export const useConnection = create<ConnectionState>((set) => ({
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
}));