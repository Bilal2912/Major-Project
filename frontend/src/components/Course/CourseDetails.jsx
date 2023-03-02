import React, { Fragment, useEffect, useState } from "react";
import ReactPlayer from 'react-player'
import Rating from "@mui/material/Rating";
import {
  clearErrors,
  enrollCourse,
  getCourseDetails,
  newReview,
} from "../../actions/courseAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { Link } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { addItemsToCart } from "../../actions/cartAction";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  ENROLL_COURSE_RESET,
  NEW_REVIEW_RESET,
} from "../../constants/courseConstants";
import VideoPlayer from "./VideoPlayer";
import { filledInputClasses } from "@mui/material";
import { enrolledCourse } from "../../actions/userAction";
// import { getUserDetails } from "../../actions/userAction";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { user } = useSelector((state) => state.user);

  const { course, loading, error } = useSelector(
    (state) => state.courseDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { isEnrolled, error: enrollError } = useSelector(
    (state) => state.enrollCourse
  );

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [flag, setFlag] = useState(false);

  //   const {instructor, error:instructorError} = useSelector((state) => state.userDetails);

  const options = {
    value: course.courseRating,
    readOnly: true,
    precision: 0.5,
    size: "large",
  };

  const extend = () => {
    Array.from(document.getElementsByClassName("dropdown")).forEach((e, i) => {
      e.addEventListener("click", () => {
        if (
          document.getElementById(`ext_drop_${i}`).classList.contains("hidden")
        ) {
          document.getElementById(`ext_drop_${i}`).classList.remove("hidden");
          e.classList.add("rotate-180");
        } else {
          document.getElementById(`ext_drop_${i}`).classList.add("hidden");
          e.classList.remove("rotate-180");
        }
      });
    });
  };

  // const addToCartHandler = () => {
  //   dispatch(addItemsToCart(id));
  //   alert.success("Item Added To Cart");
  // };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("courseId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  const enrollCourseHandler = () => {
    dispatch(enrollCourse(id));
    dispatch(enrolledCourse(id));
  };

  // function enrollCheck() {
  //   // let flag = false;
  //   for (let index = 0; index < course.enrolled.length; index++) {
  //     let e = course.enrolled[index];
  //     if (e.user.toString() === user._id.toString()) {
  //        setFlag(true);
  //       break;
  //     }
  //   }
  // }

  // let flag = false;
  // for (let index = 0; index < course.enrolled.length; index++) {
  //   let e = course.enrolled[index];
  //   if (e.user.toString() === user._id.toString()) {
  //     flag = true;
  //     break;
  //   }
  // }
  // console.log(flag);

  const enrollCheck = async () => {
    // course.enrolled.every((e) => {
    //   console.log('Hi');
    //   if(e.user.toString()===user._id.toString()){
    //     flag = true;
    //     return false;
    //   }
    //   return true;
    // })
    for (let index = 0; index < course.enrolled.length; index++) {
      const e = course.enrolled[index];
      if (e.user.toString() === user._id.toString()) {
        setFlag(true);
        break;
      }
    }
    console.log(flag);
    // alert.success(flag);
  };

  useEffect(() => {
    // console.log(course.enrolled.length);
    // console.log(user._id, course.enrolled[0].user);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (enrollError) {
      alert.error(enrollError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    if (isEnrolled) {
      alert.success("Enrolled Successfully");
      dispatch({ type: ENROLL_COURSE_RESET });
    }

    // setTimeout(enrollCheck, 100);
    dispatch(getCourseDetails(id));
    // enrollCheck();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // dispatch(getUserDetails(course.user));
  }, [
    dispatch,
    error,
    alert,
    id,
    reviewError,
    success,
    isEnrolled,
    enrollError,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Course | ${course.courseName}`} />
          <div className="flex bg-slate-100">
            <div className="w-1/3">
              {/* <img src={course.courseImages[0].url} alt="" className="h-72 mt-5 ml-5"/> */}
              <div className="h-72 mt-5 ml-5 mb-5 bg-red-500"></div>
            </div>
            <div className="mt-5 w-2/3 ml-5">
              <div>
                <span className="text-4xl font-bold">{course.courseName} </span>
                <span className="text-4xl">
                  - By{" "}
                  <span className="text-blue-500 font-semibold">
                    {course.author}
                  </span>
                </span>
              </div>
              {/* <p className="text-xl mt-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Maiores tempora consectetur neque iste enim, beatae veniam
                eligendi officiis possimus excepturi facere! Suscipit, nobis
                impedit libero tenetur odio iure exercitationem. Animi. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Pariatur quis
                quisquam necessitatibus accusamus facere natus voluptatibus
                harum hic dolorum ut, ducimus fugit excepturi illo. Molestiae
                officia non aliquid ex quaerat. Molestiae officia non aliquid ex
                quaerat.
              </p> */}
              <div className="flex items-center text-2xl mt-4">
                <span>Rating: {course.courseRating}</span>
                <Rating {...options} />
              </div>
              <div className="text-2xl mt-4">
                <span>Reviews: {course.numOfReviews}</span>
              </div>
              <div className="text-2xl mt-4">
                <span>Enrollments: {course.enrolledCount}</span>
              </div>
              <div className="mt-5 text-2xl">
                <button
                  className="py-4 px-6 bg-blue-500 font-semibold text-white border-slate-100 hover:border-blue-500 hover:bg-white hover:text-blue-500 transition ease-in-out duration-500"
                  onClick={enrollCourseHandler}
                >
                  Enroll Now
                </button>
                <button className="py-3 px-6 border-4 border-blue-500 ml-5 font-semibold text-blue-500 transition ease-in-out duration-500 hover:bg-blue-500 hover:text-white">
                  Download Syllabus
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center my-10">
            <div className="w-1/3 h-0.5 bg-slate-500"></div>
            <span className="font-semibold text-4xl mx-2">
              Course Description
            </span>
            <div className="w-1/3 h-0.5 bg-slate-500"></div>
          </div>

          <div className="mx-24 text-xl">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
              aperiam illo dolore quisquam repudiandae tenetur perferendis
              voluptatibus. Modi praesentium molestiae optio necessitatibus
              perspiciatis iure rem officia. Corrupti omnis praesentium, sit
              veritatis architecto, quam suscipit quo officiis labore,
              asperiores inventore aliquam harum! Perspiciatis voluptatibus
              illum magni quod at ipsum quidem qui? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Qui ipsam iusto dolorem aspernatur.
              Omnis a totam voluptatem, minima distinctio quibusdam. Maiores,
              officia nulla at dolorem ipsa voluptatem cumque nihil doloremque
              autem laudantium facere voluptate modi molestias error,
              consequatur beatae, accusantium officiis aperiam ratione ipsum
              inventore nam. Nobis libero error vel! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Sed aliquam voluptatibus nam facilis
              magnam deleniti eos odio voluptatem magni reprehenderit voluptates
              corrupti, rem, nisi distinctio repellat adipisci, perspiciatis
              quas hic suscipit reiciendis? Nostrum quod est, cumque ducimus
              quibusdam minima? Quia eius ut natus, sapiente perferendis
              adipisci eveniet nostrum esse dolor.
            </p>
          </div>

          <div className="flex justify-center items-center my-10">
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
            <span className="font-semibold text-4xl mx-2">Professor</span>
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
          </div>

          <div className="flex items-center justify-center bg-slate-100 divide-x divide-black">
            <div className="w-1/4 flex justify-center items-center flex-col mr-10">
              <div
                className="w-40 h-40 bg-red-500 rounded-full"
                style={{
                  backgroundImage:
                    "url(" + "https://unsplash.com/photos/WMD64tMfc4k" + ")",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <span className="text-2xl font-semibold mt-3">
                {course.author}
              </span>
            </div>
            <div className="w-2/3 pl-10 my-5 text-xl">
              <p>
                <li className="">
                  Prof. Kiran Talele is an Associate Professor in Electronics
                  Engineering Department of Sardar Patel Institute of
                  Technology, Mumbai with 33+ years experience in Academics.
                </li>
                <li className="mt-2">
                  He is Dean of Students, Alumni and External Relations at
                  Sardar Patel Institute of Technology, Andheri Mumbai. He is
                  also Chief Finance Officier &amp; Head of Academic Relations,
                  Sardar Patel Technology Business Incubator, Andheri, Mumbai.{" "}
                </li>
                <li className="mt-2">
                  His area of research is Digital Signal &amp; Image Processing,
                  Computer Vision, Machine Learning and Multimedia System
                  Design. He has published 80+ research papers at various
                  national &amp; international refereed conferences and
                  journals.
                </li>
                <li className="mt-2">
                  He has filed &amp; published 20 patents at Indian Patent
                  Office. One patent is granted in 2021. He is a Treasurer of
                  IEEE Bombay Section and Mentor for Startup Incubation &amp;
                  Intellectual Asset Creation. He is a recipient of P.R. Bapat
                  IEEE Bombay Section Outstanding Volunteer Award 2019.
                </li>
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center my-10">
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
            <span className="font-semibold text-4xl mx-2">Syllabus</span>
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
          </div>

          <div className="bg-slate-100 flex justify-center flex-col items-center">
            <div className="mx-24 bg-blue-300 px-10 py-3 w-5/6 flex flex-col justify-center mt-5 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="">
                  <span className="text-3xl font-semibold">Module 1</span>
                  <div className="flex mt-2 items-center">
                    <div className="flex items-center">
                      <PlayCircleOutlineIcon />
                      <span className="ml-1">3 Videos</span>
                    </div>
                    <div className="flex items-center">
                      <AttachmentIcon className="ml-3" />
                      <span className="ml-1">1 Assignment</span>
                    </div>
                  </div>
                </div>
                <KeyboardArrowDownIcon
                  fontSize="large"
                  className="hover:cursor-pointer dropdown"
                  onClick={extend}
                />
              </div>
              <div className="hidden mt-5" id="ext_drop_0">
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 1</span>
                  <span className="text-xl">07:33</span>
                </div>
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 2</span>
                  <span className="text-xl">10:09</span>
                </div>
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 3</span>
                  <span className="text-xl">02:57</span>
                </div>
                <div className="border-t-2 border-black flex items-center py-3">
                  <AttachmentIcon className="" />
                  <span className="text-xl ml-1">Assignment</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 flex justify-center flex-col items-center">
            <div className="mx-24 bg-blue-300 px-10 py-3 w-5/6 flex flex-col justify-center mt-5 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="">
                  <span className="text-3xl font-semibold">Module 2</span>
                  <div className="flex mt-2 items-center">
                    <div className="flex items-center">
                      <PlayCircleOutlineIcon />
                      <span className="ml-1">3 Videos</span>
                    </div>
                    <div className="flex items-center">
                      <AttachmentIcon className="ml-3" />
                      <span className="ml-1">1 Assignment</span>
                    </div>
                  </div>
                </div>
                <KeyboardArrowDownIcon
                  fontSize="large"
                  className="hover:cursor-pointer dropdown"
                  onClick={extend}
                />
              </div>
              <div className="hidden mt-5" id="ext_drop_1">
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 1</span>
                  <span className="text-xl">07:33</span>
                </div>
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 2</span>
                  <span className="text-xl">10:09</span>
                </div>
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 3</span>
                  <span className="text-xl">02:57</span>
                </div>
                <div className="border-t-2 border-black flex items-center py-3">
                  <AttachmentIcon className="" />
                  <span className="text-xl ml-1">Assignment</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 flex justify-center flex-col items-center">
            <div className="mx-24 bg-blue-300 px-10 py-3 w-5/6 flex flex-col justify-center my-5 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="">
                  <span className="text-3xl font-semibold">Module 3</span>
                  <div className="flex mt-2 items-center">
                    <div className="flex items-center">
                      <PlayCircleOutlineIcon />
                      <span className="ml-1">3 Videos</span>
                    </div>
                    <div className="flex items-center">
                      <AttachmentIcon className="ml-3" />
                      <span className="ml-1">1 Assignment</span>
                    </div>
                  </div>
                </div>
                <KeyboardArrowDownIcon
                  fontSize="large"
                  className="hover:cursor-pointer dropdown"
                  onClick={extend}
                />
              </div>
              <div className="hidden mt-5" id="ext_drop_2">
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 1</span>
                  <span className="text-xl">07:33</span>
                </div>
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 2</span>
                  <span className="text-xl">10:09</span>
                </div>
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 3</span>
                  <span className="text-xl">02:57</span>
                </div>
                <div className="border-t-2 border-black flex items-center py-3">
                  <AttachmentIcon className="" />
                  <span className="text-xl ml-1">Assignment</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center my-10">
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
            <span className="font-semibold text-4xl mx-2">Reviews</span>
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
          </div>

          <div className="flex justify-center items-center bg-slate-100 h-96">
            {course.reviews && course.reviews[0] ? (
              <div className="flex justify-center mx-5 overflow-auto h-80 w-screen">
                {course.reviews &&
                  course.reviews.map((review, index) => (
                    <ReviewCard review={review} index={index} />
                  ))}
              </div>
            ) : (
              <span className="text-2xl font-semibold">No Reviews Yet</span>
            )}
          </div>
          {course.reviews && course.reviews[0] ? (
            <div className="bg-slate-100 flex justify-end mr-10 relative bottom-5">
              <Link
                to=""
                className="hover:text-blue-500 hover:cursor-pointer text-lg"
              >
                See All Reviews
              </Link>
            </div>
          ) : (
            <span></span>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default CourseDetails;
