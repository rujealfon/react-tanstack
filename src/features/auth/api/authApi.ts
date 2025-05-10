import { apiClient } from '@/lib/apiClient';
import type { LoginFormValues } from '../schemas/loginSchema';
import type { AuthResponse } from '@/types/api';
import type { User } from '@/types';

/**
 * Authentication API service
 * Handles login, registration, logout, and user profile operations
 */
export const authApi = {
  /**
   * Login with email and password
   */
  login: async (data: LoginFormValues): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>('/auth/login', data);
  },

  /**
   * Register a new user
   */
  register: async (data: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>('/auth/register', data);
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    return apiClient.post<void>('/auth/logout');
  },

  /**
   * Get the current user's profile
   */
  getProfile: async (): Promise<User> => {
    return apiClient.get<User>('/auth/me');
  },

  /**
   * Update the current user's profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiClient.put<User>('/auth/me', data);
  },

  /**
   * Request a password reset
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    return apiClient.post<{ message: string }>('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (data: {
    token: string;
    password: string;
    passwordConfirmation: string;
  }): Promise<{ message: string }> => {
    return apiClient.post<{ message: string }>('/auth/reset-password', data);
  },
};

export default authApi;
