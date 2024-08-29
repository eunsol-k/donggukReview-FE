import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';
import './ReviewFormModal.css';

function ReviewFormModal({ onSubmit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    // Cleanup event listener on unmount
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleReviewSubmit = (review) => {
    onSubmit(review);
    closeModal();
    console.log('Review submitted:', review);
  };

  return (
    <div>
      <button onClick={openModal} className="open-modal-button">
        리뷰 작성하기
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <ReviewForm onSubmit={handleReviewSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewFormModal;
