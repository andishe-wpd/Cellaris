import ArrowImg from '@/assets/icon/toggleArrow.png';
import Checkbox from '@/components/checkbox';
import { convertEnglishNumberToPersian } from '@/utils/commonFn';
import { Fragment } from 'react';
import { useEffect, useState } from 'react';

const BodyTable = ({
  // collapseUrl = '',
  infoTable,
  data,
  collapsible,
  collapseRequest,
  collapseContent,
  footer,
  pageSize,
  currentPage,
  disabledTable,
  multiCollapsible,
  isExpandCondition,
  getCollapseContent,
  selective,
  isCheck,
  handleClick,
  selectable,
  checkListId,
}) => {
  const [expandState, setExpandState] = useState({});
  const handleExpandRow = async (id, item) => {
    if (collapsible) {
      const updatedExpandState = multiCollapsible ? { ...expandState } : {};

      updatedExpandState[id] = !updatedExpandState[id];

      setExpandState(updatedExpandState);

      if (!expandState[id]) {
        collapseRequest(item, id);
      }
    }
  };

  const cellContentGenerator = (
    td: {
      sticky?: any;
      selector?: (arg0: any) => any;
      field?: string;
      type?: string;
    },
    itm: { [p: string]: any },
    ind: number
  ) => {
    if (td.selector && td.field) {
      if (itm[td.field]) {
        return td.selector(itm[td.field]);
      } else if (td.type === 'merged') {
        return td.selector(itm);
      } else {
        return '';
      }
    } else if (td.selector && !td.field) {
      return td.selector(itm);
    } else if (td.field === 'rowNumberTableIndex') {
      return (
        <div className=" w-full items-start text-center">
          {convertEnglishNumberToPersian(currentPage * pageSize - pageSize + (ind + 1) + '')}
        </div>
      );
    } else if (td.field === 'checkbox' && selective) {
      return itm['checked'] !== undefined ? (
        <Checkbox
          key={`checkbox_${ind}`}
          value={itm['checked']}
          disabled={itm['checkedDisabled']}
          onChange={() => console.log('')}
        />
      ) : null;
    } else {
      return (itm[td.field] || itm[td.field] == 0) && itm[td.field] !== '' ? itm[td.field] : '---';
    }
  };

  useEffect(() => {
    data?.forEach((item: any, ind: any) => {
      if (isExpandCondition && isExpandCondition(item)) {
        handleExpandRow(ind, item);
      }
    });
  }, [data]);

  return (
    <tbody className={``}>
      {data?.map((itm: { [x: string]: any; disabled?: any }, ind: number) => (
        <Fragment key={`tr${ind}`}>
          <tr
            style={{
              pointerEvents: (disabledTable === true || itm?.disabled === true) && 'none',
              backgroundColor: (disabledTable === true || itm?.disabled === true) && '#f0f0f0',
              opacity: (disabledTable === true || itm?.disabled === true) && 0.5,
              backgroundColor: isCheck?.includes(itm?.id) && '#E9ECF4',
            }}
            className={` [&>td]:hover:bg-primary-50 transition duration-75 ease-in  ${
              ind === data.length - 1 ? ' rounded-b-xl  ' : 'border-b border-neutral-5'
            }
              ${collapsible ? 'cursor-pointer' : ''}
                         ${expandState[ind] && collapsible ? 'bg-blue-300' : ''}
                         ${
                           infoTable
                             .filter((obj: { hasOwnProperty: (arg0: string) => any }) =>
                               obj.hasOwnProperty('rowError')
                             )[0]
                             ?.rowError(itm) && 'bg-red-20'
                         }
                         `}
            key={`row_${ind}`}
          >
            {selectable && (
              <td className="w-[84px] ">
                <input
                  key={ind}
                  id={itm[checkListId]}
                  type="checkbox"
                  className={`rounded  h-[18px] align-middle w-full`}
                  onClick={handleClick}
                  checked={isCheck?.includes(itm[checkListId])}
                />
              </td>
            )}
            {infoTable.map(
              (
                td: {
                  sticky?: any;
                  selector?: (arg0: any) => any;
                  field?: string;
                  type?: string;
                },
                indTd: number
              ) => (
                <td
                  className={`font-[400] h-[56px] ${
                    td?.sticky
                      ? `sticky left-0 z-10 bg-white hover:bg-neutral-3 transition duration-0 ease-in cursor-pointer ${
                          expandState[ind] && collapsible ? 'bg-blue-300' : ''
                        } ${
                          infoTable
                            .filter((obj: { hasOwnProperty: (arg0: string) => any }) =>
                              obj.hasOwnProperty('rowError')
                            )[0]
                            ?.rowError(itm) && 'bg-red-20'
                        }`
                      : ''
                  }`}
                  key={`td${indTd}`}
                >
                  <div className={'flex items-center relative justify-start text-right'}>
                    {indTd === 0 &&
                      (currentPage && currentPage !== 1 ? (
                        <>
                          {infoTable
                            .filter((obj: { hasOwnProperty: (arg0: string) => any }) =>
                              obj.hasOwnProperty('rowError')
                            )[0]
                            ?.rowError(itm) && (
                            <div
                              className={'h-[67px] w-[4px] rounded bg-red absolute right-0'}
                            ></div>
                          )}
                        </>
                      ) : (
                        <>
                          {collapsible && (
                            <img
                              onClick={() => handleExpandRow(ind, itm)}
                              src={ArrowImg}
                              alt={'arrow'}
                              className={`absolute transition-all -mr-[80px] p-1 ${
                                expandState[ind] ? '-rotate-90' : ''
                              }`}
                            />
                          )}

                          {infoTable
                            .filter((obj: { hasOwnProperty: (arg0: string) => any }) =>
                              obj.hasOwnProperty('rowError')
                            )[0]
                            ?.rowError(itm) && (
                            <div
                              className={'h-[67px] w-[3px] rounded  bg-red absolute right-0 '}
                            ></div>
                          )}
                        </>
                      ))}
                    {cellContentGenerator(td, itm, ind)}
                  </div>
                </td>
              )
            )}
          </tr>

          {/***expanded tr***/}
          {
            <tr
              className={`bg-gray transition-all ease-in-out delay-100 ${
                expandState[ind] && collapsible ? '' : 'opacity-0'
              }`}
            >
              {expandState[ind] && collapsible && (
                <td colSpan={infoTable?.length}>
                  {multiCollapsible ? (
                    <div>{getCollapseContent(ind)}</div>
                  ) : (
                    <div>{collapseContent}</div>
                  )}
                </td>
              )}
            </tr>
          }
        </Fragment>
      ))}

      {footer && (
        <tr>
          <td colSpan={infoTable?.length} className="border-y">
            {footer}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default BodyTable;
