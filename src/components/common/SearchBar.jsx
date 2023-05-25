import React, { useEffect, useState } from "react";

const SearchBar = ({ apiData }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [screenSize, setScreenSize] = useState('')

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth); // Adjust the breakpoint as needed
      console.log(window.innerWidth);
    };
    
    handleResize(); // Check initial screen size
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);

    const filteredResults = apiData.filter((item) => {
      const { bodyPart, equipment, name, target } = item;
      const searchLower = inputValue.toLowerCase();
      return (
        (bodyPart && bodyPart.toLowerCase().includes(searchLower)) ||
        (equipment && equipment.toLowerCase().includes(searchLower)) ||
        (name && name.toLowerCase().includes(searchLower)) ||
        (target && target.toLowerCase().includes(searchLower))
      );
    });

    setFilteredData(filteredResults);
  };

  return (
    <div className="wrapper">
      <div className="searchBar">
        <input
          id="searchQueryInput"
          type="text"
          name="searchQueryInput"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchChange}
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
        <ul className="suggestions">
          {filteredData.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
