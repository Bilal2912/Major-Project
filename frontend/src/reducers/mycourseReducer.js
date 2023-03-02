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
    DELETE_COURSES_RESET,
    COURSES_DETAILS_REQUEST,
    COURSES_DETAILS_SUCCESS,
    COURSES_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/mycourseConstants";
  
  export const newCourseReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_COURSES_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_COURSES_SUCCESS:
        return {
          loading: false,
          myCourses: action.payload,
        };
  
      case CREATE_COURSES_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const myCoursesReducer = (state = { myCourses: [] }, action) => {
    switch (action.type) {
      case MY_COURSES_REQUEST:
        return {
          loading: true,
        };
  
      case MY_COURSES_SUCCESS:
        return {
          loading: false,
          myCourses: action.payload,
        };
  
      case MY_COURSES_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const allMyCoursesReducer = (state = { myCourses: [] }, action) => {
    switch (action.type) {
      case ALL_COURSES_REQUEST:
        return {
          loading: true,
        };
  
      case ALL_COURSES_SUCCESS:
        return {
          loading: false,
          myCourses: action.payload,
        };
  
      case ALL_COURSES_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const myCourseReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_COURSES_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case DELETE_COURSES_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case DELETE_COURSES_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      
      case DELETE_COURSES_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const myCourseDetailsReducer = (state = { myCourses: {} }, action) => {
    switch (action.type) {
      case COURSES_DETAILS_REQUEST:
        return {
          loading: true,
        };
  
      case COURSES_DETAILS_SUCCESS:
        return {
          loading: false,
          myCourses: action.payload,
        };
  
      case COURSES_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  