import React from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

interface SearchBarState {
  searchTerm: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || ''
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  }

  handleSearch = () => {
    const trimmedTerm = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    this.props.onSearch(trimmedTerm);
  }

  render() {
    return (
      <div className={styles.search}>
        <input
          type="text"
          value={this.state.searchTerm}
          className={styles.search__input}
          onChange={this.handleChange}
        />
        <button className={styles.search__button} onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
