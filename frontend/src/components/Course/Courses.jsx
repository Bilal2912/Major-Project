import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import CourseCard from "../layout/CourseCard";
import { getCourse, clearErrors } from "../../actions/courseAction";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";

import "./Courses.css";

const categories = ["ETRX", "EXTC", "COMPS", "IT", "MCA"];

const Courses = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    courses,
    courseCount,
    resultPerPage,
    filteredCoursesCount,
  } = useSelector((state) => state.courses);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 5000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredCoursesCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getCourse(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, alert, keyword, currentPage, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Yashika | Courses" />
          <div className="flex justify-center items-center">
            <h2 className="m-5 text-4xl font-bold">Browse Courses</h2>
          </div>
          <div className="flex justify-end">
            <div className="filterBox w-1/4 px-10">
              {/* Price (₹)
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                step={1000}
                marks
                min={0}
                max={5000}
              /> */}
              <select
                name=""
                id="mySelect"
                className="w-full relative right-1 px-2 py-2 outline-none border-2 border-slate-400"
                value={category}
                onChange={(e) => {setCategory(e.target.value); console.log(document.getElementById("mySelect").value)}}
              >
                <option value="" disabled selected>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
              {/* <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul> */}
              <fieldset className="mt-2">
                Ratings Above
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  marks
                  step={0.5}
                  min={0}
                  max={5}
                />
              </fieldset>
              <button className="bg-blue-500 text-white font-semibold px-3 py-3 rounded-lg mt-1 hover:bg-blue-700" onClick={() => {setCurrentPage(1); setPrice([0,5000]); setCategory(""); setRatings(0)}}>Remove All Filters</button>
            </div>

            <div className="w-3/4 bg-slate-100 flex flex-wrap justify-center items-center mr-5">
              {courses &&
                courses.map((course) => <CourseCard course={course} />)}
            </div>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={courseCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Courses;
