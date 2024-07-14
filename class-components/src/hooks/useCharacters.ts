import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Character, fetchHomeworld, fetchCharacters } from '../api/characters';

const useCharacters = (searchTerm: string) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [homeworlds, setHomeworlds] = useState<{ [url: string]: string }>({});
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

  const fetchCharactersData = useCallback(async (term: string, page: number) => {
    setIsLoading(true);
    try {
      const { characters, totalPages } = await fetchCharacters(term, page);
      setCharacters(characters);
      setCurrentPage(page);
      setTotalPages(totalPages);
      await fetchHomeworlds(characters);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchHomeworlds]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    fetchCharactersData(searchTerm, page);
    navigate(`/?frontpage=${page}`);
  }, [fetchCharactersData, searchTerm, navigate]);

  return {
    characters,
    homeworlds,
    currentPage,
    totalPages,
    isLoading,
    handlePageChange,
    fetchCharactersData,
  };
};

export default useCharacters;
