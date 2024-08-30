import React from 'react';
import LogoutButton from './LogoutButton';

const UserProfile = ({ userName, userImagePath, likes, reviews, onLogout }) => {
  return (
    <div style={styles.profileContainer}>
      <img src={userImagePath} alt="User Profile" style={styles.profileImage} /> {/* 수정: 이미지 속성 이름 변경 */}
      <h3>{userName}</h3> {/* 수정: 닉네임 속성 이름 변경 */}
      <div style={styles.stats}>
        <p>좋아요: {likes}개</p>
        <p>후기: {reviews}개</p>
      </div>
      <button style={styles.button}>마이페이지</button>
      <LogoutButton onLogout={onLogout} />
    </div>
  );
};

const styles = {
  profileContainer: {
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    position: 'relative',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  stats: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default UserProfile;
