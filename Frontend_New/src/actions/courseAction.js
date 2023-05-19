import axios from "axios";
import {
  ALL_COURSE_REQUEST,
  ALL_COURSE_SUCCESS,
  ALL_COURSE_FAIL,
  ALL_COURSE_WITHOUT_FILTER_REQUEST,
  ALL_COURSE_WITHOUT_FILTER_SUCCESS,
  ALL_COURSE_WITHOUT_FILTER_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  ENROLL_COURSE_REQUEST,
  ENROLL_COURSE_SUCCESS,
  ENROLL_COURSE_FAIL,
  ENROLL_COURSE_RESET,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  CREATE_COURSE_RESET,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  CREATE_MODULE_REQUEST,
  CREATE_MODULE_SUCCESS,
  CREATE_MODULE_FAIL,
  CLEAR_ERRORS,
} from "../constants/courseConstants";

// Get all Courses with filter
export const getCourse =
  (keyword = "", currentPage = 1, price = [0, 5000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_COURSE_REQUEST });

      let link = `/api/v1/courses?keyword=${keyword}&page=${currentPage}&coursePrice[gte]=${price[0]}&coursePrice[lte]=${price[1]}&courseRating[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/courses?keyword=${keyword}&page=${currentPage}&coursePrice[gte]=${price[0]}&coursePrice[lte]=${price[1]}&courseCategory=${category}&courseRating[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);
      // console.log(data);

      dispatch({
        type: ALL_COURSE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_COURSE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get all courses without filter
export const getAllCourse = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_COURSE_WITHOUT_FILTER_REQUEST });

    let link = `/api/v1/allCourses`;

    const { data } = await axios.get(link);
    dispatch({
      type: ALL_COURSE_WITHOUT_FILTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_COURSE_WITHOUT_FILTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Course Details
export const getCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/course/${id}`);

    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data.course,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Enroll Course
export const enrollCourse = (courseId) => async (dispatch) => {
  try {
    dispatch({ type: ENROLL_COURSE_REQUEST });

    const { data } = await axios.post(`/api/v1/course/register/${courseId}`);

    dispatch({
      type: ENROLL_COURSE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: ENROLL_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createCourse = (courseData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COURSE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      "/api/v1/adminNprof/course/new",
      courseData,
      config
    );
    console.log(data);

    dispatch({
      type: CREATE_COURSE_SUCCESS,
      payload: data.course,
    });
  } catch (error) {
    dispatch({
      type: CREATE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCourse = (courseData,id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_COURSE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/adminNprof/course/${id}`,
      courseData,
      config
    );
    console.log(data);

    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: data.course,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createCourseModule = (courseData, id) => async(dispatch) => {
  try {
    dispatch({ type: CREATE_MODULE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/adminNprof/modules/new/${id}`,
     courseData ,
      config
    );
    

    dispatch({
      type: CREATE_MODULE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CREATE_MODULE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
