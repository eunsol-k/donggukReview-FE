import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchSection = ({ selectedCategory, restaurants }) => {
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState(restaurants);

  useEffect(() => {
    filterResults();
  }, [query, selectedCategory, restaurants]);

  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const filterResults = () => {
    let results = restaurants;

    if (selectedCategory) {
      results = results.filter(
        (restaurant) =>
          restaurant.cafeteriaCategory === selectedCategory
      );
    }

    if (query) {
      results = results.filter(
        (restaurant) =>
          restaurant.cafeteriaName.toLowerCase().includes(query) ||
          restaurant.cafeteriaCategory.toLowerCase().includes(query)
      );
    }

    setFilteredResults(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="음식점 이름 또는 카테고리 검색"
        value={query}
        onChange={handleSearch}
        style={styles.input}
      />
      <div style={styles.container}>
        {filteredResults.map((restaurant) => (
          <div key={restaurant.cafeteriaId} style={styles.card}>
            <Link to={`/restaurants/${restaurant.cafeteriaId}`}>
              <img
                src={restaurant.storedFilePath.startsWith('http')
                      ? restaurant.storedFilePath
                      : `http://18.116.28.134:8080${restaurant.storedFilePath}`}
                alt={restaurant.cafeteriaName}
                style={styles.image}
              />
              <h3>{restaurant.cafeteriaName}</h3>
              <p>{restaurant.cafeteriaCategory}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  input: {
    padding: '10px',
    width: '100%',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px',
  },
};

export default SearchSection;
