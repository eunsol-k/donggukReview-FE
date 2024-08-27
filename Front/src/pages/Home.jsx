import React, { useState } from 'react';
import Header from '../components/Header';
import CategoryDisplay from '../components/CategoryDisplay';
import LoginSection from '../components/LoginSection';
import SearchSection from '../components/SearchSection';
import UserProfile from '../components/UserProfile';
import './Home.css';  // 스타일은 여기서 적용

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-section search-section">
          <SearchSection />
        </div>
      </div>
    </div>
  );
};

export default Home;

