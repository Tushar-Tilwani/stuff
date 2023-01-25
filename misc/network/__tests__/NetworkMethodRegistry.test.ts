import registry from '../NetworkMethodRegistry';

describe('NetworkMethodRegistry', () => {
  const mockLoader = jest.fn();
  const noOpFn = () => {};

  beforeEach(() => {
    registry.clear();
    jest.resetAllMocks();
  });

  it('returns a registered method key when asked for', () => {
    registry.register(noOpFn, 'TestClient.foo');
    expect(registry.getOrElse(noOpFn, mockLoader)).toBe('TestClient.foo');
  });

  it('executes the given loader when a method key doesnt exist', () => {
    mockLoader.mockImplementationOnce(() => 'bar');

    const result = registry.getOrElse(noOpFn, mockLoader);
    expect(mockLoader).toHaveBeenCalledWith(noOpFn);
    expect(result).toBe('bar');
  });

  it('does not swallow exceptions from the loader', () => {
    mockLoader.mockImplementationOnce(() => {
      throw new Error('throwing on purpose!');
    });

    expect(() => registry.getOrElse(noOpFn, mockLoader)).toThrow();
  });

  it('clears all items', () => {
    mockLoader.mockReturnValueOnce('bar');

    registry.register(noOpFn, 'blah');
    expect(registry.getOrElse(noOpFn, mockLoader)).toBe('blah');
    expect(mockLoader).not.toHaveBeenCalled();

    registry.clear();

    expect(registry.getOrElse(noOpFn, mockLoader)).toBe('bar');
    expect(mockLoader).toHaveBeenCalledWith(noOpFn);
  });
});
