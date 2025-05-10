/**
 * Global TypeScript types/interfaces
 */

// React component types
import type { ReactNode } from 'react';

export interface WithChildren {
  children?: ReactNode;
}

// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

// Common API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Theme
export type Theme = 'light' | 'dark' | 'system';

// Common component props with className
export interface WithClassName {
  className?: string;
}
