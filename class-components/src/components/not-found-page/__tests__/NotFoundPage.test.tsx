import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import NotFoundPage from '../NotFoundPage';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom',
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('NotFoundPage', () => {
  it('should render NotFoundPage with all elements', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );

    const trooperImages = screen.getAllByAltText('trooper');
    expect(trooperImages).toHaveLength(2);

    expect(screen.getByText('Trooper report:')).toBeInTheDocument();
    expect(
      screen.getByText('This is not the page you are looking for. Move along.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Go Back/i }),
    ).toBeInTheDocument();
  });

  it('should call navigate function when Go Back button is clicked', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Go Back/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
