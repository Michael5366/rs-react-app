import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './ErrorBoundary';
import ErrorButton from '../ErrorButton/ErrorButton';

describe('ErrorBoundary component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders button and shows fallback after BrokenComponent error', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const buttonError = screen.getByRole('button', { name: 'Error button' });
    expect(buttonError).toBeInTheDocument();

    await user.click(buttonError);

    const textError = await screen.getByText('Something went wrong');
    const goBackButton = screen.getByRole('button', { name: 'Go back' });
    expect(textError).toBeInTheDocument();
    expect(goBackButton).toBeInTheDocument();
  });
});
