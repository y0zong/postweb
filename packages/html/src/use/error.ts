import { useCallback, useEffect, useState } from 'react';

type AnyError = Error | string | { [x: string]: string }
const useError = (): ((err: AnyError) => void) => {
  const [error, setError] = useState<AnyError | null>(null);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const dispatchError = useCallback((err: AnyError) => {
    setError(err);
  }, []);

  return dispatchError;
};

export { useError };