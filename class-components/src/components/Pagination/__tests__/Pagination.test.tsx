import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
  it('should render pagination buttons', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />,
    );

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('should call onPageChange when a page number is clicked', () => {
    const onPageChangeMock = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    fireEvent.click(screen.getByText('3'));
    expect(onPageChangeMock).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByText('>'));
    expect(onPageChangeMock).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByText('<'));
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });

  it('should update the URL query parameter when page changes', () => {
    const onPageChangeMock = vi.fn();
    const TestComponent = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const handlePageChange = (page: number) => {
        navigate(`/?page=${page}`);
        onPageChangeMock(page);
      };
      return (
        <>
          <Pagination
            currentPage={3}
            totalPages={5}
            onPageChange={handlePageChange}
          />
          <div data-testid="location-display">{location.search}</div>
        </>
      );
    };

    render(
      <MemoryRouter initialEntries={['/?page=3']}>
        <Routes>
          <Route path="/" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('4'));
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
    expect(screen.getByTestId('location-display').textContent).toBe('?page=4');
  });
});
