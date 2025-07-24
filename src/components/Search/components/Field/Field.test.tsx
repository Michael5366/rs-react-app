import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Field from './Field';

describe('Field component', () => {
  it('calls onChange with correct values and sets input value accordingly', async () => {
    const user = userEvent.setup();
    const text = 'text';
    const onChange = vi.fn();

    render(<Field onChange={onChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    await user.type(input, text);
    expect(input).toHaveValue('text');

    await user.type(input, '-abc');
    expect(onChange).toHaveBeenCalledWith('text-a');
    expect(onChange).toHaveBeenCalledWith('text-ab');
    expect(onChange).toHaveBeenCalledWith('text-abc');
  });
});
