import { CloseIcon, SearchIcon } from '@/assets/icon';
import Button from '@/components/button';

const Search = ({ setShowSearch, searchTxt, searchBarPlaceHoler }) => {
  return (
    <div
      className={`flex flex-row justify-between w-full p-2 border-t-neutral-5 border-t h-[58px]`}
    >
      <div className={`flex flex-row items-center gap-x-2`}>
        <SearchIcon />
        <input
          placeholder={searchBarPlaceHoler ? searchBarPlaceHoler : `عبارت مورد نظر را جستجو کنید`}
          className={`w-80 border-none`}
          autoFocus
          onChange={e => searchTxt(e.target.value)}
        />
      </div>
      <Button
        children={''}
        className="primaryNoBackground"
        size="sm32"
        icon={<CloseIcon />}
        onClick={() => {
          setShowSearch(false);
          searchTxt(null);
        }}
      />
    </div>
  );
};

export default Search;
