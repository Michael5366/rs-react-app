import { Component } from 'react';
import type { HtmlElementProps } from '../types/interfaces';
import Main from '../components/Main/Main';
import SearchForm from '../components/Search/Form';
import CardList from '../components/CardList/CardList';
import ErrorButton from '../components/ErrorButton/ErrorButton';

class App extends Component<HtmlElementProps> {
  render() {
    return (
      <div className="app">
        <Main>
          <SearchForm />
          <CardList />
          <ErrorButton />
        </Main>
      </div>
    );
  }
}

export default App;
