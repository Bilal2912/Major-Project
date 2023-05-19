import {
    CREATE_COURSES_REQUEST,
    CREATE_COURSES_SUCCESS,
    CREATE_COURSES_FAIL,
    MY_COURSES_REQUEST,
    MY_COURSES_SUCCESS,
    MY_COURSES_FAIL,
    ALL_COURSES_REQUEST,
    ALL_COURSES_SUCCESS,
    ALL_COURSES_FAIL,
    DELETE_COURSES_REQUEST,
    DELETE_COURSES_SUCCESS,
    DELETE_COURSES_FAIL,
    COURSES_DETAILS_REQUEST,
    COURSES_DETAILS_SUCCESS,
    COURSES_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/myCourseConstants";
  
  import axios from "axios";
  
  // Create Course
  export const createCourse = (order) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_COURSES_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("api/v1/adminNprof/course/new", order, config);
  
      dispatch({ type: CREATE_COURSES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_COURSES_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // My Courses
  export const myCourses = () => async (dispatch) => {
    try {
      dispatch({ type: MY_COURSES_REQUEST });
  
      const { data } = await axios.get("/api/v1/mycourses/me");
  
      dispatch({ type: MY_COURSES_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: MY_COURSES_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get All Courses (admin)
  export const getAllCourses = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_COURSES_REQUEST });
  
      const { data } = await axios.get("/api/v1/admin/courses");
  
      dispatch({ type: ALL_COURSES_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: ALL_COURSES_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Course
  export const deleteCourse = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_COURSES_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/course/${id}`);
  
      dispatch({ type: DELETE_COURSES_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_COURSES_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get Course Details
  export const getCourseDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: COURSES_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v1/course/${id}`);
  
      dispatch({ type: COURSES_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
      dispatch({
        type: COURSES_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  