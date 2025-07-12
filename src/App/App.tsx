import { Component } from 'react';
import type { HtmlElementProps } from '../types/interfaces';
import Main from '../components/Main/Main';
import SearchForm from '../components/Search/Form';
import CardList from '../components/CardList/CardList';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import fetchData from '../api/swapiService';
import type { AppState, Film } from './interface';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

class App extends Component<HtmlElementProps, AppState> {
  state: AppState = {
    data: null,
    detail: '',
    loading: false,
    error: '',
    darkMode: false,
  };

  componentDidMount(): void {
    const savedTerm: string | null = localStorage.getItem('searchTerm');
    if (savedTerm) {
      this.handleSearch(savedTerm);
    } else {
      this.handleSearch();
    }
  }

  handleError = (message: string) => {
    this.setState({
      detail: 'Something went wrong',
      data: null,
      loading: false,
      error: message,
    });
  };

  handleSearch = async (term?: string) => {
    if (term) {
      localStorage.setItem('searchTerm', term);
    }

    this.setState({ loading: true });

    const url: string = term
      ? `https://swapi.py4e.com/api/films/?search=${encodeURIComponent(term)}`
      : 'https://swapi.py4e.com/api/films/';

    try {
      const data = await fetchData(url);

      if (data && data.detail) {
        this.setState({ detail: data.detail, data: null, loading: false });
        return;
      }

      this.setState({
        detail: '',
        data:
          data.results?.map((film: Film) => ({
            itemHeader: 'Item name',
            title: film.title,
            desHeader: 'Item description',
            opening_crawl: film.opening_crawl,
          })) ?? null,
        loading: false,
      });
    } catch (error) {
      console.error(`Error from handleSearch: ${error}`);
      if (error instanceof Error) {
        this.handleError(error.message);
      } else {
        this.handleError('Unknown error occurred');
      }
    }
  };

  themeToggle = (): void => {
    this.setState((prev) => ({ darkMode: !prev.darkMode }));
  };

  render() {
    return (
      <div className={`app ${this.state.darkMode ? 'dark-theme' : ''}`}>
        <ThemeToggle onToggle={this.themeToggle} isDark={this.state.darkMode} />

        <Main>
          <SearchForm onSearch={this.handleSearch} />
          <CardList
            data={this.state.data}
            loading={this.state.loading}
            error={this.state.error}
          />
          <ErrorButton />
        </Main>
      </div>
    );
  }
}

export default App;
