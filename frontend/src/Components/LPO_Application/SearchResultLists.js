import React from 'react';
import './SearchResultLists.css';

const SearchResultLists = ({ result, onClick }) => {
  const handleClick = () => {
    onClick(result);
  };

  return (
    <div className='search-result' onClick={handleClick}>
      {result.Items_Code_Description}
    </div>
  );
};

export default SearchResultLists;
