//import React from 'react';
import './search.css';

function Search({ query, setQuery }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search for a college"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default Search;
