import React, { useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";

function SearchBox({ searchItem, setSearchItem }) {
  const [iconClicked, setIconClicked] = useState(false);

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchItem(value);
      }, 300),
    [setSearchItem]
  );

  React.useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  return (
    <div className="flex gap-1">
      <button
        onClick={() => setIconClicked(!iconClicked)}
        title="search"
        className="cursor-pointer"
      >
        <img
          className="size-5 mt-[1%] mb-1"
          src="https://img.icons8.com/?size=100&id=aBNtkpYvycsP&format=png&color=000000"
          alt="search icon"
        />
      </button>

      {iconClicked && (
        <div className="shadow-lg w-full p-1 mb-2 rounded-lg">
          <input
            className="hover:bg-white w-[96%] outline-0 pl-1"
            type="text"
            name="searchItem"
            value={searchItem}
            onChange={(e) => debouncedSetSearch(e.target.value)}
            placeholder="Search Expenses Here..."
          />
          <button
            className="size-6 cursor-pointer "
            onClick={() => setSearchItem("")}
          >
            <img
              className="hover:bg-gray-200 mt-1"
              src="https://img.icons8.com/?size=100&id=9433&format=png&color=000000"
              alt="clear search box"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
