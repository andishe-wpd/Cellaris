import React from "react";


import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";

const PaginateCustom = ({
  handlePageClick,
  forcePage,
  // setFilter = () => {},
  filter,
  setForcePage,
  refresh,
  currentPage,
  pageSize,
  totalCount,
  totalPage,
  // showNumber = true,
  defaultPageSize,
  // noStyle = false,
}) => {
  // const [flagCountPage, setflagCountPage] = useState(false);
  const [pageSizeState, setpageSizeState] = useState(
    pageSize ? pageSize : defaultPageSize
  );

  const handlePageSize = (num = pageSize ? pageSize : defaultPageSize) => {
    setpageSizeState(num);
    if (filter?.page > 0) {
      // setFilter(prev => ({ ...prev, pageSize: num }));
      setForcePage(0);
    } else {
      // setFilter(prev => ({ ...prev, pageSize: num }));
    }
  };

  useEffect(() => {
    if (pageSize != defaultPageSize) {
      handlePageSize(pageSize ? pageSize : defaultPageSize);
    }
  }, [pageSize, defaultPageSize, handlePageSize]);
  useEffect(() => {
    if (refresh) {
      setpageSizeState(pageSize ? pageSize : defaultPageSize);
      handlePageSize(pageSize ? pageSize : defaultPageSize);
    }
  }, [refresh]);

  const page = currentPage || 1;
  const size = pageSize || defaultPageSize;
  const total = totalCount || 0;

  return (
    <>
      <div className={`flex items-center justify-between px-3 h-[55px] mb-2`}>
        <div className="flex">
          <div className="mr-5 flex items-center text-sm ">
            <div className="text-gray-500">نمایش</div>
            <div className="text-black mx-1">
              {(page != 1 ? page + page * size - size - page + 1 : page) || 0}
              {" تا "}
              {(page + page * size - page < total
                ? page + page * size - page
                : total) || 0}
            </div>
            <div className="text-gray-500">از</div>
            <div className="text-black mx-1">{total || 0}</div>
            <div className="text-gray-500">رکورد</div>
          </div>
        </div>

        <ReactPaginate
          nextLabel={
            <div className="border-[0.5px] border-neutral-5 bg-neutral-3 rounded-[6px] py-2 px-3 text-[16px]">
              بعدی
            </div>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={totalPage || 1}
          forcePage={forcePage}
          previousLabel={
            <div className="border-[0.5px] border-neutral-5 bg-neutral-3 rounded-[6px] py-2 px-3 text-[16px]">
              قبلی
            </div>
          }
          renderOnZeroPageCount={null}
          activeClassName={
            "activePage bg-primary-500 border-primary-500 [&>a]:text-white text-[16px]"
          }
          pageClassName={
            "box-border bg-neutral-3 [&>a]:w-[40px] [&>a]:h-[40px] border-[0.5px] border-neutral-5 [&>a]:p-2 [&>a] rounded-[6px] [&>a]:flex [&>a]:justify-center [&>a]:items-center cursor-pointer text-[16px]"
          }
          className="pagination [&>li]:text-neutral-10 [&>li]:!mx-[2px]"
          previousClassName="page-link"
          disabledClassName="!text-neutral-7"
        />
      </div>
    </>
  );
};

export default PaginateCustom;
