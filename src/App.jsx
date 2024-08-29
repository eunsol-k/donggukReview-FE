import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CategoryDisplay from './components/CategoryDisplay';
import LoginSection from './components/LoginSection';
import UserProfile from './components/UserProfile';
import CafeteriaDetailWrapper from './pages/CafeteriaDetailWrapper'; // Ensure path is correct
import './App.css';

function App() {
  const [isEditingCafeteria, setIsEditingCafeteria] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [likedCafeterias, setLikedCafeterias] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      fetchLikedCafeterias(loggedInUser.userId);
      fetchUserReviews(loggedInUser.userId);
    }
  }, [loggedInUser]);

  const fetchLikedCafeterias = (userId) => {
    // API call to fetch liked cafeterias
  };

  const fetchUserReviews = (userId) => {
    const exampleReviews = [];
    setReviews(exampleReviews);
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
              <Route
                path="/"
                element={<CategoryDisplay onCategorySelect={setSelectedCategory} />}
              />
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
                  <Profile
                    userInfo={loggedInUser}
                    likedCafeterias={likedCafeterias}
                    reviews={reviews.filter((review) => review.userId === loggedInUser?.userId)}
                  />
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
                        username={loggedInUser.nickname}
                        userId={loggedInUser.userId}
                        likedStores={likedCafeterias.length}
                        averageRating={4.3}
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
                        likes={loggedInUser.likes}
                        reviews={loggedInUser.reviews}
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
