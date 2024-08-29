import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detail from './Detail'; // Detail 컴포넌트 임포트

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
  const { id } = useParams(); // URL에서 ID를 가져옴
  const [cafeteriaData, setCafeteriaData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리 추가
  const [error, setError] = useState(null); // 에러 상태 관리 추가
  const [isReviewing, setIsReviewing] = useState(false); // 리뷰 등록 모달 상태 관리 추가

  useEffect(() => {
    // 음식점 세부 정보를 ID를 기반으로 가져옴
    const fetchCafeteria = async () => {
      try {
        const response = await fetch(`/api/cafeteria/${id}`);
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
        setLoading(false); // 로딩 상태 해제
      } catch (error) {
        console.error('Error fetching cafeteria details:', error);
        setError('Failed to load cafeteria details.'); // 에러 메시지 설정
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchCafeteria();
  }, [id]);

  const handleReviewSubmit = async (newReview) => {
    try {
      const response = await fetch(`/api/cafeteria/reviews/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newReview,
          userId: loggedInUser.userId, // 유저 ID 포함
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const savedReview = await response.json();

      // 서버에서 저장된 최신 리뷰 데이터를 가져와 상태를 업데이트
      setReviews((prevReviews) => [...prevReviews, savedReview]);
      setIsReviewing(false); // 리뷰 등록 후 모달을 닫음
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleReviewButtonClick = () => {
    setIsReviewing(true); // 리뷰 등록 버튼 클릭 시 바로 모달 열기
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 상태 표시
  }

  if (error) {
    return <div>{error}</div>; // 에러 발생 시 에러 메시지 표시
  }

  return (
    <Detail
      cafeteria={cafeteriaData}
      reviews={reviews}
      menu={menu}
      isAdmin={isAdmin}
      isDeleteMode={isDeleteMode}
      onDelete={onDelete}
      onSubmitReview={handleReviewSubmit} // 수정된 리뷰 제출 핸들러 전달
      user={loggedInUser}
      onLike={onLike}
      likedCafeterias={likedCafeterias}
      onReviewButtonClick={handleReviewButtonClick} // 리뷰 버튼 클릭 핸들러 전달
      isReviewing={isReviewing} // 리뷰 모달 상태 전달
    />
  );
};

export default CafeteriaDetailWrapper;
