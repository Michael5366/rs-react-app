import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component', (): void => {
  it('displays loading spinner', (): void => {
    render(<Spinner />);

    const spinner: HTMLElement = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });
});
