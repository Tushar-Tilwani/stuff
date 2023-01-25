import stringify from 'fast-stable-stringify';
import {
  Metadata,
  NetworkError,
  Reducers,
  Retriever,
  UpdateCacheAndMetadataReducerProps,
  useCacheResource,
  useCacheStatesFromReducers,
  useMetadata,
  useResourceMetadata,
  useUpdateCache,
  useUpdateCacheAndMetadataReducer,
  useUpdateMetadata,
} from './NetworkCacheProvider';
import { useCallback, useEffect, useMemo } from 'react';
import { useInterval } from '../telemetry/mql/hooks';
import { isTest } from 'testUtils/test-utils';
import { uuidv4 } from 'common/utils';
import logger from 'common/logging/Logger';
import networkMethodRegistry from 'network/NetworkMethodRegistry';
import { newClient } from 'network/clients/ClientFactory';
import { allProperties } from 'common/utils/iterate';
import { recordCounter } from 'common/instrumentation/Instrumentation';

export type NetworkMethod<Params, ResponseBodyType = undefined> = (
  params: Params,
) => Promise<{ data: ResponseBodyType; response: Response } | Response>;

export interface NetworkRequestConfig<Params, ResponseBodyType> {
  method: NetworkMethod<Params, ResponseBodyType>;

  // Typescript voodoo here.
  // If we are using just `Params`, Typescript will sometimes prioritize inferring the Params generic
  // from this field rather than the method field above (which is from the generated client, and thus known).
  // This results in type completions/checking allowing invalid params types since the inference is from
  // whatever is put here. By *design* in Typescript, we can make a lower-priority generic type by
  // combining the generic with the empty object, as we've done with Params here. This fixes our issue.
  // See https://github.com/microsoft/TypeScript/issues/14829#issuecomment-320754731
  params: Params & {};
}

interface BulkNetworkRequest<Params, ResponseBodyType> {
  method: NetworkMethod<Params, ResponseBodyType>;
  params: (Params & {})[]; // see why we do this in the comment above for the `NetworkRequestConfig` interface
}

const onMissingMethodKey = (method: Function) => {
  if (isTest) {
    return uuidv4();
  }
  throw new Error(
    `No method key found for ${method.toString()}. Please create your API client by calling \`buildApiClient\``,
  );
};

const getNetworkCacheKey = <Params, ResponseBodyType>(
  props:
    | NetworkRequestConfig<Params, ResponseBodyType>
    | BulkNetworkRequest<Params, ResponseBodyType>,
) => {
  const { method, params } = props;
  const methodKey = networkMethodRegistry.getOrElse(method, onMissingMethodKey);
  return [methodKey, stringify(params)].join('');
};

// copy-pasted from a generated client so we don't
// have to depend on generated code for this type
export interface GeneratedBaseApiConfig {
  /**
   * Provide a hook for modifying requests before they are sent
   */
  requestInterceptors?: ((
    request: Request,
    operation?: string,
  ) => PromiseLike<Request>)[];

  /**
   * Provide a hook for modifying responses and performing side effects like logging
   */
  responseInterceptors?: ((
    request: Request,
    response: Response,
    operation?: string,
  ) => PromiseLike<Response>)[];

  /**
   * API error handler, called with either a JS error or an error Response
   */
  errorHandler?: (error: Error | Response) => void;
}

export interface DNSNameOverrides {
  [key: string]: string;
}

export interface BaseApiConfig extends GeneratedBaseApiConfig {
  signRequests?: boolean;
  dnsNameOverrides?: DNSNameOverrides;
}

export type ApiClientClass<T> = {
  new (
    fetch: WindowOrWorkerGlobalScope['fetch'],
    basePath: string,
    config?: BaseApiConfig,
  ): T;
};

/**
 * Builds and registers an API client for use with the network hooks.
 *
 * Example:
 * ```ts
 * const pipelineApi = buildApiClient(PipelineApi);
 * const [pipelines] = useNetworkQuery({
 *   method: pipelineApi.listPipelines,
 *   params: { limit: 10 },
 * });
 * ```
 */
function trim(path: string): string {
  const result = path.trim();
  if (result.startsWith('/')) {
    return result.substring(1);
  }
  return result;
}

export function buildApiClient<T>(
  ClientType: ApiClientClass<T>,
  basePath: string,
  baseConfig?: BaseApiConfig,
): T {
  const trimmedPath = trim(basePath);
  const client = newClient(ClientType, trimmedPath, baseConfig);
  registerMethods(client, ClientType, trimmedPath);
  return client;
}

const registerMethods = <T>(
  client: T,
  ClientType: ApiClientClass<T>,
  basePath: string,
) => {
  allProperties(ClientType.prototype)
    .filter((methodName) => methodName !== 'constructor')
    .forEach((methodName) => {
      const bound = (client as any)[methodName];
      networkMethodRegistry.register(
        bound,
        `${basePath}.${ClientType.name}.${methodName}`,
      );
    });
};

export async function normalizeError(
  errorOrResponse: Response | Error,
): Promise<NetworkError> {
  if (errorOrResponse instanceof Error) {
    return new NetworkError(999, {
      message: errorOrResponse.toString() || 'An unexpected error occured.',
    });
  } else {
    try {
      const json = await errorOrResponse.json();
      return new NetworkError(errorOrResponse.status, json);
    } catch (e) {
      return new NetworkError(errorOrResponse.status, {
        message: `Unable to parse the error JSON body ${e}`,
      });
    }
  }
}

