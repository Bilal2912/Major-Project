import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import Loader from "../layout/loader";
import CourseCard from "../layout/CourseCard";
import { clearErrors } from "../../actions/userAction";
import MyCourseCard from "../layout/MyCourseCard";

const MyCourses = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const {
    loading: courseLoading,
    error,
    courses,
  } = useSelector((state) => state.courses);
  const {allCourses} = useSelector((state) => state.allCourses);
  const dispatch = useDispatch();
  const myCourses = user.enrolledIn;
  let arr = [];
//   const fetchCourses = async () => {
//     for (let i = 0; i < myCourses.length; i++) {
//       const ele = myCourses[i];
//     //   console.log(ele);
//     //   console.log(courses.length);
//       for (let j = 0; j < courses.length; j++) {
//         const e = courses[j];
//         // console.log(e);
//         if (e._id.toString() === ele.course.toString()) {
//           arr.push(e);
//           break;
//         }
//       }
        
//     }
//     console.log(arr);
//     console.log(courses);
//   };
  for (let i = 0; i < myCourses.length; i++) {
    const ele = myCourses[i];
    for (let j = 0; j < allCourses.length; j++) {
      const e = allCourses[j];
      if (e._id.toString() === ele.course.toString()) {
        arr.push(e);
        break;
      }
    }
      
  }
  console.log(arr);
  console.log(allCourses.length);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // fetchCourses();
  }, [dispatch,error]);

  return (
    <Fragment>
      {courseLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name.split(" ")[0]}'s Courses`} />
          <h1 className="text-4xl ml-10 mt-5">My Enrolled Courses</h1>
          <div className="flex justify-center items-center mt-5">
            <div className="h-screen w-3/4 bg-slate-100 flex flex-wrap justify-center items-center mr-10">
                {arr && arr.map((course) => <MyCourseCard course={course} />)}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyCourses;
