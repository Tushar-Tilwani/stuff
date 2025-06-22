import React, { useEffect, useMemo, useState } from 'react';
import { Button, Drawer, Icon, NonIdealState } from 'dope-uikit';
import {
  NormalTable,
  TableCellData,
  TableColumn,
} from '../common/components/WindowedTable';
import { useTimezone } from '../TimezoneProvider';
import { displayDate } from '../DateUtils';

import colors from '../telemetry/style/colors.scss';
import styles from './styles.scss';
import { BaseApiConfig } from './network-hooks';
import { registerContextListener } from 'runtime/runtimeContext';
import { DopeContext, toSendable } from 'dope-runtime-commons';
import classnames from 'classnames';
import { useApiErrorContext } from './ApiErrorContextProvider';

interface ApiErrorJson {
  code?: string;
  message?: string;
}

const isApiErrorJson = (json: any): json is ApiErrorJson => {
  return json.code || json.message;
};

interface ApiError {
  json: ApiErrorJson | undefined;
  request: Request;
  requestId: string | undefined;
  response: Response;
  timestamp: number;
}

type ApiErrorListener = (error: ApiError) => void;

const listeners = new Set<ApiErrorListener>();
const register = (listener: ApiErrorListener) => {
  listeners.add(listener);

  const unregister = () => {
    listeners.delete(listener);
  };

  return unregister;
};

/**
 * Register all ApiErrors belonging to DopeContext to all ApiErrorListeners.
 * Convert ApiError object literals to Headers object before passing to listeners.
 */
registerContextListener((dopeContext: DopeContext) => {
  dopeContext.apiErrors?.forEach((error: ApiError) => {
    const errorsWithHeaders = {
      ...error,
      request: {
        ...error.request,
        headers: new Headers(error.request.headers),
      },
      response: {
        ...error.response,
        headers: new Headers(error.response.headers),
      },
    };
    listeners.forEach((listen) => listen(toSendable(errorsWithHeaders)));
  });
});

type Unpacked<T> = T extends (infer U)[] ? U : T;
type ReponseInterceptor = NonNullable<
  Unpacked<BaseApiConfig['responseInterceptors']>
>;

const drawerIcon = 'panel-stats';

export const apiErrorResponseInterceptor: ReponseInterceptor = async (
  request,
  response,
) => {
  if (!response.ok) {
    let json: ApiErrorJson | undefined = undefined;
    try {
      // .json() can only be called once for a response, so
      // to leave the intercepted response alone for consumers,
      // we will first clone one to use here
      const cloned = response.clone();
      const parsed = await cloned.json();
      if (isApiErrorJson(parsed)) {
        json = parsed;
      }
    } catch (e) {
      // it's ok to fail here, do it silently
    }

    const apiError = {
      json,
      request,
      requestId: response.headers.get('opc-request-id') || undefined,
      response,
      timestamp: Date.now(),
    };

    listeners.forEach((listener) => listener(apiError));
  }

  return response;
};

const rowClassName = ({ isExpanded }: TableCellData<ApiError>) =>
  `${styles.baseRow} ${isExpanded ? styles.baseRowExpanded : ''}`;

const getShortUrl = (fullUrl: string) => {
  const slashSlashIndex = fullUrl.indexOf('//');
  if (slashSlashIndex === -1) {
    return fullUrl;
  }

  const slashIndex = fullUrl.indexOf('/', slashSlashIndex + 2);
  const url = fullUrl.slice(slashIndex);
  return url;
};

export interface ApiErrorMap {
  [app: string]: ApiError[];
}

interface ApiErrorDrawerProps {
  onApiErrorSet: (apiErrors: ApiErrorMap) => void;
}

