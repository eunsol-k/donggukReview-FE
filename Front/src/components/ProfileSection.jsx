import React, { useState } from 'react';
import './ProfileSection.css';
import ProfileEditModal from './ProfileEditModal';

function ProfileSection({ userInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!userInfo) {
    // userInfo가 없을 때는 로딩 상태나 기본 메시지를 표시할 수 있습니다.
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-section">
      <div className="profile-info">
        <img src={userInfo.profilePicture} alt="프로필 사진" className="profile-img" />
        <div className="profile-text">
          <h2>{userInfo.username}</h2>
          <p>ID: {userInfo.userId}</p>
        </div>
      </div>
      <button className="edit-button" onClick={openModal}>
        수정하기
      </button>
      {isModalOpen && (
        <ProfileEditModal userInfo={userInfo} onClose={closeModal} />
      )}
    </div>
  );
}

export default ProfileSection;
