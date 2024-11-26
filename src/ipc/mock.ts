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
  onConnectionModeUpdate: (callback) =>
    mockIpcRenderer.on(ipcCommands.UPDATE_CONNECTION_MODE, (data) => callback(data)),
  onAvailableMastersUpdate: (callback) =>
    mockIpcRenderer.on(ipcCommands.UPDATE_AVAILABLE_MASTERS, (masters) => callback(masters)),
  onSelectedMasterUpdate: (callback) =>
    mockIpcRenderer.on(ipcCommands.UPDATE_SELECTED_MASTER, (master) => callback(master)),
  onResetData: (callback) =>
    mockIpcRenderer.on(ipcCommands.RESET_DATA, () => callback()),
};
