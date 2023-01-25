import { cleanup, render, screen, wait, within } from '@testing-library/react';
import { makeResponse } from 'common/utils/test-utils';
import React from 'react';
import {
  backendStatesToReasons,
  haproxyClient,
  HaproxyStatus,
} from '../haproxyClient';
import {
  mockHealthCheckData,
  upBackendAshburn,
  upBackendPhoenix,
  downBackendTimeout,
  downBackendHandshake,
  maintBackend,
  BackendProps,
  downBackendPartiallyUpService,
  unknownStateBackend,
  allBackends,
  downBackendUnresolvableDns,
} from './mockHealthcheckCsv';
import BackendStatus from '../BackendStatus';
import {
  ALL_BACKEND_STATUS_KEY,
  ALL_REGION_STATES_KEY,
  ALL_SERVICES_KEY,
  RegionStateSelectKey,
} from '../ServiceSummaryFilters';
import {
  ALL_UP_REASON,
  ALL_DOWN_REASON,
  SOME_MISSING_CAPABILITIES_REASON,
  EXPECTED_STATUS_TIP,
  DNS_NOT_RESOLVABLE_REASON,
} from '../ServiceSummaries';
import { TestProvider } from 'testUtils/TestProvider';
import { getByTextWithMarkup } from 'testUtils/test-utils';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import { mockLocalServices, mockRegions } from 'rad/mockRadData';
import { LocalService } from '@clients/devops-ui-service-api-client';

