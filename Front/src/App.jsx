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

  const [likedRestaurants, setLikedRestaurants] = useState([
    {
      id: 1,
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
      id: 2,
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
    if (loggedInUser) {
      fetchLikedRestaurants(loggedInUser.userId);
      fetchUserReviews(loggedInUser.userId);
    }
  }, [loggedInUser]);

  const fetchLikedRestaurants = (userId) => {
    // 예제 데이터 초기화 시 호출
  };

  const fetchUserReviews = (userId) => {
    const exampleReviews = [
      {
        id: 1,
        restaurant: 'Restaurant 1',
        userId: userId,
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
        userId: userId,
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
              <Route path="/" element={<CategoryDisplay />} />
            </Routes>
          </div>
          <div className="middle-section">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurants/:id" element={<RestaurantDetailWrapper />} /> {/* 경로 매개변수 사용 */}
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
              <Route
                path="/"
                element={
                  loggedInUser ? (
                    <UserProfile
                      nickname={loggedInUser.nickname}
                      image={loggedInUser.image}
                      likes={loggedInUser.likes}
                      reviews={loggedInUser.reviews}
                      onLogout={handleLogout}
                    />
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