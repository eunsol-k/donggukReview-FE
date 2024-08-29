import React from 'react';
import './Detail.css';

function Detail({
  cafeteria,
  reviews,
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

  return (
    <div className="detail-page">
      <div className="left-sidebar"></div>
      <div className="main-content">
        <div className="restaurant-detail-section">
          <h1>{cafeteria.cafeteriaName}</h1>
          <img
            src={
              cafeteria.storedFilePath && cafeteria.storedFilePath.startsWith('http')
                ? cafeteria.storedFilePath
                : `http://18.116.28.134:8080${cafeteria.storedFilePath}`
            }
            alt={cafeteria.cafeteriaName}
            style={{ width: '100%', height: 'auto' }}
            onError={(e) => {
              e.target.src = '/path/to/default-image.png'; // 대체 이미지 경로
              e.target.alt = "이미지를 불러올 수 없습니다"; // 대체 텍스트
            }}
          />
          <p>{cafeteria.cafeteriaCategory}</p>
          <p>{cafeteria.cafeteriaPhone}</p>
          <p>{cafeteria.cafeteriaAddress}</p>

          <button onClick={() => onLike(cafeteria)}>
            {likedCafeterias.some((c) => c.id === cafeteria.cafeteriaId) ? 'Unlike' : 'Like'}
          </button>

          <div className="review-section">
            <h2>Reviews</h2>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id}>
                  <p>{review.content}</p>
                  {isAdmin && isDeleteMode && (
                    <button onClick={() => onDelete(review.id)}>Delete</button>
                  )}
                </div>
              ))
            )}
          </div>

          {user && !isEditingCafeteria && (
            <div>
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
      </div>
      <div className="right-sidebar"></div>
    </div>
  );
}

export default Detail;
