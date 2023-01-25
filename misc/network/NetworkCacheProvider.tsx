import React, { useCallback, useContext, useMemo, useReducer } from 'react';

export class NetworkError extends Error {
  public status: number;

  constructor(status: number, body: { message: string }) {
    super(body.message);
    this.status = status;
  }
}

interface Cache {
  [key: string]: any;
}

export interface Metadata {
  expiresAt?: number;
  headers?: { [key: string]: string };
  loading?: boolean;
  lastUpdated: number;
  networkError?: NetworkError;
  requestCount: number;
}

const defaultMetadata: Metadata = { lastUpdated: 0, requestCount: 0 };

interface MetadataState {
  [key: string]: Metadata;
}

interface ProviderState {
  cache: Cache;
  metadata: MetadataState;
}

enum ReducerActionType {
  UpdateCache,
  UpdateMetadata,
  UpdateCacheAndMetadata,
  ReduceCacheAndMetadata,
  ReduceCache,
}

interface MetadataUpdate {
  key: string;
  updates: Partial<Metadata>;
}

type ReducerAction =
  | [ReducerActionType.UpdateCache, Cache]
  | [ReducerActionType.UpdateMetadata, MetadataUpdate]
  | [
      ReducerActionType.UpdateCacheAndMetadata,
      { cache: Cache; metadataUpdate: MetadataUpdate },
    ]
  | [
      ReducerActionType.ReduceCacheAndMetadata,
      UpdateCacheAndMetadataReducerProps<unknown, unknown, unknown, unknown>,
    ]
  | [
      ReducerActionType.ReduceCache,
      UpdateCacheAndMetadataReducerProps<unknown, unknown, unknown, unknown>,
    ];

type ProviderReducerState = [ProviderState, React.Dispatch<ReducerAction>];

const NetworkCacheContext = React.createContext<
  ProviderReducerState | undefined
>(undefined);

const computeCacheUpdates = (
  oldCache: Cache,
  payload: UpdateCacheAndMetadataReducerProps<
    unknown,
    unknown,
    unknown,
    unknown
  >,
) => {
  const { params, requestIndex, responseData, reducers } = payload;

  const cacheUpdates: { [key: string]: unknown } = {};
  reducers.forEach((r) => {
    if (r) {
      const prevState = oldCache[r.cacheKey];
      cacheUpdates[r.cacheKey] = r.store(prevState, responseData, {
        params,
        requestIndex,
      });
    }
  });

  return cacheUpdates;
};

const providerReducer = (
  state: ProviderState,
  action: ReducerAction,
): ProviderState => {
  // type safety doesn't work with destructured variables here, so just reference as [0] and [1]
  switch (action[0]) {
    case ReducerActionType.UpdateCache:
      return {
        ...state,
        cache: { ...state.cache, ...action[1] },
      };
    case ReducerActionType.UpdateMetadata: {
      const metadataUpdate = action[1];

      const oldMetadata = state.metadata;
      const prevKeyMetadata = oldMetadata[metadataUpdate.key];

      return {
        ...state,
        metadata: {
          ...oldMetadata,
          [metadataUpdate.key]: {
            ...prevKeyMetadata,
            ...metadataUpdate.updates,
          },
        },
      };
    }
    case ReducerActionType.UpdateCacheAndMetadata: {
      const { cache, metadataUpdate } = action[1];

      const oldMetadata = state.metadata;
      const prevKeyMetadata = oldMetadata[metadataUpdate.key];

      return {
        ...state,
        cache: { ...state.cache, ...cache },
        metadata: {
          ...oldMetadata,
          [metadataUpdate.key]: {
            ...prevKeyMetadata,
            ...metadataUpdate.updates,
          },
        },
      };
    }
    case ReducerActionType.ReduceCacheAndMetadata: {
      const payload = action[1];
      const oldCache = state.cache;

      const cacheUpdates = computeCacheUpdates(oldCache, payload);
      const { metadata, metadataKey } = payload;

      const oldMetadata = state.metadata;
      const prevKeyMetadata = oldMetadata[metadataKey];

      return {
        ...state,
        cache: { ...oldCache, ...cacheUpdates },
        metadata: {
          ...oldMetadata,
          [metadataKey]: { ...prevKeyMetadata, ...metadata },
        },
      };
    }
    case ReducerActionType.ReduceCache: {
      const payload = action[1];
      const oldCache = state.cache;

      const cacheUpdates = computeCacheUpdates(oldCache, payload);

      return {
        ...state,
        cache: { ...oldCache, ...cacheUpdates },
      };
    }
  }
};

const defaultProviderState: ProviderState = {
  cache: {},
  metadata: {},
};

