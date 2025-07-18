import { Component, type FormEvent } from 'react';
import PageHeader from '../Templates/PageHeader/PageHeader';
import Wrapper from './components/Wrapper/Wrapper';
import Field from './components/Field/Field';
import ButtonTemplate from '../Templates/ButtonTemplate/ButtonTemplate';
import type FormProps from './interface';

class SearchForm extends Component<FormProps> {
  handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const trimmed = this.props.value.trim();
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <form
        className="app__controls"
        onSubmit={this.handleSubmit}
        data-testid="search-form"
      >
        <PageHeader level={2} className="app__controls-header">
          Top controls
        </PageHeader>

        <Wrapper>
          <Field value={this.props.value} onChange={this.props.onChange} />
          <ButtonTemplate className="app__search-btn" type="submit">
            Let&apos;s go
          </ButtonTemplate>
        </Wrapper>
      </form>
    );
  }
}

export default SearchForm;
