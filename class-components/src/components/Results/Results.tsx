import React from 'react';
import styles from './Results.module.scss';
import { Character } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addItem, removeItem } from '../../store/reducers/selectedItemsSlice';
import classNames from 'classnames';

interface ResultsProps {
  characters: Character[];
  homeworlds: { [url: string]: string };
  onCharacterClick: (character: Character) => void;
}

const Results: React.FC<ResultsProps> = ({
  characters,
  homeworlds,
  onCharacterClick,
}) => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(
    (state) => state.selectedItems.selectedItems,
  );

  const handleCheckboxChange = (character: Character) => {
    if (selectedItems[character.url]) {
      dispatch(removeItem(character.url));
    } else {
      dispatch(addItem(character));
    }
  };

  return (
    <div className={styles.results}>
      <div className={styles['characters-container']}>
        {characters.map((character) => (
          <div
            key={character.url}
            className={classNames(styles.character, {
              [styles.selected]: selectedItems[character.url],
            })}
          >
            <div onClick={() => onCharacterClick(character)}>
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
            <div className={styles.lightsaber}>
              <label htmlFor={`obi-wan-${character.url}`}></label>
              <input
                type="checkbox"
                id={`obi-wan-${character.url}`}
                checked={!!selectedItems[character.url]}
                onChange={() => handleCheckboxChange(character)}
              />
              <div className={styles.switch}></div>
              <div className={`${styles.plasma} ${styles['obi-wan']}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