interface NetworkResourceReducerConfig<
  Params,
  ResponseBodyType,
  RetrieveType,
  T1,
  T2
> {
  reducers: Reducers<Params, ResponseBodyType, T1, T2>;
  retriever: Retriever<RetrieveType, T1, T2>;
}

type UseNetworkResourceProps<
  Params,
  ResponseBodyType,
  RetrieveType,
  T1,
  T2 = unknown
> = NetworkResourceReducerConfig<
  Params,
  ResponseBodyType,
  RetrieveType,
  T1,
  T2
> &
  NetworkRequestConfig<Params, ResponseBodyType>;

interface UseMaybeMakeRequestProps<
  Params,
  ResponseBodyType,
  RetrieveType,
  T1,
  T2
> extends Omit<
    UseNetworkResourceProps<Params, ResponseBodyType, RetrieveType, T1, T2>,
    'retriever'
  > {
  alwaysThrowError?: boolean;
  dataExpired: boolean;
  expiresLengthMs?: number;
  key: string;
  pageTokenKey: string;
  paginateOptions: PaginateOptions<Params, ResponseBodyType>;
  prevRequestCount: number;
  requestIndex: number;
  updateMetadata: (key: string, value: Partial<Metadata>) => void;
  updateCacheAndMetadataReducer: (
    props: UpdateCacheAndMetadataReducerProps<Params, ResponseBodyType, T1, T2>,
  ) => void;
  wait?: boolean;
}

export type NetworkResponsePromise<T> = Promise<{
  data: T;
  response: Response;
}>;

const defaultExpiresLength = 5 * 60 * 1000; // 5 minutes
const ongoingRequests: { [key: string]: NetworkResponsePromise<any> } = {};

interface PaginateOptions<Params, ResponseBodyType> {
  /**
   * Set to true if the `refreshRateMs` paramter should also update all the pages.
   */
  autoUpdatePages?: boolean;

  /**
   * Set to true to exhaustively paginate this request. Be careful to know approximately how many
   * pages this will download, so users don't get stuck downloading hundreds of pages.
   */
  exhaustive?: boolean;

  /**
   * A custom config if the API does not conform to the OCI-standard `page=<token>` query param,
   * or the standard opc-next-page header pattern.
   */
  customPageConfig?: {
    /**
     * Config for modifying the `page=<token>` request query parameter convention
     */
    requestConfig?: {
      /**
       * Function that takes the a page token and the params, and allows the user
       * to customize where in the params the next page token should be placed. By default,
       * this gets assigned to the `page` parameter.
       */
      appendPageToken: (
        pageToken: string | undefined,
        params: Params,
      ) => Params;

      /**
       * Function that returns the current page token (or undefined if there is none) for the
       * given set of params
       */
      pageTokenFromParams: (params: Params) => string | undefined;
    };

    /**
     * Config for modifying the `opc-next-page` response header convention
     */
    responseConfig?: {
      /**
       * Optional function that takes response data and headers, and returns a previous page
       * token if one exists. The default is to use the opc-previous-page header
       */
      previousPageFromResponse?: (params: {
        data: ResponseBodyType | undefined;
        headers: { [key: string]: string };
        requestParams: Params;
      }) => string | undefined;

      /**
       * Optional function that takes response data and headers, and returns a next page
       * token if one exists. The default is to use the opc-next-page header
       */
      nextPageFromResponse?: (params: {
        data: ResponseBodyType | undefined;
        headers: { [key: string]: string };
        requestParams: Params;
      }) => string | undefined;
    };
  };
}

interface TokenCacheItem {
  hasError: boolean;
  needsRefetch: boolean;
  prevToken?: string;
  nextToken?: string;
}

interface TokenCache {
  [pageToken: string]: TokenCacheItem;
}

const pageTokensCache: { [baseNetworkKey: string]: TokenCache } = {};

/**
 * `page` is the default
 */
const getPageTokenFromParams = <Params, ResponseBodyType>(
  params: Params,
  paginateOptions: PaginateOptions<Params, ResponseBodyType>,
) => {
  const { customPageConfig } = paginateOptions;
  return customPageConfig?.requestConfig?.pageTokenFromParams
    ? customPageConfig.requestConfig.pageTokenFromParams(params)
    : (params as any).page;
};

const getParamsWithToken = <Params, ResponseBodyType>(
  params: Params,
  token: string | undefined,
  paginateOptions: PaginateOptions<Params, ResponseBodyType>,
) => {
  const { customPageConfig } = paginateOptions;

  return customPageConfig?.requestConfig?.appendPageToken
    ? customPageConfig.requestConfig.appendPageToken(token, params)
    : { ...params, page: token };
};

const isResponse = (obj: any): obj is Response => obj instanceof Response;

