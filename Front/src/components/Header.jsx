import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">동국대 맛집 리뷰</div>
      <nav className="nav">
        <Link to="/">홈</Link>
        <Link to="/profile">내 정보</Link>
        <Link to="/details">음식점 상세 정보</Link>
      </nav>
    </header>
  );
}

export default Header;