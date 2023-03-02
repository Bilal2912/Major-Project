import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import Loader from "../layout/loader";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name.split(" ")[0]}'s Profile`} />
          <div className="flex justify-center bg-slate-100">
            <div className="w-1/2 flex flex-col justify-around items-center h-screen">
                <h2 className="text-5xl relative right-48 font-semibold">My Account</h2>
              <img src={user.avatar.url} alt={user.name} className="w-1/2 h-1/2 rounded-full relative bottom-8 transition ease-in-out hover:-translate-y-3"/>
              <Link to="/me/update" className="relative bottom-12 text-3xl w-1/2 bg-blue-500 text-center py-2 text-white hover:bg-blue-700 font-semibold">Edit Profile</Link>
            </div>
            <div className="h-screen w-0.5 bg-gray-500"></div>
            <div className="w-1/2 flex flex-col justify-evenly">
              <div className="ml-20">
                <h2 className="text-3xl font-semibold mb-2">Full Name</h2>
                <p className="text-xl">{user.name}</p>
              </div>
              <div className="ml-20">
                <h2 className="text-3xl font-semibold mb-2">Email ID</h2>
                <p className="text-xl">{user.email}</p>
              </div>
              <div className="ml-20">
                <h2 className="text-3xl font-semibold mb-2">Role</h2>
                <p className="text-xl">{user.role}</p>
              </div>
              <div className="ml-20">
                <h2 className="text-3xl font-semibold mb-2">Joined on</h2>
                <p className="text-xl">{user.createdAt.substring(0, 10)}</p>
              </div>
              <Link to="/mycourses" className="relative bottom-7 text-3xl w-1/2 bg-blue-500 text-center py-2 text-white hover:bg-blue-700 font-semibold ml-52">My Courses</Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
