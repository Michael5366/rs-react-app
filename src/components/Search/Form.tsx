import { Component, type FormEvent } from 'react';
import PageHeader from '../Templates/PageHeader/PageHeader';
import Wrapper from './components/Wrapper/Wrapper';
import Field from './components/Field/Field';
import ButtonTemplate from '../Templates/ButtonTemplate/ButtonTemplate';

class SearchForm extends Component {
  handleSubmit(e: FormEvent): void {
    e.preventDefault();
  }

  render() {
    return (
      <form className="app__controls" onSubmit={this.handleSubmit}>
        <PageHeader level={2} className="app__controls-header">
          Top controls
        </PageHeader>

        <Wrapper>
          <Field />
          <ButtonTemplate className="app__search-btn" type="submit">
            Let&apos;s go
          </ButtonTemplate>
        </Wrapper>
      </form>
    );
  }
}

export default SearchForm;
