import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    
    const { error, message, loading } = useSelector((state) => state.forgotPassword);
  
    const [email, setEmail] = useState("");
    
    const forgotPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("email", email);
      dispatch(forgotPassword(myForm));
    };
  
    //const redirect = location.search ? location.search.split("=")[1] : "/account";
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (message) {
        alert.success(message);
      }
    }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Udemy | Forgot Password`} />
          <div className="LoginSignUpContainer flex justify-center items-center h-screen bg-slate-200">
            <div className="LoginSignUpBox bg-zinc-800 w-1/3 h-1/2">
              <div>
                <div className="login_signUp_toggle flex items-center h-12 text-white font-semibold">
                  <p className="w-full bg-blue-500 py-3 text-center" id="log">
                    FORGOT PASSWORD
                  </p>
                  {/* <div className="bg-white w-0.5 h-full"></div> */}
                </div>
                {/* <button className="text-white" id="tp_btn"></button> */}
              </div>
              <form
                className="signUpForm flex flex-col justify-center items-center h-5/6"
                encType="multipart/form-data"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="signUpName w-5/6 flex justify-center items-center relative mb-12">
                  <MailOutlineOutlinedIcon className="absolute left-14" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-3 pl-16 pr-7 rounded-lg w-5/6 outline-none"
                  />
                </div>
                
                <input
                  type="submit"
                  value="Send Email"
                  className="hover:cursor-pointer bg-blue-500 text-white font-semibold px-3 py-2 rounded-lg w-3/4 text-lg hover:bg-blue-700"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ForgotPassword