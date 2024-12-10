import { IPCHandlers } from './types';
import { ipcCommands } from './commands';

// Mock event system for browser environment
class EventEmitter {
  private handlers: { [key: string]: Function[] } = {};

  on(event: string, handler: Function) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event].push(handler);
  }

  emit(event: string, ...args: any[]) {
    if (this.handlers[event]) {
      this.handlers[event].forEach(handler => handler(...args));
    }
  }
}

const mockIpcRenderer = new EventEmitter();

// Simulate connection mode updates
setTimeout(() => {
  mockIpcRenderer.emit(ipcCommands.UPDATE_CONNECTION_MODE, { mode: 'proxy' });
}, 500);

// Simulate master devices discovery
setTimeout(() => {
  const masters = {
    'master-1': {
      id: 'master-1',
      address: '192.168.1.100',
      port: 8080,
      connections: 42,
    },
    'master-2': {
      id: 'master-2',
      address: '192.168.1.101',
      port: 8080,
      connections: 27,
    },
  };
  mockIpcRenderer.emit(ipcCommands.UPDATE_AVAILABLE_MASTERS, masters);
}, 1500);

// Simulate master selection
setTimeout(() => {
  mockIpcRenderer.emit(ipcCommands.UPDATE_SELECTED_MASTER, {
    id: 'master-1',
    address: '192.168.1.100',
    port: 8080,
    connections: 42,
  });
}, 2500);

// Simulate connection established
setTimeout(() => {
  mockIpcRenderer.emit(ipcCommands.CONNECTION_ESTABLISHED, {
    type: 'master',
    address: '192.168.1.100',
    port: 8080,
  });
}, 3500);

// Simulate connection closed after 10 seconds
setTimeout(() => {
  mockIpcRenderer.emit(ipcCommands.CONNECTION_CLOSED, {
    type: 'master',
    reason: 'Connection lost',
  });
  // Simulate server search initiation
  mockIpcRenderer.emit(ipcCommands.INIT_SERVER_SEARCH);
}, 10000);

// Simulate master gateway update
setTimeout(() => {
  mockIpcRenderer.emit(ipcCommands.UPDATE_MASTER_GATEWAY, {
    address: '192.168.0.144',
    port: 8002,
  });
}, 4000);

// Simulate master WebSocket update
setTimeout(() => {
  mockIpcRenderer.emit(ipcCommands.UPDATE_MASTER_WEB_SOCKET, {
    address: '192.168.0.144',
    port: 8003,
    connections: 5,
  });
}, 4500);

// Simulate topology update
setTimeout(() => {
  mockIpcRenderer.emit(ipcCommands.UPDATE_MASTER_TOPOLOGY, {
    ip: '192.168.0.104',
    port: 8002,
    clientId: '948928a9-a204-472a-bfd6-424f6bb454ce',
    rating: 0.3502,
    connectedClients: [
      {
        ip: '192.168.0.105',
        port: 4161,
        clientId: '29afd3f8-422a-460e-b209-1cedf63f8645',
        rating: 0.5492,
        connectedClients: []
      },
      {
        ip: '192.168.0.106',
        port: null,
        clientId: 'abf618b9-1163-434c-8409-42341172fb99',
        rating: 0.5609,
        connectedClients: []
      }
    ],
  });
}, 5000);

// Simulate master rating update
setTimeout(() => {
  mockIpcRenderer.emit(ipcCommands.UPDATE_MASTER_RATING, {
    connectedDevices: {
      count: 42,
      normalized: 0.84,
    },
    wifiSignal: {
      dbm: -65,
      normalized: 0.75,
    },
    processorLoad: {
      percent: 45,
      normalized: 0.65,
    },
    freeRam: {
      mb: 2048,
      normalized: 0.82,
    },
    totalRam: {
      mb: 8192,
      normalized: 0.95,
    },
    uptime: {
      seconds: 345600,
      normalized: 0.88,
    },
    internetConnection: {
      type: 'wireless',
      normalized: 0.78,
    },
    rating: 0.81,
  });
}, 5500);

// Mock IPC implementation for browser environment
export const mockIPC: IPCHandlers = {
  onLoginSuccess: (callback) =>
    mockIpcRenderer.on(ipcCommands.LOGIN_SUCCESS, (data) => callback(data)),
  onLoginFail: (callback) =>
    mockIpcRenderer.on(ipcCommands.LOGIN_FAILURE, (data) => callback(data)),
  onShowAuthScreen: (callback) =>
    mockIpcRenderer.on(ipcCommands.SHOW_AUTH_SCREEN, (code) => callback(code)),
  onPlayerStart: (callback) =>
    mockIpcRenderer.on(ipcCommands.START_PLAYER, (schedule) => callback(schedule)),
  onConnectionEstablished: (callback) =>
    mockIpcRenderer.on(ipcCommands.CONNECTION_ESTABLISHED, (data) => callback(data)),
  onConnectionClosed: (callback) =>
    mockIpcRenderer.on(ipcCommands.CONNECTION_CLOSED, (data) => callback(data)),
  onConnectionModeUpdate: (callback) =>
    mockIpcRenderer.on(ipcCommands.UPDATE_CONNECTION_MODE, (data) => callback(data)),
  onAvailableMastersUpdate: (callback) =>
    mockIpcRenderer.on(ipcCommands.UPDATE_AVAILABLE_MASTERS, (masters) => callback(masters)),
  onSelectedMasterUpdate: (callback) =>
    mockIpcRenderer.on(ipcCommands.UPDATE_SELECTED_MASTER, (master) => callback(master)),
  onMasterGatewayUpdate: (callback) =>
    mockIpcRenderer.on(ipcCommands.UPDATE_MASTER_GATEWAY, (data) => callback(data)),
  onMasterWebSocketUpdate: (callback) =>
    mockIpcRenderer.on(ipcCommands.UPDATE_MASTER_WEB_SOCKET, (data) => callback(data)),
  onMasterTopologyUpdate: (callback) =>
    mockIpcRenderer.on(ipcCommands.UPDATE_MASTER_TOPOLOGY, (data) => callback(data)),
  onMasterRatingUpdate: (callback) =>
    mockIpcRenderer.on(ipcCommands.UPDATE_MASTER_RATING, (data) => callback(data)),
  onResetData: (callback) =>
    mockIpcRenderer.on(ipcCommands.RESET_DATA, () => callback()),
  onInitServerSearch: (callback) =>
    mockIpcRenderer.on(ipcCommands.INIT_SERVER_SEARCH, () => callback()),
};
