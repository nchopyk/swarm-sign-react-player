import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPC } from '../ipc';
import { useAuth } from './useAuth';
import { useConnection } from './useConnection';
import { useMediaDownload } from './useMediaDownload';
import { useTopology } from './useTopology';
import { useMasterRating } from './useMasterRating';
import type {
  LoginFailureData,
  AuthScreenData,
  PlayerStartData,
  ConnectionData,
  ConnectionMode,
  MasterDevice,
  ConnectionClosedData,
  MasterGatewayData,
  MasterWebSocketData,
  TopologyData,
  MasterRatingData,
} from '../ipc/types';

export function useIPC() {
  const { login, logout, reset: resetAuth } = useAuth();
  const {
    updateConnection,
    closeConnection,
    setConnectionMode,
    setAvailableMasters,
    setSelectedMaster,
    setMasterGateway,
    setMasterWebSocket,
  } = useConnection();
  const { setTopology } = useTopology();
  const { setRating } = useMasterRating();
  const { clearDownloads } = useMediaDownload();
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

  const connectionClosedHandler = useCallback((data: ConnectionClosedData) => {
    console.log(`[IPC] ${data.type} connection closed:`, data.reason);
    closeConnection(data.type, data.reason);
  }, [closeConnection]);

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

  const masterGatewayHandler = useCallback((data: MasterGatewayData) => {
    console.log('[IPC] Master gateway updated:', data);
    setMasterGateway(data);
  }, [setMasterGateway]);

  const masterWebSocketHandler = useCallback((data: MasterWebSocketData) => {
    console.log('[IPC] Master WebSocket updated:', data);
    setMasterWebSocket(data);
  }, [setMasterWebSocket]);

  const masterTopologyHandler = useCallback((data: TopologyData) => {
    console.log('[IPC] Master topology updated:', data);
    setTopology(data);
  }, [setTopology]);

  const masterRatingHandler = useCallback((data: MasterRatingData) => {
    console.log('[IPC] Master rating updated:', data);
    setRating(data);
  }, [setRating]);

  const resetDataHandler = useCallback(() => {
    console.log('[IPC] Reset data requested');
    resetAuth();
    clearDownloads();
    navigate('/login');
  }, [resetAuth, clearDownloads, navigate]);

  useEffect(() => {
    if (!isRegistered.current) {
      const ipc = window.IPC || IPC;
      ipc.onLoginSuccess(loginSuccessHandler);
      ipc.onLoginFail(loginFailHandler);
      ipc.onShowAuthScreen(showAuthHandler);
      ipc.onPlayerStart(playerStartHandler);
      ipc.onConnectionEstablished(connectionHandler);
      ipc.onConnectionClosed(connectionClosedHandler);
      ipc.onConnectionModeUpdate(connectionModeHandler);
      ipc.onAvailableMastersUpdate(availableMastersHandler);
      ipc.onSelectedMasterUpdate(selectedMasterHandler);
      ipc.onMasterGatewayUpdate(masterGatewayHandler);
      ipc.onMasterWebSocketUpdate(masterWebSocketHandler);
      ipc.onMasterTopologyUpdate(masterTopologyHandler);
      ipc.onMasterRatingUpdate(masterRatingHandler);
      ipc.onResetData(resetDataHandler);
      isRegistered.current = true;
    }
  }, [
    loginSuccessHandler,
    loginFailHandler,
    showAuthHandler,
    playerStartHandler,
    connectionHandler,
    connectionClosedHandler,
    connectionModeHandler,
    availableMastersHandler,
    selectedMasterHandler,
    masterGatewayHandler,
    masterWebSocketHandler,
    masterTopologyHandler,
    masterRatingHandler,
    resetDataHandler
  ]);
}
