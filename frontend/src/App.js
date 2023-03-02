import "./App.css";
import React from "react";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import CourseDetails from "./components/Course/CourseDetails";
import Courses from "./components/Course/Courses";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./components/User/LoginSignup";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyCourses from "./components/User/MyCourses";
import { getAllCourse, getCourse } from "./actions/courseAction";
import UploadCourse from "./components/Course/UploadCourse";
import CourseProgress from "./components/Course/CourseProgress";
import CreateCourse from "./components/Course/CreateCourse";
import UpdateCourse from "./components/Course/UpdateCourse";
import AllReviews from "./components/Course/AllReviews";
// import MyOrders from "./components/Order/MyOrders";

// const stripePromise = loadStripe("pk_test_51LYvuKSHCpKtVEuaZVfr8GWBfUq72V6Kz3ymqZgm7Q1yHphCT82LXzW6OLd6RUHMziQ6hU6Yw60lBol5ZsSGJfs900K2XxbDvd");

function App() {

  // const [stripeApiKey, setStripeApiKey] = React.useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("api/v1/stripeapikey");
  //   console.log(data.stripeApiKey);
  //   setStripeApiKey(data.stripeApiKey);
  // }

  React.useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getAllCourse());
    // store.dispatch(getCourseDetails());
    // getStripeApiKey();
  }, []);

  return (
    <Router>
      <Navbar />
      {/* <Elements stripe={stripePromise}>
         <Payment/>
      </Elements> */}
      <Routes>
        {/* <Route element={<Elements stripe={stripePromise} />}>
          <Route element={<ProtectedRoute />}>
            <Route exact path="/payment" element={<Payment />} />
          </Route>
        </Route> */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/course/:id" element={<CourseDetails />} />
        <Route exact path="/courses" element={<Courses />} />
        <Route path="/courses/:keyword" element={<Courses />} />
        <Route exact path="/login" element={<LoginSignup />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<UpdatePassword />} />
          <Route exact path="/mycourses" element={<MyCourses />} />
          <Route exact path="/upload" element={<UploadCourse />} />
          <Route exact path="/me/course/:id" element={<CourseProgress />} />
          <Route exact path="/me/course/new" element={<CreateCourse />} />
          <Route exact path="/course/update/:id" element={<UpdateCourse />} />
        </Route>
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/allreviews" element={<AllReviews />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
