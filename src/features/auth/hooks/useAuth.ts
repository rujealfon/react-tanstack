import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import useAuthStore from '../store/authStore';

/**
 * Custom hook for accessing auth state and actions
 * Provides a convenient way to use authentication functionality throughout the app
 */
export function useAuth() {
  const navigate = useNavigate();
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    getProfile,
    clearError,
  } = useAuthStore();

  // Helper function to redirect after login
  const loginWithRedirect = async (
    data: Parameters<typeof login>[0],
    redirectTo = '/dashboard'
  ) => {
    try {
      await login(data);
      navigate({ to: redirectTo });
    } catch (error) {
      // Error is already handled in the store
      console.error('Login failed:', error);
    }
  };

  // Helper function to redirect after logout
  const logoutWithRedirect = async (redirectTo = '/login') => {
    await logout();
    navigate({ to: redirectTo });
  };

  // Helper function to check if the user has a specific role
  const hasRole = (role: string | string[]) => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    loginWithRedirect,
    register,
    logout,
    logoutWithRedirect,
    getProfile,
    clearError,
    hasRole,
  };
}

export default useAuth;
