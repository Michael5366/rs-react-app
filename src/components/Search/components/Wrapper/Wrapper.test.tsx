import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Wrapper from './Wrapper';

describe('Wrapper component', () => {
  it('renders its children correctly', () => {
    render(<Wrapper>Hello</Wrapper>);

    const wrapper = screen.getByText('Hello');
    expect(wrapper).toBeInTheDocument();
  });
});
