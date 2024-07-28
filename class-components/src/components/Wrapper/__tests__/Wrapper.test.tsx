import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import Wrapper from '../Wrapper';
import { LoadingProvider } from '../../../contexts/LoadingContext';
import { ThemeContext } from '../../../contexts/ThemeContext';

vi.mock('../Loader/Loader', () => ({
  __esModule: true,
  default: () => <div>Mocked Loader</div>,
}));

describe('Wrapper Component', () => {
  it('renders children with light theme', () => {
    const themeContextValue = { theme: 'light', setTheme: vi.fn() };

    render(
      <ThemeContext.Provider value={themeContextValue}>
        <LoadingProvider>
          <Wrapper>
            <div>Child Content</div>
          </Wrapper>
        </LoadingProvider>
      </ThemeContext.Provider>,
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
    expect(screen.getByText('Child Content').parentElement).toHaveClass(
      'light-theme',
    );
  });

  it('renders children with dark theme', () => {
    const themeContextValue = { theme: 'dark', setTheme: vi.fn() };

    render(
      <ThemeContext.Provider value={themeContextValue}>
        <LoadingProvider>
          <Wrapper>
            <div>Child Content</div>
          </Wrapper>
        </LoadingProvider>
      </ThemeContext.Provider>,
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
    expect(screen.getByText('Child Content').parentElement).toHaveClass(
      'dark-theme',
    );
  });

  it('renders null if theme context is not provided', () => {
    const { container } = render(
      <LoadingProvider>
        <Wrapper>
          <div>Child Content</div>
        </Wrapper>
      </LoadingProvider>,
    );

    expect(container.firstChild).toBeNull();
  });
});
