import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ProfilePage from './pages/Profile';  // ProfilePage 컴포넌트 가져오기
import CategoryDisplay from './components/CategoryDisplay';
import LoginSection from './components/LoginSection';
import UserProfile from './components/UserProfile';
import CafeteriaDetailWrapper from './pages/CafeteriaDetailWrapper';
import './App.css';

function App() {
  const [isEditingCafeteria, setIsEditingCafeteria] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [likedCafeterias, setLikedCafeterias] = useState([]);
  const [reviews, setReviews] = useState([]);

  // 로그인한 사용자 정보를 로컬 스토리지에서 가져와 설정
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const image = localStorage.getItem('image');

    if (token && username && userId) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setLoggedInUser({ userId, nickname: username, image });
    } else {
      console.error('로그인 정보가 없습니다.');
    }
  }, []);

  // 로그인한 사용자의 좋아요 한 음식점과 리뷰를 가져오는 함수
  useEffect(() => {
    if (loggedInUser) {
      fetchLikedCafeterias(loggedInUser.userId);
      fetchUserReviews(loggedInUser.userId);
    }
  }, [loggedInUser]);

  const fetchLikedCafeterias = (userId) => {
    // API call to fetch liked cafeterias
    console.log(`Fetching liked cafeterias for userId: ${userId}`);
    // 예시 데이터 설정
    setLikedCafeterias([]);
  };

  const fetchUserReviews = (userId) => {
    console.log(`Fetching user reviews for userId: ${userId}`);
    // 예시 데이터 설정
    setReviews([]);
  };

  const handleEditCafeteria = () => {
    setIsEditingCafeteria(!isEditingCafeteria);
  };

  const handleCafeteriaSave = (updatedCafeteria) => {
    setLikedCafeterias((prev) =>
      prev.map((c) => (c.id === updatedCafeteria.id ? updatedCafeteria : c))
    );
    setIsEditingCafeteria(false);
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
      userId: loggedInUser.userId,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([...reviews, reviewWithUserInfo]);
  };

  const handleLikeToggle = (cafeteria) => {
    setLikedCafeterias((prevLiked) => {
      if (prevLiked.some((c) => c.id === cafeteria.id)) {
        return prevLiked.filter((c) => c.id !== cafeteria.id);
      } else {
        return [...prevLiked, cafeteria];
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('image');
    setLoggedInUser(null);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <div className="left-section">
            <Routes>
              <Route path="/" element={<CategoryDisplay onCategorySelect={setSelectedCategory} />} />
            </Routes>
          </div>
          <div className="middle-section">
            <Routes>
              <Route path="/" element={<Home selectedCategory={selectedCategory} />} />
              <Route
                path="/cafeterias/:id"
                element={
                  <CafeteriaDetailWrapper
                    isEditingCafeteria={isEditingCafeteria}
                    onEditCafeteria={handleEditCafeteria}
                    onLike={handleLikeToggle}
                    likedCafeterias={likedCafeterias}
                    reviews={reviews}
                    isAdmin={isAdmin}
                    isDeleteMode={isDeleteMode}
                    onDelete={handleDeleteReview}
                    onSubmitReview={handleReviewSubmit}
                    onDeleteReviews={handleDeleteReviews}
                    loggedInUser={loggedInUser}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  loggedInUser ? (
                    <ProfilePage
                      userInfo={loggedInUser}
                      likedCafeterias={likedCafeterias}
                      reviews={reviews.filter((review) => review.userId === loggedInUser?.userId)}
                    />
                  ) : (
                    <div>로그인이 필요합니다.</div>
                  )
                }
              />
            </Routes>
          </div>
          <div className="right-section">
            <Routes>
              <Route
                path="/"
                element={
                  loggedInUser ? (
                    isAdmin ? (
                      <Sidebar
                        isAdmin={isAdmin}
                        isEditingCafeteria={isEditingCafeteria}
                        isDeleteMode={isDeleteMode}
                        onEditCafeteria={handleEditCafeteria}
                        onDeleteReviews={handleDeleteReviews}
                      />
                    ) : (
                      <UserProfile
                        nickname={loggedInUser.nickname}
                        image={loggedInUser.image}
                        likes={likedCafeterias.length}
                        reviews={reviews.length}
                        onLogout={handleLogout}
                      />
                    )
                  ) : (
                    <LoginSection setLoggedInUser={setLoggedInUser} />
                  )
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
