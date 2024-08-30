import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutButton from './LogoutButton';

const UserProfile = ({ nickname, image, likes, reviews, onLogout }) => {
  const [likeCount, setLikeCount] = useState(likes); // 좋아요 수 상태
  const [statusMessage, setStatusMessage] = useState(''); // 상태 메시지

  useEffect(() => {
    // 좋아요 수를 API로부터 불러옵니다.
    axios.get('http://3.138.114.160:8080/user/likes/1')
      .then(response => {
        // API 응답에서 좋아요 수를 가져옵니다.
        if (response.status === 200) {
          setLikeCount(response.data.likes);
        }
      })
      .catch(error => {
        console.error('좋아요 수를 불러오는 데 실패했습니다.', error);
      });
  }, []);

  const handleLike = () => {
    // 좋아요 클릭 시 API에 요청을 보냅니다.
    axios.post('http://3.138.114.160:8080/user/likes/1')
      .then(response => {
        if (response.status === 200) {
          const newLikeCount = likeCount + 1;
          setLikeCount(newLikeCount);
          setStatusMessage(response.data.message); // 상태 메시지를 API 응답으로 설정
        }
      })
      .catch(error => {
        console.error('좋아요 요청에 실패했습니다.', error);
      });
  };

  return (
    <div style={styles.profileContainer}>
      <img src={image} alt="User Profile" style={styles.profileImage} />
      <h3>{nickname}</h3>
      <div style={styles.stats}>
        <p>좋아요: {likeCount}개</p>
        <p>후기: {reviews}개</p>
      </div>
      <button style={styles.button} onClick={handleLike}>좋아요</button>
      <button style={styles.button}>마이페이지</button>
      {statusMessage && <p>{statusMessage}</p>} {/* 상태 메시지 출력 */}
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
    marginRight: '10px',
  },
};

export default UserProfile;