export const ipcCommands = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  SHOW_AUTH_SCREEN: 'SHOW_AUTH_SCREEN',
  START_PLAYER: 'START_PLAYER',
  CONNECTION_ESTABLISHED: 'CONNECTION_ESTABLISHED',
  CONNECTION_CLOSED: 'CONNECTION_CLOSED',
  UPDATE_CONNECTION_MODE: 'UPDATE_CONNECTION_MODE',
  UPDATE_AVAILABLE_MASTERS: 'UPDATE_AVAILABLE_MASTERS',
  UPDATE_SELECTED_MASTER: 'UPDATE_SELECTED_MASTER',
  UPDATE_MASTER_GATEWAY: 'UPDATE_MASTER_GATEWAY',
  UPDATE_MASTER_WEB_SOCKET: 'UPDATE_MASTER_WEB_SOCKET',
  UPDATE_MASTER_TOPOLOGY: 'UPDATE_MASTER_TOPOLOGY',
  UPDATE_MASTER_RATING: 'UPDATE_MASTER_RATING',
  RESET_DATA: 'RESET_DATA',
  INIT_SERVER_SEARCH: 'init-server-search',
  SET_INSTANCE_ID: 'set-instance-id',
} as const;
