import React, { Fragment, useRef, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import './LoginSignup.css'
import Loader from "../layout/loader";
import { Link , useNavigate, useLocation } from "react-router-dom";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
//   const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/logo192.png");
  const [avatarPreview, setAvatarPreview] = useState("/logo192.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

//   const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate('/account');
    }
    
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      document.getElementById('log').classList.add("bg-blue-500");
      document.getElementById('sign').classList.remove("bg-blue-500");

      registerTab.current.classList.add("hidden");
      loginTab.current.classList.remove("hidden");
      document.getElementById('tp_btn').classList.add('hidden');
    }
    if (tab === "register") {
        document.getElementById('log').classList.remove("bg-blue-500");
        document.getElementById('sign').classList.add("bg-blue-500");

      registerTab.current.classList.remove("hidden");
      loginTab.current.classList.add("hidden");
      document.getElementById('tp_btn').classList.remove('hidden');
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <MetaData title={`Udemy | Login/Signup`} />
          <div className="LoginSignUpContainer flex justify-center items-center h-screen bg-slate-200">
            <div className="LoginSignUpBox bg-zinc-800 w-1/3 h-3/4">
              <div>
                <div className="login_signUp_toggle flex items-center h-12 text-white font-semibold">
                  <p onClick={(e) => switchTabs(e, "login")} className="hover:cursor-pointer bg-blue-500 w-1/2 py-3 text-center" id="log">LOGIN</p>
                  {/* <div className="bg-white w-0.5 h-full"></div> */}
                  <p onClick={(e) => switchTabs(e, "register")} className="hover:cursor-pointer w-1/2 py-3 text-center" id="sign">REGISTER</p>
                </div>
                <button className="text-white" id="tp_btn"></button>
              </div>
              <form className="flex flex-col h-5/6 justify-center items-center relative " ref={loginTab} onSubmit={loginSubmit}>
                <div className="w-5/6 flex justify-center items-center relative mb-10">
                  <MailOutlineOutlinedIcon className="absolute left-14"/>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="py-3 pl-16 pr-7 rounded-lg outline-none w-5/6"
                  />
                </div>
                <div className="loginPassword w-5/6 flex justify-center items-center relative mb-10">
                  <LockOpenIcon className="absolute left-14"/>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="py-3 pl-16 pr-7 rounded-lg w-5/6 outline-none"
                  />
                </div>
                <div className="flex justify-start w-1/2 ">
                    <Link to="/password/forgot" className="mb-7 hover:underline text-white absolute right-20 bottom-36">Forgot Password?</Link>
                </div>
                <input type="submit" value="Login" className="loginBtn hover:cursor-pointer bg-blue-500 text-white font-semibold px-3 py-2 rounded-lg w-3/4 text-lg hover:bg-blue-700 relative top-5" />
              </form>
              <form
                className="signUpForm flex flex-col justify-center items-center h-5/6 hidden"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName w-5/6 flex justify-center items-center relative mb-8">
                  <EmojiEmotionsOutlinedIcon className="absolute left-14"/>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                    className="py-3 pl-16 pr-7 rounded-lg w-5/6 outline-none"
                  />
                </div>
                <div className="signUpEmail w-5/6 flex justify-center items-center relative mb-8">
                  <MailOutlineOutlinedIcon className="absolute left-14"/>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                    className="py-3 pl-16 pr-7 rounded-lg w-5/6 outline-none"
                  />
                </div>
                <div className="signUpPassword w-5/6 flex justify-center items-center relative mb-8">
                  <LockOpenIcon className="absolute left-14"/>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                    className="py-3 pl-16 pr-7 rounded-lg w-5/6 outline-none"
                  />
                </div>
                <div id="registerImage" className="w-full flex justify-start items-center relative mb-8 pl-7 pr-2">
                <img src={avatarPreview} alt="Hey" className="w-10 h-10 mr-2 rounded-full" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                    className="hover:cursor-pointer bg-blue-500 w-3/4 h-12 rounded-lg"
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn hover:cursor-pointer bg-blue-500 text-white font-semibold px-3 py-2 rounded-lg w-3/4 text-lg hover:bg-blue-700" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    
  );
};

export default LoginSignup;
