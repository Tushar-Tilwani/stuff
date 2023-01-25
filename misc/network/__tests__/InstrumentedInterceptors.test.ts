import * as instrumentation from 'common/instrumentation/Instrumentation';
import {
  recordMetricsForRequest,
  recordMetricsForResponse,
} from '../InstrumentedInterceptors';

describe('InstrumentedInterceptors', () => {
  const recordCounterSpy = jest.spyOn(instrumentation, 'recordCounter');
  const requestWithUrl: Request = new Request(
    'https://www.oraclecorp.creedthroughts.gov/api/fooservice/v0/foo',
  );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('request cases', () => {
    it('returns the Request passed into it', async () => {
      const result: Request = await recordMetricsForRequest(requestWithUrl);
      expect(result).toBe(requestWithUrl);
    });

    it('records an invoke counter for a request', async () => {
      await recordMetricsForRequest(requestWithUrl);
      expect(recordCounterSpy).toHaveBeenCalledWith('invoke', {
        path: '/api/fooservice/v0/foo',
        api: 'fooservice',
      });
    });

    it('records the api for a request', async () => {
      await recordMetricsForRequest(requestWithUrl, 'listFoo');
      expect(recordCounterSpy).toHaveBeenCalledWith('invoke', {
        path: '/api/fooservice/v0/foo',
        api: 'fooservice',
        apiOp: 'listFoo',
      });
    });
  });

  describe('response cases', () => {
    it('returns the Response passed into it', async () => {
      const response: Response = ({} as unknown) as Response;
      const result: Response = await recordMetricsForResponse(
        requestWithUrl,
        response,
      );
      expect(result).toBe(response);
    });

    it('records a success counter when the Response is ok', async () => {
      const response: Response = ({
        ok: true,
        status: 200,
      } as unknown) as Response;
      await recordMetricsForResponse(requestWithUrl, response);
      expect(recordCounterSpy).toHaveBeenCalledTimes(1);
      expect(recordCounterSpy).toHaveBeenCalledWith('success', {
        path: '/api/fooservice/v0/foo',
        status: '200',
        api: 'fooservice',
      });
    });

    it('records a fail counter when the Response is not ok', async () => {
      const response: Response = ({
        ok: false,
        status: 500,
      } as unknown) as Response;
      await recordMetricsForResponse(requestWithUrl, response);
      expect(recordCounterSpy).toHaveBeenCalledWith('fail', {
        path: '/api/fooservice/v0/foo',
        status: '500',
        api: 'fooservice',
      });
    });

    it('records the api operation name when it is given', async () => {
      const response: Response = ({
        ok: true,
        status: 200,
      } as unknown) as Response;
      await recordMetricsForResponse(requestWithUrl, response, 'listFoo');
      expect(recordCounterSpy).toHaveBeenCalledTimes(1);
      expect(recordCounterSpy).toHaveBeenCalledWith('success', {
        path: '/api/fooservice/v0/foo',
        status: '200',
        api: 'fooservice',
        apiOp: 'listFoo',
      });
    });
  });
});