const maybeMakeRequest = <Params, ResponseBodyType, RetrieveType, T1, T2>(
  props: UseMaybeMakeRequestProps<
    Params,
    ResponseBodyType,
    RetrieveType,
    T1,
    T2
  >,
): NetworkResponsePromise<ResponseBodyType> | undefined => {
  const {
    alwaysThrowError,
    dataExpired,
    expiresLengthMs,
    key,
    method,
    params,
    pageTokenKey,
    paginateOptions,
    prevRequestCount,
    reducers,
    requestIndex,
    updateMetadata,
    updateCacheAndMetadataReducer,
  } = props;

  let ongoingRequest = ongoingRequests[key];
  if (!ongoingRequest && dataExpired) {
    // this calls `dispatch()` during render on GET methods... is that ok?!?
    updateMetadata(key, {
      loading: true,
      requestCount: prevRequestCount + 1,
    });

    const promise = method(params);
    ongoingRequest = promise.then(
      async (objOrResponse) => {
        delete ongoingRequests[key];

        let data: ResponseBodyType | undefined;
        let response: Response;

        if (isResponse(objOrResponse)) {
          response = objOrResponse;
          if (response.body) {
            const responseText = await response.text();
            try {
              data = JSON.parse(responseText);
            } catch (e) {
              data = responseText as any;
            }
          }
        } else {
          data = objOrResponse.data;
          response = objOrResponse.response;
        }

        const headers: { [key: string]: string } = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });

        const now = Date.now();
        const metadata = {
          headers,
          expiresAt: now + (expiresLengthMs || defaultExpiresLength),
          networkError: undefined,
          lastUpdated: now,
          loading: false,
        };

        if (response && response.ok && response.body) {
          const { customPageConfig } = paginateOptions;

          const getPrevPage =
            customPageConfig?.responseConfig?.previousPageFromResponse;
          const prevPageToken = getPrevPage
            ? getPrevPage({ data, headers, requestParams: params })
            : headers['opc-previous-page'];

          const getNextPage =
            customPageConfig?.responseConfig?.nextPageFromResponse;
          const nextPageToken = getNextPage
            ? getNextPage({ data, headers, requestParams: params })
            : headers['opc-next-page'];

          const currentPageToken = getPageTokenFromParams(
            params,
            paginateOptions,
          );

          // add prev and next page tokens to the cache for this token
          if (!pageTokensCache[pageTokenKey]) {
            pageTokensCache[pageTokenKey] = {};
          }

          const tokenCache = pageTokensCache[pageTokenKey];

          tokenCache[currentPageToken] = {
            hasError: false,
            needsRefetch: false,
            prevToken: prevPageToken,
            nextToken: nextPageToken,
          };

          updateCacheAndMetadataReducer({
            metadata,
            params,
            reducers,
            requestIndex,
            metadataKey: key,
            responseData: data,
          });
        } else {
          updateMetadata(key, metadata);
        }

        return { data, response };
      },
      async (errorOrResponse: Response | Error) => {
        delete ongoingRequests[key];

        const currentPageToken = getPageTokenFromParams(
          params,
          paginateOptions,
        );

        // add prev and next page tokens to the cache for this token
        if (!pageTokensCache[pageTokenKey]) {
          pageTokensCache[pageTokenKey] = {};
        }

        const tokenCache = pageTokensCache[pageTokenKey];

        tokenCache[currentPageToken] = {
          hasError: false,
          needsRefetch: false,
        };

        const networkError = await normalizeError(errorOrResponse);
        recordCounter('dope.network-hooks.networkError', {
          message: networkError.message,
          status: `${networkError.status}`,
          key,
        });

        const headers: { [key: string]: string } = {};
        if (errorOrResponse instanceof Response) {
          errorOrResponse.headers.forEach((value, key) => {
            headers[key] = value;
          });
        }

        updateMetadata(key, {
          headers,
          networkError,
          loading: false,
          expiresAt: Date.now() + (expiresLengthMs || defaultExpiresLength),
        });

        if (!alwaysThrowError && errorOrResponse instanceof Response) {
          return { data: undefined, response: errorOrResponse };
        }

        logger.error('Network error in hook: {}', networkError);
        throw networkError;
      },
    );

    ongoingRequests[key] = ongoingRequest;
  }

  return ongoingRequest;
};

const defaultPollingMs = 5000;
export interface NetworkOptions<Params, ResponseBodyType> {
  /**
   * Optional cache/metadata expiry duration (in milliseconds)
   */
  expiresLengthMs?: number;

  /**
   * Optional options for paginating this query.
   */
  paginateOptions?: PaginateOptions<Params, ResponseBodyType>;

  /**
   * The network query will be kicked off at the millisecond interval given, and update the
   * data returned by the hooks.
   */
  refreshRateMs?: number;

  /**
   * Poll the resource until at {refreshRateMs || defaultPollingMs} interval until the resource
   * fetch successfully.
   */
  pollUntilSuccess?: boolean;

  /**
   * Set to true if you are not ready to kick off this request yet. This is helpful if you
   * want to use the results of a previous query as inputs to this query, but the data hasn't
   * loaded yet.
   */
  wait?: boolean;
}

export const makeNetworkResourceConfig = <
  Params,
  ResponseBodyType,
  RetrieveType,
  T1,
  T2
>(
  props:
    | UseNetworkResourceProps<Params, ResponseBodyType, RetrieveType, T1, T2>
    | UseBulkNetworkResourceProps<
        Params,
        ResponseBodyType,
        RetrieveType,
        T1,
        T2
      >,
) => props;

