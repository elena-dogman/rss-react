import axios from 'axios';

export interface Character {
  name: string;
  gender: string;
  height: string;
  eye_color: string;
  homeworld: string;
  url: string;
}

export const fetchCharacters = async (term: string) => {
  const url = `https://swapi.dev/api/people/?search=${term}`;
  console.log('Fetching URL:', url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching characters: ${response.status}`);
  }
  const data = await response.json();
  const totalPages = Math.ceil(data.count / 10);
  return { characters: data.results, totalPages };
};

export const fetchHomeworld = async (url: string) => {
  const response = await axios.get(url);
  return response.data.name;
};

export const fetchCharacterDetails = async (url: string): Promise<Character> => {
  const response = await axios.get(url);
  return response.data;
};
