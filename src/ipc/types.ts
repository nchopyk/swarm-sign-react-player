export interface LoginSuccessData {
  token: string;
}

export interface LoginFailureData {
  error: string;
  message: string;
}

export interface AuthScreenData {
  code: string;
}

export interface PlayerStartData {
  schedule: PlaylistData | null;
}

export interface ConnectionData {
  type: 'master' | 'server';
  address: string;
  port: number;
}

export interface MasterDevice {
  id: string;
  address: string;
  port: number;
  connections: number;
}

export interface ConnectionMode {
  mode: 'proxy' | 'direct';
}

export interface IPCHandlers {
  onLoginSuccess: (callback: (data: LoginSuccessData) => void) => void;
  onLoginFail: (callback: (data: LoginFailureData) => void) => void;
  onShowAuthScreen: (callback: (data: AuthScreenData) => void) => void;
  onPlayerStart: (callback: (data: PlayerStartData) => void) => void;
  onConnectionEstablished: (callback: (data: ConnectionData) => void) => void;
  onConnectionModeUpdate: (callback: (data: ConnectionMode) => void) => void;
  onAvailableMastersUpdate: (callback: (masters: Record<string, MasterDevice>) => void) => void;
  onSelectedMasterUpdate: (callback: (master: MasterDevice) => void) => void;
  onResetData: (callback: () => void) => void;
}

declare global {
  interface Window {
    IPC: IPCHandlers;
  }
}

import type { PlaylistData } from '../types/media';
