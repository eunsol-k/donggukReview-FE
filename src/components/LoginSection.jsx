import React, { useState } from 'react';
import axios from 'axios';
import SignupModal from './SignupModal';
import UserProfile from './UserProfile';  // UserProfile 컴포넌트 가져오기
import { SERVER_ROOT } from '../config/config';

const LoginSection = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태
  const [userData, setUserData] = useState(null); // 사용자 데이터 상태

  const handleSubmit = async (event) => {
    event.preventDefault()

		const formData = new FormData()
		formData.append('username', username)
		formData.append('password', password)

		await axios({
			method: 'POST',
			url: 'http://18.116.28.134:8080/login',
			data: formData
		})
			.then(res => {
				if (res.status === 200) {
					// JWT 토큰 저장
					let token = res.headers['token']
					let username = res.headers['username']

					localStorage.setItem("access_token", token);
					localStorage.setItem("username", username);

          console.log("token: ", token)
          console.log("username: ", username)

          console.log("로그인 성공")
          alert(`로그인 성공! token: ${token}, username: ${username}`)
          setIsLoggedIn(true);

				} else {
					alert(`⚠️ 로그인에 실패했습니다.`)
				}
			})
			.catch(err => {
				console.log("[login] > " + err);
			})
          };

          const handleLogout = () => {
            // 로그아웃 처리
            localStorage.removeItem("access_token");
            localStorage.removeItem("username");
            setIsLoggedIn(false);
            setUserData(null);
            console.log("로그아웃 성공");

  return (
    <div>
        {isLoggedIn ? (
                <UserProfile
                  nickname={userData.nickname}
                  image={userData.profileImage}
                  likes={userData.likes}
                  reviews={userData.reviews}
                  onLogout={handleLogout}
                />
              )
//      <h2>로그인</h2>
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