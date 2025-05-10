/**
 * API Client utility for making HTTP requests using ofetch
 * Configured with base URL, interceptors, and default headers
 */

import { API_BASE_URL } from "@/config";
import { ofetch, FetchError } from "ofetch";
import type { FetchOptions } from "ofetch";

/**
 * Extended options for API requests
 */
type ApiOptions = {
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  [key: string]: any;
};

/**
 * Interceptor function types
 */
type RequestInterceptor = (request: FetchOptions) => FetchOptions | Promise<FetchOptions>;
type ResponseInterceptor = (response: any, request: FetchOptions) => any | Promise<any>;
type ErrorInterceptor = (error: FetchError) => any | Promise<any | never>;

/**
 * Create API client state
 */
const state = {
  requestInterceptors: [] as RequestInterceptor[],
  responseInterceptors: [] as ResponseInterceptor[],
  errorInterceptors: [] as ErrorInterceptor[],
};

/**
 * Get authentication header with token from storage
 */
const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Handle request with interceptors
 */
const handleRequest = async (request: FetchOptions): Promise<FetchOptions> => {
  let modifiedRequest = { ...request };
  
  // Apply request interceptors in sequence
  for (const interceptor of state.requestInterceptors) {
    modifiedRequest = await interceptor(modifiedRequest);
  }
  
  return modifiedRequest;
};

/**
 * Handle response with interceptors
 */
const handleResponse = async (response: any, request: FetchOptions): Promise<any> => {
  let modifiedResponse = response;
  
  // Apply response interceptors in sequence
  for (const interceptor of state.responseInterceptors) {
    modifiedResponse = await interceptor(modifiedResponse, request);
  }
  
  return modifiedResponse;
};

/**
 * Handle response errors with interceptors
 */
const handleResponseError = async (error: FetchError): Promise<never> => {
  // Try to apply error interceptors
  for (const interceptor of state.errorInterceptors) {
    try {
      await interceptor(error);
      throw new Error('Interceptor did not throw or reject');
    } catch (e) {
      // If the interceptor rethrows, continue to the next interceptor
      if (e !== error) error = e as FetchError;
    }
  }
  
  // If we get here, no interceptor handled the error, format a default error
  let errorMessage = `Error: ${error.status || 'Unknown'}`;
  
  if (error.data) {
    try {
      const errorData = typeof error.data === 'string' ? JSON.parse(error.data) : error.data;
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // If parsing fails, use the default error message
    }
  }
  
  throw new Error(errorMessage);
};

/**
 * Default request options
 */
const defaultOptions: ApiOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  // Automatically parse JSON
  parseResponse: JSON.parse,
  // Hook into ofetch lifecycle
  onRequest: handleRequest,
  onResponse: handleResponse,
  onResponseError: handleResponseError,
};

/**
 * Prepare request options by merging defaults, auth, and custom options
 */
const prepareOptions = (options: ApiOptions = {}): ApiOptions => ({
  ...defaultOptions,
  ...options,
  headers: {
    ...defaultOptions.headers,
    ...getAuthHeader(),
    ...options.headers,
  },
});

/**
 * Add a request interceptor
 */
export const addRequestInterceptor = (interceptor: RequestInterceptor): (() => void) => {
  state.requestInterceptors.push(interceptor);
  return () => {
    state.requestInterceptors = state.requestInterceptors.filter(i => i !== interceptor);
  };
};

/**
 * Add a response interceptor
 */
export const addResponseInterceptor = (interceptor: ResponseInterceptor): (() => void) => {
  state.responseInterceptors.push(interceptor);
  return () => {
    state.responseInterceptors = state.responseInterceptors.filter(i => i !== interceptor);
  };
};

/**
 * Add an error interceptor
 */
export const addErrorInterceptor = (interceptor: ErrorInterceptor): (() => void) => {
  state.errorInterceptors.push(interceptor);
  return () => {
    state.errorInterceptors = state.errorInterceptors.filter(i => i !== interceptor);
  };
};

/**
 * HTTP request methods
 */
export const apiClient = {
  /**
   * GET request
   */
  get: <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
    return ofetch<T>(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      ...prepareOptions(options),
    });
  },

  /**
   * POST request
   */
  post: <T>(endpoint: string, data?: any, options: ApiOptions = {}): Promise<T> => {
    return ofetch<T>(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      body: data,
      ...prepareOptions(options),
    });
  },

  /**
   * PUT request
   */
  put: <T>(endpoint: string, data?: any, options: ApiOptions = {}): Promise<T> => {
    return ofetch<T>(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      body: data,
      ...prepareOptions(options),
    });
  },

  /**
   * DELETE request
   */
  delete: <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
    return ofetch<T>(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      ...prepareOptions(options),
    });
  },
  
  // Export interceptor methods
  addRequestInterceptor,
  addResponseInterceptor,
  addErrorInterceptor,
};
