import {
  LocalService,
  RegionSummary,
} from '@clients/devops-ui-service-api-client';
import {
  Divider,
  Icon,
  IconName,
  IconNames,
  ICON_SIZE_SMALL,
  Intent,
  NonIdealState,
  Tooltip,
} from 'dope-uikit';
import { useRegions } from 'providers/RegionsProvider';
import React, { useMemo } from 'react';
import {
  BackendsByServiceName,
  BackendWithStatus,
  HaproxyJson,
} from './backendStatusHooks';
import {
  ALL_BACKEND_STATUS_KEY,
  ALL_REGION_STATES_KEY,
  ALL_SERVICES_KEY,
  BackendStatusSelectKey,
  RegionStateSelectKey,
} from './ServiceSummaryFilters';
import { backendStatesToReasons } from './haproxyClient';
import SlackLink from 'common/SlackLink';

export const ALL_UP_REASON =
  'Service is in a production region or has all required capabilities published.';
export const SOME_MISSING_CAPABILITIES_REASON =
  'Some backends have missing, required capabilities.';
export const ALL_DOWN_REASON =
  'All backends are not in production regions and do not have all required capabilities published.';
export const EXPECTED_STATUS_TIP =
  'A check that all backends are in a production region or have required capabilities published.';
export const DNS_NOT_RESOLVABLE_REASON = 'DNS is not resolvable';

interface ServiceSummariesProps {
  backendsByServiceName: BackendsByServiceName;
  service: string;
  region: RegionSummary | null;
  backendStatus: BackendStatusSelectKey;
  regionState: RegionStateSelectKey;
}

const ICON_MARGINS = { marginBottom: '3px', marginLeft: '2px' };

export const ServiceSummaries: React.FC<ServiceSummariesProps> = ({
  backendsByServiceName,
  service,
  region,
  backendStatus,
  regionState,
}) => {
  const { regions } = useRegions();
  const regionsByPublicName = useMemo(() => {
    const result: Record<string, RegionSummary> = {};
    for (let i = 0; i < regions.length; i++) {
      result[regions[i].publicRegionName] = regions[i];
    }
    return result;
  }, [regions]);

  const toInScopeBackends = ([serviceName, backends]: [
    string,
    BackendWithStatus[],
  ]): [string, BackendWithStatus[]] => [
    serviceName,
    backends
      .filter((b) => toBackendsWithState(b))
      .filter((b) => isInRegion(b))
      .filter((b) => hasRegionState(b)),
  ];

  const toBackendsWithState = (backend: BackendWithStatus) =>
    backendStatus !== ALL_BACKEND_STATUS_KEY
      ? backend.haproxyJson?.status === backendStatus
      : true;

  const isInRegion = (backend: BackendWithStatus) => {
    if (region) {
      return (
        region.publicRegionName.toLowerCase() ===
        backend.localService.region?.toLowerCase()
      );
    } else return true; // show all if no region
  };

  const hasRegionState = (backend: BackendWithStatus) => {
    const { region: serviceRegion } = backend.localService;
    if (serviceRegion && regionState !== ALL_REGION_STATES_KEY) {
      return regionsByPublicName[serviceRegion].state === regionState;
    } else if (isRealmWideService(backend.localService)) {
      return (
        regionState === 'Production' || regionState === ALL_REGION_STATES_KEY
      );
    } else return true;
  };

  const isRealmWideService = (service: LocalService) =>
    typeof service.region === 'undefined';

  const isSelectedService = (serviceName: string) => {
    if (service !== ALL_SERVICES_KEY)
      return serviceName.toLowerCase().includes(service.toLowerCase());
    return true;
  };

  const filteredServices = useMemo(() => {
    return Object.entries(backendsByServiceName)
      .filter(([name]) => isSelectedService(name))
      .map((entry) => toInScopeBackends(entry))
      .filter((entry) => entry[1].length > 0);
  }, [service, region, backendStatus, backendsByServiceName]);

  return (
    <>
      {filteredServices.length > 0 ? (
        filteredServices.map(([serviceName, backends]) => (
          <ServiceSummary
            key={serviceName}
            backends={backends}
            serviceName={serviceName}
            regionsByPublicName={regionsByPublicName}
          />
        ))
      ) : (
        <NonIdealState
          title="No services found"
          description="All services have been filtered out."
          icon={IconNames.FILTER}
        />
      )}
    </>
  );
};

