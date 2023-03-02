import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
  } from "../constants/cartConstants";
  import axios from "axios";
  
  // Add to Cart
  export const addItemsToCart = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/course/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        course: data.course._id,
        name: data.course.courseName,
        author: data.course.author,
        price: data.course.coursePrice,
        image: data.course.courseImages[0].url,
        rating:data.course.courseRating,
        reviews:data.course.numOfReviews
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // REMOVE FROM CART
  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  