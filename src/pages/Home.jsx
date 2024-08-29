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
      .then((data) => {
        const uniqueRestaurants = data.filter((restaurant, index, self) =>
          index === self.findIndex((r) => (
            r.cafeteriaId === restaurant.cafeteriaId
          ))
        );
        setRestaurants(uniqueRestaurants);
      })
      .catch((error) =>
        console.error('데이터를 가져오는 중 오류 발생:', error)
      );
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <SearchSection
          selectedCategory={selectedCategory}
          restaurants={restaurants}
        />
      </div>
    </div>
  );
};

export default Home;
