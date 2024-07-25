import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './CharacterDetails.module.scss';
import CloseButton from '../CloseButton/CloseButton';
import { DetailedCharacter } from '../../types/types';
import { setSelectedCharacter } from '../../store/reducers/selectedCharacterSlice';


interface CharacterDetailsProps {
  character: DetailedCharacter | null;
  isLoading: boolean;
  onClose: () => void;
  homeworld: string;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character, onClose, homeworld }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (character) {
      dispatch(setSelectedCharacter(character));
    }
  }, [character, dispatch]);

  if (!character) {
    return null;
  }

  return (
    <div className={styles.details}>
      <div className={styles["details-content"]}>
        <h2 className={styles["details-name"]}>{character.name}</h2>
        <p><strong>Birth Year:</strong> {character.birth_year}</p>
        <p><strong>Gender:</strong> {character.gender}</p>
        <p><strong>Height:</strong> {character.height}</p>
        <p><strong>Mass:</strong> {character.mass}</p>
        <p><strong>Eye Color:</strong> {character.eye_color}</p>
        <p><strong>Skin Color:</strong> {character.skin_color}</p>
        <p><strong>Homeworld:</strong> {homeworld}</p>
      </div>
      <CloseButton onClick={onClose} />
    </div>
  );
};

export default CharacterDetails;
