import { create } from 'zustand';
import type { UserData, CreateUserData, UpdateUserData } from '../schemas/userSchema';
import usersApi from '../api/usersApi';
import type { PaginatedResponse } from '@/types/api';

interface UsersState {
  // State
  users: UserData[];
  selectedUser: UserData | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  };
  filters: {
    search: string;
    role: string;
    sort: string;
    order: 'asc' | 'desc';
  };
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUsers: (params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    role?: string;
    sort?: string;
    order?: 'asc' | 'desc';
  }) => Promise<void>;
  fetchUser: (id: string) => Promise<void>;
  createUser: (data: CreateUserData) => Promise<UserData>;
  updateUser: (id: string, data: UpdateUserData) => Promise<UserData>;
  deleteUser: (id: string) => Promise<void>;
  setFilters: (filters: Partial<UsersState['filters']>) => void;
  clearSelectedUser: () => void;
  clearError: () => void;
}

export const useUsersStore = create<UsersState>()((set, get) => ({
  // Initial state
  users: [],
  selectedUser: null,
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    pageSize: 10,
  },
  filters: {
    search: '',
    role: '',
    sort: 'createdAt',
    order: 'desc',
  },
  isLoading: false,
  error: null,
  
  // Actions
  fetchUsers: async (params) => {
    try {
      set({ isLoading: true, error: null });
      
      // Merge current filters with provided params
      const { filters, pagination } = get();
      const queryParams = {
        page: params?.page ?? pagination.currentPage,
        pageSize: params?.pageSize ?? pagination.pageSize,
        search: params?.search ?? filters.search,
        role: params?.role ?? filters.role,
        sort: params?.sort ?? filters.sort,
        order: params?.order ?? filters.order,
      };
      
      const response = await usersApi.getUsers(queryParams);
      
      set({
        users: response.data,
        pagination: response.meta,
        isLoading: false,
      });
      
      // Update filters if they were provided
      if (params) {
        set({
          filters: {
            ...filters,
            ...Object.entries(params).reduce((acc, [key, value]) => {
              if (key !== 'page' && key !== 'pageSize' && value !== undefined) {
                acc[key as keyof typeof filters] = value as any;
              }
              return acc;
            }, {} as Partial<typeof filters>),
          },
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch users',
      });
    }
  },
  
  fetchUser: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const user = await usersApi.getUser(id);
      set({ selectedUser: user, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to fetch user with ID ${id}`,
      });
    }
  },
  
  createUser: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const user = await usersApi.createUser(data);
      
      // Refresh the users list
      await get().fetchUsers();
      
      set({ isLoading: false });
      return user;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create user',
      });
      throw error;
    }
  },
  
  updateUser: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      const user = await usersApi.updateUser(id, data);
      
      // Update the user in the list if it exists
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? user : u)),
        selectedUser: state.selectedUser?.id === id ? user : state.selectedUser,
      }));
      
      set({ isLoading: false });
      return user;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to update user with ID ${id}`,
      });
      throw error;
    }
  },
  
  deleteUser: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await usersApi.deleteUser(id);
      
      // Remove the user from the list
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
      }));
      
      set({ isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to delete user with ID ${id}`,
      });
      throw error;
    }
  },
  
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    
    // Fetch users with new filters
    const { fetchUsers } = get();
    fetchUsers({ page: 1, ...newFilters });
  },
  
  clearSelectedUser: () => set({ selectedUser: null }),
  
  clearError: () => set({ error: null }),
}));

export default useUsersStore;
