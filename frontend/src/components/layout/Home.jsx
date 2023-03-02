import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import CourseCard from "./CourseCard";
import MetaData from "./MetaData";
import { getCourse, clearErrors } from "../../actions/courseAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, courses } = useSelector((state) => state.courses);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getCourse());
  }, [dispatch, error, alert]);

  const img = [
    "https://res.cloudinary.com/dmwd6tv66/image/upload/v1662220300/Home_Images/a-book-5178205_1920_rwedy9.jpg",
    "https://res.cloudinary.com/dmwd6tv66/image/upload/v1662220431/Home_Images/scott-graham-5fNmWej4tAA-unsplash_xwp46u.jpg",
    "https://res.cloudinary.com/dmwd6tv66/image/upload/v1662223280/Home_Images/desola-lanre-ologun-IgUR1iX0mqM-unsplash_v1usgf.jpg",
  ];

  // const course = {
  //   name:'VLSI Design',
  //   images:[{url:'https://res.cloudinary.com/dmwd6tv66/image/upload/v1662220431/Home_Images/scott-graham-5fNmWej4tAA-unsplash_xwp46u.jpg'}],
  //   price:'₹3000',
  //   _id:'test_course'
  // }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Yashika | Home" />
          <div className="px-5 py-5 w-full h-screen">
            <Carousel className="w-full h-full -z-10">
              {img &&
                img.map((item, i) => (
                  <img
                    className="CarouselImage opacity-40"
                    key={i}
                    src={item}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
            <div className="flex justify-center items-center my-5">
              <div className="h-0.5 w-1/3 bg-slate-400"></div>
              <span className="m-5 text-3xl">Top Rated Courses</span>
              <div className="h-0.5 w-1/3 bg-slate-400"></div>
            </div>
            <div className="flex justify-center items-center flex-wrap pb-5">
              {courses &&
                courses.map((course) => 
                  {if(course.courseRating>=3){
                    return <CourseCard course={course} />
                  }}
                )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
