import { recordCounter } from 'common/instrumentation/Instrumentation';
import { getApiName } from 'common/routeUtils';
import { newRequestId } from '@src/common/RequestIDProvider';

export const recordMetricsForRequest = (
  request: Request,
  operation?: string,
) => {
  const url = new URL(request.url);
  recordCounter('invoke', {
    path: url.pathname,
    api: getApiName(url.href),
    apiOp: operation,
  });
  return Promise.resolve(request);
};

export const addHeaders = (request: Request) => {
  request.headers.append('opc-request-id', newRequestId());
  return Promise.resolve(request);
};

export const recordMetricsForResponse = (
  request: Request,
  response: Response,
  operation?: string,
) => {
  const url = new URL(request.url);
  if (response.ok) {
    recordCounter('success', {
      path: url.pathname,
      api: getApiName(url.href),
      apiOp: operation,
      status: `${response.status}`,
    });
  } else {
    recordCounter('fail', {
      path: url.pathname,
      api: getApiName(url.href),
      apiOp: operation,
      status: `${response.status}`,
    });
  }
  return Promise.resolve(response);
};
