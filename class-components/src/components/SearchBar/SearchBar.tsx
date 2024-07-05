import React, { Component } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

interface SearchBarState {
  searchTerm: string;
  placeholder: string;
}

const placeholder = localStorage.getItem('searchTerm');

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      searchTerm: '',
      placeholder:
        localStorage.getItem('searchTerm') || 'Search for characters',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSearch(this.state.searchTerm);
    localStorage.setItem('searchTerm', this.state.searchTerm);
  };

  render() {
    return (
      <form className={styles.search} onSubmit={this.handleSubmit}>
        <input
          type="text"
          className={styles['search-input']}
          value={this.state.searchTerm}
          onChange={this.handleChange}
          placeholder={this.state.placeholder}
        />
        <button className={styles['search-button']} type="submit">
          <img
            src="src/assets/search.png"
            alt="Search"
            className={styles['search-image']}
          />
        </button>
      </form>
    );
  }
}

export default SearchBar;
