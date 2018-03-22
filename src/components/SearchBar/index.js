import React from 'react';

const SearchBar = ({searchInput, onSearchChange}) => {

  return (
    <div>
      <input type="search" className="form-control mr-sm-2 col col-lg-4" aria-label="Search" 
        value={searchInput} placeholder="Search" onChange={e => onSearchChange(e.target.value)}/>
    </div>
  );
};

export default SearchBar;