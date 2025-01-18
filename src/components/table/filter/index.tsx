import { ArchiveIcon, CloseIcon } from '@/assets/icon';
import Button from '@/components/button';

const Filter = ({ setFilters, filters }) => {
  return (
    <div
      className={`flex flex-row justify-between w-full p-2 border-t-neutral-5 border-t h-[58px]`}
    >
      <div className={`flex flex-row gap-2`}>
        {filters?.map((value: any, key: any) => {
          return (
            <div
              key={key}
              className={`flex flex-row p-3 pl-1 gap-2 rounded-[6px] border border-neutral-5 h-auto min-h-[32px]`}
            >
              <div className="text-neutral-13">{value.title}</div>

              <Button
                className={`primaryNoBackground`}
                size="sm32"
                icon={<CloseIcon />}
                children={``}
                onClick={() =>
                  setFilters(prevFilters => prevFilters.filter(item => item !== value))
                }
              />
            </div>
          );
        })}
      </div>

      <div className={`flex flex-row gap-2`}>
        <Button className="primaryNoBackground" size="sm32" icon={<ArchiveIcon />} />
        <Button
          className="primaryNoBackground"
          size="sm32"
          icon={<CloseIcon />}
          onClick={() => setFilters([])}
        />
      </div>
    </div>
  );
};

export default Filter;
