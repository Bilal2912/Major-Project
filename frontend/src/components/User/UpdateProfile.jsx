import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import "./UpdateProfile.css";
import Loader from "../layout/loader";
import { useNavigate } from "react-router-dom";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/logo192.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, isUpdated, user]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name.split(" ")[0]} | Update`} />
          <div className="LoginSignUpContainer flex justify-center items-center h-screen bg-slate-200">
            <div className="LoginSignUpBox bg-zinc-800 w-1/3 h-3/4">
              <div>
                <div className="login_signUp_toggle flex items-center h-12 text-white font-semibold">
                  <p className="w-full bg-blue-500 py-3 text-center" id="log">
                    UPDATE PROFILE
                  </p>
                  {/* <div className="bg-white w-0.5 h-full"></div> */}
                </div>
                <button className="text-white" id="tp_btn"></button>
              </div>
              <form
                className="signUpForm flex flex-col justify-center items-center h-5/6"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="signUpName w-5/6 flex justify-center items-center relative mb-8">
                  <EmojiEmotionsOutlinedIcon className="absolute left-14" />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="py-3 pl-16 pr-7 rounded-lg w-5/6 outline-none"
                  />
                </div>
                <div className="signUpEmail w-5/6 flex justify-center items-center relative mb-8">
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
                <div
                  id="updateProfileImage"
                  className="w-full flex justify-start items-center relative mb-8 pl-7 pr-2"
                >
                  <img
                    src={avatarPreview}
                    alt="Hey"
                    className="w-10 h-10 mr-2 rounded-full"
                  />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                    className="hover:cursor-pointer bg-blue-500 w-3/4 h-12 rounded-lg"
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="signUpBtn hover:cursor-pointer bg-blue-500 text-white font-semibold px-3 py-2 rounded-lg w-3/4 text-lg hover:bg-blue-700"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
