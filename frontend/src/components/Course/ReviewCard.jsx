import React from "react";
import Rating from "@mui/material/Rating";

const ReviewCard = ({ review, index }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  const arr = review.name.split(" ");
  let temp = "";
  if (index < 3) {
    return (
      <div className="flex py-3 flex-col justify-center items-center border-2 border-slate-500 mx-5 p-10 w-3/4">
        <div className="w-12 h-12 bg-black rounded-full flex justify-center items-center font-bold text-xl text-white mt-2">
          {arr.forEach((e) => {
            temp += e.substring(0, 1);
          })}
          {temp}
        </div>
        <div className="text-lg flex flex-col justify-center items-center">
          <p className="font-bold mt-2">{review.name}</p>
          <Rating {...options} className="relative top-1" />
          <p className="mt-2 text-base">{review.comment}</p>
        </div>
      </div>
    );
  }
};

export default ReviewCard;
