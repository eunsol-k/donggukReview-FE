import React, { useState, useEffect } from 'react';
import ProfileSection from '../components/ProfileSection';
import ReviewList from '../components/ReviewList';
import './Profile.css';

function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    username: '홍길동',
    userId: 'user123',
    profilePicture: 'https://via.placeholder.com/80',
  });

  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRestaurants')) || [];
    const exampleLikedRestaurants = storedFavorites.map(id => ({
      name: `Restaurant ${id}`,
      category: ['카페'],
    }));

    const exampleReviews = [
      {
        restaurant: 'Restaurant 1',
        content: '정말 맛있어요!',
        date: '2023-08-01',
      },
      {
        restaurant: 'Restaurant 2',
        content: '서비스가 정말 좋았습니다!',
        date: '2023-08-02',
      },
    ];

    setLikedRestaurants(exampleLikedRestaurants);
    setReviews(exampleReviews);
  };

  const clearFavorites = () => {
    localStorage.removeItem('favoriteRestaurants');
    setLikedRestaurants([]); // 좋아요 리스트를 빈 배열로 초기화
  };

  return (
    <div className="profile-page">
      <ProfileSection userInfo={userInfo} />

      <div className="profile-section liked-restaurants-section">
        <h3>좋아요 한 음식점</h3>
        {likedRestaurants.length > 0 ? (
          <>
            <ul>
              {likedRestaurants.map((restaurant, index) => (
                <li key={index}>
                  {restaurant.name} - {restaurant.category.join(', ')}
                </li>
              ))}
            </ul>
            <button onClick={clearFavorites}>좋아요 리스트 초기화</button>
          </>
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
    </div>
  );
}

export default ProfilePage;
