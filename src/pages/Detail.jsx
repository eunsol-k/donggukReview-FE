import React, { useState } from 'react';
import './Detail.css';
import ReviewList from '../components/ReviewList';
import ReviewFormModal from '../components/ReviewFormModal';

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
  const [isReviewing, setIsReviewing] = useState(false);

  const handleReviewButtonClick = () => {
    setIsReviewing(true);
  };

  const handleCloseModal = () => {
    setIsReviewing(false);
  };

  if (!cafeteria) {
    return <div>음식점을 찾을 수 없습니다.</div>;
  }

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

      {user && (
        <>
          <button onClick={handleReviewButtonClick}>리뷰 작성</button>
          {isReviewing && (
            <ReviewFormModal
              onSubmit={onSubmitReview}
              closeModal={handleCloseModal}
              restaurantId={cafeteria.cafeteriaId} // 여기서 전달
            />
          )}
        </>
      )}

      <ReviewList
        reviews={reviews}
        isAdmin={isAdmin}
        isDeleteMode={isDeleteMode}
        onDelete={onDelete}
      />
    </div>
  );
}

export default Detail;
