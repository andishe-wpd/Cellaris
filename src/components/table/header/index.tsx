import { CardIcon, SearchIcon, TableRowIcon, TreeData, VerticalMenuIcon } from '@/assets/icon';
import Button from '@/components/button';

import FilterDropDown from './FilterDropDown';

const Header = ({
  title,
  setShowSearch,
  showSearch,
  setFilters,
  filters,
  isTableView,
  setIsTableView,
  headerCustomButton,
  enableTableRowSelector = false,
  enableTableCardSelector = false,
  enableTableTreeSelector = false,
  menuItems = null,
}) => {
  return (
    <>
      <div className={`flex flex-row gap-2 justify-between p-5`}>
        {/*table title*/}
        <div className={`w-[50%] text-neutral-13 text-[16px] font-medium p-2 text-subtitleBase`}>
          {title}
        </div>

        {/*controller*/}
        <div className={`w-[50%] flex flex-row-reverse gap-4`}>
          <div className={`flex gap-2 w-auto p-1 h-[40px] box-border bg-primary-50 rounded-xl`}>
            {enableTableRowSelector && (
              <Button
                className={`${isTableView === true ? 'primaryFilled' : 'primaryNoBackground'}`}
                size="sm32"
                icon={<TableRowIcon color={isTableView === true ? '#ffffff' : '#254290'} />}
                children={''}
                loading={undefined}
                onClick={() => {
                  setIsTableView(true);
                }}
                type="button"
              />
            )}

            {enableTableCardSelector && (
              <Button
                className={`${isTableView === false ? 'primaryFilled' : 'primaryNoBackground'}`}
                size="sm32"
                icon={<CardIcon color={isTableView === false ? '#ffffff' : '#254290'} />}
                children={''}
                loading={undefined}
                onClick={() => {
                  setIsTableView(false);
                }}
                type="button"
              />
            )}

            {enableTableTreeSelector && (
              <Button
                className={`${isTableView === null ? 'primaryFilled' : 'primaryNoBackground'}`}
                size="sm32"
                icon={<TreeData color={isTableView === null ? '#ffffff' : '#254290'} />}
                children={''}
                loading={undefined}
                onClick={() => {
                  setIsTableView(null);
                }}
                type="button"
              />
            )}
          </div>

          {headerCustomButton && headerCustomButton}
          {menuItems && (
            <FilterDropDown menuData={menuItems} setFilters={setFilters} filters={filters} />
          )}

          <Button
            children={''}
            className={showSearch ? 'primaryFlat' : 'primaryNoBackground'}
            size="me40"
            icon={<SearchIcon />}
            onClick={() => setShowSearch(!showSearch)}
          />
          <Button
            children={''}
            className="primaryNoBackground"
            size="me40"
            icon={<VerticalMenuIcon />}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
