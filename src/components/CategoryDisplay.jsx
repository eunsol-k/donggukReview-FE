import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER_ROOT from '../config/config';

const CategoryDisplay = ({ onCategorySelect, cafeteriaId }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${SERVER_ROOT}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const data = response.data;
        const uniqueCategories = [
          ...new Set(data.map((item) => item.cafeteriaCategory)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        setError(error.message);
      });
  }, [cafeteriaId]);

  const handleCategoryClick = (category) => {
    onCategorySelect(category); // 카테고리를 클릭하면 부모 컴포넌트로 전달
  };

  return (
    <div style={styles.container}>
      {error ? (
        <p style={{ color: 'red' }}>오류 발생: {error}</p>
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <div
            key={category}
            style={styles.category}
            onClick={() => handleCategoryClick(category)} // 클릭 이벤트 추가
          >
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
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '10px',
    padding: '20px',
  },
  category: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer', // 클릭 가능한 스타일
  },
};

export default CategoryDisplay;
