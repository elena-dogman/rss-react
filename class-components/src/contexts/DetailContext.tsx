import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { Character, DetailedCharacter } from '../types/types';
import { fetchCharacterDetails } from '../api/characters';

interface DetailContextProps {
  selectedCharacter: DetailedCharacter | null;
  isDetailLoading: boolean;
  fetchCharacterDetailsById: (id: string) => Promise<void>;
  handleCharacterClick: (character: Character) => void;
  handleCloseDetail: () => void;
}

interface DetailProviderProps {
  children: ReactNode;
}

export const DetailContext = createContext<DetailContextProps | undefined>(
  undefined,
);

export const DetailProvider: React.FC<DetailProviderProps> = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] =
    useState<DetailedCharacter | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

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

  const handleCharacterClick = useCallback(
    (character: Character) => {
      fetchCharacterDetailsById(character.url);
    },
    [fetchCharacterDetailsById],
  );

  const handleCloseDetail = useCallback(() => {
    setSelectedCharacter(null);
  }, []);
  return (
    <DetailContext.Provider
      value={{
        selectedCharacter,
        isDetailLoading,
        fetchCharacterDetailsById,
        handleCharacterClick,
        handleCloseDetail,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
};
