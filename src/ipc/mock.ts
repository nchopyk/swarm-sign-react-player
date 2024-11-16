import { IPCHandlers } from './types';
import { ipcCommands } from './commands';

// Mock event system for browser environment
class EventEmitter {
  private handlers: Map<string, Set<Function>> = new Map();

  on(event: string, handler: Function) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
  }

  removeListener(event: string, handler: Function) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.handlers.delete(event);
      }
    }
  }

  removeAllListeners(event?: string) {
    if (event) {
      this.handlers.delete(event);
    } else {
      this.handlers.clear();
    }
  }

  emit(event: string, ...args: any[]) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(...args));
    }
  }
}

const mockIpcRenderer = new EventEmitter();

// Mock IPC implementation for browser environment
export const mockIPC: IPCHandlers = {
  onLoginSuccess: (callback) => {
    mockIpcRenderer.on(ipcCommands.LOGIN_SUCCESS, callback);
    return () => mockIpcRenderer.removeListener(ipcCommands.LOGIN_SUCCESS, callback);
  },
  onLoginFail: (callback) => {
    mockIpcRenderer.on(ipcCommands.LOGIN_FAILURE, callback);
    return () => mockIpcRenderer.removeListener(ipcCommands.LOGIN_FAILURE, callback);
  },
  onShowAuthScreen: (callback) => {
    mockIpcRenderer.on(ipcCommands.SHOW_AUTH_SCREEN, callback);
    return () => mockIpcRenderer.removeListener(ipcCommands.SHOW_AUTH_SCREEN, callback);
  },
  onPlayerStart: (callback) => {
    mockIpcRenderer.on(ipcCommands.START_PLAYER, callback);
    return () => mockIpcRenderer.removeListener(ipcCommands.START_PLAYER, callback);
  }
};
