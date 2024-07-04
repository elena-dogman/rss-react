import React from 'react';
import styles from './MainPage.module.scss';
import Results from '../components/Results/Results';

interface Character {
  name: string;
  gender: string;
  height: string;
  eye_color: string;
  url: string;
}

interface MainPageProps {
  searchTerm: string;
}

interface MainPageState {
  characters: Character[];
  currentPage: number;
  totalPages: number;
}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = {
      characters: [],
      currentPage: 1,
      totalPages: 0,
    };
  }

  componentDidMount() {
    this.fetchCharacters(this.props.searchTerm, 1);
  }

  componentDidUpdate(prevProps: MainPageProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.setState({ characters: [], currentPage: 1, totalPages: 0 }, () => {
        this.fetchCharacters(this.props.searchTerm, 1);
      });
    }
  }

  fetchCharacters = (term: string, page: number) => {
    fetch(`https://swapi.dev/api/people/?search=${term}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const totalPages = Math.ceil(data.count / 10);
        this.setState({
          characters: data.results,
          currentPage: page,
          totalPages: totalPages,
        });
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
      });
  };

  handlePageChange = (page: number) => {
    this.fetchCharacters(this.props.searchTerm, page);
  };

  renderPagination = () => {
    const { currentPage, totalPages } = this.state;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageButton} ${currentPage === i ? styles.activePage : ''}`}
          onClick={() => this.handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return <div className={styles.pagination}>{pages}</div>;
  };

  render() {
    const { characters } = this.state;

    return (
      <div className={styles.mainPage}>
        <Results characters={characters} />
        {this.renderPagination()}
      </div>
    );
  }
}

export default MainPage;
