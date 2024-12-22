"use client"
import React from 'react';
import ReactStars from 'react-stars';

const RatingComponent = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={30}
      color2={'white'}
      color1={'gray'}
    />
  );
};

export default RatingComponent;
