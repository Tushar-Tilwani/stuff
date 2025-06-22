import { newClient } from 'network/clients/ClientFactory';
import { BaseApiConfig } from 'network/network-hooks';
import * as dopeCommons from 'dope-commons';
import * as authModule from 'auth/common/request';

jest.mock('dope-commons', () => ({
  isInIframe: jest.fn(),
  createSignRequestInterceptor: jest.fn(),
}));

jest.mock('auth/common/request', () => ({
  signRequestInterceptor: jest.fn(),
}));
class TestClient {
  private oof: string;
  private rab: string;
  public config: BaseApiConfig | undefined;

  constructor(fetch: any, basePath: string, config?: BaseApiConfig) {
    this.config = config;
  }

  foo() {}

  // eslint-disable-next-line unused-imports/no-unused-vars
  bar(oof: string, rab: string) {
    this.oof = oof;
    this.rab = rab;
  }
}

describe('ClientFactory', () => {
  const mockIsInIframe = dopeCommons.isInIframe as jest.Mock;
  const mockMonolithSignRequestInterceptor = authModule.signRequestInterceptor as jest.Mock;
  const mockCommonsSignRequestInterceptor = dopeCommons.createSignRequestInterceptor as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
    mockIsInIframe.mockReturnValue(false);
  });

  it('returns a client with the same methods as the input client class', () => {
    const client: TestClient = newClient(TestClient, 'my/test/path');

    expect(client).toHaveProperty('foo');
    expect(client).toHaveProperty('bar');
  });

  it('binds client prototype methods to client', () => {
    const foo = jest.fn();
    const bar = jest.fn();
    const mockFooBind = jest.fn().mockReturnValue(foo);
    const mockBarBind = jest.fn().mockReturnValue(bar);
    TestClient.prototype.foo.bind = mockFooBind;
    TestClient.prototype.bar.bind = mockBarBind;

    const client: TestClient = newClient(TestClient, 'my/test/path');
    expect(mockFooBind).toHaveBeenCalledWith(client);
    client.foo();
    expect(foo).toHaveBeenCalled();
    expect(mockBarBind).toHaveBeenCalledWith(client);
    client.bar('oof', 'rab');
    expect(bar).toHaveBeenCalled();
  });

  it('uses the monolith request interceptor if not in an iframe', () => {
    const client = newClient(TestClient, 'my/path', { signRequests: true });
    expect(client.config?.requestInterceptors).toContain(
      mockMonolithSignRequestInterceptor.mock.results[0].value,
    );
  });

  it('uses the federated request interceptor if in an iframe', () => {
    mockIsInIframe.mockReturnValue(true);
    const client = newClient(TestClient, 'my/path', { signRequests: true });
    expect(client.config?.requestInterceptors).toContain(
      mockCommonsSignRequestInterceptor.mock.results[0].value,
    );
  });
});
