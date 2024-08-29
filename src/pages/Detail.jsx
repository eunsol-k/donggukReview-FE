import React from 'react';
import './Detail.css';

function Detail({
  cafeteria,
  reviews,
  menu,
  isAdmin,
  isDeleteMode,
  onDelete,
  onSubmitReview,
  user,
  onLike,
  likedCafeterias,
}) {
  if (!cafeteria) {
    return <div>음식점을 찾을 수 없습니다.</div>;
  }

  const renderStars = () => {
    const fullStars = Math.floor(cafeteria.rating || 0);
    const halfStar = (cafeteria.rating || 0) % 1 !== 0;
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
        <h1 className="restaurant-name">{cafeteria.cafeteriaName}</h1>
        <button
          className={`favorite-button ${likedCafeterias.some((c) => c.id === cafeteria.cafeteriaId) ? 'active' : ''}`}
          onClick={() => onLike(cafeteria)}
        >
          ♥
        </button>
      </div>
      <div className="restaurant-images">
        {cafeteria.storedFilePath ? (
          <img
            src={cafeteria.storedFilePath}
            alt={cafeteria.cafeteriaName}
            className="main-image"
            onError={(e) => {
              e.target.src = '/path/to/default-image.png';
              e.target.alt = "이미지를 불러올 수 없습니다";
            }}
          />
        ) : (
          <p>이미지 정보가 없습니다.</p>
        )}
      </div>
      <div className="restaurant-info">
        <p className="restaurant-category">{cafeteria.cafeteriaCategory}</p>
        <div className="restaurant-rating">
          {renderStars()}
          <span className="rating-score">{cafeteria.rating ? cafeteria.rating.toFixed(1) : 'N/A'}</span>
          <span className="review-count">({reviews.length}명의 평가)</span>
        </div>
        <div className="restaurant-meta">
          <p className="address">{cafeteria.cafeteriaAddress}</p>
          <p className="phone">{cafeteria.cafeteriaPhone}</p>
        </div>
        <div className="restaurant-menu">
          <h2>메뉴</h2>
          <ul>
            {menu.length === 0 ? (
              <p>메뉴 정보가 없습니다.</p>
            ) : (
              menu.map((menuItem) => (
                <li key={menuItem.id}>
                  <span className="menu-item-name">{menuItem.menuName}</span>
                  <span className="menu-item-price">{menuItem.menuPrice}원</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <div className="restaurant-reviews">
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <p>{review.content}</p>
              <p>{review.userId}</p>
              <p>{review.date}</p>
              {isAdmin && isDeleteMode && (
                <button onClick={() => onDelete(review.id)}>Delete</button>
              )}
            </div>
          ))
        )}
      </div>

      {user && (
        <div className="review-form">
          <h2>Write a Review</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const newReview = {
              content: e.target.reviewContent.value,
              cafeteriaId: cafeteria.cafeteriaId,
            };
            onSubmitReview(newReview);
            e.target.reset();
          }}>
            <textarea name="reviewContent" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Detail;
