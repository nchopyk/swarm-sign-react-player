import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPC } from '../ipc';
import { useAuth } from './useAuth';
import type { LoginFailureData, AuthScreenData, PlayerStartData } from '../ipc/types';

export function useIPC() {
  const { login, logout } = useAuth();
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

  useEffect(() => {
    if (!isRegistered.current) {
      const ipc = window.IPC || IPC;
      ipc.onLoginSuccess(loginSuccessHandler);
      ipc.onLoginFail(loginFailHandler);
      ipc.onShowAuthScreen(showAuthHandler);
      ipc.onPlayerStart(playerStartHandler);
      isRegistered.current = true;
    }
  }, [loginSuccessHandler, loginFailHandler, showAuthHandler, playerStartHandler]);
}
