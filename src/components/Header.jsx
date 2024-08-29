import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}><a href="/" style={styles.navLink}>홈</a></li>
          <li style={styles.navItem}><a href="/about" style={styles.navLink}>소개</a></li>
          <li style={styles.navItem}><a href="/contact" style={styles.navLink}>문의</a></li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 0',
    position: 'fixed',
    top: 0,
    zIndex: 1000,
  },
  nav: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Header;
