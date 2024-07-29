import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import HomeworldFetcher from '../HomeworldFetcher';
import { useFetchHomeworldQuery } from '../../../store/reducers/apiSlice';
import { useLoading } from '../../../contexts/useLoading';

vi.mock('../../../store/reducers/apiSlice', () => ({
  useFetchHomeworldQuery: vi.fn(),
}));

vi.mock('../../../contexts/useLoading', () => ({
  useLoading: vi.fn(),
}));

describe('HomeworldFetcher', () => {
  it('calls onFetch with the correct parameters when data is available', async () => {
    const mockSetLoading = vi.fn();
    const mockOnFetch = vi.fn();

    (useFetchHomeworldQuery as jest.Mock).mockReturnValue({
      data: { name: 'Tatooine' },
      isLoading: false,
    });

    (useLoading as jest.Mock).mockReturnValue({
      setLoading: mockSetLoading,
    });

    render(<HomeworldFetcher url="test-url" onFetch={mockOnFetch} />);

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(false);
      expect(mockOnFetch).toHaveBeenCalledWith('test-url', 'Tatooine');
    });
  });

  it('sets loading state correctly', async () => {
    const mockSetLoading = vi.fn();

    (useFetchHomeworldQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    (useLoading as jest.Mock).mockReturnValue({
      setLoading: mockSetLoading,
    });

    render(<HomeworldFetcher url="test-url" onFetch={vi.fn()} />);

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
    });
  });
});
