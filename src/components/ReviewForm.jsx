import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm({ onSubmit }) {
  const [overallRating, setOverallRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');

  const handleRatingChange = (ratingSetter, value, currentRating) => {
    if (currentRating >= value) {
      ratingSetter(value - 0.5);  // 반개로 변경
    } else {
      ratingSetter(value);  // 한 개로 변경
    }
  };

  const renderStars = (rating, ratingSetter) => {
    return [...Array(5)].map((_, index) => {
      const fullValue = index + 1;
      const halfValue = index + 0.5;

      return (
        <span
          key={index}
          className={
            fullValue <= rating
              ? "star filled"
              : rating >= halfValue
              ? "star half-filled"
              : "star"
          }
          onClick={() =>
            handleRatingChange(
              ratingSetter,
              rating === halfValue ? fullValue : halfValue,
              rating
            )
          }
        >
          ★
        </span>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사: 총점이 입력되었는지 확인 (리뷰 내용은 필수가 아님)
    if (!overallRating) {
      alert('총점을 입력해주세요.');
      return;
    }

    // 리뷰 데이터를 객체로 생성
    const review = {
      overallRating,
      reviewContent: reviewContent.trim(),  // 리뷰 내용을 트림하여 공백 제거
    };

    onSubmit(review);

    // 폼 초기화
    setOverallRating(0);
    setReviewContent('');
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2>리뷰 작성하기</h2>
      <div className="rating-group">
        <label>총평: </label>
        <div className="star-rating">
          {renderStars(overallRating, setOverallRating)}
        </div>
      </div>
      <div className="review-content">
        <textarea
          placeholder="리뷰를 적어주세요 (선택 사항)"
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />
      </div>
      <div className="submit-button">
        <button type="submit">리뷰 등록</button>
      </div>
    </form>
  );
}

export default ReviewForm;
