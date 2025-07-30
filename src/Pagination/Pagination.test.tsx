import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';
import { MemoryRouter } from 'react-router-dom';

describe('Pagination component', () => {
  it('should render the correct number of pages and highlight the current one', () => {
    const currentPage = 1;
    const totalPages = 5;

    render(
      <MemoryRouter>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </MemoryRouter>
    );

    const pageLinks = screen.getAllByRole('link');
    expect(pageLinks).toHaveLength(5);

    const activeLink = screen.getByRole('link', { name: '1' });
    expect(activeLink).toHaveClass('active');

    const inactiveLink = screen.getByRole('link', { name: '2' });
    expect(inactiveLink).not.toHaveClass('active');
  });

  it('should create correct links, preserving existing search params', () => {
    const currentPage = 1;
    const totalPages = 5;

    const initialUrl = '/?query=morty';

    render(
      <MemoryRouter initialEntries={[initialUrl]}>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </MemoryRouter>
    );

    const pageThreeLink = screen.getByRole('link', { name: '3' });

    expect(pageThreeLink).toHaveAttribute('href', '/?query=morty&page=3');
  });
});
