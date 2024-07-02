import React from 'react';
import styles from'./App.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import Results from '../Results/Results';

class App extends React.Component {
  handleSearch = (term: string) => {
    console.log('Perform search with term:', term);
  }

  render() {
    return (
      <div className={styles.app}>
           <header className="header">
          <SearchBar onSearch={this.handleSearch} />
          </header>
        <Results />
      </div>
    );
  }
}

export default App;
