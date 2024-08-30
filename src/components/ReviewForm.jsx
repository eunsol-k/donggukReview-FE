import React, { useState } from 'react';
import './ReviewForm.css';
import axios from 'axios';
import SERVER_ROOT from '../config/config';

function ReviewForm({ onSubmit, restaurantId }) {
  const [overallRating, setOverallRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');

  const handleRatingChange = (ratingSetter, value, currentRating) => {
    ratingSetter(currentRating >= value ? value - 0.5 : value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!overallRating) {
      alert('총점을 입력해주세요.');
      return;
    }

    if (!restaurantId) {
      console.error("restaurantId is undefined");
      alert('음식점 ID가 설정되지 않았습니다. 다시 시도해 주세요.');
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    // 데이터 유효성 검사: null 값이 포함된 경우 제출하지 않음
    const review = {
      reviewContents: reviewContent.trim(),
      reviewRatings: overallRating.toString(),
      cafeteriaId: restaurantId,
    };

    if (!review.reviewContents || review.reviewRatings === "0") {
      alert('리뷰 내용과 평점을 모두 입력해주세요.');
      return;
    }

    console.log("Review data being sent:", review);

    axios({
      method: 'POST',
      url: `${SERVER_ROOT}/user/reviews/${restaurantId}`,
      data: review,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      console.log("Server response data:", response.data);
      if (response.status !== 201) {
        throw new Error('Failed to submit review');
      }

      const savedReview = response.data;
      onSubmit(savedReview);
      setOverallRating(0);
      setReviewContent('');
    })
    .catch(error => {
      console.error('리뷰 작성 중 오류 발생:', error);
      alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    });
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
