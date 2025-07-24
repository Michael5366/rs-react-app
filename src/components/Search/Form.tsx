import { type FormEvent } from 'react';
import PageHeader from '../Templates/PageHeader/PageHeader';
import Wrapper from './components/Wrapper/Wrapper';
import Field from './components/Field/Field';
import ButtonTemplate from '../Templates/ButtonTemplate/ButtonTemplate';
import type FormProps from './interface';

const SearchForm = ({ onSearch, value, onChange }: FormProps) => {
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const trimmed = value.trim();
    onSearch(trimmed);
  };

  return (
    <form
      className="app__controls"
      onSubmit={handleSubmit}
      data-testid="search-form"
    >
      <PageHeader level={2} className="app__controls-header">
        Top controls
      </PageHeader>

      <Wrapper>
        <Field value={value} onChange={onChange} />
        <ButtonTemplate className="app__search-btn" type="submit">
          Let&apos;s go
        </ButtonTemplate>
      </Wrapper>
    </form>
  );
};

export default SearchForm;
