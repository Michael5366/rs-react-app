import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageHeader from './PageHeader';

describe('PageHeader component', () => {
  it('renders the correct heading element with given level, class, and text', () => {
    const level = 3;
    const className = 'header';
    const children = 'text';

    render(
      <PageHeader level={level} className={className}>
        {children}
      </PageHeader>
    );

    const header = screen.getByText('text');
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe('H3');
    expect(header).toHaveClass('header');
  });
});
