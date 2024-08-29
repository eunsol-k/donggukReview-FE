import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detail from './Detail'; // Import the Detail component

const CafeteriaDetailWrapper = ({
  isEditingCafeteria,
  onEditCafeteria,
  onLike,
  likedCafeterias,
  reviews,
  isAdmin,
  isDeleteMode,
  onDelete,
  onSubmitReview,
  onDeleteReviews,
  loggedInUser,
}) => {
  const { id } = useParams(); // Get the ID from the URL
  const [cafeteria, setCafeteria] = useState(null);

  useEffect(() => {
    // Fetch cafeteria details based on the ID
    const fetchCafeteria = async () => {
      try {
        const response = await fetch(`/api/cafeteria/${id}`);
        const data = await response.json();
        if (data.cafeteriaResponseDTO) {
          setCafeteria(data.cafeteriaResponseDTO);
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching cafeteria details:', error);
      }
    };

    fetchCafeteria();
  }, [id]);

  if (!cafeteria) {
    return <div>Loading...</div>;
  }

  return (
    <Detail
      cafeteria={cafeteria}
      reviews={reviews}
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
