import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMsg from './ErrorMsg';

describe('ErrorMsg component', () => {
  it('renders the error message passed via props', () => {
    const errorMsg = 'Error';

    render(<ErrorMsg errorMsg={errorMsg} />);

    const element = screen.getByText('Error');
    expect(element).toBeInTheDocument();
  });
});
