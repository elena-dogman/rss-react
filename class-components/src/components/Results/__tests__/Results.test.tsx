import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Results from '../Results';
import { renderWithProviders } from '../../../utils/test-utils';

interface Homeworlds {
  [url: string]: string;
}

const characters = [
  {
    name: 'Luke Skywalker',
    gender: 'male',
    height: '172',
    eye_color: 'blue',
    homeworld: 'http://swapi.dev/api/planets/1/',
    url: 'http://swapi.dev/api/people/1/',
  },
  {
    name: 'Leia Organa',
    gender: 'female',
    height: '150',
    eye_color: 'brown',
    homeworld: 'http://swapi.dev/api/planets/2/',
    url: 'http://swapi.dev/api/people/5/',
  },
];

const homeworlds: Homeworlds = {
  'http://swapi.dev/api/planets/1/': 'Tatooine',
  'http://swapi.dev/api/planets/2/': 'Alderaan',
};

describe('Results Component', () => {
  it('should render the image and characters', () => {
    renderWithProviders(<Results characters={characters} homeworlds={homeworlds} onCharacterClick={() => {}} />);

    characters.forEach((character) => {
      const characterName = screen.getByText(character.name);
      expect(characterName).toBeInTheDocument();

      const characterGender = screen.getByText((_, element) =>
        element?.textContent === `Gender: ${character.gender}`
      );
      expect(characterGender).toBeInTheDocument();

      const characterHeight = screen.getByText((_, element) =>
        element?.textContent === `Height: ${character.height}`
      );
      expect(characterHeight).toBeInTheDocument();

      const characterEyeColor = screen.getByText((_, element) =>
        element?.textContent === `Eye Color: ${character.eye_color}`
      );
      expect(characterEyeColor).toBeInTheDocument();

      const characterHomeworld = screen.getByText((_, element) =>
        element?.textContent === `Homeworld: ${homeworlds[character.homeworld]}`
      );
      expect(characterHomeworld).toBeInTheDocument();
    });
  });

  it('should display "Loading..." for unknown homeworlds', () => {
    const charactersWithUnknownHomeworld = [
      {
        name: 'Unknown Character',
        gender: 'unknown',
        height: 'unknown',
        eye_color: 'unknown',
        homeworld: 'http://swapi.dev/api/planets/unknown/',
        url: 'http://swapi.dev/api/people/unknown/',
      },
    ];

    renderWithProviders(<Results characters={charactersWithUnknownHomeworld} homeworlds={homeworlds} onCharacterClick={() => {}} />);

    const loadingHomeworld = screen.getByText((_, element) =>
      element?.textContent === 'Homeworld: Loading...'
    );
    expect(loadingHomeworld).toBeInTheDocument();
  });
});
