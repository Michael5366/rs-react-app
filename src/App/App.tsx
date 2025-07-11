import { Component } from 'react';
import type { HtmlElementProps } from '../types/interfaces';
import Main from '../components/Main/Main';
import SearchForm from '../components/Search/Form';
import CardList from '../components/CardList/CardList';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import fetchData from '../api/swapiService';
import type { Film } from './interface';

class App extends Component<HtmlElementProps> {
  state: { data: null; detail: null; loading: boolean } = {
    data: null,
    detail: null,
    loading: false,
  };

  componentDidMount(): void {
    const savedTerm: string | null = localStorage.getItem('searchTerm');
    if (savedTerm) {
      this.handleSearch(savedTerm);
    } else {
      this.handleSearch();
    }
  }

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
        detail: null,
        data: data.results?.map((film: Film) => ({
          itemHeader: 'Item name',
          title: film.title,
          desHeader: 'Item description',
          opening_crawl: film.opening_crawl,
        })),
        loading: false,
      });
    } catch (error) {
      console.error(`Error from handleSearch: ${error}`);
      this.setState({
        detail: 'Something went wrong',
        data: null,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="app">
        <Main>
          <SearchForm onSearch={this.handleSearch} />
          <CardList data={this.state.data} loading={this.state.loading} />
          <ErrorButton />
        </Main>
      </div>
    );
  }
}

export default App;
