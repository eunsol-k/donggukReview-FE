import React from 'react';
import RestaurantDetail from '../components/RestaurantDetail';
import ReviewList from '../components/ReviewList';
import ReviewFormModal from '../components/ReviewFormModal';
import RestaurantEditForm from '../components/RestaurantEditForm';
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
          {isEditingRestaurant ? (
            <RestaurantEditForm
              restaurant={restaurant}
              onSave={onEditRestaurant}
            />
          ) : (
            <RestaurantDetail restaurant={restaurant} />
          )}

          {/* 관리자 모드에서만 보이는 음식점 정보 수정 버튼 */}
          {isAdmin && !isEditingRestaurant && (
            <button onClick={onEditRestaurant}>
              음식점 정보 수정하기
            </button>
          )}
        </div>

        <div className="review-section">
          <div className="mode-header">
            {/* 로그인된 사용자만 리뷰 작성 가능 */}
            {!isAdmin && user && <ReviewFormModal onSubmit={onSubmitReview} />}
            {!user && <p>리뷰를 작성하려면 로그인하세요.</p>}

            {/* 관리자 모드에서만 보이는 리뷰 삭제 버튼 */}
            {isAdmin && (
              <button onClick={onDeleteReviews}>
                {isDeleteMode ? '리뷰 삭제 모드 종료' : '리뷰 삭제 모드'}
              </button>
            )}
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
