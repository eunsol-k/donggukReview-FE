import React from 'react';
import './Sidebar.css';

function Sidebar({ isAdmin, onEditRestaurant, isDeleteMode, isEditingRestaurant, onDeleteReviews }) {
  return (
    <div className="sidebar">
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
    </div>
  );
}

export default Sidebar;