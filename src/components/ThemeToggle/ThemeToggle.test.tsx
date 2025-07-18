import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle component', () => {
  it('calls onToggle when clicked', async () => {
    const user = userEvent.setup();

    const onToggle = vi.fn();

    render(<ThemeToggle onToggle={onToggle} isDark={false} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
