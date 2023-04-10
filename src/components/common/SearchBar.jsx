import React from "react";

import searchIcon from "../../assets/img/magnifying-glass.svg";

const SearchBar = () => {
  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input className="searchbar-input" type="text" />
        <div className="searchbar-button">
          <img className="search-img" src={searchIcon} alt="search icon" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
