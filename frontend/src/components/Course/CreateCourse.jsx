import React, { Fragment, useRef, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import "./CreateCourse.css";
import Loader from "../layout/loader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createdCourse, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import { createCourse } from "../../actions/courseAction";
import { CREATE_COURSE_RESET } from "../../constants/courseConstants";
import { CREATED_COURSE_RESET } from "../../constants/userConstants";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const { isCreated } = useSelector((state) => state.createCourse);
  const { isCourseCreated } = useSelector((state) => state.createdCourse);

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseImagePreview, setCourseImagePreview] = useState("/logo192.png");

  const CourseSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("courseName", courseName);
    myForm.set("courseDescription", courseDescription);
    myForm.set("courseImage", courseImage);
    myForm.set("courseCategory", courseCategory);
    dispatch(createCourse(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "courseImage") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setCourseImagePreview(reader.result);
          setCourseImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  //   const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isCreated) {
      alert.success("Course Created Successfully");
      dispatch({ type: CREATE_COURSE_RESET });
      dispatch(createdCourse());
      // navigate("/upload");
    }
    if (isCourseCreated) {
      // alert.success("Course Added Successfully");
      dispatch({ type: CREATED_COURSE_RESET });
      navigate("/upload");
    }
  }, [dispatch, error, alert, isCreated, isCourseCreated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <form
            action=""
            className="flex flex-col items-center bg-slate-200 h-screen"
            onSubmit={CourseSubmit}
          >
            <div className="w-full flex justify-center items-center mt-7">
              <SchoolIcon
                fontSize="large"
                color="primary"
                className="relative left-12"
              />
              <input
                type="text"
                placeholder="Course Name"
                required
                onChange={(e) => setCourseName(e.target.value)}
                className="outline-none w-2/3 py-4 text-xl px-16 rounded-lg"
              />
            </div>
            <div className="w-full flex justify-center items-center mt-7">
              <DescriptionIcon
                fontSize="large"
                color="primary"
                className="relative left-12 bottom-24"
              />
              <textarea
                name=""
                id=""
                cols="30"
                rows="8"
                required
                placeholder="Course Description"
                onChange={(e) => setCourseDescription(e.target.value)}
                className="outline-none w-2/3 py-4 text-xl px-16 rounded-lg"
              />
            </div>
            <div className="w-full flex justify-center items-center mt-7">
              <CategoryIcon
                fontSize="large"
                color="primary"
                className="relative left-12"
              />
              <select
                name=""
                id=""
                className="outline-none w-2/3 py-4 text-xl px-16 rounded-lg"
                onChange={(e) => setCourseCategory(e.target.value)}
              >
                <option value="" selected disabled>
                  Select
                </option>
                <option value="ETRX">ETRX</option>
                <option value="EXTC">EXTC</option>
                <option value="IT">IT</option>
                <option value="COMP">COMP</option>
              </select>
            </div>
            <div
              className="w-full flex justify-center items-center mt-7"
              id="courseImage"
            >
              <img
                src={courseImagePreview}
                alt="Hey"
                className="w-10 h-10 mr-2 rounded-full relative right-2"
              />
              <input
                type="file"
                name="courseImage"
                accept="image/*"
                onChange={registerDataChange}
                className="hover:cursor-pointer bg-blue-500 w-2/3 h-14 rounded-lg relative right-2"
              />
            </div>
            <div className="w-full flex justify-center items-center my-7">
              <input
                type="submit"
                value="Create Course"
                className="w-2/3 py-4 text-xl px-16 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-700 hover:cursor-pointer ml-9"
              />
            </div>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreateCourse;
