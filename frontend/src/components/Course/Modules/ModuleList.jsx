import React, { Fragment, useEffect, useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AttachmentIcon from "@mui/icons-material/Attachment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Quiz from "./QuizModal/Quiz";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import VideoModal from './VideoModal'
const ModuleList = (props) => {
  const { courses } = props;
  console.log(courses);
  const opencourses = Array(courses.length).fill(false);
  const [open, setOpen] = React.useState(opencourses);
  const handleOpen = (i) => {
    const drop = "dropdown" + i;
    if (!document.getElementById(drop).classList.contains("rotate-180")) {
      document.getElementById(drop).classList.add("rotate-180");
    } else {
      document.getElementById(drop).classList.remove("rotate-180");
    }
    let arr = [...open];
    arr[i] = !arr[i];
    setOpen(arr);
    // console.log(drop , arr);
  };
  useEffect(() => {
    console.log(open);
  } , [open])


  const openVideo = () => {
    if (document.getElementById("defaultModal").classList.contains("hidden")) {
      document.getElementById("defaultModal").classList.remove("hidden");
      document.getElementById("defaultModal").classList.add("bg-black");
      document.getElementById("defaultModal").classList.add("bg-opacity-50");
      // document.getElementsByTagName('body')[0].classList.add('overflow-y-hidden')
    } else {
      document.getElementById("defaultModal").classList.add("hidden");
      // document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden')
    }
  };
  const openQuiz = (i) => {
    if (document.getElementById("defaultModal1").classList.contains("hidden")) {
      document.getElementById("defaultModal1").classList.remove("hidden");
      document.getElementById("defaultModal1").classList.add("bg-black");
      document.getElementById("defaultModal1").classList.add("bg-opacity-50");
      // document.getElementsByTagName('body')[0].classList.add('overflow-y-hidden')
    } else {
      document.getElementById("defaultModal1").classList.add("hidden");
      // document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden')
    }
  };
    // const [openQuiz, setOpenQuiz] = React.useState(false);
    // const handleOpenQuiz = () => {
    //   setOpenQuiz(!openQuiz);
    // };
  return (
    <>
      {courses.length > 0 ? (
        courses.map((item, i) => {
          return (
            <div className="bg-slate-100 flex justify-center flex-col items-center">
              <div className="mx-24 bg-blue-300 px-10 py-3 w-5/6 flex flex-col justify-center mt-5 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="">
                    <span className="text-3xl font-semibold">
                      {item.Module}
                    </span>
                    <div className="flex mt-2 items-center">
                      <div className="flex items-center">
                        <PlayCircleOutlineIcon />
                        <span className="ml-1">
                          {" "}
                          {item.Videos.noOfVideos} Videos
                        </span>
                      </div>
                      <div className="flex items-center">
                        <AttachmentIcon className="ml-5" />
                        <span className="ml-1">1 Quiz</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => {handleOpen(i)}} id= {"dropdown" + i } >
                    <ArrowDropDownIcon fontSize="large" />
                  </button>
                </div>
                {open[i] ? (
                  <div className=" mt-5" id="ext_drop_0">
                    {item.Videos.noOfVideos > 0 ? (
                      item.Videos.videoLinks.map((videos, j) => {
                        return (
                          <div className="border-t-2 border-black flex justify-between py-3">
                            <span className="text-xl">{videos.title}</span>
                            <div>
                              <span className="text-xl">07:33 -</span>
                              <span
                                data-modal-target="defaultModal"
                                data-modal-toggle="defaultModal"
                                className="text-xl ml-2 hover:cursor-pointer hover:text-white "
                                onClick={openVideo}
                              >
                                Play Video
                              </span>
                            </div>
                            <VideoModal videos = {videos}></VideoModal>
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                    <div className="border-t-2 border-black flex items-center py-3 justify-between">
                      <div className="flex items-center">
                        <AttachmentIcon className="" />
                        <span className="text-xl ml-1"> {} Quiz </span>
                      </div>
                      <div>
                        <button
                          class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-xl"
                          data-modal-target="defaultModal1"
                          data-modal-toggle="defaultModal1"
                          onClick={() => {openQuiz(i)}}
                        >
                          Attempt Now
                        </button>
                      </div>
                      <div
                        id="defaultModal1"
                        tabindex="-1"
                        aria-hidden="true"
                        class="absolute z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
                      >
                        <div class="relative w-full h-full max-w-2xl md:h-auto">
                          {/* <!-- Modal content --> */}
                          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Quiz
                              </h3>
                              <button
                                type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="defaultModal"
                                onClick={()=>{openQuiz(i)}}
                              >
                                <svg
                                  aria-hidden="true"
                                  class="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <span class="sr-only">Close modal</span>
                              </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div class="p-6 space-y-6">
                              <Quiz quizdata={item.quizdata}></Quiz>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}

      {/* <!-- Modal toggle --> */}
      {/* <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Toggle modal
</button> */}

      {/* <!-- Main modal --> */}
    </>
  );
};

export default ModuleList;
