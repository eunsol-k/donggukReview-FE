import React, { useState, useEffect } from 'react';

const CategoryDisplay = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // JSON 파일에서 데이터 가져오기
    fetch('/restaurants_info.json')
      .then(response => response.json())
      .then(data => {
        // Category 추출 및 중복 제거
        const uniqueCategories = [...new Set(data.map(item => item.Category))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('데이터를 가져오는 중 오류가 발생했습니다:', error));
  }, []);

  return (
    <div style={styles.container}>
      {categories.map((category, index) => (
        <div key={index} style={styles.category}>
          {category}
        </div>
      ))}
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
  }
};

export default CategoryDisplay;
