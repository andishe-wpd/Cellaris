
import { useEffect, useState } from "react";
import type { ReactPaginateProps } from "../types/pagination";

export default function ReactPaginate({
  nextLabel,
  previousLabel,
  pageCount,
  forcePage,
  pageRangeDisplayed = 2,
  onPageChange,
  activeClassName = "",
  pageClassName = "",
  className = "",
  previousClassName = "",
  disabledClassName = "",
}: ReactPaginateProps) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (typeof forcePage !== "undefined") {
      setCurrentPage(forcePage);
    }
  }, [forcePage]);

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber === currentPage) return;
    setCurrentPage(pageNumber);
    onPageChange({ selected: pageNumber });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const leftSide = pageRangeDisplayed;
    const rightSide = pageRangeDisplayed;

    let rangeStart = currentPage - leftSide;
    let rangeEnd = currentPage + rightSide;

    if (rangeStart < 0) {
      rangeEnd += Math.abs(rangeStart);
      rangeStart = 0;
    }

    if (rangeEnd > pageCount - 1) {
      rangeStart -= rangeEnd - (pageCount - 1);
      rangeEnd = pageCount - 1;
    }

    rangeStart = Math.max(rangeStart, 0);
    rangeEnd = Math.min(rangeEnd, pageCount - 1);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(
        <li
          key={i}
          className={`${pageClassName} ${i === currentPage ? activeClassName : ""}`}
          onClick={() => handlePageClick(i)}
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            role="button"
            aria-label={`Page ${i + 1}`}
            aria-current={i === currentPage ? "page" : undefined}
          >
            {i + 1}
          </a>
        </li>
      );
    }

    return pages;
  };

  return (
    <nav role="navigation" aria-label="Pagination">
      <ul
        className={`flex items-center justify-center list-none p-0 ${className}`}
      >
        <li
          className={`${previousClassName} ${currentPage === 0 ? disabledClassName : ""}`}
          onClick={() => currentPage > 0 && handlePageClick(currentPage - 1)}
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            role="button"
            aria-label="Previous page"
            aria-disabled={currentPage === 0}
          >
            {previousLabel}
          </a>
        </li>
        {renderPageNumbers()}
        <li
          className={`${previousClassName} ${currentPage === pageCount - 1 ? disabledClassName : ""}`}
          onClick={() =>
            currentPage < pageCount - 1 && handlePageClick(currentPage + 1)
          }
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            role="button"
            aria-label="Next page"
            aria-disabled={currentPage === pageCount - 1}
          >
            {nextLabel}
          </a>
        </li>
      </ul>
    </nav>
  );
}
