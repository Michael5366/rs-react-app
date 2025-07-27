import { Link, useSearchParams } from 'react-router-dom';
import type { PaginationProps } from '../types/interfaces';

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const [searchParams] = useSearchParams();

  const createPageLink = (pageNumber: number): string => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(pageNumber));
    return `?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination">
      {pages.map((page) => (
        <Link
          key={page}
          to={createPageLink(page)}
          className={`pagination-item ${currentPage === page ? 'active' : ''}`}
        >
          {` ${page} `}
        </Link>
      ))}
    </nav>
  );
};

export default Pagination;
