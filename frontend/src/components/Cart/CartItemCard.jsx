import React from "react";
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";

const CartItemCard = ({ item }) => {
  const options = {
    value: item.rating,
    readOnly: true,
    precision: 0.5,
    size:'small'
  };
  return (
    <Link to={`/course/${item.course}`} className="flex w-1/2">
      <img
        src={item.image}
        alt={item.name}
        className="w-48 h-28"
      />
      <div className="pl-3 w-1/2 ">
        <p className="text-xl font-bold">{item.name}</p>
        <p className="text-md">By {item.author}</p>
        <div className="flex items-center text-md mt-0.5">
            <span>{item.rating}</span>
            <Rating {...options} className="relative left-1" />  
            <span className="text-md relative left-2">({item.reviews} Reviews)</span>   
        </div>
        {/* <span className="text-xl font-bold text-blue-500">
            ₹{item.price}
        </span> */}
      </div>
    </Link>
  );
};

export default CartItemCard;
