import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <Fragment>
      {isAuthenticated===true ? (<Outlet/>) : (navigate(`/`))}
    </Fragment>
  );
};

export default ProtectedRoute;
