import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchSection = ({ selectedCategory, restaurants }) => {
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    filterResults();
  }, [query, selectedCategory, restaurants]); // `restaurants`를 의존성 배열에 추가

  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const filterResults = () => {
    let results = restaurants;

    // 카테고리 필터링
    if (selectedCategory) {
      results = results.filter(
        (restaurant) =>
          restaurant.cafeteriaCategory === selectedCategory
      );
    }

    // 검색어 필터링
    if (query) {
      results = results.filter(
        (restaurant) =>
          restaurant.cafeteriaName.toLowerCase().includes(query) ||
          restaurant.cafeteriaCategory.toLowerCase().includes(query)
      );
    }

    // 중복 제거: 중복된 `cafeteriaId`를 기준으로
    const uniqueResults = results.filter((restaurant, index, self) =>
      index === self.findIndex((r) => (
        r.cafeteriaId === restaurant.cafeteriaId
      ))
    );

    setFilteredResults(uniqueResults);
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
        {filteredResults.length === 0 ? (
          <p>해당 카테고리에 음식점이 없습니다.</p>
        ) : (
          filteredResults.map((restaurant) => (
            <div key={restaurant.cafeteriaId} style={styles.card}>
              <Link to={`/cafeterias/${restaurant.cafeteriaId}`}>
                <img
                  src={
                    restaurant.storedFilePath && restaurant.storedFilePath.startsWith('http')
                      ? restaurant.storedFilePath
                      : `http://18.116.28.134:8080${restaurant.storedFilePath}`
                  }
                  alt={restaurant.cafeteriaName}
                  style={styles.image}
                  onError={(e) => {
                    e.target.src = '/path/to/default-image.png'; // 대체 이미지 경로
                    e.target.alt = "이미지를 불러올 수 없습니다"; // 대체 텍스트
                  }}
                />
                <h3>{restaurant.cafeteriaName}</h3>
                <p>{restaurant.cafeteriaCategory}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  input: {
    padding: '10px',
    width: '97%',
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
    backgroundColor: '#e0e0e0', // 이미지 로드 중일 때 또는 오류가 있을 때를 대비한 배경색
  },
};

export default SearchSection;
