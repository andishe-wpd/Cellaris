import Button from '@/components/button';
import { ArrowLeftPaginatetIcon, SortIcon } from '@/assets/icon';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

const FilterDropDown = ({ menuData, setFilters, filters }) => {
  return (
    <div className="group inline-block z-[10000] relative" id={'filter-menu'}>
      <Button
        children={''}
        className={`primaryNoBackground`}
        icon={<SortIcon />}
        loading={false}
        id="menu-button"
        size="me40"
        aria-expanded="true"
        aria-haspopup="true"
      />
      <div className="  transform scale-0 group-hover:scale-100 absolute left-0 transition duration-150 ease-in-out origin-top  ">
        <ul className="rounded-2xl   bg-white border mt-1 min-w-32 w-48 p-2">
          {menuData?.map(
            (
              value: {
                title:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal;
                children: {
                  title:
                    | string
                    | number
                    | boolean
                    | ReactPortal
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>;
                  children: string | any[];
                }[];
              },
              key: Key
            ) => {
              return (
                <li
                  className={`relative ${
                    value?.children?.length && '[&>ul]:hover:block [&>ul]:hover:scale-100'
                  }`}
                  key={key}
                >
                  <Button
                    key={key}
                    className={`primaryNoBackground`}
                    size="sm32"
                    style={{ width: '100%' }}
                    children={
                      <div
                        className={`flex ${
                          value?.children?.length === 0 ? 'justify-end' : 'justify-between'
                        } w-full items-center text-left`}
                      >
                        {value?.children?.length > 0 ? (
                          <div className="rotate-180">
                            <ArrowLeftPaginatetIcon />
                          </div>
                        ) : null}
                        <div>{value?.title}</div>
                      </div>
                    }
                    loading={undefined}
                    onClick={() => {
                      if (value?.children?.length === 0)
                        if (!filters.includes(value?.title)) {
                          setFilters([...filters, value]);
                        }
                    }}
                  />

                  {value?.children?.length > 0 && (
                    <ul className=" transform hidden scale-0 absolute mt-2  -top-4 left-[100%] transition duration-150 ease-in-out origin-top min-w-32 w-48">
                      <div className=" bg-white border p-2 mx-3 rounded-2xl ">
                        {value?.children?.map(
                          (
                            childrenValue: {
                              title:
                                | string
                                | number
                                | boolean
                                | ReactElement<any, string | JSXElementConstructor<any>>
                                | Iterable<ReactNode>
                                | ReactPortal;
                              children: string | any[];
                            },
                            childKey: Key
                          ) => {
                            return (
                              <li key={childKey}>
                                <Button
                                  key={childKey}
                                  className={`primaryNoBackground`}
                                  style={{
                                    width: '100%',
                                  }}
                                  size="sm32"
                                  children={
                                    <div>
                                      {childrenValue?.children?.length > 0 ? (
                                        <div className="rotate-180">
                                          <ArrowLeftPaginatetIcon />
                                        </div>
                                      ) : (
                                        ''
                                      )}
                                      <div>{childrenValue?.title} </div>
                                    </div>
                                  }
                                  loading={undefined}
                                  onClick={() => {
                                    const existingFilterIndex = filters.findIndex(
                                      filter => filter.status === childrenValue.status
                                    );

                                    if (existingFilterIndex !== -1) {
                                      // Replace existing filter with same status
                                      const updatedFilters = [...filters];
                                      updatedFilters[existingFilterIndex] = childrenValue;
                                      setFilters(updatedFilters);
                                    } else {
                                      // Add new filter if no matching status found
                                      setFilters([...filters, childrenValue]);
                                    }
                                  }}
                                />
                              </li>
                            );
                          }
                        )}
                      </div>
                    </ul>
                  )}
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};
export default FilterDropDown;
