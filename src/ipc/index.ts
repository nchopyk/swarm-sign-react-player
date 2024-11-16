import { IPCHandlers } from './types';
import { mockIPC } from './mock';

// Check if we're running in Electron and if IPC is available
const isElectron = typeof window !== 'undefined' && 'IPC' in window;

// Get the IPC interface, either from window.IPC or use mock
export const IPC: IPCHandlers = isElectron ? window.IPC : mockIPC;

// Export type for TypeScript support
export type { IPCHandlers } from './types';
export { ipcCommands } from './commands';