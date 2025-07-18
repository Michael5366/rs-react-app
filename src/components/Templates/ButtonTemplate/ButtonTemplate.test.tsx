import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonTemplate from './ButtonTemplate';

describe('ButtonTemplate component', () => {
  it('renders with correct props and handles click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <ButtonTemplate className="button" type="submit" onClick={onClick}>
        Click
      </ButtonTemplate>
    );

    const button = screen.getByRole('button', { name: 'Click' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
    expect(button).toHaveAttribute('type', 'submit');

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
