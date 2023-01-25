import { Intent } from 'dope-uikit';
import { useCallback } from 'react';
import Toaster from 'common/toaster';
import {
  NetworkMethod,
  NetworkOptions,
  NetworkResponsePromise,
  useBulkNetworkResource,
  useMutateResource,
  useNetworkResource,
} from './network-hooks';
import { Reducers } from './NetworkCacheProvider';
import { useDeepMemo } from 'common/hooks';

export enum InsertPosition {
  Head,
  Tail,
}

interface CreateResourceConfig<
  ListParams,
  ListReturnType,
  GetParams,
  GetReturnType,
  CreateParams,
  CreateReturnType,
  DeleteParams,
  DeleteReturnType,
  UpdateParams,
  UpdateReturnType
> {
  createMethod: NetworkMethod<CreateParams, CreateReturnType>;
  deleteMethod: NetworkMethod<DeleteParams, DeleteReturnType>;
  listMethod: NetworkMethod<ListParams, ListReturnType[]>;
  getMethod: NetworkMethod<GetParams, GetReturnType>;
  updateMethod: NetworkMethod<UpdateParams, UpdateReturnType>;

  // Ex. an alarm response will always have a project, fleet, and compartmentId, so
  // right now it will only get added to a listKey that defines all of them. Instead, we
  // should allow an arbitrary number of strings like
  // ['compartmentId', 'compartmentId-project', 'compartmentId-project-fleet'], and add our
  // ID to any of the combinations that exist
  getKeysFromResponse: (
    data: CreateReturnType | GetReturnType | UpdateReturnType,
    params: CreateParams | GetParams | UpdateParams,
  ) => string[];
  getKeyFromListParams: (params: ListParams) => string;

  getIdFromResponse: (
    data: CreateReturnType | ListReturnType | GetReturnType | UpdateReturnType,
    params: CreateParams | ListParams | GetParams | UpdateParams,
  ) => string;
  getIdFromParams: (params: GetParams | UpdateParams | DeleteParams) => string;
  insertAt: InsertPosition;

  /**
   * Type-guard to check if a returned type has the details or only the description
   */
  isDetailType: (
    data: CreateReturnType | ListReturnType | GetReturnType | UpdateReturnType,
  ) => data is GetReturnType;

  // functions for optimistic updates
  getOptimisticUpdateData?: (params: UpdateParams) => Partial<UpdateReturnType>;
}

/**
 * List of ids mapped to a listKey, retrieved from the response of params through
 * `getKeyFromResponse` and `getKeyFromParams`.
 */
export interface GenericListStore {
  [listKey: string]: string[];
}

export interface GenericNormalizedStore<
  CreateReturnType,
  ListReturnType,
  GetReturnType,
  UpdateReturnType
> {
  [id: string]:
    | CreateReturnType
    | ListReturnType
    | GetReturnType
    | UpdateReturnType;
}

interface UpdateConfig {
  skipOptimisticUpdate?: boolean;
}

const generateListCacheKey = (resourceName: string) => `${resourceName}ListIds`;
const generateIdMapCacheKey = (resourceName: string) => `${resourceName}IdMap`;

// keep track of resource names so we can throw if we get a duplicate
const resourceNames = new Set<string>();

export const createResource = <
  ListParams,
  ListReturnType,
  GetParams,
  GetReturnType,
  CreateParams,
  CreateReturnType,
  DeleteParams,
  DeleteReturnType,
  UpdateParams,
  UpdateReturnType
