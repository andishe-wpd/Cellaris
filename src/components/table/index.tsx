import { EmptyResponse } from "@/assets/icon";
import Loading from "@/components/loading";
import Filter from "@/components/table/filter";
import Search from "@/components/table/filter/serach.tsx";
import Header from "@/components/table/header";
import BodyTable from "@/components/table/main/body.tsx";
import HeadTable from "@/components/table/main/head.tsx";
import PaginateCustom from "@/components/table/paginate";
import { useEffect, useState } from "react";

import Card from "./Card";
import "./styles.css";

const Table = ({
  infoTable = null,
  url = null,
  // noFilter = null,
  filterParam = null,
  getData = null,
  resultData = null,
  collapsible = null,
  collapseRequest = null,
  collapseContent = null,
  footer = null,
  data = null,
  pageSize = null,
  totalPage = null,
  totalCount = null,
  currentPage = null,
  noPagination = true,
  getDataCallbackFilter = null,
  urlCallbackFilter = null,
  defaultPageSize = 10,
  showPopupFilter = false,
  handleRefetch = null,
  setHandleRefetch = null,
  setRefetchData = null,
  refetchData = null,
  disabled = false,
  multiCollapsible = null,
  isExpandCondition = null,
  getCollapseContent = null,
  selectable = false,
  checkListId = "id",
  isCheck = null,
  setIsCheck = null,
  title = "",
  headerCustomButton = null,
  enableTableRowSelector = true,
  enableTableCardSelector = true,
  emptyResponseAction = <></>,
  searchBarPlaceHoler = "",
  menuItems = null,
  cardHeaderButtonHandler = null,
  cardFooterButtonHandler = null,
  TreeComponent = null,
  initialFilter = {},
}) => {
  const [forcePage, setForcePage] = useState(0);
  const [filterChange, setFilterChange] = useState({});
  const [filter, setFilter] = useState(initialFilter);
  const [filterCallback, setFilterCallback] = useState({});
  const [refresh, setrefresh] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [filters, setFilters] = useState([]);
  const [isTableView, setIsTableView] = useState(true);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data.map((li) => li[checkListId]));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const apiCall = () => {
    const filterObj = filterParam
      ? {
          page: 1,
          pageSize: pageSize ? pageSize : defaultPageSize,
          ...filter,
        }
      : {
          page: 1,
          pageSize: pageSize ? pageSize : defaultPageSize,
          ...filter,
        };
    const params = new URLSearchParams();
    filters.forEach((item) => {
      params.append(
        "Filters",
        JSON.stringify({
          criteria: item.status,
          value: item.value,
        })
      );
    });
    const finalUrl = `${url}?${params.toString()}`;

    getData && getData({ url: finalUrl, filter: filterObj });
    getDataCallbackFilter &&
      getDataCallbackFilter({
        url: urlCallbackFilter,
        filter: { ...filterCallback },
      });
    setrefresh(false);
  };

  const handleDeleteFilter = () => {
    setForcePage(0);
    setFilterChange({});
    setFilter({});
    setFilterCallback({});
    setrefresh(true);
  };

  useEffect(() => {
    if (handleRefetch) {
      apiCall();
      setHandleRefetch(false);
    }
  }, [handleRefetch]);

  useEffect(() => {
    apiCall();
    if (refresh || refetchData) {
      apiCall();
    }
  }, [forcePage, filterParam, filter, filters, url, refresh]);
  useEffect(() => {
    if (refetchData) {
      handleDeleteFilter();
      setRefetchData(false);
    }
  }, [refetchData]);

  const handleClickFilter = () => {
    let obj = {};
    Object.keys(filterChange).map((itm) => {
      if (filterChange[itm] !== undefined && filterChange[itm] !== null) {
        obj = { ...obj, [itm]: filterChange[itm] };
      }
    });
    setForcePage(0);

    if (showPopupFilter) {
      setFilter((prev) => ({ ...prev, page: 1, ...obj }));
      urlCallbackFilter && setFilterCallback((prev) => ({ ...prev, ...obj }));
    } else {
      setFilter((prev) => ({ ...prev, page: 1, ...filterChange }));
      urlCallbackFilter &&
        setFilterCallback((prev) => ({ ...prev, ...filterChange }));
    }
  };

  const handlePageClick = (event) => {
    const page = event.selected + 1;
    setForcePage(event.selected);
    setFilter((prev) => ({ ...prev, page }));
  };
  return (
    <div className="border border-neutral-5 rounded-2xl my-4">
      <Header
        title={title}
        setShowSearch={setShowSearch}
        showSearch={showSearch}
        setFilters={setFilters}
        filters={filters}
        isTableView={isTableView}
        setIsTableView={(tv: boolean) => setIsTableView(tv)}
        headerCustomButton={headerCustomButton}
        enableTableRowSelector={enableTableRowSelector}
        enableTableCardSelector={enableTableCardSelector}
        enableTableTreeSelector={!!TreeComponent}
        menuItems={menuItems}
      />
      <div className="w-full flex flex-col overflow-x-auto ">
        {showSearch && (
          <Search
            setShowSearch={setShowSearch}
            searchBarPlaceHoler={searchBarPlaceHoler}
            searchTxt={(v: any) =>
              setFilter((prev) => ({ ...prev, search: v }))
            }
          />
        )}
        {filters?.length > 0 && (
          <Filter setFilters={setFilters} filters={filters} />
        )}

        {isTableView === true ? (
          <table className="lg:w-full w-[1000px]">
            <HeadTable
              infoTable={infoTable}
              data={resultData?.data?.data}
              isCheckAll={isCheckAll}
              handleSelectAll={handleSelectAll}
              selectable={selectable}
            />

            {resultData?.isSuccess ? (
              <BodyTable
                data={data}
                infoTable={infoTable}
                collapsible={collapsible}
                collapseRequest={collapseRequest}
                collapseContent={collapseContent}
                pageSize={pageSize}
                currentPage={currentPage}
                footer={footer}
                disabledTable={disabled}
                multiCollapsible={multiCollapsible}
                isExpandCondition={isExpandCondition}
                getCollapseContent={getCollapseContent}
                isCheck={isCheck}
                handleClick={handleClick}
                selectable={selectable}
                selective={undefined}
                checkListId={checkListId}
              />
            ) : null}
            {((!resultData?.isSuccess &&
              resultData?.data?.code >= 200 &&
              resultData?.data?.code < 300 &&
              !resultData?.isLoading &&
              !resultData?.isFetching) ||
              resultData?.isError) && (
              <tbody>
                <tr>
                  <td colSpan={infoTable?.length}>
                    <p className={"text-center my-3"}>
                      {resultData?.data?.message || "خطا در دریافت اطلاعات"}
                    </p>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        ) : isTableView === false ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 border-t border-t-neutral-5">
            {resultData?.isSuccess
              ? data?.map((item: any, index: any) => (
                  <Card
                    infoTable={infoTable}
                    data={item}
                    key={index}
                    cardHeaderButtonHandler={cardHeaderButtonHandler}
                    cardFooterButtonHandler={cardFooterButtonHandler}
                  />
                ))
              : null}
          </div>
        ) : (
          isTableView === null && <>{TreeComponent}</>
        )}
        {(resultData?.isLoading || resultData?.isFetching) && (
          <div className="flex justify-center items-center my-3 gap-2">
            <Loading />
            <span>در حال بارگذاری</span>
          </div>
        )}

        {resultData?.isSuccess &&
          resultData?.data?.data?.totalCount === 0 &&
          !resultData?.isLoading &&
          !resultData?.isFetching && (
            <div className="flex justify-center items-center gap-4 w-full">
              <div
                className={
                  "text-center flex  flex-col items-center gap-4 py-12"
                }
              >
                <EmptyResponse />
                <div className="text-subtitleBase text-neutral-8">
                  در حال حاضر اطلاعاتی ثبت نشده است
                </div>
                <div>{emptyResponseAction}</div>
              </div>
            </div>
          )}
      </div>
      {data?.length > 0 && !noPagination && (
        <div className="pt-4">
          <PaginateCustom
            handlePageClick={handlePageClick}
            forcePage={forcePage}
            // setFilter={setFilter}
            filter={filter}
            refresh={refresh}
            setForcePage={setForcePage}
            pageSize={pageSize}
            currentPage={currentPage}
            totalPage={totalPage}
            totalCount={totalCount}
            defaultPageSize={pageSize ? pageSize : defaultPageSize}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
