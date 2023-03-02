import React from "react";
import Rating from "@mui/material/Rating";

const DetailReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  const arr = review.name.split(" ");
  let temp = "";
  return (
    <div className="py-3 p-5 w-3/4">
      <div className="flex items-center text-lg">
          <div className="w-12 h-12 bg-black rounded-full flex justify-center items-center font-bold text-xl text-white mt-2">
          {arr.forEach((e) => {
              temp += e.substring(0, 1);
          })}
          {temp}
          </div>
          <p className="font-bold mt-2 ml-2">{review.name}</p>
      </div>
      <div className="text-lg mt-2">
        <Rating {...options} className="relative top-1" />
        <p className="mt-2">{review.comment}</p>
      </div>
    </div>
  );
};

export default DetailReviewCard;
