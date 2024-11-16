import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPC } from '../ipc';
import { useAuth } from './useAuth';
import type { LoginFailureData, AuthScreenData, PlayerStartData } from '../ipc/types';

export function useIPC() {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loginSuccessHandler = () => {
      console.log('[IPC] Login success');
      login();
      navigate('/player');
    };

    const loginFailHandler = (data: LoginFailureData) => {
      console.log('[IPC] Login fail:', data.error);
      logout();
      navigate('/login');
    };

    const showAuthHandler = (data: AuthScreenData) => {
      console.log('[IPC] Show auth screen with code:', data.code);
      navigate('/login', { state: { code: data.code } });
    };

    const playerStartHandler = (data: PlayerStartData) => {
      console.log('[IPC] Player start:', data.schedule);
      if (data.schedule) {
        navigate('/player', { state: { schedule: data.schedule } });
      }
    };

    // Register handlers with window.IPC if available, otherwise use mock
    const ipc = window.IPC || IPC;
    ipc.onLoginSuccess(loginSuccessHandler);
    ipc.onLoginFail(loginFailHandler);
    ipc.onShowAuthScreen(showAuthHandler);
    ipc.onPlayerStart(playerStartHandler);
  }, [login, logout, navigate]);
}