>(
  resourceName: string,
  config: CreateResourceConfig<
    ListParams,
    ListReturnType,
    GetParams,
    GetReturnType,
    CreateParams,
    CreateReturnType,
    DeleteParams,
    DeleteReturnType,
    UpdateParams,
    UpdateReturnType
  >,
) => {
  if (resourceNames.has(resourceName)) {
    throw new Error(
      `'${resourceName}' is already being used, pick another resourceName`,
    );
  }
  resourceNames.add(resourceName);

  const {
    isDetailType,
    getKeyFromListParams,
    getKeysFromResponse,
    getIdFromParams,
    getIdFromResponse,
    getOptimisticUpdateData,
    insertAt,
    createMethod,
    deleteMethod,
    listMethod,
    getMethod,
    updateMethod,
  } = config;

  type IdMapStore = GenericNormalizedStore<
    CreateReturnType,
    ListReturnType,
    GetReturnType,
    UpdateReturnType
  >;

  const listCacheKey = generateListCacheKey(resourceName);
  const idMapCacheKey = generateIdMapCacheKey(resourceName);

  const listReducers: Reducers<
    ListParams,
    ListReturnType[],
    GenericListStore | undefined,
    IdMapStore | undefined
  > = [
    {
      cacheKey: listCacheKey,
      store: (prevState: GenericListStore = {}, data = [], { params }) => {
        const listKey = getKeyFromListParams(params);
        const prevIds = prevState[listKey] || [];
        const nextIds = data.map((v) => getIdFromResponse(v, params));

        const deduped = new Set<string>();
        prevIds.forEach((id) => deduped.add(id));
        nextIds.forEach((id) => deduped.add(id));

        const dedupedIds = Array.from(deduped);

        return {
          ...prevState,
          [listKey]: dedupedIds,
        };
      },
    },
    {
      cacheKey: idMapCacheKey,
      store: (prevState: IdMapStore = {}, data, { params }) => {
        const normalized = { ...prevState };
        data.forEach((d) => {
          const id = getIdFromResponse(d, params);
          const prevEntry = prevState[id];
          normalized[id] = { ...prevEntry, ...d };
        });

        return normalized;
      },
    },
  ];

  const retrieveList = (
    idState: GenericListStore,
    normalizedState: IdMapStore,
    listKey: string,
  ) => {
    const ids = idState[listKey];
    return ids?.map((id) => normalizedState[id]);
  };

  const useListResource = (
    params: ListParams,
    networkOptions?: NetworkOptions<ListParams, ListReturnType[]>,
  ) => {
    const listKey = getKeyFromListParams(params);

    // retriever needs to be memoized so that the internal useMemo works as intended
    const listRetriever = useCallback(
      (idState: GenericListStore = {}, normalizedState: IdMapStore = {}) => {
        return retrieveList(idState, normalizedState, listKey);
      },
      [listKey],
    );

    return useNetworkResource(
      {
        params,
        method: listMethod,
        reducers: listReducers,
        retriever: listRetriever,
      },
      networkOptions,
    );
  };

  const useBulkListResource = (
    params: ListParams[],
    networkOptions?: NetworkOptions<ListParams, ListReturnType[]>,
  ) => {
    // the deep memo will really just shallow compare this array of strings
    const listKeys = useDeepMemo(params.map((p) => getKeyFromListParams(p)));

    const retriever = useCallback(
      (idState: GenericListStore = {}, normalizedState: IdMapStore = {}) => {
        return listKeys.map((listKey) => {
          return retrieveList(idState, normalizedState, listKey);
        });
      },
      [listKeys],
    );

    return useBulkNetworkResource(
      {
        params,
        method: listMethod,
        reducers: listReducers,
        retriever,
      },
      networkOptions,
    );
  };

  const useGetResource = (
    params: GetParams,
    networkOptions?: NetworkOptions<GetParams, GetReturnType>,
  ) => {
    return useNetworkResource(
      {
        params,
        method: getMethod,
        reducers: [
          {
            cacheKey: listCacheKey,
            store: (prevState: GenericListStore = {}, data, { params }) => {
              const listKeys = getKeysFromResponse(data, params);
              const id = getIdFromResponse(data, params);

              const stateToMerge: GenericListStore = {};
              listKeys.forEach((listKey) => {
                const prevIds = prevState[listKey];
                // skip if we haven't searched for this yet
                if (!prevIds) {
                  return;
                }

                const found = prevIds.find((i) => i === id);
                if (!found) {
                  const nextIds =
                    insertAt === InsertPosition.Head
                      ? [id, ...prevIds]
                      : [...prevIds, id];
                  stateToMerge[listKey] = nextIds;
                }
              });

              return { ...prevState, ...stateToMerge };
            },
          },
          {
            cacheKey: idMapCacheKey,
            store: (prevState: IdMapStore = {}, data, { params }) => {
              const normalized = { ...prevState };
              const id = getIdFromResponse(data, params);
              const prevEntry = prevState[id];
              normalized[id] = { ...prevEntry, ...data };

              return normalized;
            },
          },
        ],
        retriever: (_, normalized = {}) => {
          const data = normalized[getIdFromParams(params)];
          if (data && isDetailType(data)) {
            return data as GetReturnType;
          }

          return data;
        },
      },
      networkOptions,
    );
  };

  const useCreateResource = () => {
    return useMutateResource({
      method: createMethod,
      reducers: [
        {
          cacheKey: listCacheKey,
          store: (prevState: GenericListStore = {}, data, { params }) => {
            const listKeys = getKeysFromResponse(data, params);
            const id = getIdFromResponse(data, params);

            const stateToMerge: GenericListStore = {};
            listKeys.forEach((listKey) => {
              const prevIds = prevState[listKey];
              // skip if we haven't searched for this yet
              if (!prevIds) {
                return;
              }

              const found = prevIds.find((i) => i === id);
              if (!found) {
                const nextIds =
                  insertAt === InsertPosition.Head
                    ? [id, ...prevIds]
                    : [...prevIds, id];
                stateToMerge[listKey] = nextIds;
              }
            });

            return { ...prevState, ...stateToMerge };
          },
        },
        {
          cacheKey: idMapCacheKey,
          store: (prevState: IdMapStore = {}, data, { params }) => {
            const normalized = { ...prevState };
            const id = getIdFromResponse(data, params);
            const prevEntry = prevState[id];
            normalized[id] = { ...prevEntry, ...data };

            return normalized;
          },
        },
      ],
    });
  };

  // if we don't define this inline, then the useCallback inside useMutateResource works correctly
  const updateReducers: Reducers<
    UpdateParams,
    Partial<UpdateReturnType>,
    IdMapStore,
    unknown
  > = [
    {
      cacheKey: idMapCacheKey,
      store: (prevState = {}, data, { params }) => {
        const normalized = { ...prevState };
        const id = getIdFromParams(params);
        const prevEntry = prevState[id];
        normalized[id] = { ...prevEntry, ...data };

        return normalized;
      },
    },
  ];

  const optimisticUpdateConfig = getOptimisticUpdateData && {
    getOptimisticUpdateData,
    optimisticReducers: updateReducers,
  };

  const useUpdateResource = ({ skipOptimisticUpdate }: UpdateConfig = {}) => {
    return useMutateResource({
      optimisticUpdateConfig: !skipOptimisticUpdate
        ? optimisticUpdateConfig
        : undefined,
      method: updateMethod,
      reducers: updateReducers,
    });
  };

  const useDeleteResource = () => {
    const deleteFunc = useMutateResource({
      method: deleteMethod,
      reducers: [
        {
          cacheKey: listCacheKey,
          store: (prevState: GenericListStore = {}, _, { params }) => {
            const id = getIdFromParams(params);

            // remove this id from all lists
            const deletedState = { ...prevState };
            Object.keys(deletedState).forEach((listKey) => {
              const ids = deletedState[listKey];

              // if we find the id, remove it. otherwise, leave this array alone (which is why we don't use .filter)
              const idIndex = ids.findIndex((i) => i === id);
              if (idIndex > -1) {
                // splice mutates the existing array, so create a copy first
                const idsCopy = [...ids];
                idsCopy.splice(idIndex, 1);

                // set the deleted state to the new array
                deletedState[listKey] = idsCopy;
              }
            });

            return deletedState;
          },
        },
        {
          cacheKey: idMapCacheKey,
          store: (prevState: IdMapStore = {}, _, { params }) => {
            // make a copy of the state and...
            const normalized = { ...prevState };

            // ...delete the entire entry for the id
            const id = getIdFromParams(params);
            delete normalized[id];

            return normalized;
          },
        },
      ],
    });

    return (params: DeleteParams): NetworkResponsePromise<DeleteReturnType> => {
      return deleteFunc(params).then(
        (dataAndResponse) => {
          Toaster.show({
            intent: Intent.SUCCESS,
            message: 'Successfully deleted',
          });
          return dataAndResponse;
        },
        (error) => {
          const message = error.message || error.toString();

          Toaster.show({
            intent: Intent.DANGER,
            message: `Could not delete: ${message}`,
          });
          throw error;
        },
      );
    };
  };

  return {
    isDetailType,

    // single queries
    useCreateResource,
    useDeleteResource,
    useListResource,
    useGetResource,
    useUpdateResource,

    // bulk queries
    useBulkListResource,

    // cache keys if there are custom reducers needed
    listCacheKey,
    idMapCacheKey,

    // export update optimistic/regular reducers, since
    // many actions will be similar to an update
    updateReducers,
    optimisticUpdateConfig,

    // return the full config so that we get generic types
    config,
  };
};
