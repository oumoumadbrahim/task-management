import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useReducer, useCallback } from 'react';

type Methods = 'POST' | 'GET' | 'DELETE';

type FetchParams = {
  url: string;
  method: Methods;
  body?: any;
  config?: any;
};

type State<T> =
  | { data: null; loading: boolean; error: null }
  | { data: null; loading: boolean; error: AxiosError }
  | { data: T; loading: boolean; error: null };

type Action<T> =
  | { type: 'loading'; error: undefined }
  | { type: 'success'; data: T }
  | { type: 'error'; error: AxiosError };

const initState = {
  data: null,
  loading: false,
  error: null,
};

function reducer<T>(state: State<T>, action: Action<T>) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'success':
      return { data: action.data, loading: false, error: null };
    case 'error':
      return { data: null, loading: false, error: action.error };
    default:
      throw new Error('Unknown action type');
  }
}

export default function useFetch<T>({ url, method, body, config }: FetchParams) {
  const [state, dispatch] = useReducer(reducer<T>, initState);

  useEffect(() => {
    let shouldCancel = false;

    const callFetch = async () => {
      dispatch({ type: 'loading', error: undefined });

      try {
        const response: AxiosResponse<T> = await ifetch(url, method, body, config);
        if (shouldCancel) return;
        dispatch({ type: 'success', data: response.data });
      } catch (error: any) {
        if (shouldCancel) return;
        dispatch({ type: 'error', error });
      }

      callFetch();
      return () => (shouldCancel = true);
    };
  }, [url, method, body, config]);

  return { state };
}

export function useMyFetch<T>({ url, method, config }: FetchParams) {
  const [state, dispatch] = useReducer(reducer<T>, initState);

  const fetchData = useCallback(
    async (data: any = null) => {
      try {
        dispatch({ type: 'loading', error: undefined });
        const response = await ifetch(url, method, data, config);
        dispatch({ type: 'success', data: response.data });
        return response.data;
      } catch (error: any) {
        dispatch({ type: 'error', error });
        console.error(error);
        throw error;
      }
    },
    [url, method, config],
  );

  return { state, fetchData };
}

async function ifetch(
  url: string,
  method: Methods,
  body?: any,
  config?: any,
): Promise<AxiosResponse> {
  switch (method) {
    case 'POST':
      return await axios.post(url, body, config);
    case 'GET':
      return await axios.get(url, config);
    case 'DELETE':
      return await axios.delete(url, config);
    default:
      throw new Error('Unknown request method');
  }
}
