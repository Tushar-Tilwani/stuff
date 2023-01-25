import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useMemo,
} from 'react';

interface ApiErrorContext {
  isOpen: boolean | string;
  openDrawer: (requestId?: string) => void;
  closeDrawer: () => void;
}

export const useApiErrorContext = () => {
  const context = useContext(ApiErrorContext);
  if (!context) {
    throw new Error(
      '`useApiErrorContext` must be used inside a `ApiErrorContextProvider`',
    );
  }
  return context;
};

const ApiErrorContext = createContext<ApiErrorContext | undefined>(undefined);

const ApiErrorContextProvider: React.FC = (props) => {
  const [isOpen, setOpen] = useState<boolean | string>(false);

  const openDrawer = useCallback(
    (requestId?: string) => setOpen(requestId ?? true),
    [],
  );

  const closeDrawer = useCallback(() => setOpen(false), []);

  const value: ApiErrorContext = useMemo(
    () => ({
      isOpen,
      openDrawer,
      closeDrawer,
    }),
    [closeDrawer, isOpen, openDrawer],
  );

  return <ApiErrorContext.Provider {...props} value={value} />;
};

export default ApiErrorContextProvider;
