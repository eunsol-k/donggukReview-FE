import React, { useState } from 'react';
import './ProfileEditModal.css';

function ProfileEditModal({ userInfo, onClose }) {
  const [profileData, setProfileData] = useState(userInfo);
  const [previewImage, setPreviewImage] = useState(userInfo.profilePicture || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          profilePicture: reader.result,
        });
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // 백엔드에 저장하는 로직을 여기에 추가
    console.log('Updated Profile Data:', profileData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>프로필 수정</h2>
        <div className="form-group">
          <label>닉네임:</label>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            value={profileData.password || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>프로필 사진:</label>
          <div className="profile-preview-container">
            {previewImage && <img src={previewImage} alt="Profile Preview" className="profile-preview" />}
          </div>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="save-button-container">
          <button className="save-button" onClick={handleSubmit}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditModal;
