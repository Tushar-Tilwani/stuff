import {
  ApiClientClass,
  BaseApiConfig,
  GeneratedBaseApiConfig,
} from 'network/network-hooks';
import { allProperties } from 'common/utils/iterate';
import { apiErrorResponseInterceptor } from '../ApiErrorDrawer';
import {
  recordMetricsForResponse,
  recordMetricsForRequest,
  addHeaders,
} from 'network/InstrumentedInterceptors';
import { signRequestInterceptor } from 'auth/common/request';
import { createSignRequestInterceptor, isInIframe } from 'dope-commons';

export const newClient = <T>(
  ClientType: ApiClientClass<T>,
  basePath: string,
  baseConfig: BaseApiConfig = {},
): T => {
  const bindMethods = (client: T) => {
    allProperties(ClientType.prototype)
      .filter((methodName) => methodName !== 'constructor')
      .forEach((methodName) => {
        const bound = (client as any)[methodName].bind(client);
        (client as any)[methodName] = bound;
      });
  };

  const requestInterceptors = [
    ...(baseConfig.requestInterceptors || []),
    recordMetricsForRequest,
    addHeaders,
  ];

  if (baseConfig.signRequests) {
    requestInterceptors.push(
      isInIframe()
        ? createSignRequestInterceptor(basePath, baseConfig.dnsNameOverrides)
        : signRequestInterceptor(basePath, baseConfig.dnsNameOverrides),
    );
  }

  const config: GeneratedBaseApiConfig = {
    requestInterceptors,
    errorHandler: baseConfig.errorHandler,
    responseInterceptors: [
      ...(baseConfig.responseInterceptors || []),
      apiErrorResponseInterceptor,
      recordMetricsForResponse,
    ],
  };

  // don't change absolute base paths
  const trueBasePath = basePath.startsWith('https://')
    ? basePath
    : `${window.location.protocol}//${window.location.host}/${basePath}`;

  const client: T = new ClientType(fetch.bind(window), trueBasePath, config);

  bindMethods(client);
  return client;
};
