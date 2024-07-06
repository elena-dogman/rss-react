import React from 'react';
import axios from 'axios'; // Убедитесь, что axios правильно импортирован
import styles from './MainPage.module.scss';
import Results from '../components/Results/Results';
import Loader from '../components/Loader/Loader';

interface Character {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  eye_color: string;
  homeworld: string;
  url: string;
}

interface MainPageProps {
  searchTerm: string;
}

interface MainPageState {
  characters: Character[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  homeworlds: { [url: string]: string };
}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = {
      characters: [],
      currentPage: 1,
      totalPages: 0,
      isLoading: false,
      homeworlds: {},
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
    this.setState({ isLoading: true });
    fetch(`https://swapi.dev/api/people/?search=${term}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const totalPages = Math.ceil(data.count / 10);
        this.setState({ characters: data.results, currentPage: page, totalPages }, () => {
          this.fetchHomeworlds(data.results);
        });
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
        this.setState({ isLoading: false });
      });
  };

  fetchHomeworlds = async (characters: Character[]) => {
    const homeworldsPromises = characters.map(async (character) => {
      if (!this.state.homeworlds[character.homeworld]) {
        const response = await axios.get(character.homeworld);
        return { url: character.homeworld, name: response.data.name };
      }
      return null;
    });

    const homeworldsData = await Promise.all(homeworldsPromises);
    const homeworlds: { [url: string]: string } = {};

    homeworldsData.forEach((homeworld) => {
      if (homeworld) {
        homeworlds[homeworld.url] = homeworld.name;
      }
    });

    this.setState((prevState) => ({
      homeworlds: { ...prevState.homeworlds, ...homeworlds },
      isLoading: false,
    }));
  };

  handlePageChange = (page: number) => {
    this.fetchCharacters(this.props.searchTerm, page);
  };

  handleNextPage = () => {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages) {
      this.fetchCharacters(this.props.searchTerm, currentPage + 1);
    }
  };

  handlePreviousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.fetchCharacters(this.props.searchTerm, currentPage - 1);
    }
  };

  renderPagination = () => {
    const { currentPage, totalPages } = this.state;

    return (
      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={this.handlePreviousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ''}`}
            onClick={() => this.handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className={styles.pageButton}
          onClick={this.handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    );
  };

  render() {
    const { characters, isLoading, homeworlds } = this.state;

    return (
      <div className={styles.mainPage}>
        {isLoading ? (
          <div className={styles.loaderWrapper}>
            <Loader />
            <span className={styles.loadingText}>Loading</span>
          </div>
        ) : (
          <Results characters={characters} homeworlds={homeworlds} />
        )}
        {this.renderPagination()}
      </div>
    );
  }
}

export default MainPage;
