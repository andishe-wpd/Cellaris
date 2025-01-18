import { ArrowLeftPaginatetIcon, SortIcon } from '@/assets/icon';
import Button from '@/components/button';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

const FilterMenu = ({
  menuData,
  setFilters = () => {},
  filters = null,
  customSortIcon = <SortIcon />,
}) => {
  return (
    <div className="group inline-block z-[10000] relative" id={'filter-menu'}>
      <Button
        children={''}
        className={`primaryNoBackground`}
        icon={customSortIcon}
        loading={false}
        id="menu-button"
        size="me40"
        aria-expanded="true"
        aria-haspopup="true"
      />
      <div className="transform scale-0 group-hover:scale-100 absolute left-0 transition duration-150 ease-in-out origin-top  ">
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
                icon?: string;
                action?: any;
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
                  {value.activeCondtion ? (
                    <Button
                      key={key}
                      className={`primaryNoBackground`}
                      size="sm32"
                      style={{ width: '100%' }}
                      icon={value?.icon && value?.icon}
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
                        if (value?.action) {
                          value?.action();
                        } else if (value?.children?.length === 0)
                          if (!filters.includes(value?.title)) {
                            setFilters([...filters, value?.title]);
                          }
                      }}
                    />
                  ) : null}

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
                                    if (!filters.includes(childrenValue?.title)) {
                                      setFilters([...filters, childrenValue?.title]);
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
export default FilterMenu;
