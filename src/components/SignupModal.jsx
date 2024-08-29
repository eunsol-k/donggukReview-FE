import React, { useState } from 'react';

const SignupModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API 호출 주석 처리
    // const response = await signup({ name, nickname, password });
    // if (response.success) {
    //   alert('회원가입 성공!');
    //   onClose();  // 모달 닫기
    // } else {
    //   alert(`회원가입 실패: ${response.message}`);
    // }

    // 대체로 로그 확인
    console.log('회원가입 시도:', { name, nickname, password });
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">회원가입</button>
        </form>
        <button onClick={onClose} style={styles.closeButton}>닫기</button>
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
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '10px',
  },
};

export default SignupModal;
