import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

const ResetPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {token} = useParams();
    
    const { error, success, loading } = useSelector((state) => state.forgotPassword);
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
      dispatch(resetPassword(token, myForm));
    };
  
    //const redirect = location.search ? location.search.split("=")[1] : "/account";
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Password Updated Successfully");
  
        navigate("/login");
      }
    }, [dispatch, error, alert, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Udemy | Reset Password`} />
          <div className="LoginSignUpContainer flex justify-center items-center h-screen bg-slate-200">
            <div className="LoginSignUpBox bg-zinc-800 w-1/3 h-3/4">
              <div>
                <div className="login_signUp_toggle flex items-center h-12 text-white font-semibold">
                  <p className="w-full bg-blue-500 py-3 text-center" id="log">
                    RESET PASSWORD
                  </p>
                  {/* <div className="bg-white w-0.5 h-full"></div> */}
                </div>
                <button className="text-white" id="tp_btn"></button>
              </div>
              <form
                className="signUpForm flex flex-col justify-center items-center h-5/6"
                encType="multipart/form-data"
                onSubmit={resetPasswordSubmit}
              >
                <div className="signUpEmail w-5/6 flex justify-center items-center relative mb-8">
                  <LockOpenIcon className="absolute left-14" />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-3 pl-16 pr-7 rounded-lg w-5/6 outline-none"
                  />
                </div>
                <div className="signUpPassword w-5/6 flex justify-center items-center relative mb-12">
                  <LockIcon className="absolute left-14" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="py-3 pl-16 pr-7 rounded-lg w-5/6 outline-none"
                  />
                </div>
                
                <input
                  type="submit"
                  value="Reset Password"
                  className="signUpBtn hover:cursor-pointer bg-blue-500 text-white font-semibold px-3 py-2 rounded-lg w-3/4 text-lg hover:bg-blue-700"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ResetPassword