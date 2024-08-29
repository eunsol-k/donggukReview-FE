import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detail from './Detail'; // Detail 컴포넌트 가져오기

const CafeteriaDetailWrapper = ({
  isEditingCafeteria,
  onEditCafeteria,
  onLike,
  likedCafeterias,
  isAdmin,
  isDeleteMode,
  onDelete,
  onSubmitReview,
  loggedInUser,
}) => {
  const { id } = useParams(); // URL에서 음식점 ID 가져오기
  const [cafeteriaData, setCafeteriaData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    // 음식점 상세 정보 가져오기
    const fetchCafeteria = async () => {
      try {
        const response = await fetch(`/api/cafeteria/${id}`);
        const data = await response.json();
        if (data.cafeteriaResponseDTO) {
          setCafeteriaData(data.cafeteriaResponseDTO);
          setReviews(data.reviewResponseDTOList || []);
          setMenu(data.menuDTOList || []);
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching cafeteria details:', error);
      }
    };

    fetchCafeteria();
  }, [id]);

  if (!cafeteriaData) {
    return <div>Loading...</div>;
  }

  return (
    <Detail
      cafeteria={cafeteriaData}
      reviews={reviews}
      menu={menu}
      isAdmin={isAdmin}
      isDeleteMode={isDeleteMode}
      onDelete={onDelete}
      onSubmitReview={onSubmitReview}
      user={loggedInUser}
      onLike={onLike}
      likedCafeterias={likedCafeterias}
    />
  );
};

export default CafeteriaDetailWrapper;
