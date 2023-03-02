import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const UploadCourseCard = ({ course }) => {
  const options = {
    value: course.courseRating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link
      to={`/course/update/${course._id}`}
      className="mx-5 flex items-start py-5"
    >
      <img
        src={course.courseImages.length>0 ? course.courseImages[0].url : '../images/sample_2.jpg'}
        alt={course.courseName}
        className="w-64 h-44 transition ease-in-out hover:-translate-y-3"
      />
      <div className="flex justify-between flex-col h-40 w-1/5">
        <div className="ml-5">
          <p className="text-xl font-semibold mt-2">{course.courseName}</p>
        </div>
        <div className="ml-5">
          <span className="font-semibold text-xl">
            By <span className="text-blue-500">{course.author}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col h-40 justify-center items-center text-xl mt-2 ml-24">
        <span className="text-5xl">{course.numOfReviews}</span>
        <span className="mt-3">Reviews</span>
      </div>
      <div className="flex flex-col h-40 justify-center items-center text-xl mt-2 ml-32">
        <span className="text-5xl">{course.enrolledCount}</span>
        <span className="mt-3">Enrollments</span>
      </div>
      <div className="flex items-center text-xl mt-2 flex-col ml-32 h-40 justify-center">
        <div className="flex justify-center items-center text-5xl">
          <span>{course.courseRating}</span>
          <Rating {...options} className="relative left-2 top-1" size="large" />
        </div>
        <span className="mt-3">Course Rating</span>
      </div>
      {/* <span className="text-xl relative top-2 font-bold text-blue-500">₹{course.coursePrice}</span> */}
    </Link>
  );
};

export default UploadCourseCard;
