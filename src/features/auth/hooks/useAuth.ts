import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { login as loginApi, logout as logoutApi, register as registerApi } from '../api/authApi';
import type { LoginRequest, RegisterRequest } from '../schemas/authSchema';
import { router } from '@/router';

export function useAuth() {
  const { 
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setToken,
    setIsLoading,
    setError,
    login: storeLogin,
    logout: storeLogout
  } = useAuthStore();

  const login = useCallback(async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // DummyJSON API returns the user data with tokens directly
      const userData = await loginApi(data);
      storeLogin(userData);
      
      // Refresh router to update context
      router.invalidate();
      
      return userData;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, storeLogin]);

  const register = useCallback(async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const userData = await registerApi(data);
      storeLogin(userData);
      
      // Refresh router to update context
      router.invalidate();
      
      return userData;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, storeLogin]);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await logoutApi();
      storeLogout();
      
      // Refresh router to update context
      router.invalidate();
      
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Logout failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, storeLogout]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
  };
}
