import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    // <Fragment>
    //   {loading === false && (
    //     <Route
    //       {...rest}
    //       render={(props) => {
    //         if (isAuthenticated === false) {
    //           return <Navigate to="/login" />;
    //         }

    //         if (isAdmin === true && user.role !== "admin") {
    //           return <Navigate to="/login" />;
    //         }

    //         return <Element {...props} />;
    //       }}
    //     />
    //   )}
    // </Fragment>
    <Fragment>
      {isAuthenticated===true ? (<Outlet/>) : (navigate(`/login`))}
    </Fragment>
  );
};

export default ProtectedRoute;
