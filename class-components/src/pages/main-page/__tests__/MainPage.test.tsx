import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, vi, beforeEach } from 'vitest';
import MainPage from '../MainPage';
import * as api from '../../../api/characters';
import { BrowserRouter } from 'react-router-dom';
import { Character, DetailedCharacter } from '../../../types/types';
import { renderWithProviders } from '../../../utils/test-utils';

vi.mock('../../../components/Results/Results', () => ({
  __esModule: true,
  default: ({ characters, homeworlds }: { characters: Character[], homeworlds: { [url: string]: string } }) => (
    <div>
      {characters.map((character) => (
        <div key={character.url}>
          <h2>{character.name}</h2>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Height:</strong> {character.height}</p>
          <p><strong>Eye Color:</strong> {character.eye_color}</p>
          <p><strong>Homeworld:</strong> {homeworlds[character.homeworld]}</p>
        </div>
      ))}
    </div>
  ),
}));

vi.mock('../../../components/Loader/Loader', () => ({
  __esModule: true,
  default: () => <div>Mocked Loader Component</div>,
}));

vi.mock('../../../components/CharacterDetails/CharacterDetails', () => ({
  __esModule: true,
  default: () => <div>Mocked CharacterDetails Component</div>,
}));

describe('MainPage Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('renders the component without crashing', async () => {
    const characters: Character[] = [
      { name: 'Luke Skywalker', gender: 'male', height: '172', eye_color: 'blue', homeworld: 'Tatooine', url: '1' },
      { name: 'Leia Organa', gender: 'female', height: '150', eye_color: 'brown', homeworld: 'Alderaan', url: '2' }
    ];

    const fetchCharactersMock = vi.spyOn(api, 'fetchCharacters').mockResolvedValue({ characters, totalPages: 1 });
    const fetchHomeworldMock = vi.spyOn(api, 'fetchHomeworld').mockResolvedValue('Mocked Homeworld');
    const fetchCharacterDetailsMock = vi.spyOn(api, 'fetchCharacterDetails').mockResolvedValue({} as DetailedCharacter);

    renderWithProviders(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>,
      {}
    );

    await waitFor(() => {
      expect(screen.queryByText('Mocked Loader Component')).not.toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
    fetchCharactersMock.mockRestore();
    fetchHomeworldMock.mockRestore();
    fetchCharacterDetailsMock.mockRestore();
  });

  it('renders character details', async () => {
    const characters = [
      { name: 'Luke Skywalker', gender: 'male', height: '172', eye_color: 'blue', homeworld: 'Tatooine', url: '1' },
      { name: 'Leia Organa', gender: 'female', height: '150', eye_color: 'brown', homeworld: 'Alderaan', url: '2' }
    ];
    const fetchCharactersMock = vi.spyOn(api, 'fetchCharacters').mockResolvedValue({ characters, totalPages: 1 });
    const fetchHomeworldMock = vi.spyOn(api, 'fetchHomeworld').mockResolvedValue('Mocked Homeworld');
    const fetchCharacterDetailsMock = vi.spyOn(api, 'fetchCharacterDetails').mockResolvedValue({} as DetailedCharacter);

    renderWithProviders(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>,
      {}
    );

    await waitFor(() => {
      expect(screen.queryByText('Mocked Loader Component')).not.toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Leia Organa')).toBeInTheDocument();
    });

    fetchCharactersMock.mockRestore();
    fetchHomeworldMock.mockRestore();
    fetchCharacterDetailsMock.mockRestore();
  });
});