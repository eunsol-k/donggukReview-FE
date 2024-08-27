import React from 'react';
import RestaurantDetail from '../components/RestaurantDetail';
import ReviewList from '../components/ReviewList';
import ReviewFormModal from '../components/ReviewFormModal';
import './Detail.css';

function Detail({ restaurant, reviews, isAdmin, isDeleteMode, onDelete, onSubmitReview, toggleMode }) {
  return (
    <div className="detail-page">
      <RestaurantDetail restaurant={restaurant} />

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
  );
}

export default Detail;
