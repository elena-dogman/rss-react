import React from 'react';
import styles from './Results.module.scss';

interface Character {
  name: string;
  gender: string;
  height: string;
  eye_color: string;
  url: string;
}

interface ResultsProps {
  characters: Character[];
}

class Results extends React.Component<ResultsProps> {
  render() {
    const { characters } = this.props;

    return (
      <div className={styles.results}>
            <img
            src="src/assets/r2d2.png"
            className={styles['results-image']}
            alt="R2D2"
          />
        <div className={styles['characters-container']}>
          <div className={styles['characters-container']}>
            {characters.map((character) => (
              <div key={character.url} className={styles.character}>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
