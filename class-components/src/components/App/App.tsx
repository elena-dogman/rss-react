import React from 'react';
import styles from './App.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import Results from '../Results/Results';

interface Character {
  name: string;
  gender: string;
  height: string;
  eye_color: string;
  url: string;
}

interface AppState {
  characters: Character[];
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  handleSearch = (term: string) => {
    fetch(`https://swapi.dev/api/people/?search=${term}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ characters: data.results });
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });
  };

  render() {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <SearchBar onSearch={this.handleSearch} />
        </header>
        <Results characters={this.state.characters} />
      </div>
    );
  }
}

export default App;