// remove the page param from the config and get a new cacheKey to grab base request's nextPageTokens
const getPageTokenCacheKey = <Params, ResponseBodyType>(
  config:
    | NetworkRequestConfig<Params, ResponseBodyType>
    | BulkNetworkRequest<Params, ResponseBodyType>,
  networkOptions: NetworkOptions<Params, ResponseBodyType>,
): string => {
  const { paginateOptions = {} } = networkOptions;

  let pageTokenKey: string;
  if (Array.isArray(config.params)) {
    const modifiedParams = config.params.map((p) => {
      const nextParams = getParamsWithToken(p, undefined, paginateOptions);
      return nextParams;
    });
    pageTokenKey = getNetworkCacheKey({ ...config, params: modifiedParams });
  } else {
    const baseParams = getParamsWithToken(
      config.params,
      undefined,
      paginateOptions,
    );

    pageTokenKey = getNetworkCacheKey({ ...config, params: baseParams });
  }

  return pageTokenKey;
};

interface UseNetworkReturnType<ResponseBodyType, RetrieveType> {
  maybeResource: RetrieveType | undefined;
  ongoingRequest?: NetworkResponsePromise<ResponseBodyType> | undefined;
  refetch: () => void;
  refetchAllPages: () => void;
  resourceMetadata?: Metadata | undefined;
}

const useNetwork = <Params, ResponseBodyType, RetrieveType, T1, T2>(
  config: UseNetworkResourceProps<
    Params,
    ResponseBodyType,
    RetrieveType,
    T1,
    T2
  >,
  networkOptions: NetworkOptions<Params, ResponseBodyType> = {},
): UseNetworkReturnType<ResponseBodyType, RetrieveType> => {
  const {
    paginateOptions = {},
    expiresLengthMs,
    refreshRateMs,
    pollUntilSuccess,
    wait,
  } = networkOptions;
  const { method, params, reducers, retriever } = config;

  const key = getNetworkCacheKey(config);
  const maybeResource = useCacheResource({ reducers, retriever });
  const resourceMetadata = useResourceMetadata(key);

  const updateMetadata = useUpdateMetadata();
  const updateCacheAndMetadataReducer = useUpdateCacheAndMetadataReducer<
    Params,
    ResponseBodyType,
    T1,
    T2
  >();

  const refetch = useCallback(() => updateMetadata(key, { expiresAt: 0 }), [
    key,
    updateMetadata,
  ]);

  const refetchAllPages = useCallback(() => {
    // mark all pages dirty
    const tokenCache = pageTokensCache[key];
    if (tokenCache) {
      Object.values(tokenCache).forEach((t) => (t.needsRefetch = true));
    }

    // refetch base page to kick off all pages
    refetch();
  }, [key, refetch]);

  // Refresh either until success, or at regular refreshRateMs interval
  const refreshInterval = wait
    ? undefined
    : pollUntilSuccess
    ? maybeResource
      ? null
      : refreshRateMs || defaultPollingMs
    : refreshRateMs;

  const cancelRefresh = resourceMetadata.networkError?.status === 429;

  // autorefresh by modifying the expiresAt time (which rekicks off requests as needed)
  useInterval(
    paginateOptions.autoUpdatePages ? refetchAllPages : refetch,
    cancelRefresh ? null : refreshInterval,
  );

  if (wait) {
    return { maybeResource, refetch, refetchAllPages };
  }

  // When there isn't a request already inflight and we've exceeded our expriry time, kick off a new request.
  let dataExpired = true;
  if (resourceMetadata && resourceMetadata.expiresAt) {
    dataExpired = Date.now() > resourceMetadata.expiresAt;
  }

  const pageTokenKey = getPageTokenCacheKey(config, networkOptions);

  const ongoingRequest = maybeMakeRequest({
    dataExpired,
    expiresLengthMs,
    key,
    method,
    params,
    pageTokenKey,
    paginateOptions,
    reducers,
    updateMetadata,
    updateCacheAndMetadataReducer,
    prevRequestCount: resourceMetadata?.requestCount || 0,
    requestIndex: 0,
  });

  return {
    maybeResource,
    ongoingRequest,
    resourceMetadata,
    refetch,
    refetchAllPages,
  };
};

export function useSuspenseNetworkResource<
  Params,
  ResponseBodyType,
  RetrieveType,
  T1,
  T2
>(
  config: UseNetworkResourceProps<
    Params,
    ResponseBodyType,
    RetrieveType,
    T1,
    T2
  >,
  networkOptions?: NetworkOptions<Params, ResponseBodyType>,
): Readonly<RetrieveType> {
  const { maybeResource, ongoingRequest, resourceMetadata } = useNetwork(
    config,
    networkOptions,
  );

  // once a request has been conditionally kicked off, see if we have cached already, and return it if we do.
  if (maybeResource) {
    return maybeResource;
  }

  // if we don't have cached data yet but we have an ongoing request, throw the promise to suspend
  if (ongoingRequest && typeof ongoingRequest.then === 'function') {
    throw ongoingRequest;
  }

  // if there's no resource and no ongoing request, check for an error to throw
  if (resourceMetadata && resourceMetadata.networkError) {
    throw resourceMetadata.networkError;
  }

  // I don't think we should ever reach this unless a network response comes back empty
  // TODO: Rethink the ramifications of this
  throw new Error(
    `Could not find resource, create a request, or find an error for config: ${stringify(
      config,
    )}`,
  );
}

