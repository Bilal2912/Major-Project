import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
  
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const updatePasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
      dispatch(updatePassword(myForm));
    };
  
    //const redirect = location.search ? location.search.split("=")[1] : "/account";
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("Password Updated Successfully");
  
        navigate("/account");
  
        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
    }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name.split(" ")[0]} | Password Update`} />
          <div className="LoginSignUpContainer flex justify-center items-center h-screen bg-slate-200">
            <div className="LoginSignUpBox bg-zinc-800 w-1/3 h-3/4">
              <div>
                <div className="login_signUp_toggle flex items-center h-12 text-white font-semibold">
                  <p className="w-full bg-blue-500 py-3 text-center" id="log">
                    UPDATE PASSWORD
                  </p>
                  {/* <div className="bg-white w-0.5 h-full"></div> */}
                </div>
                <button className="text-white" id="tp_btn"></button>
              </div>
              <form
                className="signUpForm flex flex-col justify-center items-center h-5/6"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="signUpName w-5/6 flex justify-center items-center relative mb-8">
                  <VpnKeyIcon className="absolute left-14" />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="py-3 pl-16 pr-7 rounded-lg w-5/6 outline-none"
                  />
                </div>
                <div className="signUpEmail w-5/6 flex justify-center items-center relative mb-8">
                  <LockOpenIcon className="absolute left-14" />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  value="Change Password"
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

export default UpdatePassword