import axios from 'axios';
import { Character } from '../types/types';


export const fetchCharacters = async (term: string, page: number = 1) => {
  const url = `https://swapi.dev/api/people/?search=${term}&page=${page}`;
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
