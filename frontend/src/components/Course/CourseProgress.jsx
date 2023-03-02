import React, { Fragment, useEffect, useState } from "react";
import {
  clearErrors,
  enrollCourse,
  getCourseDetails,
  newReview,
} from "../../actions/courseAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader";
import Rating from "@mui/material/Rating";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
import { enrolledCourse } from "../../actions/userAction";
import AllReviews from "./AllReviews";
import VideoPlayer from "./VideoPlayer";
import ModuleList from "./Modules/ModuleList";
const CourseProgress = () => {
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

  // const { isEnrolled, error: enrollError } = useSelector(
  //   (state) => state.enrollCourse
  // );
    let courses = [
      { 
        Module : 'Module 1',
        Videos : {
          noOfVideos : 2,
          videoLinks : [
            {
              title : 'Title 1',
              link : 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
            },
            {
              title : 'Title 2',
              link : 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
            },
          ],
        },
        quizdata :  {
          numberofquests : 5,
          timelimit : 600000,
          question : [
          {
            questionText: 'What is the capital of France?',
            answerOptions: [
              { answerText: 'New York', isCorrect: false },
              { answerText: 'London', isCorrect: false },
              { answerText: 'Paris', isCorrect: true },
              { answerText: 'Dublin', isCorrect: false },
            ],
            timetaken : 0 ,
          },
          {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
              { answerText: 'Jeff Bezos', isCorrect: false },
              { answerText: 'Elon Musk', isCorrect: true },
              { answerText: 'Bill Gates', isCorrect: false },
              { answerText: 'Tony Stark', isCorrect: false },
            ],
            timetaken : 0 ,
          },
          {
            questionText: 'The iPhone was created by which company?',
            answerOptions: [
              { answerText: 'Apple', isCorrect: true },
              { answerText: 'Intel', isCorrect: false },
              { answerText: 'Amazon', isCorrect: false },
              { answerText: 'Microsoft', isCorrect: false },
            ],
            timetaken : 0 ,
          },
          {
            questionText: 'How many Harry Potter books are there 1?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
            timetaken : 0 ,
          },
          {
            questionText: 'How many Harry Potter books are there 2?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
            timetaken : 0 ,
          },
          {
            questionText: 'How many Harry Potter books are there 3?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
            timetaken : 0 ,
          },
          {
            questionText: 'How many Harry Potter books are there 4?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
          },
          {
            questionText: 'How many Harry Potter books are there 5?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
          },
          {
            questionText: 'How many Harry Potter books are there 6?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
          },
        ],
      },
      },
      { 
        Module : 'Module 2',
        Videos : {
          noOfVideos : 4,
          videoLinks : [
            {
              title : 'Title 1',
              link : 'Link 1',
            },
            {
              title : 'Title 2',
              link : 'Link 2',
            },
            {
              title : 'Title 3',
              link : 'Link 3',
            },
            {
              title : 'Title 4',
              link : 'Link 4',
            },
          ],
        },
        quizdata :  {
          numberofquests : 5,
          timelimit : 600000,
          question : [
          {
            questionText: 'What is the capital of France?',
            answerOptions: [
              { answerText: 'New York', isCorrect: false },
              { answerText: 'London', isCorrect: false },
              { answerText: 'Paris', isCorrect: true },
              { answerText: 'Dublin', isCorrect: false },
            ],
            timetaken : 0 ,
          },
          {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
              { answerText: 'Jeff Bezos', isCorrect: false },
              { answerText: 'Elon Musk', isCorrect: true },
              { answerText: 'Bill Gates', isCorrect: false },
              { answerText: 'Tony Stark', isCorrect: false },
            ],
            timetaken : 0 ,
          },
          {
            questionText: 'The iPhone was created by which company?',
            answerOptions: [
              { answerText: 'Apple', isCorrect: true },
              { answerText: 'Intel', isCorrect: false },
              { answerText: 'Amazon', isCorrect: false },
              { answerText: 'Microsoft', isCorrect: false },
            ],
            timetaken : 0 ,
          },
          {
            questionText: 'How many Harry Potter books are there 1?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
            timetaken : 0 ,
          },
          {
            questionText: 'How many Harry Potter books are there 2?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
            timetaken : 0 ,
          },
          {
            questionText: 'How many Harry Potter books are there 3?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
            timetaken : 0 ,
          },
          {
            questionText: 'How many Harry Potter books are there 4?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
          },
          {
            questionText: 'How many Harry Potter books are there 5?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
          },
          {
            questionText: 'How many Harry Potter books are there 6?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
          },
        ],
      },
    },
    ]
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [flag, setFlag] = useState(false);

  //   const {instructor, error:instructorError} = useSelector((state) => state.userDetails);

//   const options = {
//     value: course.courseRating,
//     readOnly: true,
//     precision: 0.5,
//     size: "large",
//   };

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
    //   if (enrollError) {
    //     alert.error(enrollError);
    //     dispatch(clearErrors());
    //   }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    // setTimeout(enrollCheck, 100);
    dispatch(getCourseDetails(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // dispatch(getUserDetails(course.user));
  }, [dispatch, error, alert, id, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <MetaData title={`${user.name.split(" ")[0]}'s Courses | ${course.courseName}`} />
          <div className="mt-5">
            <span className="text-4xl ml-10">
              {course.courseName} - By{" "}
              <span className="text-blue-500 font-semibold">
                {course.author}
              </span>
            </span>
          </div>
          <div className="flex justify-center items-center mx-20 mt-10 bg-slate-100">
            <div className="bg-blue-500 h-10 w-full flex items-center">
              <span className="ml-5 text-white font-semibold">My Progress</span>
            </div>
            <div>
              <Link
                to=""
                className="hover:text-blue-500 hover:cursor-pointer mx-5"
              >
                Assignments
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center my-10">
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
            <span className="font-semibold text-4xl mx-2">Syllabus</span>
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
          </div>

          <ModuleList courses = { courses}></ModuleList>

          <div className="flex justify-center items-center my-10">
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
            <span className="font-semibold text-4xl mx-2">Reviews</span>
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
          </div>

          <div className="flex items-center justify-evenly mb-10">
            <button
              className="w-5/12 hover:bg-blue-700 py-3 text-center bg-blue-500 text-white rounded-md text-xl font-semibold"
              onClick={submitReviewToggle}
            >
              Submit Review
            </button>
            <Link to="/allreviews" className="w-5/12 hover:bg-blue-700 py-3 text-center bg-blue-500 text-white rounded-md text-xl font-semibold">
              See All Reviews
            </Link>
          </div>

          <Dialog open={open} onClose={submitReviewToggle}>
            <DialogTitle>Write Review</DialogTitle>
            <DialogContent className="flex flex-col">
              <div className="flex items-center justify-between">
                <Rating
                  className=""
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />
                <Button onClick={() => {setRating(0); setComment("")}} color="secondary">
                  Reset
                </Button>
              </div>
              <textarea
                className="submitDialogTextArea resize-none outline-none border-2 p-2 pl-4 mt-5"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write here..."
              ></textarea>
              {/* <DialogContentText>
        To subscribe to this website, please enter your email address
        here. We will send updates occasionally.
      </DialogContentText> */}
              {/* <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
      /> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CourseProgress;
