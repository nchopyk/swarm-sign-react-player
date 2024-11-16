import { create } from 'zustand';

interface ConnectionState {
  masterConnection: {
    isConnected: boolean;
    ip: string;
    port: number;
  };
  serverConnection: {
    isConnected: boolean;
    ip: string;
    port: number;
  };
  setMasterStatus: (status: boolean) => void;
  setServerStatus: (status: boolean) => void;
}

export const useConnection = create<ConnectionState>((set) => ({
  masterConnection: {
    isConnected: true,
    ip: '192.168.1.100',
    port: 8080,
  },
  serverConnection: {
    isConnected: false,
    ip: '10.0.0.50',
    port: 9000,
  },
  setMasterStatus: (status: boolean) =>
    set(state => ({
      masterConnection: {
        ...state.masterConnection,
        isConnected: status
      }
    })),
  setServerStatus: (status: boolean) =>
    set(state => ({
      serverConnection: {
        ...state.serverConnection,
        isConnected: status
      }
    })),
}));
