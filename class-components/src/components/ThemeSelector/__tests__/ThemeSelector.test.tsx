import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeSelector from '../ThemeSelector';
import { ThemeContext } from '../../../contexts/ThemeContext';

describe('ThemeSelector Component', () => {
  it('toggles theme on checkbox change', () => {
    const setTheme = vi.fn();
    const contextValue = {
      theme: 'light',
      setTheme,
    };

    render(
      <ThemeContext.Provider value={contextValue}>
        <ThemeSelector />
      </ThemeContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('renders with dark theme initially', () => {
    const setTheme = vi.fn();
    const contextValue = {
      theme: 'dark',
      setTheme,
    };

    render(
      <ThemeContext.Provider value={contextValue}>
        <ThemeSelector />
      </ThemeContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(setTheme).toHaveBeenCalledWith('light');
  });

  it('throws an error if used outside of ThemeProvider', () => {
    const renderComponent = () => render(<ThemeSelector />);

    expect(renderComponent).toThrow('ThemeContext must be used within a ThemeProvider');
  });
});
