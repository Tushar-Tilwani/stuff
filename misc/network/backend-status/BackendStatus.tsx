import { RegionSummary } from '@clients/devops-ui-service-api-client';
import { LoadingComponent } from 'common';
import DOPEPageTemplate from 'common/components/DopePageTemplates/DOPEPageTemplate';
import React, { useMemo, useState } from 'react';
import { getDefaultRegionSummary } from 'region_constants';
import { useServicesByName } from './backendStatusHooks';
import { ServiceSummaries } from './ServiceSummaries';
import {
  ALL_BACKEND_STATUS_KEY,
  ALL_REGION_STATES_KEY,
  ALL_SERVICES_KEY,
  BackendStatusSelectKey,
  RegionStateSelectKey,
  ServiceSummaryFilters,
} from './ServiceSummaryFilters';

const BackendStatus: React.FC = () => {
  const [backendsByServiceName, { loading, error }] = useServicesByName();
  const [service, setService] = useState(ALL_SERVICES_KEY);
  const [region, setRegion] = useState<RegionSummary | null>(
    getDefaultRegionSummary(),
  );
  const [backendStatus, setBackendStatus] = useState<BackendStatusSelectKey>(
    ALL_BACKEND_STATUS_KEY,
  );
  const [regionState, setRegionState] = useState<RegionStateSelectKey>(
    ALL_REGION_STATES_KEY,
  );

  const backendStatusOptions = useMemo(() => {
    const statuses = Object.values(backendsByServiceName ?? {})
      .flatMap((backends) => backends)
      .filter((backend) => backend.haproxyJson?.status)
      .map((backend) => backend.haproxyJson!.status);
    return [...new Set([ALL_BACKEND_STATUS_KEY, ...statuses])];
  }, [backendsByServiceName]);

  const serviceOptions = useMemo(() => {
    const services = Object.keys(backendsByServiceName ?? {});
    return [ALL_SERVICES_KEY, ...services];
  }, [backendsByServiceName]);

  return (
    <DOPEPageTemplate
      pageTitle="Backend server statuses"
      title="Backend server statuses"
      description="Services listed here are either UP or the DevOps Portal stack cannot communicate with it."
    >
      <ServiceSummaryFilters
        region={region}
        setRegion={setRegion}
        backendStatus={backendStatus}
        setBackendStatus={setBackendStatus}
        service={service}
        setService={setService}
        serviceOptions={serviceOptions}
        regionState={regionState}
        setRegionState={setRegionState}
        backendStatusOptions={backendStatusOptions}
      />
      <LoadingComponent
        loading={loading}
        data={backendsByServiceName}
        error={error}
      >
        {(backendsByName) => (
          <ServiceSummaries
            backendsByServiceName={backendsByName}
            service={service}
            region={region}
            backendStatus={backendStatus}
            regionState={regionState}
          />
        )}
      </LoadingComponent>
    </DOPEPageTemplate>
  );
};

export default BackendStatus;
