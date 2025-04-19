import { useState, useCallback } from 'react';

interface AsyncOperationState {
  loading: boolean;
  error: Error | null;
}

type AsyncFunction<TArgs extends unknown[], TReturn> = (...args: TArgs) => Promise<TReturn>;

export function useAsyncOperation<TArgs extends unknown[], TReturn>(
  operation: AsyncFunction<TArgs, TReturn>
): [AsyncFunction<TArgs, TReturn>, AsyncOperationState] {
  const [state, setState] = useState<AsyncOperationState>({
    loading: false,
    error: null,
  });

  const wrappedOperation = useCallback(
    async (...args: TArgs) => {
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
  );

  return [wrappedOperation, state];
} 