import { create } from 'zustand';
import type { User } from '../schemas/userSchema';
import type { PaginationMeta } from '@/types/api';

interface UsersState {
  // Data
  users: User[];
  selectedUser: User | null;
  paginationMeta: PaginationMeta | null;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
  setPaginationMeta: (meta: PaginationMeta | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  removeUser: (userId: string) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  // Data
  users: [],
  selectedUser: null,
  paginationMeta: null,
  
  // UI state
  isLoading: false,
  error: null,
  
  // Actions
  setUsers: (users) => set({ users }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setPaginationMeta: (paginationMeta) => set({ paginationMeta }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addUser: (user) => set((state) => ({ 
    users: [...state.users, user] 
  })),
  
  updateUser: (updatedUser) => set((state) => ({ 
    users: state.users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ),
    selectedUser: state.selectedUser?.id === updatedUser.id 
      ? updatedUser 
      : state.selectedUser
  })),
  
  removeUser: (userId) => set((state) => ({ 
    users: state.users.filter(user => user.id !== userId),
    selectedUser: state.selectedUser?.id === userId 
      ? null 
      : state.selectedUser
  })),
}));