const NetworkCacheProvider: React.FC = (props) => {
  const state: ProviderReducerState = useReducer(
    providerReducer,
    defaultProviderState,
  );

  return <NetworkCacheContext.Provider value={state} {...props} />;
};

export default NetworkCacheProvider;

const useNetworkContext = () => {
  const context = useContext(NetworkCacheContext);
  if (!context) {
    throw new Error(
      'useNetworkCache must be used inside a NetworkCacheProvider',
    );
  }

  return context;
};

const useNetworkCache = () => {
  const [state] = useNetworkContext();
  return state.cache;
};

export interface ReducerExtras<Params> {
  params: Params;
  requestIndex: number;
}

type Reducer<Params, T, ResponseType> = {
  cacheKey: string;
  store: (prevState: T, data: ResponseType, extras: ReducerExtras<Params>) => T;
};

export type Reducers<Params, ResponseType, T1, T2> = [
  Reducer<Params, T1, ResponseType>,
  Reducer<Params, T2, ResponseType>?,
];

export type Retriever<RetrieveType, T1, T2> = (
  state1?: T1,
  state2?: T2,
) => RetrieveType | undefined;

interface UseCacheResourceProps<Params, ResponseType, RetrieveType, T1, T2> {
  reducers: Reducers<Params, ResponseType, T1, T2>;
  retriever: Retriever<RetrieveType, T1, T2>;
}

type CacheKeysFromReducers<T1, T2> = {
  keys: [string?, string?];
  states: [T1 | undefined, T2 | undefined];
};

export const cacheStatesFromReducers = <Params, ResponseType, T1, T2>(
  cache: Cache,
  reducers?: Reducers<Params, ResponseType, T1, T2>,
): CacheKeysFromReducers<T1, T2> => {
  if (!reducers) {
    return { keys: [], states: [undefined, undefined] };
  }

  const key1 = reducers[0].cacheKey;
  const key2 = reducers[1] && reducers[1].cacheKey;

  const cacheState1 = cache[key1] as T1 | undefined;
  const cacheState2 = key2 ? (cache[key2] as T2 | undefined) : undefined;

  return {
    keys: [key1, key2],
    states: [cacheState1, cacheState2],
  };
};

export const useCacheStatesFromReducers = <Params, ResponseType, T1, T2>(
  reducers?: Reducers<Params, ResponseType, T1, T2>,
): CacheKeysFromReducers<T1, T2> => {
  const cache = useNetworkCache();
  return cacheStatesFromReducers(cache, reducers);
};

export const useCacheResource = <Params, ResponseType, RetrieveType, T1, T2>(
  props: UseCacheResourceProps<Params, ResponseType, RetrieveType, T1, T2>,
) => {
  const { reducers, retriever } = props;

  const { states } = useCacheStatesFromReducers(reducers);
  const [cacheState1, cacheState2] = states;

  return useMemo(() => retriever(cacheState1, cacheState2), [
    retriever,
    cacheState1,
    cacheState2,
  ]);
};

export const useMetadata = () => {
  const [state] = useNetworkContext();
  return state.metadata;
};

export const useResourceMetadata = (key: string): Metadata => {
  const metadata = useMetadata();
  return metadata[key] ?? defaultMetadata;
};

const useNetworkDispatch = () => {
  const [, dispatch] = useNetworkContext();
  return dispatch;
};

export const useUpdateMetadata = () => {
  const dispatch = useNetworkDispatch();
  return useCallback(
    (key: string, value: Partial<Metadata>) => {
      dispatch([ReducerActionType.UpdateMetadata, { key, updates: value }]);
    },
    [dispatch],
  );
};

export interface UpdateCacheAndMetadataReducerProps<
  Params,
  ResponseType,
  T1,
  T2
> {
  metadata: Partial<Metadata>;
  metadataKey: string;
  params: Params;
  requestIndex: number;
  responseData: ResponseType | undefined;
  reducers: Reducers<Params, ResponseType | undefined, T1, T2>;
}

export const useUpdateCacheAndMetadataReducer = <
  Params,
  ResponseType,
  T1,
  T2
>() => {
  const dispatch = useNetworkDispatch();

  return useCallback(
    (
      props: UpdateCacheAndMetadataReducerProps<Params, ResponseType, T1, T2>,
    ) => {
      dispatch([ReducerActionType.ReduceCacheAndMetadata, props]);
    },
    [dispatch],
  );
};

export const useUpdateCache = () => {
  const dispatch = useNetworkDispatch();

  return useCallback(
    (updates: Cache) => {
      dispatch([ReducerActionType.UpdateCache, updates]);
    },
    [dispatch],
  );
};
