import { apiClient } from '@/lib/apiClient';
import type { PaginatedResponse } from '@/types/api';
import type { UserData, CreateUserData, UpdateUserData } from '../schemas/userSchema';

/**
 * Users API service
 * Handles CRUD operations for users
 */
export const usersApi = {
  /**
   * Get a paginated list of users
   */
  getUsers: async (params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    role?: string;
    sort?: string;
    order?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<UserData>> => {
    return apiClient.get<PaginatedResponse<UserData>>('/users', { params });
  },

  /**
   * Get a single user by ID
   */
  getUser: async (id: string): Promise<UserData> => {
    return apiClient.get<UserData>(`/users/${id}`);
  },

  /**
   * Create a new user
   */
  createUser: async (data: CreateUserData): Promise<UserData> => {
    return apiClient.post<UserData>('/users', data);
  },

  /**
   * Update an existing user
   */
  updateUser: async (id: string, data: UpdateUserData): Promise<UserData> => {
    return apiClient.put<UserData>(`/users/${id}`, data);
  },

  /**
   * Delete a user
   */
  deleteUser: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/users/${id}`);
  },
};

export default usersApi;
