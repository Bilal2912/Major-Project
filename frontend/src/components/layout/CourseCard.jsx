import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const CourseCard = ({ course }) => {
  const options = {
    value: course.courseRating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link to={`/course/${course._id}`} className="mx-3 my-3">
      <img
        src={course.courseImages.length>0 ? course.courseImages[0].url : '../images/sample_2.jpg'}
        alt={course.courseName}
        className="w-80 h-48 transition ease-in-out hover:-translate-y-3"
      />
      <p className="text-xl font-semibold mt-2">{course.courseName}</p>
      <span className="font-semibold">
        By <span className="text-blue-500">{course.author}</span>
      </span>
      <div className="flex items-center text-xl mt-2">
        <span>{course.courseRating}</span>
        <Rating {...options} className="relative left-1" />
      </div>
      <div className="flex items-center text-xl mt-2">
        <span className="">({course.numOfReviews} Reviews)</span>
        <span className="relative left-2">
          ({course.enrolledCount} Students)
        </span>
      </div>
      {/* <span className="text-xl relative top-2 font-bold text-blue-500">₹{course.coursePrice}</span> */}
    </Link>
  );
};

export default CourseCard;
