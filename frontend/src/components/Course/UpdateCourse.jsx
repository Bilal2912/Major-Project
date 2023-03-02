import React, { Fragment, useRef, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import "./CreateCourse.css";
import Loader from "../layout/loader";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  createdCourse,
  login,
  register,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import {
  createCourse,
  createCourseModule,
  getCourseDetails,
  updateCourse,
} from "../../actions/courseAction";
import {
  CREATE_COURSE_RESET,
  CREATE_MODULE_RESET,
  UPDATE_COURSE_RESET,
} from "../../constants/courseConstants";
import { CREATED_COURSE_RESET } from "../../constants/userConstants";
import ModuleCard from "./ModuleCard";

const UpdateCourse = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState("/logo192.png");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseImagePreview, setCourseImagePreview] = useState("/logo192.png");

  const [name, setName] = useState("");

  // const { error, loading, isAuthenticated } = useSelector(
  //   (state) => state.user
  // );
  const { course, loading, error } = useSelector(
    (state) => state.courseDetails
  );
  // console.log(course);

  const { isUpdated } = useSelector((state) => state.updateCourse);

  const { isModuleCreated } = useSelector((state) => state.createModule);
  // const { isCourseCreated } = useSelector((state) => state.createdCourse);

  const UpdateCourseSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("courseName", courseName);
    myForm.set("courseDescription", courseDescription);
    myForm.set("courseImage", courseImage);
    myForm.set("courseCategory", courseCategory);
    dispatch(updateCourse(myForm, id));
  };

  const updateCourseDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setCourseImagePreview(reader.result);
        setCourseImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const createModule = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    dispatch(createCourseModule(myForm, id));
  };

  const openModal = (e) => {
    e.preventDefault();
    document.getElementById("authentication-modal").classList.remove("hidden");
  };

  const closeModal = (e) => {
    document.getElementById("authentication-modal").classList.add("hidden");
  };

  // //   const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (course) {
      setCourseName(course.courseName);
      setCourseDescription(course.courseDescription);
      setCourseCategory(course.courseCategory);
      
      // setCourseImagePreview(course.courseImages[0].url);
    }
    if (isUpdated) {
      alert.success("Course Updated Successfully");
      // dispatch(createdCourse());
      navigate("/upload");
      dispatch({ type: UPDATE_COURSE_RESET });
    }
    if (isModuleCreated) {
      alert.success("Module Created Successfully");
      navigate(`/course/update/${id}`);
      closeModal();
      dispatch({ type: CREATE_MODULE_RESET });
    }
    // if (isCourseUpdated) {
    //   // alert.success("Course Added Successfully");
    //   dispatch({ type: CREATED_COURSE_RESET });
    //   navigate("/upload");
    // }
    dispatch(getCourseDetails(id));
  }, [dispatch, error, alert, id, isUpdated, isModuleCreated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <form
            action=""
            className="flex flex-col items-center bg-slate-200 h-max"
            onSubmit={UpdateCourseSubmit}
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
                value={courseName}
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
                value={courseDescription}
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
                value={courseCategory}
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
                onChange={updateCourseDataChange}
                className="hover:cursor-pointer bg-blue-500 w-2/3 h-14 rounded-lg relative right-2"
              />
            </div>

            {/* <span>{course.modules.length}</span> */}
            {/* {course.modules && course.modules.map((module) => {
              <ModuleCard module={module}/>
            })} */}

            <ModuleCard/>

            <div className="w-full flex flex-col justify-center items-center my-7">
              <button
                className="w-2/3 py-4 text-xl px-16 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-700 hover:cursor-pointer ml-9"
                onClick={openModal}
              >
                {/* {course.modules ? <span>Add Module</span> : <span>Create Module</span>} */}
                Create Module
              </button>
              <input
                type="submit"
                value="Update Course"
                className="w-2/3 py-4 text-xl px-16 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-700 hover:cursor-pointer ml-9 mt-5"
              />
            </div>

            {/* <button data-modal-target="authentication-modal" onClick={openModal} data-modal-toggle="authentication-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Toggle modal
</button> */}

            {/* <!-- Main modal --> */}
            <div
              id="authentication-modal"
              tabindex="-1"
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 flex justify-center items-center z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-black bg-opacity-50"
            >
              <div className="relative w-full h-full max-w-md md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      aria-hidden="true"
                      onClick={closeModal}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                      Module Creation
                    </h3>
                    <form className="space-y-6" action="#">
                      <div>
                        <label
                          for="module_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Module Name
                        </label>
                        <input
                          type="text"
                          name="module_name"
                          id="module_name"
                          className="bg-gray-50 focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white"
                          placeholder="module name"
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      {/* <div className="flex justify-between">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="remember"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                              required
                            />
                          </div>
                          <label
                            for="remember"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Remember me
                          </label>
                        </div>
                      </div> */}
                      <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={createModule}
                      >
                        Create Module
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateCourse;