export interface NetworkResponseProps {
  anyPagesLoading: () => boolean;
  error: NetworkError | undefined;
  headers: { [key: string]: string } | undefined;
  lastUpdated: number;
  loading: boolean;
  fetchNextPage?: () => Promise<unknown>;
  refetchAllPages: () => void;
  refetch: () => void;
  requestCount: number;
}

export type BulkResponseProps = Omit<
  NetworkResponseProps,
  'anyPagesLoading' | 'refetchAllPages'
>;

export type OptionalNetworkResource<RetrieveType> = [
  Readonly<RetrieveType> | undefined,
  NetworkResponseProps,
];
export type OptionalBulkNetworkResource<RetrieveType> = [
  RetrieveType | undefined,
  BulkResponseProps[],
];

const findLoadingPages = <Params, ResponseBodyType, RetrieveType, T1, T2>(
  key: string,
  config: UseNetworkResourceProps<
    Params,
    ResponseBodyType,
    RetrieveType,
    T1,
    T2
  >,
  paginateOptions: PaginateOptions<Params, ResponseBodyType>,
) => {
  const currentPage = getPageTokenFromParams(config.params, paginateOptions);
  const pageTokens = pageTokensCache[key] || {};

  let anyPagesLoading = false;
  let nextPageToken = (pageTokens[currentPage] || {}).nextToken;
  while (nextPageToken) {
    const nptParams = getParamsWithToken(
      config.params,
      nextPageToken,
      paginateOptions,
    );

    const nptCacheKey = getNetworkCacheKey({ ...config, params: nptParams });

    if (
      ongoingRequests[nptCacheKey] &&
      typeof ongoingRequests[nptCacheKey].then === 'function'
    ) {
      anyPagesLoading = true;
    }

    // Traverse to the latest page we have if we have visited this token and there's another
    // next-page token for the one in our traversal. Otherwise, break out of the loop, we've
    // already found our furthest one.
    const nptCache = pageTokens[nextPageToken];
    if (nptCache) {
      if (nextPageToken === nptCache.nextToken) {
        break;
      } else {
        nextPageToken = nptCache.nextToken;
      }
    } else {
      break;
    }
  }

  return anyPagesLoading;
};

/**
 * This is an "advanced mode" network query which allows you finer-grained control over the local store related to
 * your network calls. The network resource store works in much the same way as a Redux store. If you're not familiar
 * with Redux, we suggest reading its excellent documentation:
 * https://redux.js.org/tutorials/fundamentals/part-4-store
 *
 * The main reason you might want to choose `useNetworkResource` over `useNetworkQuery` is if you have a page
 * that will be fetching, updating, and deleting items. If you write your code with `useNetworkQuery`, and then you
 * perform an API call that deletes an item (for example, by clicking a big red "delete" button on the page and
 * sending off some DELETE HTTP call), then the app in your browser will have no way of knowing that the item has been
 * deleted (since you used `useNetworkQuery` on page load to perform a GET request, and that data is still in memory).
 * In this case, you'll be forced to perform another GET to refresh the data on the page.
 *
 * Rather than perform unnecessary HTTP calls, we can hook up some network hooks to some reducers and the in-memory
 * state of the javascript application will match the state on the server without any extra HTTP calls.
 *
 * For a simple example of a GET/POST/DELETE flow, see:
 * https://bitbucket.oci.oraclecorp.com/projects/DOPE/repos/dope/browse/src/frontpage/hooks.tsx
 */
export function useNetworkResource<
  Params,
  ResponseBodyType,
  RetrieveType,
  T1,
  T2
>(
  config: UseNetworkResourceProps<
    Params,
    ResponseBodyType,
    RetrieveType,
    T1,
    T2
  >,
  networkOptions?: NetworkOptions<Params, ResponseBodyType>,
): OptionalNetworkResource<RetrieveType> {
  const {
    maybeResource,
    ongoingRequest,
    refetch,
    refetchAllPages,
    resourceMetadata,
  } = useNetwork(config, networkOptions);

  const hasOngoingRequest =
    !!ongoingRequest && typeof ongoingRequest.then === 'function';
  const metadataLoading = !!resourceMetadata && resourceMetadata.loading;

  const loading = !!(hasOngoingRequest || metadataLoading);
  const error = resourceMetadata && resourceMetadata.networkError;
  const headers = resourceMetadata?.headers;
  const lastUpdated = resourceMetadata?.lastUpdated || 0;
  const requestCount = resourceMetadata?.requestCount || 0;

  const { paginateOptions = {} } = networkOptions || {};

  // look up lastest next page token, and use it for `fetchNextPage`
  const key = getNetworkCacheKey(config);

  const pageTokens = pageTokensCache[key] || {};
  const currentPage = getPageTokenFromParams(config.params, paginateOptions);

  // Traverse to the latest page we have that is dirty if we have visited this token and
  // there's another next-page token for the one in our traversal. Otherwise, break out
  // of the loop, we've already found our furthest one.
  let nextPageToken = currentPage;
  do {
    const nptCache = pageTokens[nextPageToken];
    if (nptCache && !nptCache.needsRefetch && !nptCache.hasError) {
      // if the next token is the same, break to prevent an infinite loop
      if (nextPageToken === nptCache.nextToken) {
        break;
      } else {
        nextPageToken = nptCache.nextToken;
      }
    } else {
      break;
    }
  } while (nextPageToken);

  const anyPagesLoading = () => findLoadingPages(key, config, paginateOptions);

  const pageFetcher = useMutateResource(config, networkOptions);
  const fetchNextPage = useMemo(
    () =>
      nextPageToken && nextPageToken !== currentPage
        ? () => {
            const nextPageParams = getParamsWithToken(
              config.params,
              nextPageToken,
              paginateOptions,
            );

            return pageFetcher(nextPageParams);
          }
        : undefined,
    [currentPage, config.params, nextPageToken, pageFetcher, paginateOptions],
  );

  useEffect(() => {
    if (paginateOptions.exhaustive && fetchNextPage) {
      fetchNextPage();
    }
  }, [paginateOptions.exhaustive, fetchNextPage]);

  return [
    maybeResource,
    {
      anyPagesLoading,
      error,
      fetchNextPage,
      headers,
      lastUpdated,
      loading,
      refetch,
      refetchAllPages,
      requestCount,
    },
  ];
}

