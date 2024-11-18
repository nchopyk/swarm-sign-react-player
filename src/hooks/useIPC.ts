import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPC } from '../ipc';
import { useAuth } from './useAuth';
import { useConnection } from './useConnection';
import type { 
  LoginFailureData, 
  AuthScreenData, 
  PlayerStartData,
  ConnectionData,
  ConnectionMode,
  MasterDevice
} from '../ipc/types';

export function useIPC() {
  const { login, logout } = useAuth();
  const { 
    updateConnection, 
    setConnectionMode, 
    setAvailableMasters, 
    setSelectedMaster 
  } = useConnection();
  const navigate = useNavigate();
  const isRegistered = useRef(false);

  const loginSuccessHandler = useCallback(() => {
    console.log('[IPC] Login success');
    login();
    navigate('/player');
  }, [login, navigate]);

  const loginFailHandler = useCallback((data: LoginFailureData) => {
    console.log('[IPC] Login fail:', data.error);
    logout();
    navigate('/login');
  }, [logout, navigate]);

  const showAuthHandler = useCallback((data: AuthScreenData) => {
    console.log('[IPC] Show auth screen with code:', data.code);
    navigate('/login', { state: { code: data.code } });
  }, [navigate]);

  const playerStartHandler = useCallback((data: PlayerStartData) => {
    console.log('[IPC] Player start with schedule:', data.schedule ? 'provided' : 'null');
    navigate('/player', { 
      state: { 
        schedule: data.schedule 
      }
    });
  }, [navigate]);

  const connectionHandler = useCallback((data: ConnectionData) => {
    console.log(`[IPC] ${data.type} connection established:`, data);
    updateConnection(data);
  }, [updateConnection]);

  const connectionModeHandler = useCallback((data: ConnectionMode) => {
    console.log('[IPC] Connection mode updated:', data.mode);
    setConnectionMode(data);
  }, [setConnectionMode]);

  const availableMastersHandler = useCallback((masters: Record<string, MasterDevice>) => {
    console.log('[IPC] Available masters updated:', masters);
    setAvailableMasters(masters);
  }, [setAvailableMasters]);

  const selectedMasterHandler = useCallback((master: MasterDevice) => {
    console.log('[IPC] Selected master updated:', master);
    setSelectedMaster(master);
  }, [setSelectedMaster]);

  useEffect(() => {
    if (!isRegistered.current) {
      const ipc = window.IPC || IPC;
      ipc.onLoginSuccess(loginSuccessHandler);
      ipc.onLoginFail(loginFailHandler);
      ipc.onShowAuthScreen(showAuthHandler);
      ipc.onPlayerStart(playerStartHandler);
      ipc.onConnectionEstablished(connectionHandler);
      ipc.onConnectionModeUpdate(connectionModeHandler);
      ipc.onAvailableMastersUpdate(availableMastersHandler);
      ipc.onSelectedMasterUpdate(selectedMasterHandler);
      isRegistered.current = true;
    }
  }, [
    loginSuccessHandler, 
    loginFailHandler, 
    showAuthHandler, 
    playerStartHandler,
    connectionHandler,
    connectionModeHandler,
    availableMastersHandler,
    selectedMasterHandler
  ]);
}