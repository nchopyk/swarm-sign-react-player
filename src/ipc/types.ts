export interface LoginSuccessData {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface LoginFailureData {
  error: string;
  message: string;
}

export interface AuthScreenData {
  code: string;
}

export interface PlayerStartData {
  schedule: any; // Type will be replaced with actual schedule type
}

export interface IPCHandlers {
  onLoginSuccess: (callback: (data: LoginSuccessData) => void) => void;
  onLoginFail: (callback: (data: LoginFailureData) => void) => void;
  onShowAuthScreen: (callback: (data: AuthScreenData) => void) => void;
  onPlayerStart: (callback: (data: PlayerStartData) => void) => void;
}

declare global {
  interface Window {
    IPC: IPCHandlers;
  }
}
