import React from 'react';
import RestaurantDetail from '../components/RestaurantDetail';
import ReviewList from '../components/ReviewList';
import ReviewFormModal from '../components/ReviewFormModal';
import Sidebar from '../components/Sidebar';
import './Detail.css';

function Detail({
  restaurant,
  reviews,
  isAdmin,
  isDeleteMode,
  onDelete,
  onSubmitReview,
  user,
  likedStores,
  averageRating,
  onEditRestaurant,
  isEditingRestaurant,
  onDeleteReviews,
}) {
  return (
    <div className="detail-page">
      <div className="left-sidebar"></div> {/* 왼쪽 사이드바: 현재는 빈 공간 */}

      <div className="main-content">
        <div className="restaurant-detail-section">
          <RestaurantDetail restaurant={restaurant} />
        </div>

        <div className="review-section">
          <div className="mode-header">
            {!isAdmin && <ReviewFormModal onSubmit={onSubmitReview} />}
          </div>
          <ReviewList
            reviews={reviews}
            isAdmin={isAdmin}
            isDeleteMode={isDeleteMode}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default Detail;