describe('BackendStatus', () => {
  const renderComponent = () => {
    render(
      <TestProvider regions={mockRegions}>
        <BackendStatus />
      </TestProvider>,
    );
  };

  const upBackends = allBackends.filter((b) => b.status === 'UP');
  const downBackends = allBackends.filter((b) => b.status === 'DOWN');
  const resolvableBackends = allBackends.filter((b) => !!b.status);
  const regionPickerTestId = 'region-ad-picker';

  beforeAll(() => {
    jest
      .spyOn(haproxyClient, 'getHaproxyCsv')
      .mockResolvedValue(makeResponse(mockHealthCheckData, 200));
  });

  it('lets the user clear the region picker', async () => {
    renderComponent();
    expect(screen.getByTestId(regionPickerTestId)).toHaveTextContent(
      'us-ashburn-1',
    );
    clearRegionPicker();
    await wait(() => {
      expect(screen.getByText('Choose a Region/AD')).toBeInTheDocument();
    });
  });

  const clearRegionPicker = () => {
    userEvent.click(screen.getByLabelText('clear-region-picker'));
  };

  const uniqueBackendStatesWithBackend: [
    HaproxyStatus,
    BackendProps,
  ][] = Object.entries(
    _.groupBy(resolvableBackends, (backend) => backend.status),
  ).map((e) => [e[0] as HaproxyStatus, e[1][0]]);

  const uniqueServiceNames: LocalService[] = _.uniqBy(
    mockLocalServices.filter((s) =>
      allBackends.map((b) => b.serviceName).includes(s.serviceName),
    ),
    (s: LocalService) => s.serviceName,
  );

  it.each(uniqueBackendStatesWithBackend)(
    'shows backends that are %s',
    async (_, backend: BackendProps) => {
      expect.hasAssertions();
      renderAndClearPicker();
      await wait(() =>
        expect(serviceSummary(backend.serviceName)).toBeInTheDocument(),
      );
    },
  );

  const renderAndClearPicker = () => {
    renderComponent();
    clearRegionPicker();
  };

  const serviceSummary = (serviceName: string) =>
    screen.getByTestId(`${serviceName}-summary`);

  it('gives dns name for backends', async () => {
    expect.hasAssertions();
    renderAndClearPicker();
    await verifyAllDataPresent(selectDns);
  });

  const selectDns = (backend: BackendProps) => backend.dns;

  const verifyAllDataPresent = async (
    expectedResult: (backend: BackendProps) => string,
    backends = allBackends,
  ) => {
    await pollUntilVerifiedForAll((backend) => {
      const { getByText } = within(backendSummary(backend.dns));
      expect(
        getByTextWithMarkup(expectedResult(backend), getByText),
      ).toBeInTheDocument();
    }, backends);
  };

  const pollUntilVerifiedForAll = async (
    assertion: (backend: BackendProps) => void,
    backends: BackendProps[],
  ) => {
    await wait(() => {
      backends.forEach((backend) => assertion(backend));
    });
  };

  const backendSummary = (backendDns: string) =>
    screen.getByTestId(`${backendDns}-summary`);

  it('gives region for backends', async () => {
    expect.hasAssertions();
    renderAndClearPicker();
    await verifyAllDataPresent((backend) => backend.region ?? 'No region');
  });

  it('defaults to us-ashburn-1 for region in picker', async () => {
    expect.hasAssertions();
    renderComponent();
    await verifyRegionIsSelected('us-ashburn-1');
    await verifyAllDataPresent(selectDns, [upBackendAshburn]);
    await verifyDataNotPresent(selectDns, [
      upBackendPhoenix,
      downBackendHandshake,
      downBackendTimeout,
      maintBackend,
    ]);
  });

  const verifyRegionIsSelected = async (region: string) => {
    await wait(() => {
      expect(screen.getByTestId(regionPickerTestId)).toHaveTextContent(region);
    });
  };

  const verifyDataNotPresent = async (
    expectedResult: (backend: BackendProps) => string,
    backends: BackendProps[],
  ) => {
    await pollUntilVerifiedForAll(
      (backend) =>
        expect(() =>
          within(serviceSummary(backend.serviceName)).getByText(
            expectedResult(backend),
          ),
        ).toThrow(),
      backends,
    );
  };

  it('lets user choose region for a given service', async () => {
    expect.hasAssertions();
    renderAndClearPicker();
    await verifyAllDataPresent(selectDns, [upBackendAshburn, upBackendPhoenix]);
    selectRegionInPicker('us-phoenix-1');
    await verifyAllDataPresent(selectDns, [upBackendPhoenix]);
    await verifyDataNotPresent(selectDns, [upBackendAshburn]);
  });

  const selectRegionInPicker = (region: string) => {
    userEvent.click(screen.getByTestId(regionPickerTestId));
    userEvent.click(screen.getByTestId(region));
  };

  it('gives region status for backends', async () => {
    expect.hasAssertions();
    renderAndClearPicker();
    await verifyAllDataPresent(
      (backend) => backend.regionState ?? 'None given',
    );
  });

  it('gives backend state for backend', async () => {
    expect.hasAssertions();
    renderAndClearPicker();
    await pollUntilVerifiedForAll(
      (backend) =>
        expect(
          within(serviceSummary(backend.serviceName)).getByTestId(
            backend.dns + '-state',
          ),
        ).toHaveTextContent(backend.status),
      downBackends,
    );
  });

  it('gives reason for backend not being up', async () => {
    expect.hasAssertions();
    renderAndClearPicker();
    await pollUntilVerifiedForAll((backend) => {
      const { check_desc, last_chk } = backend;
      const expectedReasonDisplay =
        (check_desc ? check_desc + ':' : '') +
        ' ' +
        (last_chk || 'No reason given');
      expect(
        getByTextWithMarkup(
          expectedReasonDisplay,
          within(serviceSummary(backend.serviceName)).getByText,
        ),
      ).toBeInTheDocument();
    }, downBackends);
  });

  it('says "not applicable" in down reason column for UP backends', async () => {
    expect.hasAssertions();
    renderAndClearPicker();
    await wait(() => {
      expect(
        within(serviceSummary(upBackends[0].serviceName)).getAllByText('N/A')
          .length,
      ).toBe(1);
    });
  });

  it('lets users filter by service', async () => {
    expect.hasAssertions();
    renderAndClearPicker();
    await pollUntilVerifiedForAll(
      (b) => expect(screen.getByText(b.serviceName)).toBeInTheDocument(),
      allBackends,
    );
    userEvent.click(screen.getByText(ALL_SERVICES_KEY));
    await wait(() => {
      userEvent.click(screen.getByTestId(upBackendAshburn.serviceName));
    });
    await pollUntilVerifiedForAll(
      (b) => expect(serviceSummary(b.serviceName)).toBeInTheDocument(),
      allBackends.filter((b) => b.serviceName === upBackendAshburn.serviceName),
    );
    await pollUntilVerifiedForAll(
      (b) => expect(() => serviceSummary(b.serviceName)).toThrow(),
      allBackends.filter((b) => b.serviceName !== upBackendAshburn.serviceName),
    );
  });

  it('lets users filter by backend status', async () => {
    expect.hasAssertions();
    renderAndClearPicker();
    await verifyAllDataPresent(selectDns, allBackends);
    userEvent.click(screen.getByText(ALL_BACKEND_STATUS_KEY));
    userEvent.click(screen.getByTestId('UP'));
    await verifyAllDataPresent(selectDns, upBackends);
    await verifyDataNotPresent(selectDns, downBackends);
  });

  it.each([
    [ALL_REGION_STATES_KEY, allBackends, []],
    [
      'Production',
      [upBackendAshburn, upBackendPhoenix, downBackendHandshake, maintBackend],
      [downBackendTimeout],
    ],
    [
      'Building',
      [downBackendTimeout],
      [upBackendAshburn, upBackendPhoenix, downBackendHandshake, maintBackend],
    ],
  ])(
    'lets users filter by region state: %s',
    async (selectKey, expectedPresent, expectedMissing) => {
      expect.hasAssertions();
      renderAndClearPicker();
      await verifyAllDataPresent(selectDns, allBackends);
      selectRegionState(selectKey);
      await verifyAllDataPresent(selectDns, expectedPresent);
      await verifyDataNotPresent(selectDns, expectedMissing);
    },
  );

  const selectRegionState = (selectKey: RegionStateSelectKey) => {
    userEvent.click(screen.getByText(ALL_REGION_STATES_KEY));
    userEvent.click(screen.getByTestId(selectKey));
  };

  it('shows a message when all services are filtered out', async () => {
    expect.hasAssertions();
    renderAndClearPicker();
    await verifyAllDataPresent(selectDns, allBackends);
    userEvent.click(screen.getByText(ALL_SERVICES_KEY));
    userEvent.click(screen.getByTestId(downBackendHandshake.serviceName));
    userEvent.click(screen.getByText(ALL_BACKEND_STATUS_KEY));
    userEvent.click(screen.getByTestId('UP'));
    await wait(() => {
      expect(
        screen.getByText('All services have been filtered out.'),
      ).toBeInTheDocument();
    });
  });

  it('renders expected status tip on icon hover', async () => {
    expect.hasAssertions();
    renderAndClearPicker();
    await wait(() =>
      userEvent.hover(
        screen.getByTestId(
          `${upBackendAshburn.serviceName}-expected-status-tip`,
        ),
      ),
    );
    await wait(() =>
      expect(screen.getByText(EXPECTED_STATUS_TIP)).toBeInTheDocument(),
    );
  });

  it('renders "service should be up" icon and reason if all backends are in prod regions', async () => {
    expect.hasAssertions();
    const verifyAllUpReasonRenders = async (
      backend: BackendProps,
      stateFilter: RegionStateSelectKey,
    ) => {
      await verifyReasonRenders({
        expectedReason: ALL_UP_REASON,
        iconId: `${backend.dns}-should-up-icon`,
        stateFilter,
      });
    };

    await verifyAllUpReasonRenders(downBackendHandshake, 'Production');
    await verifyAllUpReasonRenders(maintBackend, 'Production');
    await verifyAllUpReasonRenders(upBackendAshburn, 'Production');
    await verifyAllUpReasonRenders(upBackendPhoenix, 'Production');
  });

  const verifyReasonRenders = async (config: {
    expectedReason: string;
    iconId: string;
    stateFilter?: RegionStateSelectKey;
  }) => {
    const { expectedReason, iconId, stateFilter } = config;
    renderAndClearPicker();
    stateFilter && selectRegionState(stateFilter);
    await wait(() => {
      userEvent.hover(screen.getByTestId(iconId));
    });
    await wait(() =>
      expect(screen.getByText(expectedReason)).toBeInTheDocument(),
    );
    cleanup();
  };

  it('renders "service should be up" icon with reason if all backends have no missing capabilities', async () => {
    expect.hasAssertions();

    await verifyReasonRenders({
      expectedReason: ALL_UP_REASON,
      iconId: `${downBackendTimeout.dns}-should-up-icon`,
      stateFilter: 'Building',
    });
  });

  it('renders "service should not be up" icon with reason if all backends have missing capabilities and in non-prod regions', async () => {
    expect.hasAssertions();
    await verifyReasonRenders({
      expectedReason: ALL_DOWN_REASON,
      iconId: `${downBackendPartiallyUpService.dns}-should-not-up-icon`,
      stateFilter: 'Building',
    });
  });

  it('renders "service is partially up" icon with reason if some but not all backends should be up', async () => {
    expect.hasAssertions();
    await verifyReasonRenders({
      expectedReason: SOME_MISSING_CAPABILITIES_REASON,
      iconId: `${downBackendPartiallyUpService.dns}-should-partially-up-icon`,
    });
  });

  it('links to relevant /regions page for region', async () => {
    renderAndClearPicker();
    const regionalBackends = allBackends.filter((b) => !!b.region);
    await pollUntilVerifiedForAll(verifyRegionLinks, regionalBackends);
  });

  const verifyRegionLinks = (backend: BackendProps) => {
    within(serviceSummary(backend.serviceName))
      .getAllByText(backend.region!)
      .forEach((e) => {
        expect(e.getAttribute('href')).toEqual(`/regions/${backend.region}`);
      });
  };

  it.each([
    [upBackendAshburn.status, upBackendAshburn],
    [downBackendHandshake.status, downBackendHandshake],
    [maintBackend.status, maintBackend],
  ])(
    'shows reason for %s backend state on hover',
    async (_, backend: BackendProps) => {
      renderAndClearPicker();
      const expectedReason = backendStatesToReasons[backend.status!];
      await wait(() =>
        userEvent.hover(screen.getByTestId(`${backend.dns}-state-icon`)),
      );
      await wait(() =>
        expect(screen.getByText(expectedReason)).toBeInTheDocument(),
      );
    },
  );

  it('shows default reason for unknown backend states', async () => {
    renderAndClearPicker();
    await wait(() => {
      userEvent.hover(
        screen.getByTestId(`${unknownStateBackend.dns}-state-icon`),
      );
    });
    await wait(() => {
      expect(
        screen.getByText(
          /This is an unknown state. Please ask for information in/,
        ),
      ).toBeInTheDocument();
    });
  });

  it('shows "DNS not resolvable" message for backends without a state', async () => {
    renderAndClearPicker();
    await wait(() => {
      expect(screen.getAllByText(DNS_NOT_RESOLVABLE_REASON).length).toBe(2);
    });
    await wait(() => {
      userEvent.hover(
        screen.getByTestId(`${downBackendUnresolvableDns.dns}-state-icon`),
      );
    });
    await wait(() => {
      expect(screen.getAllByText(DNS_NOT_RESOLVABLE_REASON).length).toBe(3);
    });
  });

  it('renders all backend states from HAProxy in select filter', async () => {
    expect.assertions(uniqueBackendStatesWithBackend.length);
    renderAndClearPicker();
    userEvent.click(screen.getByText(ALL_BACKEND_STATUS_KEY));
    await Promise.all(
      uniqueBackendStatesWithBackend
        .map(([state]) => state)
        .map(async (state) => {
          await wait(() =>
            expect(screen.getByTestId(state)).toBeInTheDocument(),
          );
        }),
    );
  });

  it('renders all services from backend data in services filter', async () => {
    expect.assertions(uniqueServiceNames.length);
    renderAndClearPicker();
    userEvent.click(screen.getByText(ALL_SERVICES_KEY));
    await Promise.all(
      uniqueServiceNames.map(async (service) => {
        await wait(() =>
          expect(screen.getByTestId(service.serviceName)).toBeInTheDocument(),
        );
      }),
    );
  });
});
