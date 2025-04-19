import { useState, useCallback } from 'react';

interface AsyncOperationState {
  loading: boolean;
  error: Error | null;
}

export function useAsyncOperation<T extends (...args: unknown[]) => Promise<unknown>>(
  operation: T
): [T, AsyncOperationState] {
  const [state, setState] = useState<AsyncOperationState>({
    loading: false,
    error: null,
  });

  const wrappedOperation = useCallback(
    async (...args: Parameters<T>) => {
      setState({ loading: true, error: null });
      try {
        const result = await operation(...args);
        setState({ loading: false, error: null });
        return result;
      } catch (error) {
        setState({ loading: false, error: error as Error });
        throw error;
      }
    },
    [operation]
  ) as T;

  return [wrappedOperation, state];
} 