type ServiceSummaryProps = {
  serviceName: string;
  backends: BackendWithStatus[];
  regionsByPublicName: Record<string, RegionSummary>;
};

const ServiceSummary: React.FC<ServiceSummaryProps> = ({
  backends,
  serviceName,
  regionsByPublicName,
}) => {
  return (
    <div data-testid={`${serviceName}-summary`} key={serviceName}>
      <Divider />
      <h1>{serviceName}</h1>
      <SummaryTable
        backends={backends}
        regionsByPublicName={regionsByPublicName}
        serviceName={serviceName}
      />
    </div>
  );
};

const SummaryTable: React.FC<ServiceSummaryProps> = ({
  backends,
  regionsByPublicName,
}) => {
  const inProdRegionRatio = useMemo(() => {
    return (
      backends.filter(
        (backend) =>
          backend.localService.regionState === 'Production' ||
          typeof backend.localService.region === 'undefined',
      ).length / backends.length
    );
  }, [backends]);
  const noMissingCapabilitiesRatio = useMemo(() => {
    return (
      backends.filter(
        (backends) =>
          backends.localService.missingCapabilities &&
          backends.localService.missingCapabilities.length === 0,
      ).length / backends.length
    );
  }, [backends]);

  return (
    <table
      className="bp3-table"
      style={{ maxWidth: '100%', textAlign: 'left', minWidth: '100%' }}
    >
      <tbody>
        <tr>
          <th>DNS</th>
          <th>
            Expected availability{' '}
            <span>
              <Tooltip content={EXPECTED_STATUS_TIP}>
                <Icon
                  icon={IconNames.INFO_SIGN}
                  iconSize={ICON_SIZE_SMALL}
                  intent={Intent.NONE}
                  data-testid={`${backends[0].localService.serviceName}-expected-status-tip`}
                  color="#808080"
                  style={ICON_MARGINS}
                />
              </Tooltip>
            </span>
          </th>
          <th>Backend state</th>
          <th>Region</th>
          <th>Region state</th>
          <th>Why down?</th>
        </tr>
        {backends.map((backend, i) => {
          const region = backend.localService.region
            ? regionsByPublicName[backend.localService.region]
            : undefined;
          return (
            <tr
              key={backend.localService.dnsName + i}
              data-testid={`${backend.localService.dnsName}-summary`}
            >
              <td style={{ width: '40%' }}>
                {backend.haproxyJson?.svname ?? backend.localService.dnsName}
              </td>
              <td style={{ width: '15%' }}>
                <ShouldBeUpIcon
                  inProdRegionRatio={inProdRegionRatio}
                  noMissingCapabilitiesRatio={noMissingCapabilitiesRatio}
                  backend={backend}
                />
              </td>
              <td style={{ width: '8%' }}>
                <BackendState backend={backend} />
              </td>
              <td style={{ width: '12%' }}>
                <RegionDisplay region={backend.localService.region} />
              </td>
              <td style={{ width: '10%' }}>{region?.state ?? 'None given'}</td>
              <td style={{ width: '30%' }}>
                <DownReason haproxyData={backend.haproxyJson} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

interface ShouldBeUpIconProps {
  inProdRegionRatio: number;
  noMissingCapabilitiesRatio: number;
  backend: BackendWithStatus;
}

const ShouldBeUpIcon: React.FC<ShouldBeUpIconProps> = ({
  inProdRegionRatio,
  noMissingCapabilitiesRatio,
  backend,
}) => {
  return (
    <Tooltip
      content={
        <ShouldBeUpReason
          inProdRegionRatio={inProdRegionRatio}
          noMissingCapabilitiesRatio={noMissingCapabilitiesRatio}
        />
      }
    >
      <UpIcon
        inProdRegionRatio={inProdRegionRatio}
        noMissingCapabilitiesRatio={noMissingCapabilitiesRatio}
        backend={backend}
      />
    </Tooltip>
  );
};

const ShouldBeUpReason: React.FC<Omit<ShouldBeUpIconProps, 'backend'>> = ({
  inProdRegionRatio,
  noMissingCapabilitiesRatio,
}) => {
  return (
    <>
      {allShouldBeUp(inProdRegionRatio, noMissingCapabilitiesRatio)
        ? ALL_UP_REASON
        : inProdRegionRatio + noMissingCapabilitiesRatio > 0
        ? SOME_MISSING_CAPABILITIES_REASON
        : ALL_DOWN_REASON}
    </>
  );
};

const UpIcon: React.FC<ShouldBeUpIconProps> = ({
  inProdRegionRatio,
  noMissingCapabilitiesRatio,
  backend,
}) => {
  const [icon, intent, testId, text] = upIconParts(
    inProdRegionRatio,
    noMissingCapabilitiesRatio,
    backend,
  );
  return (
    <>
      <Icon
        icon={icon}
        intent={intent}
        iconSize={ICON_SIZE_SMALL}
        style={ICON_MARGINS}
        data-testid={testId}
      />{' '}
      {text}
    </>
  );
};

const upIconParts = (
  inProdRegionRatio: number,
  noMissingCapabilitiesRatio: number,
  backend: BackendWithStatus,
): [IconName, Intent, string, string] => {
  if (allShouldBeUp(inProdRegionRatio, noMissingCapabilitiesRatio)) {
    return [
      IconNames.TICK_CIRCLE,
      Intent.SUCCESS,
      `${backend.localService.dnsName}-should-up-icon`,
      'Yes',
    ];
  } else if (inProdRegionRatio + noMissingCapabilitiesRatio > 0) {
    return [
      IconNames.WARNING_SIGN,
      Intent.WARNING,
      `${backend.localService.dnsName}-should-partially-up-icon`,
      'Partial',
    ];
  } else {
    return [
      IconNames.ERROR,
      Intent.DANGER,
      `${backend.localService.dnsName}-should-not-up-icon`,
      'No',
    ];
  }
};

const allShouldBeUp = (inProdRatio: number, noMissingRatio: number) =>
  inProdRatio === 1 || noMissingRatio === 1;

const BackendState: React.FC<{ backend: BackendWithStatus }> = ({
  backend,
}) => {
  return (
    <div data-testid={`${backend.localService.dnsName}-state`}>
      <Tooltip content={<BackendStateReason backend={backend} />}>
        <BackendStateIcon backend={backend} />
      </Tooltip>
    </div>
  );
};

const BackendStateReason: React.FC<{ backend: BackendWithStatus }> = ({
  backend,
}) => {
  if (!backend.haproxyJson) return <>{DNS_NOT_RESOLVABLE_REASON}</>;
  if (!backendStatesToReasons[backend.haproxyJson.status]) {
    return <UnknownStateReason />;
  }
  return <>{backendStatesToReasons[backend.haproxyJson.status]}</>;
};

const UnknownStateReason: React.FC = () => {
  return (
    <>
      This is an unknown state. Please ask for information in{' '}
      <SlackLink channelName="#oci_devops_portal_eng">
        #oci_devops_portal_eng
      </SlackLink>
      .
    </>
  );
};

const BackendStateIcon: React.FC<{ backend: BackendWithStatus }> = ({
  backend,
}) => {
  const [icon, intent] = backendIconAndIntent(backend);
  return (
    <>
      <Icon
        icon={icon}
        iconSize={ICON_SIZE_SMALL}
        intent={intent}
        style={ICON_MARGINS}
        data-testid={backend.localService.dnsName + '-state-icon'}
      />{' '}
      {backend.haproxyJson?.status ?? 'DOWN'}
    </>
  );
};

const backendIconAndIntent = (
  backend: BackendWithStatus,
): [IconName, Intent] => {
  if (backend.haproxyJson?.status === 'UP') {
    return [IconNames.TICK_CIRCLE, Intent.SUCCESS];
  } else if (backend.haproxyJson?.status === 'DOWN' || !backend.haproxyJson) {
    return [IconNames.ERROR, Intent.DANGER];
  } else {
    return [IconNames.WARNING_SIGN, Intent.WARNING];
  }
};

const RegionDisplay: React.FC<Pick<LocalService, 'region'>> = ({ region }) => {
  if (region) {
    return <a href={`/regions/${region}`}>{region}</a>;
  }
  return <>No region</>;
};
interface DownReasonProps {
  haproxyData?: HaproxyJson;
}

const DownReason: React.FC<DownReasonProps> = ({ haproxyData }) => {
  if (!haproxyData) return <>{DNS_NOT_RESOLVABLE_REASON}</>;
  const { status, check_desc, last_chk } = haproxyData;
  if (status === 'UP') {
    return <>N/A</>;
  }
  return (
    <>
      {check_desc ? `${check_desc}: ` : ''}
      {last_chk || 'No reason given'}
    </>
  );
};
