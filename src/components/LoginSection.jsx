import React, { useState } from 'react';
import SignupModal from './SignupModal';

const LoginSection = ({ setLoggedInUser, setIsAdmin }) => {  // setIsAdmin 추가
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLogin = (username) => {
    if (username === 'admin') {
      // 관리자 로그인
      alert('관리자 로그인 성공!');
      const token = 'admin-token';
      localStorage.setItem('token', token);

      const likes = 42;
      const reviews = 15;

      setLoggedInUser({
        nickname: '관리자',
        image: 'https://via.placeholder.com/100',
        token: token,
        likes: likes,
        reviews: reviews,
        isAdmin: true,
      });
      setIsAdmin(true); // 관리자 모드 활성화
    } else if (username === 'testuser') {
      // 테스트 사용자 로그인
      alert('테스트 사용자 로그인 성공!');
      const token = 'testuser-token';
      localStorage.setItem('token', token);

      const likes = 20;
      const reviews = 5;

      setLoggedInUser({
        nickname: '테스트 사용자',
        image: 'https://via.placeholder.com/100',
        token: token,
        likes: likes,
        reviews: reviews,
        isAdmin: false,
      });
      setIsAdmin(false); // 일반 사용자 모드
    } else if (username && password) {
      // 임의의 일반 사용자 로그인
      alert('일반 사용자 로그인 성공!');
      const token = `user-token-${username}`;
      localStorage.setItem('token', token);

      const likes = 20;
      const reviews = 5;

      setLoggedInUser({
        nickname: username,
        image: 'https://via.placeholder.com/100',
        token: token,
        likes: likes,
        reviews: reviews,
        isAdmin: false,
      });
      setIsAdmin(false); // 일반 사용자 모드
    } else {
      alert('로그인 실패: 잘못된 자격 증명');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username);
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
      <button onClick={() => setIsSignupOpen(true)}>회원가입</button>
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </div>
  );
};

export default LoginSection;
