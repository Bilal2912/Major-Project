import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import UploadIcon from "@mui/icons-material/Upload";
import Loader from "../layout/loader";
import { logout } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Navbar = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/courses/${keyword}`);
    } else {
      navigate(`/courses`);
    }
  };

  const dropdown = () => {
    if (document.getElementById("dropmenu").classList.contains("hidden")) {
      document.getElementById("dropmenu").classList.remove("hidden");
    } else {
      document.getElementById("dropmenu").classList.add("hidden");
    }
  };

  const userLogout = () => {
    dispatch(logout());
    alert.success("Logged Out Successfully");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="flex justify-around bg-blue-500 h-14 items-center drop-shadow-lg">
            <div className="text-3xl text-white hover:underline">
              <Link to="/">Yashika</Link>
            </div>
            <form
              action=""
              onSubmit={searchSubmitHandler}
              className="flex bg-white rounded-full justify-around items-center w-1/2"
              id="myform"
            >
              <input
                type="text"
                placeholder="Browse for Courses..."
                onChange={(e) => setKeyword(e.target.value)}
                className="px-5 py-1 text-xl rounded-full outline-none w-11/12"
              />
              <input
                type="submit"
                value="Search"
                className="hover:cursor-pointer bg-black text-white text-xl rounded-full px-5 py-1 hover:bg-white hover:text-black transition ease-in-out duration-500"
              />
              {/* <SearchIcon className='relative right-2 top-0.5 hover:cursor-pointer' onClick={searchFunctionality}/> */}
            </form>
            <Link to="/courses" className="text-white text-xl hover:underline">
              Courses
            </Link>
            <div className="flex justify-around items-center w-1/4 text-xl">
              {/* <Link
                to="/cart"
                className="bg-white w-24 flex justify-evenly items-center px-5 py-1 hover:bg-slate-100 hover:cursor-pointer"
              >
                <ShoppingCartIcon className="relative right-1" />
                <button>Cart</button>
              </Link> */}
              
              {isAuthenticated && (
                <Link to="/mycourses" className="text-white text-xl hover:underline mr-5">
                My Courses
              </Link>
              )}

              {isAuthenticated && (
                <div className="relative w-56 flex justify-around items-center">
                  <h2 className="text-white text-xl ml-10">
                    Hi {user.name.split(" ")[0]}!
                  </h2>
                  <AccountCircleIcon
                    sx={{ color: grey[50], fontSize: 40 }}
                    className="hover:cursor-pointer"
                    onClick={() => dropdown()}
                  />
                  <div
                    className="bg-white w-60 z-50 pl-5 py-2 absolute top-14 right-1 hidden"
                    id="dropmenu"
                  >
                    <div className="flex items-center mb-2">
                      <Link to="/account" className="hover:text-blue-700">
                        My Account
                      </Link>
                      <PersonIcon className="relative top-0.5 ml-2" />
                    </div>
                    {user.role === "prof" && (
                      <div className="flex items-center mb-2">
                        <Link to="/upload" className="hover:text-blue-700">
                          Upload
                        </Link>
                        <UploadIcon className="relative top-0.5 ml-2" />
                      </div>
                    )}

                    <div className="flex items-center mb-2">
                      <Link
                        to="/password/update"
                        className="hover:text-blue-700"
                      >
                        Change Password
                      </Link>
                      <LockOpenIcon className="ml-2" />
                    </div>
                    <div className="">
                      <Link
                        to=""
                        onClick={() => {
                          userLogout();
                        }}
                        className="hover:text-blue-700"
                      >
                        Logout
                      </Link>
                      <LogoutIcon className="ml-2" />
                    </div>
                  </div>
                </div>
              )}
              {!isAuthenticated && (
                <Link to="/login">
                  <div className="bg-white px-5 py-1 hover:bg-slate-100 flex justify-around items-center hover:cursor-pointer">
                    <AccountCircleIcon className="relative right-1" />
                    <button>Log in</button>
                  </div>
                </Link>
              )}

              {/* <button className='bg-white px-5 py-1 hover:bg-slate-100'>Sign up</button> */}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Navbar;
