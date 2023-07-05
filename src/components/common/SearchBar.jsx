import React, { useEffect, useState, useRef } from "react";

import { capitalizeBody } from "../../services/capitalize";

const SearchBar = ({ apiData, searchSuggestion }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState([]);
  const [lastFilteredData, setLastFilteredData] = useState([]);
  const wrapperRef = useRef(null);

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);

    if (inputValue === "") {
      setFilteredData([]);
      return;
    }

    const filteredResults = apiData.filter((item) => {
      const { bodyPart, equipment, name, target } = item;
      const searchLower = inputValue.toLowerCase();
      return (
        (name && name.toLowerCase().includes(searchLower))
        // (bodyPart && bodyPart.toLowerCase().includes(searchLower)) ||
        // (equipment && equipment.toLowerCase().includes(searchLower)) ||
        // (target && target.toLowerCase().includes(searchLower))
      );
    });

    setFilteredData(filteredResults);
    setLastFilteredData(filteredResults);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setFilteredData([]);
    }
  };

  const handleFocus = () => {
    if (searchValue !== "") {
      setFilteredData(lastFilteredData);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion((prevSelectedSuggestion) => [
      ...prevSelectedSuggestion,
      suggestion,
    ]);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    searchSuggestion(selectedSuggestion);
  }, [selectedSuggestion, searchSuggestion]);

  return (
    <div className="wrapper" ref={wrapperRef}>
      <div className="searchBar">
        <input
          id="searchQueryInput"
          type="text"
          name="searchQueryInput"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={handleFocus}
        />
        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path
              fill="#666666"
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
            />
          </svg>
        </button>
      </div>

      {filteredData.length > 0 && (
        <div className="suggestions">
          {filteredData.map((item) => {
            const capitalizedItem = capitalizeBody(item.name);
            const index = capitalizedItem
              .toLowerCase()
              .indexOf(searchValue.toLowerCase());
            const beforeStr = capitalizedItem.slice(0, index);
            const matchStr = capitalizedItem.slice(
              index,
              index + searchValue.length
            );
            const afterStr = capitalizedItem.slice(index + searchValue.length);

            return (
              <p
                className="suggestion"
                key={item.id}
                onClick={() => handleSuggestionClick(item.name)} // Pass the suggestion to the click handler
              >
                {beforeStr}
                <span style={{ color: "#42ef2c" }}>{matchStr}</span>
                {afterStr}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
