import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  reset: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      reset: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
