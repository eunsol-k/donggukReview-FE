import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index}>{result.title}</div>
        ))
      ) :
      }
    </div>
  );
};

export default SearchResults;