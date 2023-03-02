import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import UploadCourseCard from "./UploadCourseCard";

const UploadCourse = () => {
  const { allCourses } = useSelector((state) => state.allCourses);
  const { user } = useSelector((state) => state.user);
  // let arr = [];
  // useEffect(() => {
  //   for (let i = 0; i < user.courses.length; i++) {
  //     const ele = user.courses[i];
  //     for (let j = 0; j < allCourses.length; j++) {
  //       const e = allCourses[j];
  //       if (e._id.toString() === ele.course.toString()) {
  //         arr.push(e);
  //         break;
  //       }
  //     }
  //   }
  //   console.log(arr);
  //   console.log(allCourses.length);
  // }, [arr,user,allCourses]);

  let arr = [];
  for (let i = 0; i < user.courses.length; i++) {
    const ele = user.courses[i];
    // console.log(ele.course);
    for (let j = 0; j < allCourses.length; j++) {
      const e = allCourses[j];
      // console.log(e._id)
      if (e._id.toString() === ele.course.toString()) {
        arr.push(e);
        break;
      }
    }
  }
  // console.log(arr);
  // console.log(allCourses.length);

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <span className="text-4xl mt-5 ml-20">My Uploaded Courses</span>
        <Link
          to="/me/course/new"
          className="px-5 py-3 bg-blue-500 text-white mt-5 mr-20 text-xl font-semibold hover:bg-blue-700 rounded-md"
        >
          New Course
        </Link>
      </div>
      <div className="ml-20 mt-3 divide-y divide-black mr-20">
        {arr && arr.map((course) => <UploadCourseCard course={course} />)}
        {/* {<UploadCourseCard course={courses[0]} />}
        {<UploadCourseCard course={courses[1]} />} */}
      </div>
    </Fragment>
  );
};

export default UploadCourse;
