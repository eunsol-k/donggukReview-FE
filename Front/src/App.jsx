import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import RestaurantEditForm from './components/RestaurantEditForm';
import './App.css';

function App() {
  const [isEditingRestaurant, setIsEditingRestaurant] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: '홍길동',
    userId: 'user123',
  });

  const [likedRestaurants, setLikedRestaurants] = useState([
    {
      name: 'Restaurant 1',
      phone: '123-456-7890',
      location: 'Seoul',
      rating: 4.5,
      category: ['카페', '디저트'],
      reviewCount: 43,
      address: '서울특별시 강남구 삼성동 123',
      image: 'https://via.placeholder.com/400x300',
      menu: [
        { name: '아메리카노', price: 4500 },
        { name: '카페라떼', price: 5000 },
        { name: '치즈케이크', price: 7000 },
      ],
    },
    {
      name: 'Restaurant 2',
      phone: '987-654-3210',
      location: 'Busan',
      rating: 4.0,
      category: ['한식', '퓨전'],
      reviewCount: 29,
      address: '부산광역시 해운대구 우동 456',
      image: 'https://via.placeholder.com/400x300',
      menu: [
        { name: '비빔밥', price: 8000 },
        { name: '불고기', price: 10000 },
        { name: '떡볶이', price: 6000 },
      ],
    },
  ]);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchLikedRestaurants(userInfo.userId);
    fetchUserReviews(userInfo.userId);
  }, [userInfo]);

  const fetchLikedRestaurants = (userId) => {
    // 예제 데이터 초기화 시 호출
  };

  const fetchUserReviews = (userId) => {
    const exampleReviews = [
      {
        id: 1,
        restaurant: 'Restaurant 1',
        userId: 'user123',
        profilePicture: 'https://via.placeholder.com/50',
        date: '2023-08-01',
        content: '맛있어요!',
        photos: ['https://via.placeholder.com/100', 'https://via.placeholder.com/100'],
        overallRating: 4.5,
        serviceRating: 4,
        priceRating: 5,
        tasteRating: 4.5,
      },
      {
        id: 2,
        restaurant: 'Restaurant 2',
        userId: 'user123',
        profilePicture: 'https://via.placeholder.com/50',
        date: '2023-08-02',
        content: '괜찮은 식당이에요!',
        photos: [],
        overallRating: 4.0,
        serviceRating: 4,
        priceRating: 4,
        tasteRating: 4,
      },
    ];
    setReviews(exampleReviews);
  };

  const handleEditRestaurant = () => {
    setIsEditingRestaurant(!isEditingRestaurant);
  };

  const handleRestaurantSave = (updatedRestaurant) => {
    setLikedRestaurants((prev) =>
      prev.map((r) => (r.name === updatedRestaurant.name ? updatedRestaurant : r))
    );
    setIsEditingRestaurant(false);
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  const handleDeleteReviews = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  const handleReviewSubmit = (newReview) => {
    const reviewWithUserInfo = {
      ...newReview,
      id: reviews.length + 1,
      userId: userInfo.userId,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([...reviews, reviewWithUserInfo]);
  };

  const handleLikeToggle = (restaurant) => {
    setLikedRestaurants((prevLiked) => {
      if (prevLiked.some((r) => r.name === restaurant.name)) {
        return prevLiked.filter((r) => r.name !== restaurant.name);
      } else {
        return [...prevLiked, restaurant];
      }
    });
  };

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="admin-toggle-container">
          <button onClick={toggleAdminMode} className="toggle-admin-button">
            {isAdmin ? '일반 모드로 전환' : '관리자 모드로 전환'}
          </button>
        </div>
        <div className="content">
          <div className="left-section">
            <p>Left Section</p>
          </div>
          <div className="middle-section">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/details"
                element={
                  isEditingRestaurant ? (
                    <RestaurantEditForm
                      restaurant={likedRestaurants[0]}
                      onSave={handleRestaurantSave}
                    />
                  ) : (
                    <Detail
                      restaurant={likedRestaurants[0]}
                      reviews={reviews.filter(
                        (review) => review.restaurant === likedRestaurants[0]?.name
                      )}
                      isAdmin={isAdmin}
                      isDeleteMode={isDeleteMode}
                      onDelete={handleDeleteReview}
                      onSubmitReview={handleReviewSubmit}
                      onLike={handleLikeToggle}
                      likedRestaurants={likedRestaurants}
                    />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    userInfo={userInfo}
                    likedRestaurants={likedRestaurants}
                    reviews={reviews.filter(
                      (review) => review.userId === userInfo.userId
                    )}
                  />
                }
              />
            </Routes>
          </div>
          <div className="right-section">
            <Routes>
              <Route
                path="/details"
                element={
                  <Sidebar
                    username={userInfo.username}
                    userId={userInfo.userId}
                    likedStores={likedRestaurants.length}
                    averageRating={4.3}
                    isAdmin={isAdmin}
                    isEditingRestaurant={isEditingRestaurant}
                    isDeleteMode={isDeleteMode}
                    onEditRestaurant={handleEditRestaurant}
                    onDeleteReviews={handleDeleteReviews}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
