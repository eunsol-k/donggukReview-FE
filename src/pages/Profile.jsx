import React, { useState, useEffect } from 'react';
import ProfileSection from '../components/ProfileSection';
import ReviewList from '../components/ReviewList';
import './Profile.css';

function ProfilePage({ userInfo }) {
  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (userInfo) {
      fetchUserData();
    }
  }, [userInfo]);

  const fetchUserData = async () => {
    // 로컬 스토리지에서 좋아요한 음식점 불러오기
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRestaurants')) || [];
    const exampleLikedRestaurants = storedFavorites.map(id => ({
      name: `Restaurant ${id}`,
      category: ['카페'],
    }));

    // 예제 리뷰 데이터 (실제 구현에서는 API 호출로 대체)
    const exampleReviews = [
      {
        restaurant: 'Restaurant 1',
        userId: userInfo.userId, // userInfo를 이용하여 사용자 ID 연결
        content: '정말 맛있어요!',
        date: '2023-08-01',
      },
      {
        restaurant: 'Restaurant 2',
        userId: userInfo.userId,
        content: '서비스가 정말 좋았습니다!',
        date: '2023-08-02',
      },
    ];

    setLikedRestaurants(exampleLikedRestaurants);
    setReviews(exampleReviews.filter(review => review.userId === userInfo.userId)); // 사용자 리뷰만 필터링
  };

  const clearFavorites = () => {
    // 좋아요한 음식점 초기화
    localStorage.removeItem('favoriteRestaurants');
    setLikedRestaurants([]); // 초기화 후 빈 배열로 설정
  };

  if (!userInfo) {
    // userInfo가 없을 때는 로딩 상태나 로그인 필요 메시지를 표시할 수 있습니다.
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="profile-page">
      <ProfileSection userInfo={userInfo} /> {/* 메인 페이지와 동일한 프로필 정보 표시 */}

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
