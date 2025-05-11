import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../schemas/authSchema';
import { router } from '@/router';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // For DummyJSON API, the user object already contains the token
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user: User | null) => set((state) => ({ ...state, user, isAuthenticated: !!user })),
      setToken: (token: string | null) => set((state) => ({ ...state, token })),
      setIsLoading: (isLoading: boolean) => set((state) => ({ ...state, isLoading })),
      setError: (error: string | null) => set((state) => ({ ...state, error })),
      
      login: (userData: User) => {
        // Extract token from user data (DummyJSON API includes token in user object)
        const token = userData.accessToken || '';
        
        set({
          user: userData,
          token,
          isAuthenticated: true,
          error: null,
        });
        
        // Update router context with new auth state
        router.options.context = {
          ...router.options.context,
          auth: { 
            isAuthenticated: true,
            user: userData
          }
        };
        
        // Force router to refresh with new context
        router.invalidate();
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        
        // Update router context with new auth state
        router.options.context = {
          ...router.options.context,
          auth: { 
            isAuthenticated: false,
            user: null
          }
        };
        
        // Force router to refresh with new context
        router.invalidate();
      },
    }),
    {
      name: 'auth-storage',
      // Only persist these keys
      partialize: (state: AuthState) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
