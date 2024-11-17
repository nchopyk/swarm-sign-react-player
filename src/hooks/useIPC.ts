import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPC } from '../ipc';
import { useAuth } from './useAuth';
import { useConnection } from './useConnection';
import type { 
  LoginFailureData, 
  AuthScreenData, 
  PlayerStartData,
  ConnectionData 
} from '../ipc/types';

export function useIPC() {
  const { login, logout } = useAuth();
  const { updateConnection } = useConnection();
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
    console.log('[IPC] Player start:', data.schedule);
    if (data.schedule) {
      navigate('/player', { state: { schedule: data.schedule } });
    }
  }, [navigate]);

  const connectionHandler = useCallback((data: ConnectionData) => {
    console.log(`[IPC] ${data.type} connection established:`, data);
    updateConnection(data);
  }, [updateConnection]);

  useEffect(() => {
    if (!isRegistered.current) {
      const ipc = window.IPC || IPC;
      ipc.onLoginSuccess(loginSuccessHandler);
      ipc.onLoginFail(loginFailHandler);
      ipc.onShowAuthScreen(showAuthHandler);
      ipc.onPlayerStart(playerStartHandler);
      ipc.onConnectionEstablished(connectionHandler);
      isRegistered.current = true;
    }
  }, [
    loginSuccessHandler, 
    loginFailHandler, 
    showAuthHandler, 
    playerStartHandler,
    connectionHandler
  ]);
}