import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import RestaurantEditForm from './components/RestaurantEditForm';
import CategoryDisplay from './components/CategoryDisplay';
import LoginSection from './components/LoginSection';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  const [isEditingRestaurant, setIsEditingRestaurant] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태 추가

  const [likedRestaurants, setLikedRestaurants] = useState([
    // Example data
  ]);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      fetchLikedRestaurants(loggedInUser.userId);
      fetchUserReviews(loggedInUser.userId);
    }
  }, [loggedInUser]);

  const fetchLikedRestaurants = (userId) => {
    // Example fetch function
  };

  const fetchUserReviews = (userId) => {
    const exampleReviews = [
      // Example reviews data
    ];
    setReviews(exampleReviews);
  };

  const handleEditRestaurant = () => {
    setIsEditingRestaurant(!isEditingRestaurant);
  };

  const handleRestaurantSave = (updatedRestaurant) => {
    setLikedRestaurants((prev) =>
      prev.map((r) => (r.id === updatedRestaurant.id ? updatedRestaurant : r))
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
      userId: loggedInUser.userId,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([...reviews, reviewWithUserInfo]);
  };

  const handleLikeToggle = (restaurant) => {
    setLikedRestaurants((prevLiked) => {
      if (prevLiked.some((r) => r.id === restaurant.id)) {
        return prevLiked.filter((r) => r.id !== restaurant.id);
      } else {
        return [...prevLiked, restaurant];
      }
    });
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setIsAdmin(false);
  };

  const RestaurantDetailWrapper = () => {
    const { id } = useParams(); // useParams를 사용하여 URL에서 id를 가져옵니다.
    const restaurant = likedRestaurants.find((r) => r.id === parseInt(id, 10));

    if (!restaurant) {
      return <div>Restaurant not found</div>;
    }

    return isEditingRestaurant ? (
      <RestaurantEditForm restaurant={restaurant} onSave={handleRestaurantSave} />
    ) : (
      <Detail
        restaurant={restaurant}
        reviews={reviews.filter((review) => review.restaurant === restaurant.name)}
        isAdmin={isAdmin}
        isDeleteMode={isDeleteMode}
        onDelete={handleDeleteReview}
        onSubmitReview={handleReviewSubmit}
        onLike={handleLikeToggle}
        likedRestaurants={likedRestaurants}
        user={loggedInUser}
      />
    );
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
              <Route path="/" element={<Home selectedCategory={selectedCategory} />} /> {/* 선택된 카테고리를 전달 */}
              <Route path="/restaurants/:id" element={<RestaurantDetailWrapper />} />
              <Route
                path="/profile"
                element={
                  <Profile
                    userInfo={loggedInUser}
                    likedRestaurants={likedRestaurants}
                    reviews={reviews.filter(
                      (review) => review.userId === loggedInUser?.userId
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
                  loggedInUser ? (
                    isAdmin ? (
                      <Sidebar
                        username={loggedInUser.nickname}
                        userId={loggedInUser.userId}
                        likedStores={likedRestaurants.length}
                        averageRating={4.3}
                        isAdmin={isAdmin}
                        isEditingRestaurant={isEditingRestaurant}
                        isDeleteMode={isDeleteMode}
                        onEditRestaurant={handleEditRestaurant}
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
