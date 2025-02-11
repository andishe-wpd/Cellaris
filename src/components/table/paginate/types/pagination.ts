import type React from "react";

export interface ReactPaginateProps {
  nextLabel: React.ReactNode;
  previousLabel: React.ReactNode;
  pageCount: number;
  forcePage?: number;
  pageRangeDisplayed?: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  activeClassName?: string;
  pageClassName?: string;
  className?: string;
  previousClassName?: string;
  disabledClassName?: string;
}

export interface PageClickEvent {
  selected: number;
}
