import { ApiRequest, ApiResponse, DopeContext } from 'dope-runtime-commons';
import * as contextModule from 'runtime/runtimeContext';

/**
 * Make all properties of a object literal immutable, i.e. frozen
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */
const deepFreeze = (object: any) => {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self

  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
};

const createMockDopeContext = (): DopeContext => {
  const mockRequest: ApiRequest = {
    headers: {},
  } as ApiRequest;

  const mockResponse: ApiResponse = {
    headers: {},
  } as ApiResponse;

  const mockDopeContext: DopeContext = {
    apiErrors: [
      {
        json: undefined,
        timestamp: 234,
        request: mockRequest,
        response: mockResponse,
      },
    ],
  };
  return mockDopeContext;
};

/**
 * The function registerContextListener is defined in runtime/runtimeContext
 * and executed at the module level in src/network/ApiErrorDrawer.tsx
 * This test lives separate from src/network/__tests__/ApiErrorDrawer.test.tsx
 * b/c registerContextListener is executed at the module level and needs to be
 * spyOn'ed. So require('../ApiErrorDrawer') needs to be run after the this spyOn.
 */
describe("ApiErrorDrawer's registerContextListener", () => {
  it('should not throw a TypeError b/c DopeContext is not mutated', () => {
    const spyOnListener = jest.spyOn(contextModule, 'registerContextListener');
    require('../ApiErrorDrawer');
    const mockDopeContext = createMockDopeContext();
    // To make sure DopeContext is not mutated, perform a "deepFreeze" on it.
    deepFreeze(mockDopeContext);
    const registerContextListener = spyOnListener.mock.calls[0][0];
    expect(() => {
      registerContextListener(mockDopeContext);
    }).not.toThrow();
  });
});
