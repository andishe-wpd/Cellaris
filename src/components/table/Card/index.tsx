const Card = ({ data, infoTable, key, cardHeaderButtonHandler, cardFooterButtonHandler }) => {
  const cellContentGenerator = (
    td: {
      sticky?: any;
      selector?: (arg0: any) => any;
      field?: string;
      type?: string;
    },
    itm: { [p: string]: any }
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
    } else {
      return itm[td.field] || itm[td.field] == 0 ? itm[td.field] : '---';
    }
  };

  return (
    <div
      className="flex flex-col justify-between border border-neutral-5 p-2 rounded-[12px] w-full  overflow-hidden box-border"
      key={key}
    >
      <div className="flex justify-between items-center w-full">
        {/* <div className="flex items-center gap-x-4 w-full text-subtitleBase"> */}
        {/* <Profile name="نمونه مثال" role="توسعه دهنده" size={40} /> */}
        {/* <Label status="success" text="لیبل" iconType="checkMark" /> */}
        {/* {infoTable &&
            infoTable?.length &&
            (data[infoTable.find(item => item.cardTitle === true)?.field] ||
              infoTable.find(item => item.cardTitle === true)?.cardSelector(data))} */}
        {/* </div> */}
        {cardHeaderButtonHandler ? cardHeaderButtonHandler(data) : null}
      </div>

      <div>
        <div className="[&>div:nth-child(odd)]:bg-neutral-3 mt-4">
          {infoTable &&
            infoTable?.length &&
            infoTable?.map((item: any, index: number) => (
              <>
                {index !== 0 && index !== 1 && item?.head !== 'عملیات' && (
                  <div className="flex justify-between items-center w-full h-[40px] py-2 px-3 rounded-[4px]">
                    <div className="text-neutral-13">{item?.head}</div>
                    <div className="text-neutral-13 relative">
                      {cellContentGenerator(item, data)}
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
        <div className="pt-4">{cardFooterButtonHandler ? cardFooterButtonHandler(data) : null}</div>
      </div>
    </div>
  );
};

export default Card;
