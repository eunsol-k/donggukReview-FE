import React from 'react';

const LogoutButton = ({ onLogout }) => {
  return (
    <button style={styles.button} onClick={onLogout}>
      로그아웃
    </button>
  );
};

const styles = {
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default LogoutButton;
