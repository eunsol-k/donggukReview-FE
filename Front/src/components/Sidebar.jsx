import React from 'react';
import './Sidebar.css';

function Sidebar({ username, userId, likedStores, averageRating, isAdmin, onEditRestaurant, isDeleteMode, isEditingRestaurant, onDeleteReviews }) {
  return (
    <aside className="sidebar">
      <div className="profile-section">
        <div className="sidebar-profile-pic">
          <img src="https://via.placeholder.com/80" alt="User" className="sidebar-profile-img" />
        </div>
        <div className="profile-info">
          <p className="username">{username}</p>
          <p className="user-id">@{userId}</p>
        </div>
      </div>
      <div className="user-stats">
        <p className="stat-item">좋아요 한 가게: {likedStores}개</p>
        <p className="stat-item">평균 별점: {averageRating} ★</p>
      </div>
      {isAdmin && (
        <div className="admin-actions">
          <button onClick={onEditRestaurant} className="toggle-admin-button">
            {isEditingRestaurant ? '음식점 정보 수정 중' : '음식점 정보 수정 하기'}
          </button>
          <button onClick={onDeleteReviews} className="toggle-admin-button">
            {isDeleteMode ? '리뷰 삭제 중' : '리뷰 삭제 하기'}
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
