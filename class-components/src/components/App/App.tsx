import React from 'react';
import styles from './App.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import MainPage from '../../pages/MainPage';

interface AppState {
  searchTerm: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleSearch = (term: string) => {
    this.setState({ searchTerm: term });
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <SearchBar onSearch={this.handleSearch} />
        </header>
        <MainPage searchTerm={searchTerm} />
      </div>
    );
  }
}

export default App;
