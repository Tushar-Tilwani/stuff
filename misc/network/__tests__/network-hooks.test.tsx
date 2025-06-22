import {
  buildApiClient,
  normalizeError,
  useNetworkQuery,
} from 'network/network-hooks';
import registry from 'network/NetworkMethodRegistry';
import { allProperties } from 'common/utils/iterate';
import * as cacheModule from 'network/NetworkCacheProvider';
import * as instrumentation from 'common/instrumentation/Instrumentation';
import React from 'react';
import { render, wait } from '@testing-library/react';
import { TestProvider } from 'testUtils/TestProvider';

class TestClient {
  fetch: WindowOrWorkerGlobalScope['fetch'];
  basePath: string;

  constructor(fetch: WindowOrWorkerGlobalScope['fetch'], basePath: string) {
    this.fetch = fetch;
    this.basePath = basePath;
  }

  foo(): Promise<any> {
    return Promise.resolve('my test value');
  }

  bar(): Promise<any> {
    return Promise.reject(
      new Response('Rejecting on purpose!', { status: 400 }),
    );
  }
}

describe('network-hooks', () => {
  const newNetworkErrorSpy = jest.spyOn(cacheModule, 'NetworkError');
  const recordCounterSpy = jest.spyOn(instrumentation, 'recordCounter');

  describe('instrumentation cases', () => {
    const testClient = buildApiClient(TestClient, '/');

    it('records a counter when a network error occurs', async () => {
      expect.assertions(1);
      const FailingCall: React.FC = () => {
        const [data, {}] = useNetworkQuery({
          method: testClient.bar,
          params: {},
        });
        return <>{data}</>;
      };

      render(
        <TestProvider>
          <FailingCall />
        </TestProvider>,
      );
      await wait(() => {
        expect(recordCounterSpy).toHaveBeenCalledWith(
          'dope.network-hooks.networkError',
          expect.objectContaining({
            key: expect.any(String),
            message: expect.any(String),
            status: '400',
          }),
        );
      });
    });
  });

  describe('buildApiClient cases', () => {
    window.location.protocol = 'http:';
    window.location.host = 'localhost';

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('trims the given path and constructs a base path with protocol, host, and trimmed path', () => {
      const client: TestClient = buildApiClient(TestClient, '/my/test/path  ');
      expect(client.basePath).toEqual('http://localhost/my/test/path');
    });

    it('leaves the given path as is when already trimmed', () => {
      const client: TestClient = buildApiClient(TestClient, 'my/test/path');
      expect(client.basePath).toEqual('http://localhost/my/test/path');
    });

    it('returns a client with a fetch and basePath property', () => {
      const client: TestClient = buildApiClient(TestClient, 'my/test/path');

      expect(client).toHaveProperty('fetch');
      expect(client).toHaveProperty('basePath');
    });

    it('adds the network methods from the client class prototype to the built client', () => {
      const client: TestClient = buildApiClient(TestClient, 'my/test/path');

      allProperties(TestClient.prototype).forEach((m) =>
        expect(client.hasOwnProperty(m)).toBe(true),
      );
    });

    it('registers the client methods in the network method registry', () => {
      const registerSpy = jest.spyOn(registry, 'register');
      const client: TestClient = buildApiClient(TestClient, 'my/test/path');
      expect(registerSpy).toHaveBeenCalledWith(
        client.foo,
        'my/test/path.TestClient.foo',
      );
    });

    it("binds the client's methods to the built client", () => {
      const mockFooBind = jest.fn();
      const oldBind = TestClient.prototype.foo.bind;
      TestClient.prototype.foo.bind = mockFooBind;

      const client: TestClient = buildApiClient(TestClient, 'my/test/path');
      expect(client).toHaveProperty('foo');
      expect(mockFooBind).toHaveBeenCalledWith(client);

      TestClient.prototype.foo.bind = oldBind;
    });
  });

  describe('normalizeError cases', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('creates a NetworkError by serializing the error to a string', async () => {
      expect.assertions(1);
      await normalizeError(new Error('poop'));
      expect(newNetworkErrorSpy).toHaveBeenCalledWith(999, {
        message: 'Error: poop',
      });
    });

    it('creates a NetworkError w/ a default message if the error cannot be serialized to string', async () => {
      expect.assertions(1);
      const err = new Error();
      err.toString = () => null as any;
      await normalizeError(err);
      expect(newNetworkErrorSpy).toHaveBeenLastCalledWith(999, {
        message: 'An unexpected error occured.',
      });
    });

    it('creates a NetworkError using the object json if it is not an error', async () => {
      expect.assertions(1);
      await normalizeError({
        json: () => Promise.resolve(JSON.stringify({ message: 'poop' })),
        status: 400,
      } as Response);
      expect(newNetworkErrorSpy).toHaveBeenCalledWith(
        400,
        JSON.stringify({ message: 'poop' }),
      );
    });

    it('creates a NetworkError with an "Unable to parse" message when the response is empty', async () => {
      expect.assertions(1);
      await normalizeError(new Response());
      expect(newNetworkErrorSpy).toHaveBeenCalledWith(200, {
        message:
          'Unable to parse the error JSON body FetchError: invalid json response body at undefined reason: Unexpected end of JSON input',
      });
    });
  });
});
