import React, { useState } from 'react';
import './ReviewList.css';

function ReviewList({ reviews, isAdmin, isDeleteMode, onDelete }) {
  const [sortCriteria, setSortCriteria] = useState('latest'); // 정렬 기준 상태
  const [visibleCount, setVisibleCount] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);

  // 리뷰 정렬 함수
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortCriteria === 'latest') {
      return new Date(b.date) - new Date(a.date); // 최신순 정렬
    } else if (sortCriteria === 'rating') {
      return b.overallRating - a.overallRating; // 별점순 정렬
    }
    return 0;
  });

  const showMoreReviews = () => {
    setVisibleCount(reviews.length);
    setIsExpanded(true);
  };

  const showLessReviews = () => {
    setVisibleCount(3);
    setIsExpanded(false);
  };

  const renderStars = (rating, size = 'medium') => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    return (
      <div className={`star-rating ${size}`}>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span key={index} className={`star ${starValue <= fullStars ? 'filled' : hasHalfStar && starValue === fullStars + 1 ? 'half-filled' : ''}`}>
              ★
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="review-list">
      <h2>리뷰</h2>
      <div className="sort-options">
        <label>
          정렬 기준:
          <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
            <option value="latest">최신순</option>
            <option value="rating">별점순</option>
          </select>
        </label>
      </div>
      {sortedReviews.slice(0, visibleCount).map((review, index) => (
        <div key={index} className="review-item">
          <div className="review-header">
            <div className="review-profile">
              {review.profilePicture ? (
                <img src={review.profilePicture} alt="프로필 사진" className="profile-img" />
              ) : (
                <div className="profile-placeholder">프로필</div>
              )}
            </div>
            <div className="review-author">
              <span className="review-userid">{review.userId}</span>
            </div>
            {isAdmin && isDeleteMode && (
              <button onClick={() => onDelete(review.userId)} className="delete-button">
                삭제
              </button>
            )}
          </div>
          <div className="review-ratings">
            {renderStars(review.overallRating, 'large')}
          </div>
          <p className="review-date">{review.date}</p>
          {review.content && <p className="review-content">{review.content}</p>}
        </div>
      ))}
      {!isExpanded && visibleCount < reviews.length && (
        <button className="toggle-button" onClick={showMoreReviews}>
          더보기
        </button>
      )}
      {isExpanded && (
        <button className="toggle-button" onClick={showLessReviews}>
          축소
        </button>
      )}
    </div>
  );
}

export default ReviewList;
