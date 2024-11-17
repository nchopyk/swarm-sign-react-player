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

// Simulate connection established events after a delay
setTimeout(() => {
  mockIpcRenderer.emit(ipcCommands.CONNECTION_ESTABLISHED, {
    type: 'master',
    address: '192.168.1.100',
    port: 8080
  });
}, 1500);

setTimeout(() => {
  mockIpcRenderer.emit(ipcCommands.CONNECTION_ESTABLISHED, {
    type: 'server',
    address: '10.0.0.50',
    port: 9000
  });
}, 3000);

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
};