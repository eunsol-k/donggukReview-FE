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

  const filteredRestaurants = selectedCategory
    ? restaurants.filter(
        (restaurant) => restaurant.cafeteriaCategory === selectedCategory
      )
    : restaurants;

  return (
    <div className="home-container">
      <div className="home-content">
        <SearchSection selectedCategory={selectedCategory} restaurants={filteredRestaurants} />
        <div className="restaurant-list-content">
          {filteredRestaurants.length === 0 && (
            <p>해당 카테고리에 음식점이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
