import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, vi, beforeEach } from 'vitest';
import MainPage from '../MainPage';
import TestSearchProvider from '../../../contexts/TestSearchProvider';
import * as api from '../../../api/characters';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../../components/Results/Results', () => ({
  __esModule: true,
  default: () => <div>Mocked Results Component</div>,
}));

vi.mock('../../../components/Loader/Loader', () => ({
  __esModule: true,
  default: () => <div>Mocked Loader Component</div>,
}));

describe('MainPage Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('should render no results message if no characters are found', async () => {
    const fetchCharactersMock = vi.spyOn(api, 'fetchCharacters').mockResolvedValue({ characters: [], totalPages: 0 });

    render(
      <TestSearchProvider value={{ searchTerm: 'Luke', setSearchTerm: vi.fn() }}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </TestSearchProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('FOUND NO RESULTS YOU HAVE')).toBeInTheDocument();
      expect(screen.getByText('Change your search query you must')).toBeInTheDocument();
    });

    fetchCharactersMock.mockRestore();
  });
});
