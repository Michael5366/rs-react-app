import { Component, type FormEvent } from 'react';
import PageHeader from '../Templates/PageHeader/PageHeader';
import Wrapper from './components/Wrapper/Wrapper';
import Field from './components/Field/Field';
import ButtonTemplate from '../Templates/ButtonTemplate/ButtonTemplate';
import type FormProps from './interface';

class SearchForm extends Component<FormProps> {
  state: { value: string } = {
    value: '',
  };

  handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const trimmed = this.state.value.trim();
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <form className="app__controls" onSubmit={this.handleSubmit}>
        <PageHeader level={2} className="app__controls-header">
          Top controls
        </PageHeader>

        <Wrapper>
          <Field
            value={this.state.value}
            onChange={(value: string): void => this.setState({ value: value })}
          />
          <ButtonTemplate className="app__search-btn" type="submit">
            Let&apos;s go
          </ButtonTemplate>
        </Wrapper>
      </form>
    );
  }
}

export default SearchForm;
