import React, { useState, useEffect } from 'react';
import SearchSection from '../components/SearchSection';

const Home = ({ selectedCategory }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/api/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) =>
        console.error('데이터를 가져오는 중 오류 발생:', error)
      );
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <SearchSection selectedCategory={selectedCategory} restaurants={restaurants} />
        <h2>음식점 리스트</h2>
        <div className="restaurant-list-content">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <div key={restaurant.cafeteriaId} className="restaurant-item">
                <h3>{restaurant.cafeteriaName}</h3>
                <p>{restaurant.cafeteriaCategory}</p>
              </div>
            ))
          ) : (
            <p>음식점 정보를 불러오는 중...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
