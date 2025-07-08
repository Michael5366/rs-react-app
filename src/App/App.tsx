import { Component } from 'react';
import type { HtmlElementProps } from '../types/interfaces';
import Main from '../components/Main/Main';
import SearchForm from '../components/Search/Form';

class App extends Component<HtmlElementProps> {
  render() {
    return (
      <div className="app">
        <Main>
          <SearchForm />
        </Main>
      </div>
    );
  }
}

export default App;
