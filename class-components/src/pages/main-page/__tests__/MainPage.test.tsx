import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, vi, beforeEach } from 'vitest';
import MainPage from '../MainPage';
import TestSearchProvider from '../../../contexts/TestSearchProvider';
import * as api from '../../../api/characters';

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
  });

  it('should render Loader component while loading', async () => {
    vi.spyOn(api, 'fetchCharacters').mockImplementation(() => new Promise(() => {}));

    render(
      <TestSearchProvider value={{ searchTerm: 'Luke' }}>
        <MainPage />
      </TestSearchProvider>
    );

    expect(screen.getByText('Mocked Loader Component')).toBeInTheDocument();
  });

  it('should render no results message if no characters are found', async () => {
    vi.spyOn(api, 'fetchCharacters').mockResolvedValue({ characters: [], totalPages: 0 });

    render(
      <TestSearchProvider value={{ searchTerm: 'Luke' }}>
        <MainPage />
      </TestSearchProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('FOUND NO RESULTS YOU HAVE')).toBeInTheDocument();
      expect(screen.getByText('Change your search query you must')).toBeInTheDocument();
    });
  });

  it('should render Results component when characters are found', async () => {
    const mockCharacters = [
      { name: 'Luke Skywalker', homeworld: 'Tatooine', url: '1' },
      { name: 'Leia Organa', homeworld: 'Alderaan', url: '2' },
    ];
    vi.spyOn(api, 'fetchCharacters').mockResolvedValue({ characters: mockCharacters, totalPages: 1 });
    vi.spyOn(api, 'fetchHomeworld').mockResolvedValue('Tatooine');

    render(
      <TestSearchProvider value={{ searchTerm: 'Luke' }}>
        <MainPage />
      </TestSearchProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Mocked Results Component')).toBeInTheDocument();
    });
  });
});
