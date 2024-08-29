import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CafeteriaDetail.css';

function RestaurantDetail({ restaurant }) {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteRestaurants = JSON.parse(localStorage.getItem('favoriteRestaurants') || '[]');
    setIsFavorite(favoriteRestaurants.includes(restaurant.cafeteriaId));
  }, [restaurant.cafeteriaId]);

  const toggleFavorite = () => {
    let favoriteRestaurants = JSON.parse(localStorage.getItem('favoriteRestaurants') || '[]');

    if (isFavorite) {
      favoriteRestaurants = favoriteRestaurants.filter((favId) => favId !== restaurant.cafeteriaId);
    } else {
      favoriteRestaurants.push(restaurant.cafeteriaId);
    }

    localStorage.setItem('favoriteRestaurants', JSON.stringify(favoriteRestaurants));
    setIsFavorite(!isFavorite);
  };

  const renderStars = () => {
    const fullStars = Math.floor(restaurant.rating);
    const halfStar = restaurant.rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="rating-stars">
        {Array(fullStars).fill(0).map((_, i) => <span key={i} className="filled-star">★</span>)}
        {halfStar && <span className="half-filled-star">★</span>}
        {Array(emptyStars).fill(0).map((_, i) => <span key={i} className="empty-star">★</span>)}
      </div>
    );
  };

  return (
    <div className="restaurant-detail">
      <div className="restaurant-header">
        <h1 className="restaurant-name">{restaurant.cafeteriaName}</h1>
        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          ♥
        </button>
      </div>
      <div className="restaurant-images">
        {restaurant.storedFilePath ? (
          <img
            src={restaurant.storedFilePath.startsWith('http')
              ? restaurant.storedFilePath
              : `/api${restaurant.storedFilePath}`}
            alt={restaurant.cafeteriaName}
            className="main-image"
            onError={(e) => e.target.src = 'path/to/default-image.png'}
          />
        ) : (
          <p>이미지 정보가 없습니다.</p>
        )}
      </div>
      <div className="restaurant-info">
        <p className="restaurant-category">{restaurant.cafeteriaCategory}</p>
        <div className="restaurant-rating">
          {renderStars()}
          <span className="rating-score">{restaurant.rating.toFixed(1)}</span>
          <span className="review-count">({restaurant.reviewCount}명의 평가)</span>
        </div>
        <div className="restaurant-meta">
          <p className="address">{restaurant.address}</p>
          <p className="phone">{restaurant.phone}</p>
        </div>
        <div className="restaurant-menu">
          <h2>메뉴</h2>
          <ul>
            {restaurant.menu.length > 0 ? (
              restaurant.menu.map((item, index) => (
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
