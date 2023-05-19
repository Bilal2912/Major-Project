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
  UPDATE_COURSE_RESET,
  CREATE_MODULE_REQUEST,
  CREATE_MODULE_SUCCESS,
  CREATE_MODULE_FAIL,
  CREATE_MODULE_RESET,
  CLEAR_ERRORS,
} from "../constants/courseConstants";

export const courseReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case ALL_COURSE_REQUEST:
      return {
        loading: true,
        courses: [],
      };

    case ALL_COURSE_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
        courseCount: action.payload.courseCount,
        resultPerPage: action.payload.resultPerPage,
        filteredCoursesCount: action.payload.filteredCoursesCount,
      };

    case ALL_COURSE_FAIL:
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
export const allCourseReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case ALL_COURSE_WITHOUT_FILTER_REQUEST:
      return {
        loading: true,
        allCourses: [],
      };

    case ALL_COURSE_WITHOUT_FILTER_SUCCESS:
      return {
        loading: false,
        allCourses: action.payload.courses,
      };

    case ALL_COURSE_WITHOUT_FILTER_FAIL:
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

export const courseDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case COURSE_DETAILS_SUCCESS:
      return {
        loading: false,
        course: action.payload,
      };

    case COURSE_DETAILS_FAIL:
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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
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

export const courseReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
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

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
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

export const enrollCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case ENROLL_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ENROLL_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        isEnrolled: action.payload,
      };
    case ENROLL_COURSE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ENROLL_COURSE_RESET:
      return {
        ...state,
        isEnrolled: false,
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

export const createCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case CREATE_COURSE_SUCCESS:
      return {
        loading: false,
        isCreated: true,
        course: action.payload,
      };

    case CREATE_COURSE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_COURSE_RESET:
      return {
        ...state,
        isCreated: false,
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

export const updateCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COURSE_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case UPDATE_COURSE_SUCCESS:
      return {
        loading: false,
        isUpdated: true,
        course: action.payload,
      };

    case UPDATE_COURSE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_COURSE_RESET:
      return {
        ...state,
        isUpdated: false,
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


export const createModuleReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MODULE_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case CREATE_MODULE_SUCCESS:
      return {
        loading: false,
        isModuleCreated: true,
        data: action.payload,
      };

    case CREATE_MODULE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case CREATE_MODULE_RESET:
        return {
          ...state,
          isModuleCreated: false,
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
