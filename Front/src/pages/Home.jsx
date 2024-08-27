// import React, { useState } from 'react';
// import Header from '../components/Header';
// import CategoryDisplay from '../components/CategoryDisplay';
// import LoginSection from '../components/LoginSection';
// import SearchSection from '../components/SearchSection';
// import UserProfile from '../components/UserProfile';
// import './Home.css';  // 스타일은 여기서 적용
//
// const Home = () => {
//   const [loggedInUser, setLoggedInUser] = useState(null);
//
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setLoggedInUser(null);
//   };
//
//   return (
//     <div className="home-container">
//       <div className="home-content">
//         <div className="home-section category-section">
//           <CategoryDisplay />
//         </div>
//         <div className="home-section search-section">
//           <SearchSection />
//         </div>
//         <div className="home-section profile-section">
//           {loggedInUser ? (
//             <UserProfile
//               nickname={loggedInUser.nickname}
//               image={loggedInUser.image}
//               likes={loggedInUser.likes}
//               reviews={loggedInUser.reviews}
//               onLogout={handleLogout}
//             />
//           ) : (
//             <LoginSection setLoggedInUser={setLoggedInUser} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Home;


import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Dongguk Review!</h1>
      <p>This is the best place to find and review restaurants.</p>
      <p>Click on the navigation links to explore more.</p>
    </div>
  );
}

export default Home;
