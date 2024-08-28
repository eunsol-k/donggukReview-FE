import React, { useState } from 'react';
import SignupModal from './SignupModal';

const LoginSection = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === '1234') {
      // 관리자 로그인
      alert('관리자 로그인 성공!');
      const token = 'dummy-token';
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
    } else if (username && password) {
      // 일반 사용자 로그인
      alert('일반 사용자 로그인 성공!');
      const token = 'dummy-token';
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
    } else {
      alert('로그인 실패: 잘못된 자격 증명');
    }
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
