import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import authApi from '../api/authApi';
import type { LoginFormValues } from '../schemas/loginSchema';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (data: LoginFormValues) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  getProfile: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Actions
      login: async (data) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authApi.login(data);
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          // Store token in localStorage for API client to use
          localStorage.setItem('authToken', response.token);
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to login',
          });
          throw error;
        }
      },
      
      register: async (data) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authApi.register(data);
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          // Store token in localStorage for API client to use
          localStorage.setItem('authToken', response.token);
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to register',
          });
          throw error;
        }
      },
      
      logout: async () => {
        try {
          set({ isLoading: true });
          await authApi.logout();
          
          // Clear token from localStorage
          localStorage.removeItem('authToken');
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to logout',
          });
          
          // Even if API call fails, we clear local state
          localStorage.removeItem('authToken');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },
      
      getProfile: async () => {
        const { token } = get();
        
        // Skip if no token
        if (!token) return;
        
        try {
          set({ isLoading: true, error: null });
          const user = await authApi.getProfile();
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to get profile',
          });
          
          // If unauthorized, clear auth state
          if (error instanceof Error && error.message.includes('401')) {
            localStorage.removeItem('authToken');
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            });
          }
        }
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
      // Only persist token, not the full user object
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useAuthStore;
