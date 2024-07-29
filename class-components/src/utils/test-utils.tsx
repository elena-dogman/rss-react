import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { EnhancedStore } from '@reduxjs/toolkit';

import { RootState, setupStore } from '../store/store';
import { LoadingProvider } from '../contexts/LoadingContext';

interface RenderWithProvidersOptions {
  store?: EnhancedStore<RootState>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { store = setupStore(), ...renderOptions }: RenderWithProvidersOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }): JSX.Element {
    return (
      <Provider store={store}>
        <LoadingProvider>{children}</LoadingProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
