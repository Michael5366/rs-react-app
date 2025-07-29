import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page404 from './Page404';

describe('Page404', () => {
  it('render component', () => {
    render(<Page404 />);

    expect(screen.getByRole('heading', { name: '404' }));
  });
});
