import React, { useState, useEffect } from 'react';

const SearchSection = () => {
  const [query, setQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    // JSON 파일에서 데이터 가져오기
    fetch('/restaurants_info.json')
      .then(response => response.json())
      .then(data => {
        setRestaurants(data);
        setFilteredResults(data);
      })
      .catch(error => console.error('데이터를 가져오는 중 오류가 발생했습니다:', error));
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    const results = restaurants.filter(restaurant =>
      restaurant.Name.toLowerCase().includes(searchQuery) ||
      restaurant.Category.toLowerCase().includes(searchQuery)
    );
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
        {filteredResults.map((restaurant, index) => (
          <div key={index} style={styles.card}>
            <img src={restaurant.Image} alt={restaurant.Name} style={styles.image} />
            <h3>{restaurant.Name}</h3>
            <p>{restaurant.Category}</p>
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