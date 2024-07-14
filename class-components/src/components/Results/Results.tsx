import React from 'react';
import styles from './Results.module.scss';
import { Character } from '../../api/characters';

interface ResultsProps {
  characters: Character[];
  homeworlds: { [url: string]: string };
  onCharacterClick: (character: Character) => void;
}

const Results: React.FC<ResultsProps> = ({ characters, homeworlds, onCharacterClick }) => {
  return (
    <div className={styles.results}>
      <div className={styles['characters-container']}>
        {characters.map((character) => (
          <div key={character.url} className={styles.character} onClick={() => onCharacterClick(character)}>
            <h2 className={styles['character-name']}>{character.name}</h2>
            <p>
              <strong>Gender:</strong> {character.gender}
            </p>
            <p>
              <strong>Height:</strong> {character.height}
            </p>
            <p>
              <strong>Eye Color:</strong> {character.eye_color}
            </p>
            <p>
              <strong>Homeworld:</strong>{' '}
              {homeworlds[character.homeworld] || 'Loading...'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
