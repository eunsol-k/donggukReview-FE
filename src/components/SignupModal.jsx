import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_ROOT } from '../config/config';

const SignupModal = ({ isOpen, onClose }) => {
  const [nickname, setNickname] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);  // 이미지 파일 상태 제거
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
		event.preventDefault()

		// JSON 데이터를 생성
    const data = {
      userId: id,
      userNickname: nickname,
      userPassword: password
    };

    console.log("id: " + id);
    console.log("nickname: " + nickname);
    console.log("password: " + password);

		const jsonData = JSON.stringify(data)
		const blobData = new Blob([jsonData], { type: 'application/json' });

		const formData = new FormData()
		formData.append('data', blobData)
		if (profileImage) {
      formData.append('file', profileImage[0]); // 선택된 파일을 추가
    }

		await axios({
        method: 'POST',
        url: 'http://18.116.28.134:8080/register',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
			.then(res => {
				console.log("[signupModal] > " + JSON.stringify(res.data));
        console.log("id: " + id);
        console.log("nickname: " + nickname);
        console.log("password: " + password);

				if (res.status === 201) {
					if (res.status === 201) {
            setMessage('회원 가입에 성공했습니다!');
          }
				} else {
					setMessage('회원 가입에 실패했습니다。');
				}
			})
			.catch(err => {
				console.log("[signupModal] Error > " + err);
        console.log("id: " + id);
        console.log("nickname: " + nickname);
        console.log("password: " + password);
			})
	}

  const handleImageChange = (event) => {
    setProfileImage(event.target.files); // 선택된 파일을 상태로 설정
    console.log("nickname: ", password)
  };


  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button onClick={onClose} style={styles.closeButton}>&times;</button>
        <form>
          <div>
            <label>닉네임: </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => {setNickname(e.target.value); console.log("nickname: ", nickname)}}
              required
            />
          </div>
          <div>
            <label>아이디: </label>
            <input
              type="text"
              value={id}
              onChange={(e) => {setId(e.target.value); console.log("id: ", id)}}
              required
            />
          </div>
          <div>
            <label>비밀번호: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value); console.log("password: ", password)}}
              required
            />
          </div>
            <div>
              <label>프로필 사진: </label>
              <input
                type="file"
                onChange={handleImageChange}
                id="file" name="file"
                // accept="image/*"
              />
            </div>
          <button type="submit" onClick={handleSubmit}>회원가입</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default SignupModal;