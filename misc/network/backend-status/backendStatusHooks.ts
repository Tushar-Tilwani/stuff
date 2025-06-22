import { LocalService } from '@clients/devops-ui-service-api-client';
import _ from 'lodash';
import { useNetworkQuery } from 'network/network-hooks';
import { NetworkError } from 'network/NetworkCacheProvider';
import { useLocalServices } from 'rad/radHooks';
import { useMemo } from 'react';
import { haproxyClient, HaproxyStatus } from './haproxyClient';

export type HaproxyJson = {
  pxname: string;
  svname: string;
  status: HaproxyStatus;
  check_desc: string;
  last_chk: string;
} & {
  [key: string]: string;
};

export interface BackendWithStatus {
  localService: LocalService;
  haproxyJson?: HaproxyJson;
}

export interface BackendsByServiceName {
  [serviceName: string]: BackendWithStatus[];
}

export interface LocalServicesByDns {
  [dns: string]: LocalService;
}

interface HaproxyJsonByDns {
  [dns: string]: HaproxyJson;
}

const toJson = (line: string, headers: string[]) => {
  const json: HaproxyJson = {} as HaproxyJson;
  const parts = line.split(',');
  for (let j = 0; j < headers.length; j++) {
    json[headers[j]] = parts[j];
  }
  return json;
};

const csvToJson = (csv: string): HaproxyJson[] => {
  const lines = csv.split('\n');
  if (lines.length < 2) {
    return [];
  }
  const headerLine = lines[0].substring(1).trimLeft();
  const headers = headerLine.split(',');
  return lines.map((line) => toJson(line, headers));
};

const mergeToServicesByName = (
  servicesByDns: LocalServicesByDns,
  jsonByDns: HaproxyJsonByDns,
): BackendsByServiceName => {
  const result: BackendsByServiceName = {};
  Object.keys(servicesByDns).forEach((dns) => {
    if (!result[servicesByDns[dns].serviceName])
      result[servicesByDns[dns].serviceName] = [];
    result[servicesByDns[dns].serviceName].push({
      localService: servicesByDns[dns],
      haproxyJson: jsonByDns[dns],
    });
  });
  return result;
};

const toJsonByDns = (csv: string): HaproxyJsonByDns => {
  return Object.fromEntries(
    Object.entries(
      _.groupBy(csvToJson(csv), (json) => json.svname),
    ).map(([dns, backendJsons]) => [dns, backendJsons[0]]),
  );
};

const useCombinedData = (
  csv: string | undefined,
  services: LocalService[],
): BackendsByServiceName | undefined => {
  const servicesByDns: LocalServicesByDns = useMemo(() => {
    const result: Record<string, LocalService> = {};
    for (let i = 0; i < services.length; i++) {
      result[services[i].dnsName] = services[i];
      if (!!services[i].vibeDnsName)
        result[services[i].vibeDnsName!] = services[i];
    }
    return result;
  }, [services]);

  const haproxyJsonByDns: HaproxyJsonByDns | null = useMemo(() => {
    return csv ? toJsonByDns(csv) : null;
  }, [csv]);

  if (haproxyJsonByDns) {
    return mergeToServicesByName(servicesByDns, haproxyJsonByDns);
  }
};

export const useServicesByName = (): [
  BackendsByServiceName | undefined,
  { loading: boolean; error: NetworkError | undefined },
] => {
  const [csv, { loading, error }] = useNetworkQuery({
    method: haproxyClient.getHaproxyCsv,
    params: {},
  });
  const [services, { loadingServices }] = useLocalServices();

  const servicesByName = useCombinedData(csv, services);
  return [servicesByName, { loading: loading || loadingServices, error }];
};
