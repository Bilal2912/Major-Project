import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { allCourseReducer, courseDetailsReducer, courseReducer, createCourseReducer, createModuleReducer, enrollCourseReducer, newReviewReducer, updateCourseReducer } from "./reducers/courseReducer";
import { createdCourseReducer, enrolledCourseReducer, forgotPasswordReducer, profileReducer,userCreatedCourseReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
// import { allOrdersReducer, myOrdersReducer, newOrderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  courses:courseReducer,
  allCourses:allCourseReducer,
  courseDetails:courseDetailsReducer,
  user:userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  // cart: cartReducer,
  // newOrder:newOrderReducer,
  // myOrders:myOrdersReducer,
  // allOrders:allOrdersReducer,
  newReview: newReviewReducer,
  enrollCourse: enrollCourseReducer,
  enrolledCourse: enrolledCourseReducer,
  createCourse: createCourseReducer,
  createdCourse: createdCourseReducer,
  updateCourse: updateCourseReducer,
  createModule: createModuleReducer,
  userCreatedCourses: userCreatedCourseReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
