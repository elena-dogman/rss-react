import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  it('should display error message when an error is thrown', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops... Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Refresh the page')).toBeInTheDocument();
  });

  it('should render children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