type UseBulkNetworkResourceProps<
  Params,
  ResponseBodyType,
  RetrieveType,
  T1,
  T2 = unknown
> = NetworkResourceReducerConfig<
  Params,
  ResponseBodyType,
  RetrieveType,
  T1,
  T2
> &
  BulkNetworkRequest<Params, ResponseBodyType>;

export const makeBulkNetworkResourceConfig = <
  Params,
  ResponseBodyType,
  RetrieveType,
  T1,
  T2
>(
  props: UseBulkNetworkResourceProps<
    Params,
    ResponseBodyType,
    RetrieveType,
    T1,
    T2
  >,
) => props;

type RequestAndMetadata<ResponseBodyType> = [
  NetworkResponsePromise<ResponseBodyType> | undefined,
  Metadata,
  () => void,
];

const useBulkNetwork = <Params, ResponseBodyType, RetrieveType, T1, T2>(
  config: UseBulkNetworkResourceProps<
    Params,
    ResponseBodyType,
    RetrieveType,
    T1,
    T2
  >,
  networkOptions: NetworkOptions<Params, ResponseBodyType> = {},
): [
  RetrieveType | undefined,
  RequestAndMetadata<ResponseBodyType>[] | undefined,
] => {
  const {
    paginateOptions = {},
    expiresLengthMs,
    refreshRateMs,
    pollUntilSuccess,
    wait,
  } = networkOptions;
  const { method, params: paramsList, reducers, retriever } = config;

  const networkMetadata = useMetadata();
  // There is something wrong the typing here. This should be an array of
  const maybeResource = (useCacheResource({
    reducers,
    retriever,
  }) as unknown) as MaybeGenericResources<RetrieveType>;

  const cancelRefresh = paramsList
    .map((params) => {
      const resourceMetadata =
        networkMetadata[getNetworkCacheKey({ method, params })];
      return resourceMetadata?.networkError;
    })
    .some((error) => error?.status === 429);

  const updateMetadata = useUpdateMetadata();
  const updateCacheAndMetadataReducer = useUpdateCacheAndMetadataReducer<
    Params,
    ResponseBodyType,
    T1,
    T2
  >();

  // Refresh either until success, or at regular refreshRateMs interval
  const refreshInterval = wait
    ? undefined
    : pollUntilSuccess
    ? maybeResource?.filter(Boolean).length === paramsList.length
      ? null
      : refreshRateMs || defaultPollingMs
    : refreshRateMs;

  // autorefresh by modifying the expiresAt time of each requests (which rekicks off requests as needed)
  useInterval(
    () => {
      paramsList.forEach((params, i) => {
        if (!pollUntilSuccess || !maybeResource?.[i]) {
          const key = getNetworkCacheKey({ method, params });
          updateMetadata(key, { expiresAt: 0 });
        }
      });
    },
    cancelRefresh ? null : refreshInterval,
  );

  if (wait) {
    return [(maybeResource as unknown) as RetrieveType, undefined];
  }

  const requestsAndMetadata = paramsList.map((params, requestIndex) => {
    const key = getNetworkCacheKey({ method, params });
    const resourceMetadata = networkMetadata[key];

    // When there isn't a request already inflight and we've exceeded our expriry time, kick off a new request.
    let dataExpired = true;
    if (resourceMetadata && resourceMetadata.expiresAt) {
      dataExpired = Date.now() > resourceMetadata.expiresAt;
    }

    const refetch = () => updateMetadata(key, { expiresAt: 0 });

    const pageTokenKey = getPageTokenCacheKey(config, networkOptions);

    const ongoingRequest = maybeMakeRequest({
      dataExpired,
      expiresLengthMs,
      key,
      method,
      params,
      pageTokenKey,
      paginateOptions,
      reducers,
      requestIndex,
      updateMetadata,
      updateCacheAndMetadataReducer,
      prevRequestCount: resourceMetadata?.requestCount || 0,
    });

    return [
      ongoingRequest,
      resourceMetadata,
      refetch,
    ] as RequestAndMetadata<ResponseBodyType>;
  });

  return [(maybeResource as unknown) as RetrieveType, requestsAndMetadata];
};

