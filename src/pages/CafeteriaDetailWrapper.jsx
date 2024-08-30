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

  const [cafeteriaData, setCafeteriaData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cafeteriaId) {
      console.error("Cafeteria ID is undefined!");
      return;
    }

    const fetchCafeteria = async () => {
      axios(`${SERVER_ROOT}/cafeteria/${cafeteriaId}`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = response.data;
          if (data.cafeteriaResponseDTO) {
            setCafeteriaData(data.cafeteriaResponseDTO);
            setReviews(data.reviewResponseDTOList || []);
            setMenu(data.menuDTOList || []);
          } else {
            console.error('Invalid data structure:', data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching cafeteria details:', error);
          setError('Failed to load cafeteria details.');
          setLoading(false);
        });
    };

    fetchCafeteria();
  }, [cafeteriaId]);

  const handleReviewSubmit = async (newReview) => {
    if (!cafeteriaId) {
      alert('음식점 ID가 설정되지 않았습니다. 다시 시도해 주세요.');
      return;
    }

    // 유효성 검사 추가
    if (!newReview.reviewContents || newReview.reviewRatings === "0") {
      alert('리뷰 내용과 평점을 모두 입력해주세요.');
      return;
    }

    axios({
      method: 'POST',
      url: `${SERVER_ROOT}/user/reviews/${cafeteriaId}`,
      data: {
        ...newReview,
        cafeteriaId, // ID 값을 명시적으로 추가
        userId: loggedInUser.userId,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error('Failed to submit review');
        }

        const savedReview = response.data;
        setReviews((prevReviews) => [...prevReviews, savedReview]);
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
        alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
      });
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
      onLike={onLike}
      likedCafeterias={likedCafeterias}
      user={loggedInUser}
      onSubmitReview={handleReviewSubmit} // onSubmitReview 함수 전달
    />
  );
};

export default CafeteriaDetailWrapper;
