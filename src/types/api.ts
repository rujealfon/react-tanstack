/**
 * Common API response types
 */

// Generic API response structure
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Paginated response structure
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  };
}

// Error response structure
export interface ApiError {
  // Basic error information
  status: number;
  message: string;
  code?: string;
  
  // Detailed validation errors
  errors?: {
    field: string;
    message: string;
    code?: string;
  }[];
  
  // Additional context information
  timestamp?: string;
  path?: string;         // The API endpoint that generated the error
  requestId?: string;    // Useful for tracing errors in logs
}

// Common query parameters for API requests
export interface QueryParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  [key: string]: any;
}

// Authentication related types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
  expiresAt: string;
}
