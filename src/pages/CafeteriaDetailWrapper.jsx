import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detail from './Detail'; // Detail 컴포넌트 임포트
import axios from 'axios';
import SERVER_ROOT from '../config/config';

const CafeteriaDetailWrapper = ({
  isEditingCafeteria,
  onEditCafeteria,
  onLike,
  likedCafeterias,
  isAdmin,
  isDeleteMode,
  onDelete,
  loggedInUser,
}) => {
  const { id: cafeteriaId } = useParams(); // URL에서 ID를 가져와 cafeteriaId로 할당

  // Check the value of cafeteriaId immediately after extracting it
  console.log("Extracted cafeteriaId:", cafeteriaId); // This should show the ID or undefined

  const [cafeteriaData, setCafeteriaData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    console.log("Cafeteria ID from URL inside useEffect:", cafeteriaId); // UseEffect 내부에서 ID 값 확인

    if (!cafeteriaId) {
      console.error("Cafeteria ID is undefined!"); // If the ID is undefined, log an error
      return;
    }

    const fetchCafeteria = async () => {
      try {
        const response = await axios(`${SERVER_ROOT}/cafeteria/${cafeteriaId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.cafeteriaResponseDTO) {
          setCafeteriaData(data.cafeteriaResponseDTO);
          setReviews(data.reviewResponseDTOList || []);
          setMenu(data.menuDTOList || []);
        } else {
          console.error('Invalid data structure:', data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cafeteria details:', error);
        setError('Failed to load cafeteria details.');
        setLoading(false);
      }
    };

    fetchCafeteria();
  }, [cafeteriaId]);

  const handleReviewSubmit = async (newReview) => {
    console.log("Submitting review for cafeteria ID:", cafeteriaId);

    if (!cafeteriaId) {
      console.error("Cafeteria ID is undefined! Cannot submit review.");
      alert('음식점 ID가 설정되지 않았습니다. 다시 시도해 주세요.');
      return;
    }

    try {
      const response = await axios(`${SERVER_ROOT}/user/reviews/${cafeteriaId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          ...newReview,
          cafeteriaId, // ID 값을 명시적으로 추가
          userId: loggedInUser.userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const savedReview = await response.json();

      setReviews((prevReviews) => [...prevReviews, savedReview]);
      setIsReviewing(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleReviewButtonClick = () => {
    setIsReviewing(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Detail
      cafeteria={cafeteriaData}
      reviews={reviews}
      menu={menu}
      isAdmin={isAdmin}
      isDeleteMode={isDeleteMode}
      onDelete={onDelete}
      onSubmitReview={handleReviewSubmit}
      user={loggedInUser}
      onLike={onLike}
      likedCafeterias={likedCafeterias}
      onReviewButtonClick={handleReviewButtonClick}
      isReviewing={isReviewing}
    />
  );
};

export default CafeteriaDetailWrapper;
