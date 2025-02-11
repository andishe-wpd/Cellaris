import React from "react";
import ReactPaginate from "react-paginate/dist/react-paginate";

interface PaginateCustomProps {
  handlePageClick: (selectedItem: { selected: number }) => void;
  forcePage: number;
  filter: any;
  setForcePage: (page: number) => void;
  refresh: boolean;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
  defaultPageSize: number;
}

const PaginateCustom: React.FC<PaginateCustomProps> = ({
  handlePageClick,
  forcePage,
  filter,
  setForcePage,
  refresh,
  currentPage,
  pageSize,
  totalCount,
  totalPage,
  defaultPageSize,
}) => {
  const [pageSizeState, setpageSizeState] = React.useState(
    pageSize ? pageSize : defaultPageSize
  );

  const handlePageSize = (num = pageSize ? pageSize : defaultPageSize) => {
    setpageSizeState(num);
    if (filter?.page > 0) {
      setForcePage(0);
    }
  };

  React.useEffect(() => {
    if (pageSize != defaultPageSize) {
      handlePageSize(pageSize ? pageSize : defaultPageSize);
    }
  }, [pageSize, defaultPageSize]);

  React.useEffect(() => {
    if (refresh) {
      setpageSizeState(pageSize ? pageSize : defaultPageSize);
      handlePageSize(pageSize ? pageSize : defaultPageSize);
    }
  }, [refresh]);

  const page = currentPage || 1;
  const size = pageSize || defaultPageSize;
  const total = totalCount || 0;
  console.log("ReactPaginate:", ReactPaginate);

  return (
    <div className={`flex items-center justify-between px-3 h-[55px] mb-2`}>
      <div className="flex">
        <div className="mr-5 flex items-center text-sm">
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
        nextLabel="بعدی"
        previousLabel="قبلی"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={totalPage}
        forcePage={forcePage}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default PaginateCustom;
