import React, { useState } from 'react';
import './RestaurantEditForm.css';

const CATEGORY_OPTIONS = [
  '뷔페',
  '한식',
  '카페,디저트',
  '스테이크,립',
  '일식',
  '이탈리아음식',
  '패밀리레스토랑',
  '술집',
  '양식',
  '프랑스음식',
  '중식',
  '분식',
  '육류,고기요리',
  '태국음식',
  '아시아음식',
  '도시락,컵밥',
  '해물,생선요리',
  '햄버거',
  '베트남음식',
];

function RestaurantEditForm({ restaurant, onSave }) {
  const [updatedRestaurant, setUpdatedRestaurant] = useState(() => {
    // category가 배열로 올 경우 첫 번째 요소를 선택
    const initialCategory = Array.isArray(restaurant?.category)
      ? restaurant.category[0]
      : restaurant?.category || '';

    return {
      name: restaurant?.name || '',
      phone: restaurant?.phone || '',
      address: restaurant?.address || '',
      category: initialCategory,
      menu: restaurant?.menu || [],
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRestaurant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMenuChange = (index, field, value) => {
    const updatedMenu = [...updatedRestaurant.menu];
    updatedMenu[index] = {
      ...updatedMenu[index],
      [field]: value,
    };
    setUpdatedRestaurant((prev) => ({
      ...prev,
      menu: updatedMenu,
    }));
  };

  const handleAddMenu = () => {
    setUpdatedRestaurant((prev) => ({
      ...prev,
      menu: [...prev.menu, { name: '', price: '' }],
    }));
  };

  const handleDeleteMenu = (index) => {
    const updatedMenu = updatedRestaurant.menu.filter((_, i) => i !== index);
    setUpdatedRestaurant((prev) => ({
      ...prev,
      menu: updatedMenu,
    }));
  };

  const handleSave = () => {
    if (!updatedRestaurant.name.trim()) {
      alert('음식점 이름은 필수 항목입니다.');
      return;
    }

    onSave(updatedRestaurant);
  };

  return (
    <div className="restaurant-edit-form">
      <h2>음식점 정보 수정</h2>
      <div>
        <label>이름:</label>
        <input
          type="text"
          name="name"
          value={updatedRestaurant.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>전화번호:</label>
        <input
          type="text"
          name="phone"
          value={updatedRestaurant.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>주소:</label>
        <input
          type="text"
          name="address"
          value={updatedRestaurant.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>카테고리:</label>
        <select
          name="category"
          value={updatedRestaurant.category || ''}  // 카테고리를 단일 문자열로 설정
          onChange={handleChange}
        >
          <option value="">카테고리를 선택하세요</option>
          {CATEGORY_OPTIONS.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>메뉴:</label>
        {updatedRestaurant.menu?.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              name={`menu-name-${index}`}
              placeholder="메뉴 이름"
              value={item.name}
              onChange={(e) => handleMenuChange(index, 'name', e.target.value)}
            />
            <input
              type="number"
              name={`menu-price-${index}`}
              placeholder="가격"
              value={item.price}
              onChange={(e) => handleMenuChange(index, 'price', e.target.value)}
            />
            <button
              type="button"
              onClick={() => handleDeleteMenu(index)}
              style={{ marginLeft: '10px' }}
            >
              삭제
            </button>
          </div>
        ))}
        <button onClick={handleAddMenu}>메뉴 추가</button>
      </div>
      <button onClick={handleSave}>저장</button>
    </div>
  );
}

export default RestaurantEditForm;
