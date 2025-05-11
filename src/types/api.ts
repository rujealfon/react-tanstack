// Common API response structure
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Common API error structure
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Common pagination metadata
export interface PaginationMeta {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

// Common paginated response
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// Common query parameters for paginated requests
export interface PaginationParams {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  search?: string;
}
