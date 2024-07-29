import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { DetailedCharacter } from '../../../types/types';
import CharacterDetails from '../CharacterDetails';
import { renderWithProviders } from '../../../utils/test-utils';

vi.mock('../../CloseButton/CloseButton', () => ({
  __esModule: true,
  default: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick}>Mocked Close Button</button>
  ),
}));

const character: DetailedCharacter = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  gender: 'male',
  height: '172',
  mass: '77',
  eye_color: 'blue',
  skin_color: 'fair',
  homeworld: 'Tatooine',
  url: 'http://swapi.dev/api/people/1/',
};

describe('CharacterDetails Component', () => {
  it('should correctly display the detailed card data', () => {
    renderWithProviders(
      <CharacterDetails
        character={character}
        isLoading={false}
        onClose={vi.fn()}
        homeworld="Tatooine"
      />,
    );
    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) =>
          element?.textContent === `Birth Year: ${character.birth_year}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) =>
          element?.textContent === `Gender: ${character.gender}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) =>
          element?.textContent === `Height: ${character.height}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) =>
          element?.textContent === `Mass: ${character.mass}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) =>
          element?.textContent === `Eye Color: ${character.eye_color}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) =>
          element?.textContent === `Skin Color: ${character.skin_color}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) => element?.textContent === `Homeworld: Tatooine`,
      ),
    ).toBeInTheDocument();
  });

  it('should hide the component when clicking the close button', () => {
    const onCloseMock = vi.fn();
    renderWithProviders(
      <CharacterDetails
        character={character}
        isLoading={false}
        onClose={onCloseMock}
        homeworld="Tatooine"
      />,
    );
    const closeButton = screen.getByText('Mocked Close Button');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
