import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

const HeadTable = ({ infoTable, data, isCheckAll, handleSelectAll, selectable = false }) => {
  return (
    <>
      <thead className="bg-neutral-3 border-y border-y-neutral-5">
        <tr>
          {selectable && (
            <th className="w-[84px]">
              <input
                id="checkbox"
                type="checkbox"
                className={`rounded w-[18px] h-[18px] align-middle cursor-pointer`}
                onClick={handleSelectAll}
                checked={isCheckAll}
              />
            </th>
          )}
          {infoTable?.map(
            (
              itm: {
                sticky: any;
                customWidth: string | number;
                head:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ((
                      arg0: any
                    ) =>
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal);
              },
              ind: Key
            ) => (
              <th
                key={ind}
                className={`text-neutral-13 h-[48px] py-3  text-bodyMedium text-right ${
                  ind === 0 ? 'w-[80px]' : ''
                } ${itm?.sticky ? 'sticky left-0 z-10' : ''} ${
                  ind === infoTable.length - 1 ? 'bg-neutral-3' : null
                }`}
                style={{
                  width: itm.customWidth ? itm.customWidth : '',
                  minWidth: itm.customWidth ? itm.customWidth : '120px',
                }}
              >
                {typeof itm.head === 'function' ? (
                  <div>{itm.head(data)}</div>
                ) : (
                  <div
                    style={{
                      textAlign: itm?.field === 'rowNumberTableIndex' ? 'center' : '',
                    }}
                  >
                    {itm.head}
                  </div>
                )}
                {ind != 0 && (
                  <div className="min-w-[1px] max-w-[1px] rounded  h-[20px] absolute top-[50%] translate-y-[-50%] bottom-0 right-[1px] "></div>
                )}
              </th>
            )
          )}
        </tr>
      </thead>
    </>
  );
};

export default HeadTable;
