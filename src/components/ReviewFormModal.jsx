import React, { useEffect } from 'react';
import ReviewForm from './ReviewForm';
import './ReviewFormModal.css';

function ReviewFormModal({ onSubmit, closeModal, restaurantId }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleReviewSubmit = (review) => {
    onSubmit(review);
    closeModal();
    console.log('Review submitted:', review);
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <ReviewForm onSubmit={handleReviewSubmit} restaurantId={restaurantId} />
      </div>
    </div>
  );
}

export default ReviewFormModal;
