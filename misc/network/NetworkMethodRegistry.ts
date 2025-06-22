interface Loader {
  (method: Function): string;
}

const registry = new Map<Function, string>();

const register = (method: Function, key: string) => {
  registry.set(method, key);
};

const getOrElse = (method: Function, loader: Loader): string | undefined => {
  if (!registry.has(method)) {
    load(method, loader);
  }
  return registry.get(method);
};

const load = (method: Function, loader: Loader): string => {
  const result = loader(method);
  registry.set(method, result);
  return result;
};

const clear = () => {
  registry.clear();
};

export default {
  register,
  getOrElse,
  clear,
};
