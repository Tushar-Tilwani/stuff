import React from 'react';
import { render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ApiErrorDrawer, { apiErrorResponseInterceptor } from '../ApiErrorDrawer';
import { TimezoneProvider } from '@src/TimezoneProvider';
import { updateContext } from 'runtime/runtimeContext';
import { ApiError, toSendable } from 'dope-runtime-commons';
import { TestProvider } from '@src/testUtils/TestProvider';

const renderAndOpenDrawer = async (req: Request, res: Response) => {
  const props = {
    onApiErrorSet: jest.fn(),
  };
  const utils = render(
    <TestProvider>
      <TimezoneProvider>
        <ApiErrorDrawer {...props} />
      </TimezoneProvider>
    </TestProvider>,
  );

  // run a request through the interceptor
  await apiErrorResponseInterceptor(req, res);

  // open drawer
  userEvent.click(utils.getAllByLabelText('Open API errors')[0]);

  // wait for it to be open
  await wait(() => expect(utils.getByText('API Errors')).toBeVisible());

  return utils;
};

describe('ApiErrorDrawer', () => {
  const t2ReqUrl = '/api/t2/us-ashburn-1/alarms';

  it('Renders an expandable API error in the drawer', async () => {
    const { req, res } = newRequestAndErrResponse(t2ReqUrl);
    const { getByText } = await renderAndOpenDrawer(req, res);

    const row = getByText(t2ReqUrl);
    await wait(() => expect(row).toBeVisible());

    userEvent.click(row);
    await wait(() => {
      expect(getByText('General')).toBeVisible();
      expect(getByText('Request Headers')).toBeVisible();
      expect(getByText('Response Headers')).toBeVisible();
    });
  });

  const newRequestAndErrResponse = (reqUrl: string) => ({
    req: new Request(reqUrl),
    res: new Response(
      JSON.stringify({ code: 'NotFound', message: 'Not Found' }),
      {
        status: 404,
        statusText: '404',
      },
    ),
  });

  it('Does not render rows when API requests succeed', async () => {
    expect.assertions(2);
    await verifyErrorNotRendered(t2ReqUrl);
  });

  const newRequestAndGoodResponse = (reqUrl: string) => ({
    req: new Request(reqUrl),
    res: new Response(
      JSON.stringify([
        {
          name: 'test alarm',
          query: 'metric[1m].sum() > 0',
        },
      ]),
    ),
  });

  const verifyErrorNotRendered = async (reqUrl: string) => {
    const { req, res } = newRequestAndGoodResponse(reqUrl);
    const utils = await renderAndOpenDrawer(req, res);
    expect(utils.queryByText(reqUrl)).not.toBeInTheDocument();
    return utils;
  };

  it('Splits app errors into separate sections', async () => {
    const t2Req = new Request(t2ReqUrl);
    const t2Res = new Response(
      JSON.stringify({
        code: 'NotFound',
        message: 'Not Found',
      }),
      {
        status: 404,
        statusText: '404',
      },
    );

    const { getAllByRole } = await renderAndOpenDrawer(t2Req, t2Res);

    const odoReqUrl = '/api/odo/us-ashburn-1/ad1/applications';
    const odoReq = new Request(odoReqUrl);
    const odoRes = t2Res.clone();

    await apiErrorResponseInterceptor(odoReq, odoRes);

    const a = getAllByRole('table');
    expect(a).toHaveLength(2);
  });

  it('renders errors from the runtime context', async () => {
    expect.assertions(6);
    const apiError = await pluginApiError();

    const { getByLabelText } = await verifyErrorNotRendered(t2ReqUrl);
    userEvent.click(getByLabelText('Close'));

    updateContext({ apiErrors: [] });
    const { queryByText, getByText } = await verifyErrorNotRendered(t2ReqUrl);

    updateContext({ apiErrors: [apiError] });
    expect(queryByText(t2ReqUrl)).toBeInTheDocument();
    userEvent.click(getByText(t2ReqUrl));
    await wait(() => {
      expect(queryByText('myreqheader')).toBeInTheDocument();
    });
  });

  const pluginApiError = async () => {
    const { req, res } = newRequestAndErrResponse(t2ReqUrl);
    const apiError: ApiError = {
      request: {
        ...toSendable(req),
        headers: ({ myreqheader: 'hi' } as unknown) as Headers,
        url: t2ReqUrl,
      },
      response: {
        ...toSendable(res),
        headers: ({ myresheader: 'hi' } as unknown) as Headers,
      },
      timestamp: Date.now(),
      json: await res.clone().json(),
    };
    return apiError;
  };

  it('doesnt render anything if runtime context has no errors', async () => {
    expect.assertions(3);
    updateContext({ timezone: 'local' });
    const { queryByText } = await verifyErrorNotRendered(t2ReqUrl);
    expect(queryByText(t2ReqUrl)).not.toBeInTheDocument();
  });

  it('prevents errors from adding to API error drawer by identical request', async () => {
    const requestUrl_1 =
      '/api/odo/us-ashburn-1/ad1/applications/test-endpoint-1';
    const requestUrl_2 =
      '/api/odo/us-ashburn-1/ad1/applications/test-endpoint-2';
    const { req, res } = newRequestAndErrResponse(requestUrl_1);
    res.headers.set('opc-request-id', 'exactly-same-request-id');

    const { queryByText } = await renderAndOpenDrawer(req, res);

    const anyMockedRequest = new Request(requestUrl_2);
    const clonedRes = res.clone();

    // requests with duplicated request ID will not be added to api drawer
    await apiErrorResponseInterceptor(anyMockedRequest, clonedRes);

    expect(queryByText(requestUrl_1)).toBeInTheDocument();
    await wait(() => {
      expect(queryByText(requestUrl_2)).not.toBeInTheDocument();
    });
  });

  it('prevents duplicated errors from adding to API by updating dope context without new error', async () => {
    const requestUrl_1 =
      '/api/odo/us-ashburn-1/ad1/applications/test-endpoint-1';
    const requestUrl_2 =
      '/api/odo/us-ashburn-1/ad1/applications/test-endpoint-2';
    const { req, res } = newRequestAndErrResponse(requestUrl_1);
    res.headers.set('opc-request-id', 'exactly-same-request-id');
    const { queryByText } = await renderAndOpenDrawer(req, res);

    const apiError: ApiError = {
      request: {
        ...toSendable(req),
        headers: ({ myreqheader: 'hi' } as unknown) as Headers,
        url: requestUrl_2,
      },
      response: res,
      timestamp: Date.now(),
      json: await res.clone().json(),
    };

    updateContext({ docTitle: 'new doc title', apiErrors: [apiError] });

    expect(queryByText(requestUrl_1)).toBeInTheDocument();
    await wait(() => {
      expect(queryByText(requestUrl_2)).not.toBeInTheDocument();
    });
  });
});
