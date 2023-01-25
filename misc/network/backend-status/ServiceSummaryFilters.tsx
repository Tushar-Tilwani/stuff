import { RegionSummary } from '@clients/devops-ui-service-api-client';
import classnames from 'classnames';
import { Button, IconNames, Intent, MenuItem, Select } from 'dope-uikit';
import React from 'react';
import { HaproxyStatus } from './haproxyClient';
import style from '@src/common/style.scss';
import backendStyle from './style.scss';
import RegionPicker from 'common/components/RegionPicker';

export const ALL_BACKEND_STATUS_KEY = 'All backend states';
export const ALL_REGION_STATES_KEY = 'All region states';
export const ALL_SERVICES_KEY = 'All services';

export type BackendStatusSelectKey =
  | HaproxyStatus
  | typeof ALL_BACKEND_STATUS_KEY;

export type RegionStateSelectKey =
  | 'Production'
  | 'Building'
  | 'None'
  | typeof ALL_REGION_STATES_KEY;

interface ServiceSummaryFiltersProps {
  region: RegionSummary | null;
  backendStatusOptions: string[];
  setRegion: (region: RegionSummary | null) => void;
  backendStatus: BackendStatusSelectKey;
  setBackendStatus: (status: BackendStatusSelectKey) => void;
  service: string;
  setService: (service: string) => void;
  serviceOptions: string[];
  regionState: RegionStateSelectKey;
  setRegionState: (state: RegionStateSelectKey) => void;
}

export const ServiceSummaryFilters: React.FC<ServiceSummaryFiltersProps> = ({
  region,
  backendStatusOptions,
  setRegion,
  backendStatus,
  setBackendStatus,
  service,
  setService,
  serviceOptions,
  regionState,
  setRegionState,
}) => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          className={classnames(
            style.flex,
            style.spaceBetween,
            backendStyle.alignStart,
            'mt-1',
          )}
        >
          <div className={backendStyle.backendFilter}>
            <RegionPicker value={region} onChange={setRegion} small={true} />
          </div>
          <Button
            small={true}
            icon={'cross'}
            onClick={() => setRegion(null)}
            intent={Intent.WARNING}
            aria-label="clear-region-picker"
          />
          <div className={classnames('ml-2', backendStyle.backendFilter)}>
            <Select
              items={serviceOptions}
              onItemSelect={(item) => setService(item)}
              itemRenderer={(item: string, { handleClick, modifiers }) => (
                <MenuItem
                  text={item}
                  key={item}
                  active={modifiers.active}
                  onClick={handleClick}
                  data-testid={item}
                />
              )}
              activeItem={backendStatus}
              filterable={false}
            >
              <Button
                name="service"
                data-testid="service-filter"
                alignText="left"
                rightIcon={IconNames.CARET_DOWN}
                fill={false}
                outlined={false}
                small={true}
                style={{ maxWidth: '15em' }}
              >
                {service}
              </Button>
            </Select>
          </div>
          <div className={classnames('ml-2', backendStyle.backendFilter)}>
            <Select
              items={backendStatusOptions}
              onItemSelect={(item) =>
                setBackendStatus(item as BackendStatusSelectKey)
              }
              itemRenderer={(item: string, { handleClick, modifiers }) => (
                <MenuItem
                  text={item}
                  key={item}
                  active={modifiers.active}
                  onClick={handleClick}
                  data-testid={item}
                />
              )}
              activeItem={backendStatus}
              filterable={false}
            >
              <Button
                name="service"
                data-testid="service-status-filter"
                alignText="left"
                rightIcon={IconNames.CARET_DOWN}
                fill={false}
                outlined={false}
                small={true}
              >
                {backendStatus}
              </Button>
            </Select>
          </div>
          <div className={classnames('ml-2', backendStyle.backendFilter)}>
            <Select
              items={[ALL_REGION_STATES_KEY, 'Production', 'Building', 'None']}
              onItemSelect={(item) =>
                setRegionState(item as RegionStateSelectKey)
              }
              itemRenderer={(item: string, { handleClick, modifiers }) => (
                <MenuItem
                  text={item}
                  key={item}
                  active={modifiers.active}
                  onClick={handleClick}
                  data-testid={item}
                />
              )}
              activeItem={regionState}
              filterable={false}
            >
              <Button
                name="region-state"
                data-testid="region-state-filter"
                alignText="left"
                rightIcon={IconNames.CARET_DOWN}
                fill={false}
                outlined={false}
                small={true}
              >
                {regionState}
              </Button>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};
