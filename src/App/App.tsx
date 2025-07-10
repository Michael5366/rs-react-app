import { Component } from 'react';
import type { HtmlElementProps } from '../types/interfaces';
import Main from '../components/Main/Main';
import SearchForm from '../components/Search/Form';
import CardList from '../components/CardList/CardList';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import fetchData from '../api/swapiService';
import type { Film } from './interface';

class App extends Component<HtmlElementProps> {
  state: { data: null; detail: null } = {
    data: null,
    detail: null,
  };

  handleSearch = async (term?: string) => {
    const url: string = term
      ? `https://swapi.py4e.com/api/films/?search=${encodeURIComponent(term)}`
      : 'https://swapi.py4e.com/api/films/';

    try {
      const data = await fetchData(url);

      if (data && data.detail) {
        this.setState({ detail: data.detail, data: null });
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
      });
    } catch (error) {
      console.error(`Error from handleSearch: ${error}`);
    }
  };

  render() {
    return (
      <div className="app">
        <Main>
          <SearchForm onSearch={this.handleSearch} />
          <CardList data={this.state.data} />
          <ErrorButton />
        </Main>
      </div>
    );
  }
}

export default App;
