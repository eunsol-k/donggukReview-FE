import React, { useState } from 'react';
import Header from './components/Header';
import CategoryDisplay from './components/CategoryDisplay';
import LoginSection from './components/LoginSection';
import SearchSection from './components/SearchSection';
import UserProfile from './components/UserProfile';
import SignupModal from './components/SignupModal';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const searchUser = (e) => {
        e.preventDefault();

        fetch('/search/' + userID)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
  };

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <div style={styles.section1}>
          <CategoryDisplay />
        </div>
        <div style={styles.section2}>
          <SearchSection />
        </div>
        <div style={styles.section3}>
          {loggedInUser ? (
            <UserProfile
              nickname={loggedInUser.nickname}
              image={loggedInUser.image}
              likes={loggedInUser.likes}
              reviews={loggedInUser.reviews}
              onLogout={handleLogout}
            />
          ) : (
            <LoginSection setLoggedInUser={setLoggedInUser} />
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: 'calc(100vh - 60px)', // 헤더 높이를 제외한 나머지 화면
    paddingTop: '60px', // 헤더 높이만큼 padding 추가
  },
section1: {
    flex: 1,  // 1번 화면: 1 비율
    padding: '20px',
    border: '1px solid #ccc',
  },
  section2: {
    flex: 2,  // 2번 화면: 2 비율 (가장 큰 부분)
    padding: '20px',
    border: '1px solid #ccc',
  },
  section3: {
    flex: 1,   // 3번 화면: 1 비율
    padding: '20px',
    border: '1px solid #ccc',
    position: 'relative', // 로그아웃 버튼을 우측 하단에 고정하기 위해 position: relative 추가
  },
};

export default App;
