import { useCallback } from 'react';
import { useUsersStore } from '../store/usersStore';
import { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser as updateUserApi, 
  deleteUser as deleteUserApi 
} from '../api/usersApi';
import type { CreateUserRequest, UpdateUserRequest } from '../schemas/userSchema';
import type { PaginationParams } from '@/types/api';

export function useUsers() {
  const { 
    users,
    selectedUser,
    paginationMeta,
    isLoading,
    error,
    setUsers,
    setSelectedUser,
    setPaginationMeta,
    setIsLoading,
    setError,
    addUser,
    updateUser,
    removeUser
  } = useUsersStore();

  const fetchUsers = useCallback(async (params?: PaginationParams) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getUsers(params);
      setUsers(response.data);
      setPaginationMeta(response.meta);
      
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch users');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, setUsers, setPaginationMeta]);

  const fetchUser = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const user = await getUser(id);
      setSelectedUser(user);
      
      return user;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch user');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, setSelectedUser]);

  const createNewUser = useCallback(async (data: CreateUserRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const newUser = await createUser(data);
      addUser(newUser);
      
      return newUser;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create user');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, addUser]);

  const updateExistingUser = useCallback(async (id: string, data: UpdateUserRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const updatedUser = await updateUserApi(id, data);
      updateUser(updatedUser);
      
      return updatedUser;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update user');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, updateUser]);

  const deleteUser = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await deleteUserApi(id);
      removeUser(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete user');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, removeUser]);

  return {
    // State
    users,
    selectedUser,
    paginationMeta,
    isLoading,
    error,
    
    // Actions
    fetchUsers,
    fetchUser,
    createUser: createNewUser,
    updateUser: updateExistingUser,
    deleteUser,
    
    // Direct state updates
    setSelectedUser,
  };
}
