import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './Form';

describe('SearchForm component', () => {
  it('renders form, updates input and calls onSearch on submit', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onSearch = vi.fn();
    const value = 'text';

    render(
      <SearchForm value={value} onChange={onChange} onSearch={onSearch} />
    );

    const form = screen.getByTestId('search-form');
    const header = screen.getByText('Top controls');
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: "Let's go" });
    expect(form).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, value);
    expect(input).toHaveValue('text');
    expect(onChange).toHaveBeenCalled();

    await user.click(button);
    expect(onSearch).toHaveBeenCalledWith(value);
  });
});
