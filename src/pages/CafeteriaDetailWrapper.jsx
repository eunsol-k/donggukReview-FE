import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detail from './Detail'; // Import the Detail component

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
  const { id } = useParams(); // Get the ID from the URL
  const [cafeteriaData, setCafeteriaData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    // Fetch cafeteria details based on the ID
    const fetchCafeteria = async () => {
      try {
        const response = await fetch(`/api/cafeteria/${id}`);
        const data = await response.json();
        if (data.cafeteriaResponseDTO) {
          setCafeteriaData(data.cafeteriaResponseDTO);
          setReviews(data.reviewResponseDTOList.length > 0 ? data.reviewResponseDTOList : [{
            id: 1,
            content: "Great place to eat!",
            userId: "user123",
            date: "2023-05-01"
          }]);
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
