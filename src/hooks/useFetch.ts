
import { useQuery, useMutation, QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

// Initialize QueryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Generic fetch function
async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }
  return response.json();
}

// Hook for GET requests
export function useFetchData<T>(
  queryKey: string[],
  url: string,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    refetchInterval?: number;
  }
) {
  return useQuery<T, Error>({
    queryKey,
    queryFn: () => fetchData<T>(url),
    enabled: options?.enabled,
    refetchInterval: options?.refetchInterval,
    meta: {
      onSuccess: options?.onSuccess,
      onError: options?.onError
    },
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      console.error(`Error fetching ${url}:`, error);
      toast.error(`Failed to load data: ${error.message}`);
      if (options?.onError) {
        options.onError(error);
      }
    },
  } as UseQueryOptions<T, Error, T, string[]>);
}

// Hook for POST, PUT, DELETE
export function useMutateData<TData, TVariables>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[];
  }
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: (variables: TVariables) =>
      fetchData<TData>(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(variables),
      }),
    onSuccess: (data) => {
      // Invalidate queries if specified
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        });
      }
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      console.error(`Error with ${method} to ${url}:`, error);
      toast.error(`Operation failed: ${error.message}`);
      if (options?.onError) {
        options.onError(error);
      }
    },
  } as UseMutationOptions<TData, Error, TVariables>);
}
