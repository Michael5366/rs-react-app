import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main component', () => {
  it('renders children inside main element', () => {
    render(<Main>Hello</Main>);

    const main = screen.getByText('Hello');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('app__main');
  });
});
