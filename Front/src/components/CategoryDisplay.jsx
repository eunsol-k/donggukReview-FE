import React, { useState, useEffect } from 'react';

const CategoryDisplay = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const uniqueCategories = [
          ...new Set(data.map((item) => item.cafeteriaCategory)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        setError(error.message);
      });
  }, []);

  return (
    <div style={styles.container}>
      {error ? (
        <p style={{ color: 'red' }}>오류 발생: {error}</p>
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <div key={category} style={styles.category}>
            {category}
          </div>
        ))
      ) : (
        <p>카테고리를 불러오는 중...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    padding: '20px',
  },
  category: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
};

export default CategoryDisplay;
