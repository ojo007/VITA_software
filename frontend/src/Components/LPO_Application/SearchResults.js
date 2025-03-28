import React from 'react';
import './SearchResults.css';
import SearchResultLists from './SearchResultLists';

const SearchResults = ({ results, onClick }) => {

  return (
    <div className='search-result-container'>
      {results.map((result, index) => (
        <div key={index} className="result-box">
          <SearchResultLists result={result} onClick={onClick} />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
