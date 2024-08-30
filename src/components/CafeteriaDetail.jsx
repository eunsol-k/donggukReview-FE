import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CafeteriaDetail.css';

function RestaurantDetail({ restaurantData }) {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(restaurantData.like || false);

  useEffect(() => {
    const favoriteRestaurants = JSON.parse(localStorage.getItem('favoriteRestaurants') || '[]');
    setIsFavorite(favoriteRestaurants.includes(restaurantData.cafeteriaResponseDTO.cafeteriaId));
  }, [restaurantData.cafeteriaResponseDTO.cafeteriaId]);

  const toggleFavorite = () => {
    let favoriteRestaurants = JSON.parse(localStorage.getItem('favoriteRestaurants') || '[]');

    if (isFavorite) {
      favoriteRestaurants = favoriteRestaurants.filter(
        (favId) => favId !== restaurantData.cafeteriaResponseDTO.cafeteriaId
      );
    } else {
      favoriteRestaurants.push(restaurantData.cafeteriaResponseDTO.cafeteriaId);
    }

    localStorage.setItem('favoriteRestaurants', JSON.stringify(favoriteRestaurants));
    setIsFavorite(!isFavorite);
  };

  const renderStars = () => {
    const fullStars = Math.floor(restaurantData.rating || 0);
    const halfStar = (restaurantData.rating || 0) % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="rating-stars">
        {Array(fullStars).fill(0).map((_, i) => <span key={i} className="filled-star">★</span>)}
        {halfStar && <span className="half-filled-star">★</span>}
        {Array(emptyStars).fill(0).map((_, i) => <span key={i} className="empty-star">★</span>)}
      </div>
    );
  };

  if (!restaurantData) {
    return <div>Loading...</div>;
  }

  const { cafeteriaResponseDTO, menuDTOList, reviewResponseDTOList } = restaurantData;

  return (
    <div className="restaurant-detail">
      <div className="restaurant-header">
        <h1 className="restaurant-name">{cafeteriaResponseDTO.cafeteriaName}</h1>
        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          ♥
        </button>
      </div>
      <div className="restaurant-images">
        {cafeteriaResponseDTO.storedFilePath ? (
          <img
            src={cafeteriaResponseDTO.storedFilePath}
            alt={cafeteriaResponseDTO.cafeteriaName}
            className="main-image"
            onError={(e) => e.target.src = 'path/to/default-image.png'}
          />
        ) : (
          <p>이미지 정보가 없습니다.</p>
        )}
      </div>
      <div className="restaurant-info">
        <p className="restaurant-category">{cafeteriaResponseDTO.cafeteriaCategory}</p>
        <div className="restaurant-rating">
          {renderStars()}
          <span className="rating-score">{restaurantData.rating ? restaurantData.rating.toFixed(1) : 'N/A'}</span>
          <span className="review-count">({reviewResponseDTOList.length}명의 평가)</span>
        </div>
        <div className="restaurant-meta">
          <p className="address">{cafeteriaResponseDTO.cafeteriaAddress}</p>
          <p className="phone">{cafeteriaResponseDTO.cafeteriaPhone}</p>
        </div>
        <div className="restaurant-menu">
          <h2>메뉴</h2>
          <ul>
            {menuDTOList && menuDTOList.length > 0 ? (
              menuDTOList.map((item) => (
                <li key={item.id}>
                  <span className="menu-item-name">{item.menuName}</span>
                  <span className="menu-item-price">{item.menuPrice}원</span>
                </li>
              ))
            ) : (
              <p>메뉴 정보가 없습니다.</p>
            )}
          </ul>
        </div>
      </div>
      <div className="restaurant-reviews">
        <h2>Reviews</h2>
        {reviewResponseDTOList && reviewResponseDTOList.length > 0 ? (
          reviewResponseDTOList.map((review, index) => (
            <div key={index} className="review-item">
              <p>{review.content}</p>
              <p>{review.userId}</p>
              <p>{review.date}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default RestaurantDetail;