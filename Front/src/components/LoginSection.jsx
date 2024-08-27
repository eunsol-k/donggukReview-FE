import React, { useState } from 'react';
import SignupModal from './SignupModal';

const LoginSection = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 임의 계정 확인
    if (username === 'admin' && password === '1234') {
      alert('로그인 성공!');
      // 임의로 토큰 생성 (실제 구현에서는 서버로부터 JWT 토큰 등을 받게 됨)
      const token = 'dummy-token';
      localStorage.setItem('token', token);

      // 임의의 좋아요 수와 후기 수
      const likes = 42;
      const reviews = 15;

      setLoggedInUser({
        nickname: '관리자',
        image: 'https://via.placeholder.com/100',
        token: token,
        likes: likes,
        reviews: reviews,
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
