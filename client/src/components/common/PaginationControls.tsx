import React from 'react';
import { Link } from 'react-router-dom';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // Base URL, e.g., /mcp/search-results?q=searchTerm
  pageParamName?: string; // Default 'page'
  maxPagesToShow?: number; // Max number of page links to show
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  baseUrl,
  pageParamName = 'page',
  maxPagesToShow = 5,
}) => {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page or less
  }

  const pageNumbers: (number | string)[] = [];
  const halfMax = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, currentPage - halfMax);
  let endPage = Math.min(totalPages, currentPage + halfMax);

  if (currentPage - halfMax < 1) {
    endPage = Math.min(totalPages, maxPagesToShow);
  }
  if (currentPage + halfMax > totalPages) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
  }

  if (totalPages <= maxPagesToShow) {
    startPage = 1;
    endPage = totalPages;
  }


  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Add ellipsis and first/last page if needed
  if (startPage > 1) {
    pageNumbers.unshift('...');
    pageNumbers.unshift(1);
  }
  if (endPage < totalPages) {
    pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }

  const buildPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(baseUrl.split('?')[1] || '');
    params.set(pageParamName, String(pageNumber));
    return `${baseUrl.split('?')[0]}?${params.toString()}`;
  };

  return (
    <nav className="mcp-pagination" aria-label="Page navigation">
      <ul>
        {currentPage > 1 ? (
          <li>
            <Link to={buildPageUrl(currentPage - 1)}>上一页</Link>
          </li>
        ) : (
          <li className="disabled">
            <span>上一页</span>
          </li>
        )}

        {pageNumbers.map((num, index) =>
          typeof num === 'number' ? (
            <li key={`page-${num}`} className={num === currentPage ? 'current-page' : ''}>
              <Link to={buildPageUrl(num)}>{num}</Link>
            </li>
          ) : (
            <li key={`ellipsis-${index}`} className="disabled">
              <span>{num}</span>
            </li>
          )
        )}

        {currentPage < totalPages ? (
          <li>
            <Link to={buildPageUrl(currentPage + 1)}>下一页</Link>
          </li>
        ) : (
          <li className="disabled">
            <span>下一页</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default PaginationControls;