export function useBulkNetworkResource<
  Params,
  ResponseBodyType,
  RetrieveType,
  T1,
  T2
>(
  config: UseBulkNetworkResourceProps<
    Params,
    ResponseBodyType,
    RetrieveType,
    T1,
    T2
  >,
  networkOptions?: NetworkOptions<Params, ResponseBodyType>,
): OptionalBulkNetworkResource<RetrieveType> {
  const [maybeResource, requestsAndMetadata = []] = useBulkNetwork(
    config,
    networkOptions,
  );

  const errorLoading = requestsAndMetadata.map(
    ([ongoingRequest, resourceMetadata, refetch]) => {
      const hasOngoingRequest =
        !!ongoingRequest && typeof ongoingRequest.then === 'function';
      const metadataLoading = !!resourceMetadata && resourceMetadata.loading;

      const loading = !!(hasOngoingRequest || metadataLoading);
      const error = resourceMetadata && resourceMetadata.networkError;
      const lastUpdated = resourceMetadata?.lastUpdated || 0;
      const headers = resourceMetadata?.headers;
      const requestCount = resourceMetadata?.requestCount;

      return {
        error,
        headers,
        lastUpdated,
        loading,
        refetch,
        requestCount,
        anyPagesLoading: () => false,
      };
    },
  );

  return [maybeResource, errorLoading];
}

const queryCacheKey = '__!_queries_!__';
interface QueryCacheState {
  [networkCacheKey: string]: unknown;
}

/**
 * Looks for cached data for the given network query, returns it if it exists, and makes a network
 * query to either load or refresh the specified data from the backend. This simply returns exactly
 * what the network query itself returns, no normalization reducers or retrievers are provided
 * (see `useNetworkResource` to use these features).
 *
 * Example:
 * ```ts
 * const [pipelines, { error, loading }] = useNetworkQuery({
 *   method: pipelineApi.listPipelines,
 *   params: { limit: 10 },
 * });
 * ```
 */
export function useNetworkQuery<Params, ResponseBodyType>(
  config: NetworkRequestConfig<Params, ResponseBodyType>,
  networkOptions?: NetworkOptions<Params, ResponseBodyType>,
): OptionalNetworkResource<ResponseBodyType> {
  const key = getNetworkCacheKey(config);
  const paginateOptions = networkOptions?.paginateOptions || {};
  const currentPage = getPageTokenFromParams(config.params, paginateOptions);

  const networkConfig: UseNetworkResourceProps<
    Params,
    ResponseBodyType,
    ResponseBodyType,
    QueryCacheState
  > = {
    ...config,
    reducers: [
      {
        cacheKey: queryCacheKey,
        store: (prevState: QueryCacheState = {}, data, { params }) => {
          const storeKey = getNetworkCacheKey({ ...config, params });
          return {
            ...prevState,
            [storeKey]: data,
          };
        },
      },
    ],
    retriever: (queryCacheState = {}) => {
      const baseData = queryCacheState[key] as ResponseBodyType;
      if (!Array.isArray(baseData)) {
        return baseData;
      }

      const tokenCache = pageTokensCache[key] || {};

      let nextPageToken = (tokenCache[currentPage] || {}).nextToken;
      if (!nextPageToken) {
        return baseData;
      }

      // grab all pages
      const additionalData: unknown[] = [...baseData];
      while (nextPageToken) {
        const pageParams = getParamsWithToken(
          config.params,
          nextPageToken,
          paginateOptions,
        );

        const pageKey = getNetworkCacheKey({ ...config, params: pageParams });
        const pageData = queryCacheState[pageKey];

        if (pageData && Array.isArray(pageData) && pageData.length > 0) {
          additionalData.push(...pageData);
        }

        // don't infinitely loop if they're the same
        const potentialNextToken: string | undefined =
          tokenCache[nextPageToken]?.nextToken;

        nextPageToken =
          potentialNextToken === nextPageToken ? undefined : potentialNextToken;
      }

      // We already know ResponseBodyType is an array, so this is ok
      return (additionalData as unknown) as ResponseBodyType;
    },
  };

  return useNetworkResource(networkConfig, networkOptions);
}

export type MaybeGenericResources<T> = (T | undefined)[];
export type OptionalBulkNetworkResponses<ResponseBodyType> = [
  MaybeGenericResources<ResponseBodyType>,
  BulkResponseProps[],
];