const ApiErrorDrawer: React.FC<ApiErrorDrawerProps> = (props) => {
  const { onApiErrorSet } = props;
  const timezone = useTimezone();
  const columns: TableColumn<ApiError>[] = useMemo(
    () => [
      {
        cellRenderer: ({ isExpanded }) => (
          <div className={styles.cell}>
            <Icon icon={isExpanded ? 'caret-down' : 'caret-right'} />
          </div>
        ),
        flexShrink: 0,
        header: 'caret',
        hideHeader: true,
        width: 16,
      },
      {
        cellRenderer: ({ rowData }) => (
          <div className={styles.cell}>
            {displayDate(rowData.timestamp, timezone, 'HH:mm:ss')}
          </div>
        ),
        flexShrink: 0,
        header: 'Timestamp',
        width: 84,
      },
      {
        cellRenderer: ({ rowData }) => (
          <div className={`${styles.cell} ${colors.error}`}>
            {rowData.response.status}
          </div>
        ),
        flexShrink: 0,
        header: 'Status',
        hideHeader: true,
        width: 24,
      },
      {
        cellRenderer: ({ rowData }) => (
          <div className={styles.longCell}>{rowData.json?.code || 'None'}</div>
        ),
        flexGrow: 1,
        header: 'Code',
        width: 60,
      },
      {
        cellRenderer: ({ rowData }) => {
          const url = getShortUrl(rowData.request.url);
          return <div className={styles.longCell}>{url}</div>;
        },
        flexGrow: 7,
        header: 'Request URL',
        width: 120,
      },
      {
        cellRenderer: ({ rowData }) => (
          <div className={styles.longCell}>
            {rowData.json?.message || 'None'}
          </div>
        ),
        flexGrow: 4,
        header: 'Message',
        width: 100,
      },
    ],
    [timezone],
  );

  const [apiErrors, setApiErrors] = useState<ApiErrorMap>({});
  useEffect(() => {
    return register((error) => {
      const shortUrl = getShortUrl(error.request.url);
      if (
        shortUrl.startsWith('/api') &&
        !shortUrl.startsWith('/api/ui-service')
      ) {
        const splits = shortUrl.split('/');
        const app = splits[2];

        const requestId =
          error.requestId ||
          error.response.headers.get('opc-request-id') ||
          undefined;

        setApiErrors((prev) => {
          const prevErrors = prev[app] || [];
          if (prevErrors.map((err) => err.requestId).includes(requestId)) {
            console.warn('Error request id=%s has already existed', requestId);
            return prev;
          }
          const prevApp = prev[app] || [];
          return {
            ...prev,
            [app]: [...prevApp, error],
          };
        });
      }
    });
  }, []);

  useEffect(() => {
    onApiErrorSet(apiErrors);
  }, [apiErrors, onApiErrorSet]);

  const { isOpen, openDrawer, closeDrawer } = useApiErrorContext();
  const [expandedRows, setExpandedRows] = useState<{
    [app: string]: { [index: number]: boolean };
  }>({});

  useEffect(() => {
    if (typeof isOpen === 'string') {
      // find requestId in errors
      let app = '';
      let rowIndex: number;
      Object.keys(apiErrors).forEach((a) => {
        const i = apiErrors[a].findIndex((e) => e.requestId === isOpen);
        if (i > -1) {
          app = a;
          rowIndex = i;
        }
      });

      if (app) {
        // update indices
        setExpandedRows((old) => {
          const oldApp = old[app] || {};
          return {
            ...old,
            [app]: { ...oldApp, [rowIndex]: true },
          };
        });
      }
    }
  }, [apiErrors, isOpen]);

  const apiErrorsPresent = Object.keys(apiErrors).length > 0;
  const drawerSize = apiErrorsPresent ? Drawer.SIZE_LARGE : Drawer.SIZE_SMALL;

  return (
    <>
      <Button
        minimal={true}
        icon={drawerIcon}
        onClick={() => (isOpen ? closeDrawer() : openDrawer())}
        small={true}
        aria-label="Open API errors"
      />
      <Drawer
        className={styles.scrollContainer}
        icon={drawerIcon}
        isOpen={!!isOpen}
        onClose={() => closeDrawer()}
        size={drawerSize}
        title="API Errors"
      >
        {!apiErrorsPresent && (
          <NonIdealState title="No API errors!" icon="thumbs-up" />
        )}
        {Object.keys(apiErrors).map((app, idx) => {
          const errors = apiErrors[app] || [];
          const rows = expandedRows[app] || {};
          return (
            <div
              className={classnames(idx > 0 ? 'mt-2' : '', 'bp3-drawer-body')}
              key={app}
            >
              <div className="p-1">
                <strong>{app} errors</strong>
              </div>
              <NormalTable
                columns={columns}
                data={errors}
                onRowClick={({ rowIndex }) => {
                  setExpandedRows((old) => {
                    const oldApp = old[app] || {};
                    return {
                      ...old,
                      [app]: { ...oldApp, [rowIndex]: !oldApp[rowIndex] },
                    };
                  });
                }}
                expandedRows={rows}
                expandedRowRenderer={ApiErrorExpandedRow}
                rowClassName={rowClassName}
                rowHeight={30}
              />
            </div>
          );
        })}
      </Drawer>
    </>
  );
};

export default ApiErrorDrawer;

type KV = { key: string; value: React.ReactNode };
const KVRow: React.FC<{ kv: KV }> = ({ kv }) => (
  <div className={styles.dataRow}>
    <div className={styles.dataKey}>{kv.key}</div>
    <div className={styles.dataValue}>{kv.value}</div>
  </div>
);

type ApiErrorExpandedRowProps = TableCellData<ApiError> & { children: never };

const ApiErrorExpandedRow: React.FC<ApiErrorExpandedRowProps> = (props) => {
  const { rowData } = props;
  const { json, request, response } = rowData;

  const responseHeaders: KV[] = [];
  response.headers.forEach((value, key) => {
    responseHeaders.push({ key, value });
  });

  const requestHeaders: KV[] = [];
  request.headers.forEach((value, key) => {
    requestHeaders.push({ key, value });
  });

  return (
    <div className={styles.expandedRow}>
      <strong>Message</strong>
      <div>{json?.message || 'No message provided'}</div>
      <div className="mt-1">
        <strong>General</strong>
      </div>
      <KVRow
        kv={{
          key: 'Request URL',
          value: <a href={request.url}>{request.url}</a>,
        }}
      />
      <KVRow kv={{ key: 'Request Method', value: request.method }} />
      <KVRow kv={{ key: 'Status code', value: response.status }} />
      <div className="mt-1">
        <strong>Response Headers</strong>
        {responseHeaders.map((h) => (
          <KVRow key={h.key} kv={h} />
        ))}
      </div>
      <div className="mt-1">
        <strong>Request Headers</strong>
        {requestHeaders.length > 0 ? (
          requestHeaders.map((h) => <KVRow key={h.key} kv={h} />)
        ) : (
          <p>
            No custom request headers set. Additional headers will have been set
            by the browser, but we do not have access to these here.
          </p>
        )}
      </div>
    </div>
  );
};
