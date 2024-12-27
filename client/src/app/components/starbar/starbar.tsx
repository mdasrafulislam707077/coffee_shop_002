"use client"
import React from 'react';
import ReactStars from 'react-stars';

const RatingComponent = ({onChange,value}) => {
  const ratingChanged = (newRating) => {
    if (onChange) {
      onChange(newRating)
    }
  };

  return (
    <ReactStars
      count={5}
      value={value}
      onChange={ratingChanged}
      size={30}
      color2={'white'}
      color1={'gray'}
    
      
    />
  );
};

export default RatingComponent;
