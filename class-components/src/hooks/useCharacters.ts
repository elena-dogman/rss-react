import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchHomeworld, fetchCharacters } from '../api/characters';
import { useSearch } from '../contexts/useSearch';
import { Character } from '../types/types';

const useCharacters = () => {
  const { searchTerm } = useSearch();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [homeworlds, setHomeworlds] = useState<{ [url: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchHomeworlds = useCallback(async (characters: Character[]) => {
    const homeworldsPromises = characters.map(async (character) => {
      if (!homeworlds[character.homeworld]) {
        const name = await fetchHomeworld(character.homeworld);
        return { url: character.homeworld, name };
      }
      return null;
    });

    const homeworldsData = await Promise.all(homeworldsPromises);
    const newHomeworlds: { [url: string]: string } = {};

    homeworldsData.forEach((homeworld) => {
      if (homeworld) {
        newHomeworlds[homeworld.url] = homeworld.name;
      }
    });

    setHomeworlds((prevHomeworlds) => ({
      ...prevHomeworlds,
      ...newHomeworlds,
    }));
  }, [homeworlds]);

  const fetchCharactersData = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const { characters, totalPages } = await fetchCharacters(searchTerm, page);
      setCharacters(characters);
      setCurrentPage(page);
      setTotalPages(totalPages);
      await fetchHomeworlds(characters);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setError('Failed to fetch characters. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchHomeworlds, searchTerm]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    navigate(`/?page=${page}`);
  }, [navigate]);

  useEffect(() => {
    fetchCharactersData(currentPage);
  }, [currentPage]);

  return {
    characters,
    homeworlds,
    currentPage,
    totalPages,
    isLoading,
    error,
    handlePageChange,
    fetchCharactersData,
  };
};

export default useCharacters;
