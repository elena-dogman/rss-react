import React from 'react';
import styles from './App.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import MainPage from '../../pages/MainPage';
import ErrorButton from '../ErrorButton/ErrorButton';

interface AppState {
  searchTerm: string;
}

class App extends React.Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
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
          <ErrorButton />
        </header>
        <MainPage searchTerm={searchTerm} />
      </div>
    );
  }
}

export default App;
