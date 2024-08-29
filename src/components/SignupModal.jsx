import React, { useState } from 'react';
import axios from 'axios';       //
import { SERVER_ROOT } from '../config/config'

const SignupModal = ({ isOpen, onClose }) => {
  const [nickname, setNickname] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // JSON 데이터를 생성
    const data = {
      userId: id,
      userNickname: nickname,
      userPassword: password,
    };

    // JSON 데이터를 문자열로 변환
    const jsonData = JSON.stringify(data);

    // JSON 데이터를 Blob으로 변환
    const blobData = new Blob([jsonData], { type: 'application/json' });

    // FormData 생성
    const formData = new FormData();
    formData.append('data', blobData); // JSON 데이터를 Blob으로 추가
    if (profileImage) {
      formData.append('file', profileImage); // 선택된 파일을 추가
    }

    try {
      // 서버에 요청 전송
      const response = await axios({
        method: 'POST',
        url: `${SERVER_ROOT}/register`,  // 원격 서버의 절대 URL로 변경
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 서버 응답이 성공적(HTTP 상태 코드 200)인지 확인합니다.
      if (response.status === 200) {

        // 성공적인 응답이 도착하면 성공 메시지를 상태로 설정합니다.
        setMessage('회원가입에 성공했습니다!');

        // 입력 필드들을 초기화합니다.
        setNickname('');  // 닉네임 필드 초기화
        setId('');        // 아이디 필드 초기화
        setPassword('');  // 비밀번호 필드 초기화
        setProfileImage(null);  // 프로필 이미지 필드 초기화

        // 2초 후에 성공 메시지를 지우고, 모달을 닫습니다.
        setTimeout(() => {
          setMessage('');  // 성공 메시지 초기화
          onClose();       // 모달 닫기 함수 호출
        }, 2000);  // 2초 대기 후 실행

      } else {  // 응답이 200이 아닌 경우
        console.log(response.status);
        // 실패 메시지를 상태로 설정하여 사용자에게 알립니다.
        setMessage('회원가입에 실패했습니다. 나중에 다시 시도해주세요.');
      }
    } catch (error) {  // try 블록에서 예외가 발생한 경우

      // 콘솔에 오류 내용을 출력하여 디버깅에 도움을 줍니다.
      console.error('회원가입 실패:', error);

      // 실패 메시지를 상태로 설정하여 사용자에게 알립니다.
      setMessage('회원가입에 실패했습니다. 나중에 다시 시도해주세요.');
    }
  };

  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]); // 선택된 파일을 상태로 설정
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button onClick={onClose} style={styles.closeButton}>&times;</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>닉네임: </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>아이디: </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div>
            <label>비밀번호: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>프로필 사진: </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <button type="submit">회원가입</button>
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
