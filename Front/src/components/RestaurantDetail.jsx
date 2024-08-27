import React, { useState, useEffect } from 'react';
import './RestaurantDetail.css';

function RestaurantDetail({ restaurant }) {
  const { id, name, category, rating, reviewCount, address, phone, image, menu } = restaurant;
  const [isFavorite, setIsFavorite] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (reviewCount > 0) {
      setAverageRating(rating);
    }

    const favoriteRestaurants = JSON.parse(localStorage.getItem('favoriteRestaurants')) || [];
    setIsFavorite(favoriteRestaurants.includes(id));
  }, [rating, reviewCount, id]);

  const toggleFavorite = () => {
    let favoriteRestaurants = JSON.parse(localStorage.getItem('favoriteRestaurants')) || [];

    if (isFavorite) {
      favoriteRestaurants = favoriteRestaurants.filter(favId => favId !== id);
    } else {
      favoriteRestaurants.push(id);
    }

    localStorage.setItem('favoriteRestaurants', JSON.stringify(favoriteRestaurants));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="restaurant-detail">
      <div className="restaurant-header">
        <h1 className="restaurant-name">{name}</h1>
        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          ♥
        </button>
      </div>
      <div className="restaurant-images">
        <img src={image} alt={name} className="main-image" />
      </div>
      <div className="restaurant-info">
        <p className="restaurant-category">{category.join(', ')}</p>
        <div className="restaurant-rating">
          <div className="rating-stars">{/* 별점 표시 로직 */}</div>
          <span className="rating-score">{averageRating.toFixed(1)}</span>
          <span className="review-count">({reviewCount}명의 평가)</span>
        </div>
        <div className="restaurant-meta">
          <p className="address">{address}</p>
          <p className="phone">{phone}</p>
        </div>
        <div className="restaurant-menu">
          <h2>메뉴</h2>
          <ul>
            {menu.length > 0 ? (
              menu.map((item, index) => (
                <li key={index}>
                  <span className="menu-item-name">{item.name}</span>
                  <span className="menu-item-price">{item.price}원</span>
                </li>
              ))
            ) : (
              <p>메뉴 정보가 없습니다.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;
