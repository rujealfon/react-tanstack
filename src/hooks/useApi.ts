import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/apiClient';
import type { ApiError } from '@/types/api';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
}

export function useApi<T = unknown, P extends Record<string, any> | undefined = Record<string, any>>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (payload?: P) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await apiClient(endpoint, {
          method,
          body: method !== 'GET' ? payload : undefined,
          params: method === 'GET' ? payload : undefined,
        });

        setData(response as T);
        options.onSuccess?.(response as T);
        return response as T;
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);
        options.onError?.(apiError);
        throw apiError;
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, method, options]
  );

  return {
    data,
    error,
    isLoading,
    execute,
  };
}
