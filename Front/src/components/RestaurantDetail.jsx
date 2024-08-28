import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantDetail.css';

function RestaurantDetail({ restaurants }) {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === parseInt(id));

  if (!restaurant) {
    return <p>음식점을 찾을 수 없습니다.</p>;
  }

  const { name, category, rating, reviewCount, address, phone, image, menu } = restaurant;
  const [isFavorite, setIsFavorite] = useState(false);
  const [averageRating, setAverageRating] = useState(rating);
  const [reviews, setReviews] = useState([]); // State to manage reviews
  const [newReview, setNewReview] = useState(''); // State to manage new review

  useEffect(() => {
    const favoriteRestaurants = JSON.parse(localStorage.getItem('favoriteRestaurants') || '[]');
    setIsFavorite(favoriteRestaurants.includes(restaurant.id));
  }, [restaurant.id]);

  const toggleFavorite = () => {
    let favoriteRestaurants = JSON.parse(localStorage.getItem('favoriteRestaurants') || '[]');

    if (isFavorite) {
      favoriteRestaurants = favoriteRestaurants.filter((favId) => favId !== restaurant.id);
    } else {
      favoriteRestaurants.push(restaurant.id);
    }

    localStorage.setItem('favoriteRestaurants', JSON.stringify(favoriteRestaurants));
    setIsFavorite(!isFavorite);
  };

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleReviewSubmit = () => {
    if (newReview.trim()) {
      setReviews([...reviews, newReview.trim()]);
      setNewReview('');
    }
  };

  const renderStars = () => {
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating % 1 !== 0;
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
        <h1 className="restaurant-name">{name}</h1>
        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          ♥
        </button>
      </div>
      <div className="restaurant-images">
        <img src={image} alt={name} className="main-image" onError={(e) => e.target.src = 'default-image.png'} />
      </div>
      <div className="restaurant-info">
        <p className="restaurant-category">{category.join(', ')}</p>
        <div className="restaurant-rating">
          {renderStars()}
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
{/*         <div className="restaurant-reviews"> */}
{/*           <h2>리뷰</h2> */}
{/*           <div className="review-form"> */}
{/*             <textarea */}
{/*               value={newReview} */}
{/*               onChange={handleReviewChange} */}
{/*               placeholder="리뷰를 작성하세요..." */}
{/*             /> */}
{/*             <button onClick={handleReviewSubmit}>리뷰 작성</button> */}
{/*           </div> */}
{/*           <ul> */}
{/*             {reviews.length > 0 ? ( */}
{/*               reviews.map((review, index) => ( */}
{/*                 <li key={index} className="review-item">{review}</li> */}
{/*               )) */}
{/*             ) : ( */}
{/*               <p>작성된 리뷰가 없습니다.</p> */}
{/*             )} */}
{/*           </ul> */}
{/*         </div> */}
      </div>
    </div>
  );
}

export default RestaurantDetail;
