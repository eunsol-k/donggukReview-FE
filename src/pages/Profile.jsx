import React, { useState, useEffect } from 'react';
import ProfileSection from '../components/ProfileSection';
import ReviewList from '../components/ReviewList';
import ReviewFormModal from '../components/ReviewFormModal';
import './Profile.css';

function ProfilePage({ userInfo }) {
  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  useEffect(() => {
    if (userInfo) {
      fetchUserData();
    }
  }, [userInfo]);

  const fetchUserData = async () => {
    try {
      const likedResponse = await fetch(`/api/user/likes`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (likedResponse.ok) {
        const likedData = await likedResponse.json();
        setLikedRestaurants(likedData);
      } else {
        console.error('Failed to fetch liked restaurants');
      }

      const reviewsResponse = await fetch(`/api/user/reviews`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (reviewsResponse.ok) {
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } else {
        console.error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const openReviewModal = (restaurantId) => {
    console.log("Selected restaurant ID:", restaurantId); // Debug log
    setSelectedRestaurantId(restaurantId);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedRestaurantId(null);
  };

  const handleReviewSubmit = (review) => {
    console.log('Review submitted:', review);
    setReviews(prevReviews => [...prevReviews, review]);
    closeReviewModal();
  };

  if (!userInfo) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="profile-page">
      <ProfileSection userInfo={userInfo} />

      <div className="profile-section liked-restaurants-section">
        <h3>좋아요 한 음식점</h3>
        {likedRestaurants.length > 0 ? (
          <ul>
            {likedRestaurants.map((restaurant, index) => (
              <li key={index}>
                {restaurant.name} - {restaurant.category.join(', ')}
                <button onClick={() => openReviewModal(restaurant.id)}>리뷰 작성</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>좋아요 한 음식점이 없습니다.</p>
        )}
      </div>

      <div className="profile-section reviews-section">
        <h3>작성한 댓글</h3>
        {reviews.length > 0 ? (
          <ReviewList reviews={reviews} isAdmin={false} isDeleteMode={false} onDelete={() => {}} />
        ) : (
          <p>작성한 댓글이 없습니다.</p>
        )}
      </div>

      {isReviewModalOpen && (
        <ReviewFormModal
          onSubmit={handleReviewSubmit}
          closeModal={closeReviewModal}
          restaurantId={selectedRestaurantId}
        />
      )}
    </div>
  );
}

export default ProfilePage;
