import { useState, useCallback } from 'react';
import { fetchCharacterDetails } from '../api/characters';
import { useNavigate } from 'react-router-dom';
import { Character, DetailedCharacter } from '../types/types';

const useCharacterDetails = (currentPage: number) => {
  const [selectedCharacter, setSelectedCharacter] = useState<DetailedCharacter | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCharacterDetailsById = useCallback(async (id: string) => {
    setIsDetailLoading(true);
    try {
      const character = await fetchCharacterDetails(id);
      setSelectedCharacter(character as DetailedCharacter);
    } catch (error) {
      console.error('Error fetching character details:', error);
    } finally {
      setIsDetailLoading(false);
    }
  }, []);

  const handleCharacterClick = useCallback((character: Character) => {
    navigate(`/?frontpage=${currentPage}&details=${character.url}`);
    fetchCharacterDetailsById(character.url);
  }, [currentPage, fetchCharacterDetailsById, navigate]);

  const handleCloseDetail = useCallback(() => {
    navigate(`/?frontpage=${currentPage}`);
    setSelectedCharacter(null);
  }, [currentPage, navigate]);

  return {
    selectedCharacter,
    isDetailLoading,
    fetchCharacterDetailsById,
    handleCharacterClick,
    handleCloseDetail,
  };
};

export default useCharacterDetails;
