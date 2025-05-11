import { apiClient } from '@/lib/apiClient';
import type { 
  User, 
  UserList, 
  CreateUserRequest, 
  UpdateUserRequest 
} from '../schemas/userSchema';
import type { PaginatedResponse, PaginationParams } from '@/types/api';

/**
 * Get a paginated list of users
 */
export async function getUsers(params?: PaginationParams): Promise<PaginatedResponse<User>> {
  return await apiClient('/users', {
    method: 'GET',
    params,
  });
}

/**
 * Get a single user by ID
 */
export async function getUser(id: string): Promise<User> {
  return await apiClient(`/users/${id}`, {
    method: 'GET',
  });
}

/**
 * Create a new user
 */
export async function createUser(data: CreateUserRequest): Promise<User> {
  return await apiClient('/users', {
    method: 'POST',
    body: data,
  });
}

/**
 * Update an existing user
 */
export async function updateUser(id: string, data: UpdateUserRequest): Promise<User> {
  return await apiClient(`/users/${id}`, {
    method: 'PUT',
    body: data,
  });
}

/**
 * Delete a user
 */
export async function deleteUser(id: string): Promise<void> {
  return await apiClient(`/users/${id}`, {
    method: 'DELETE',
  });
}