export function useBulkNetworkQuery<Params, ResponseBodyType>(
  config: BulkNetworkRequest<Params, ResponseBodyType>,
  networkOptions?: NetworkOptions<Params, ResponseBodyType>,
): OptionalBulkNetworkResponses<ResponseBodyType> {
  const keys = config.params.map((params) =>
    getNetworkCacheKey({ params, method: config.method }),
  );

  type MaybeResources = MaybeGenericResources<ResponseBodyType>;
  const reducerConfig: UseBulkNetworkResourceProps<
    Params,
    ResponseBodyType,
    MaybeResources,
    QueryCacheState
  > = {
    ...config,
    reducers: [
      {
        cacheKey: queryCacheKey,
        store: (prevState: QueryCacheState, data, { requestIndex }) => {
          const key = keys[requestIndex];
          return { ...prevState, [key]: data };
        },
      },
    ],
    retriever: (queryCacheState = {}) =>
      keys.map((key) => queryCacheState[key] as ResponseBodyType),
  };

  const [maybeResources = [], requestsAndMetadata = []] = useBulkNetwork(
    reducerConfig,
    networkOptions,
  );
  const networkStates = requestsAndMetadata.map(
    ([, resourceMetadata, refetch]) => {
      const loading = !!(resourceMetadata && resourceMetadata.loading);
      const error = resourceMetadata && resourceMetadata.networkError;
      const headers = resourceMetadata?.headers;
      const lastUpdated = resourceMetadata?.lastUpdated || 0;
      const requestCount = resourceMetadata?.requestCount;

      return {
        error,
        headers,
        lastUpdated,
        loading,
        refetch,
        requestCount,
      };
    },
  );

  return [maybeResources, networkStates];
}

interface OptimisticUpdateConfig<Params, ResponseBodyType, T1, T2> {
  getOptimisticUpdateData: (params: Params) => Partial<ResponseBodyType>;
  optimisticReducers: Reducers<Params, Partial<ResponseBodyType>, T1, T2>;
}

interface UseMutateResourceProps<Params, ResponseBodyType, T1, T2> {
  method: NetworkMethod<Params, ResponseBodyType>;

  /**
   * If given, we will perform optimistic updates and rollbacks for this mutations.
   */
  optimisticUpdateConfig?: OptimisticUpdateConfig<
    Params,
    ResponseBodyType,
    T1,
    T2
  >;

  reducers: Reducers<Params, ResponseBodyType, T1, T2>;
}

export const useMutateResource = <Params, ResponseBodyType, T1, T2>(
  props: UseMutateResourceProps<Params, ResponseBodyType, T1, T2>,
  networkOptions: Pick<
    NetworkOptions<Params, ResponseBodyType>,
    'paginateOptions'
  > = {},
) => {
  const { method, optimisticUpdateConfig, reducers } = props;
  const { paginateOptions } = networkOptions;

  const updateMetadata = useUpdateMetadata();
  const updateCacheAndMetadataReducer = useUpdateCacheAndMetadataReducer<
    Params,
    ResponseBodyType,
    T1,
    T2
  >();

  const optimisticUpdateCacheAndMetadataReducer = useUpdateCacheAndMetadataReducer<
    Params,
    Partial<ResponseBodyType>,
    T1,
    T2
  >();

  const updateCache = useUpdateCache();

  // track prev part of the state for optimistic updates and rollbacks
  const optimisticUpdateReducers =
    optimisticUpdateConfig && optimisticUpdateConfig.optimisticReducers;
  const rollbackStates = useCacheStatesFromReducers(optimisticUpdateReducers);

  // destructure these into separate variables so we can use them
  // individually as useCallback dependencies. Otherwise, we'll
  // always create a new function
  const [cacheKey1, cacheKey2] = rollbackStates.keys;
  const [cacheState1, cacheState2] = rollbackStates.states;

  return useCallback(
    (params: Params): NetworkResponsePromise<ResponseBodyType> => {
      const keyConfig = { method, params };
      const key = getNetworkCacheKey(keyConfig);
      const pageTokenKey = getPageTokenCacheKey(
        keyConfig,
        paginateOptions ? { paginateOptions } : {},
      );

      // optimistically update
      if (optimisticUpdateConfig) {
        const {
          getOptimisticUpdateData,
          optimisticReducers,
        } = optimisticUpdateConfig;

        const optimisticUpdateData = getOptimisticUpdateData(params);
        if (optimisticUpdateData) {
          optimisticUpdateCacheAndMetadataReducer({
            params,
            reducers: optimisticReducers,
            metadata: {},
            metadataKey: key,
            requestIndex: 0,
            responseData: optimisticUpdateData,
          });
        }
      }

      // kick off request
      const maybeOngoingRequest = maybeMakeRequest({
        key,
        method,
        params,
        pageTokenKey,
        reducers,
        updateMetadata,
        updateCacheAndMetadataReducer,
        alwaysThrowError: true,
        dataExpired: true,
        paginateOptions: paginateOptions || {},
        prevRequestCount: 0,
        requestIndex: 0,
      });

      if (!maybeOngoingRequest) {
        throw new Error(
          'We did not make a request for some reason, throwing...',
        );
      }

      // rollback our optimistic update if the request didn't succeed
      if (optimisticUpdateConfig) {
        maybeOngoingRequest.catch(() => {
          const updates: { [key: string]: unknown } = {};
          if (cacheKey1 && cacheState1) {
            updates[cacheKey1] = cacheState1;
          }
          if (cacheKey2 && cacheState2) {
            updates[cacheKey2] = cacheState2;
          }

          updateCache(updates);
        });
      }

      return maybeOngoingRequest;
    },
    [
      cacheKey1,
      cacheKey2,
      cacheState1,
      cacheState2,
      method,
      paginateOptions,
      reducers,
      optimisticUpdateCacheAndMetadataReducer,
      optimisticUpdateConfig,
      updateCache,
      updateCacheAndMetadataReducer,
      updateMetadata,
    ],
  );
};
