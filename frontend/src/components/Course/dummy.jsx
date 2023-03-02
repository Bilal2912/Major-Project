<div className="flex justify-around">
            <div className="bg-blue-300 w-1/3 h-screen text-2xl">
              <div className="flex justify-center">
                <img src={course.courseImages[0].url} alt="" className="h-72 relative top-7"/>
              </div>
              <div className="relative left-5 top-12">
                <span className="font-bold text-4xl">{course.courseName}</span>
                <div className="flex items-center relative top-2">
                  <span className="font-bold">{course.courseRating}</span>
                  <Rating {...options} className="reltive left-2" />
                </div>
                <div className="relative top-2">
                  <span>({course.numOfReviews} Reviews)</span>
                  <span className="relative left-2">
                    ({course.enrolledCount} Students)
                  </span>
                </div>
                <span className="relative top-2">
                  Created by{" "}
                  <span className="text-blue-500 font-semibold">
                    {course.author}
                  </span>
                </span>
                {/* <div>
                  <span className="text-5xl relative top-4">
                    ₹{course.coursePrice}
                  </span>
                </div> */}
              </div>
              <div className="flex items-center flex-col">
                <button
                  className="px-4 py-3 bg-blue-700 w-3/4 relative top-20 text-white hover:text-black hover:bg-white transition ease-in-out duration-500 font-semibold"
                  onClick={enrollCourseHandler}
                >
                  Enroll Now
                </button>
                {/* <button className="px-4 py-3 border-2 border-black w-3/4 relative top-20 hover:text-white hover:bg-black transition ease-in-out duration-500 font-semibold">
                  <Link to="/payment">Buy Now</Link>
                </button> */}
              </div>
            </div>
            <div className="bg-green-500 w-1/2">
              <div className="list-none flex justify-center items-center text-xl h-14">
                <Link to="#">
                  <li className="font-semibold px-4 py-3 hover:border-b-2 border-black">
                    Description
                  </li>
                </Link>
                <Link to="#">
                  <li className="font-semibold px-4 py-3 hover:border-b-2 border-black">
                    Content
                  </li>
                </Link>
                <Link to="#">
                  <li className="font-semibold px-4 py-3 hover:border-b-2 border-black">
                    Instructor
                  </li>
                </Link>
                <Link to="#">
                  <li className="font-semibold px-4 py-3 hover:border-b-2 border-black">
                    Reviews
                  </li>
                </Link>
              </div>
              {/* <hr className="border-zinc-300"/> */}
              <div className="bg-red-500 mt-5 px-5 py-3">
                <span className="text-2xl font-bold">Course Description</span>
                <p className="mt-2 text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consectetur aperiam ipsam sint sunt dicta placeat? Facere,
                  assumenda unde obcaecati ipsa quisquam a veritatis molestiae
                  tempora! Veniam, voluptatem omnis quod repellat adipisci qui
                  quasi ipsam voluptatibus nam amet ipsum, illum itaque suscipit
                  voluptas architecto corrupti soluta saepe repudiandae fuga
                  debitis. Debitis.
                </p>
              </div>
              <div className="bg-red-500 mt-5 px-5 py-3">
                <span className="text-2xl font-bold">Course Content</span>
                {/* <p className="mt-2 text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consectetur aperiam ipsam sint sunt dicta placeat? Facere,
                  assumenda unde obcaecati ipsa quisquam a veritatis molestiae
                  tempora! Veniam, voluptatem omnis quod repellat adipisci qui
                  quasi ipsam voluptatibus nam amet ipsum, illum itaque suscipit
                  voluptas architecto corrupti soluta saepe repudiandae fuga
                  debitis. Debitis.
                </p> */}
                <div className="border-l-2 border-r-2 border-black border-b-2 m-3">
                  <div>
                    <div className="flex">
                      <div className="w-3/4 bg-yellow-500 flex items-center p-2 border-black border-t-2">
                        <ArrowDropDownIcon
                          fontSize="large"
                          className="hover:cursor-pointer dropdown"
                          onClick={extend}
                        />
                        <span className="font-bold text-xl">
                          This is my course
                        </span>
                      </div>
                      <div className="w-1/4 bg-blue-500 flex items-center justify-end p-2 border-black border-t-2">
                        <span className="font-bold text-xl">2 Lectures</span>
                      </div>
                    </div>
                    <div className="hidden" id="ext_drop_0">
                      <div className="flex border-t-2 border-black">
                        <div className="w-3/4 bg-yellow-500 flex items-center p-2 pl-4">
                          <PlayCircleIcon fontSize="small" />
                          <span className="text-lg relative left-2">
                            Video 1
                          </span>
                        </div>
                        <div className="w-1/4 bg-slate-500 flex items-center justify-end p-2">
                          <Link
                            to=""
                            className="hover:underline hover:text-blue-500"
                          >
                            Play Video
                          </Link>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-3/4 bg-yellow-500 flex items-center p-2 pl-4">
                          <PlayCircleIcon fontSize="small" />
                          <span className="text-lg relative left-2">
                            Video 2
                          </span>
                        </div>
                        <div className="w-1/4 bg-slate-500 flex items-center justify-end p-2">
                          <Link
                            to=""
                            className="hover:underline hover:text-blue-500"
                          >
                            Play Video
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex">
                      <div className="w-3/4 bg-yellow-500 flex items-center p-2 border-black border-t-2">
                        <ArrowDropDownIcon
                          fontSize="large"
                          className="hover:cursor-pointer dropdown"
                          onClick={extend}
                        />
                        <span className="font-bold text-xl">
                          This is my course
                        </span>
                      </div>
                      <div className="w-1/4 bg-blue-500 flex items-center justify-end p-2 border-black border-t-2">
                        <span className="font-bold text-xl">2 Lectures</span>
                      </div>
                    </div>
                    <div className="hidden" id="ext_drop_1">
                      <div className="flex border-t-2 border-black">
                        <div className="w-3/4 bg-yellow-500 flex items-center p-2 pl-4">
                          <PlayCircleIcon fontSize="small" />
                          <span className="text-lg relative left-2">
                            Video 1
                          </span>
                        </div>
                        <div className="w-1/4 bg-slate-500 flex items-center justify-end p-2">
                          <Link
                            to=""
                            className="hover:underline hover:text-blue-500"
                          >
                            Play Video
                          </Link>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-3/4 bg-yellow-500 flex items-center p-2 pl-4">
                          <PlayCircleIcon fontSize="small" />
                          <span className="text-lg relative left-2">
                            Video 2
                          </span>
                        </div>
                        <div className="w-1/4 bg-slate-500 flex items-center justify-end p-2">
                          <Link
                            to=""
                            className="hover:underline hover:text-blue-500"
                          >
                            Play Video
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex">
                      <div className="w-3/4 bg-yellow-500 flex items-center p-2 border-black border-t-2">
                        <ArrowDropDownIcon
                          fontSize="large"
                          className="hover:cursor-pointer dropdown"
                          onClick={extend}
                        />
                        <span className="font-bold text-xl">
                          This is my course
                        </span>
                      </div>
                      <div className="w-1/4 bg-blue-500 flex items-center justify-end p-2 border-black border-t-2">
                        <span className="font-bold text-xl">2 Lectures</span>
                      </div>
                    </div>
                    <div className="hidden" id="ext_drop_2">
                      <div className="flex border-t-2 border-black">
                        <div className="w-3/4 bg-yellow-500 flex items-center p-2 pl-4">
                          <PlayCircleIcon fontSize="small" />
                          <span className="text-lg relative left-2">
                            Video 1
                          </span>
                        </div>
                        <div className="w-1/4 bg-slate-500 flex items-center justify-end p-2">
                          <Link
                            to=""
                            className="hover:underline hover:text-blue-500"
                          >
                            Play Video
                          </Link>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-3/4 bg-yellow-500 flex items-center p-2 pl-4">
                          <PlayCircleIcon fontSize="small" />
                          <span className="text-lg relative left-2">
                            Video 2
                          </span>
                        </div>
                        <div className="w-1/4 bg-slate-500 flex items-center justify-end p-2">
                          <Link
                            to=""
                            className="hover:underline hover:text-blue-500"
                          >
                            Play Video
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-red-500 mt-5 px-5 py-3">
                <span className="text-2xl font-bold">{course.author}</span>
                <p className="mt-2 text-lg font-semibold">
                  <li>
                    Prof. Kiran Talele is an Associate Professor in Electronics
                    Engineering Department of Sardar Patel Institute of
                    Technology, Mumbai with 33+ years experience in Academics.
                  </li>
                  <li>
                    He is Dean of Students, Alumni and External Relations at
                    Sardar Patel Institute of Technology, Andheri Mumbai. He is
                    also Chief Finance Officier &amp; Head of Academic
                    Relations, Sardar Patel Technology Business Incubator,
                    Andheri, Mumbai.{" "}
                  </li>
                  <li>
                    His area of research is Digital Signal &amp; Image
                    Processing, Computer Vision, Machine Learning and Multimedia
                    System Design. He has published 80+ research papers at
                    various national &amp; international refereed conferences
                    and journals.
                  </li>
                  <li>
                    He has filed &amp; published 20 patents at Indian Patent
                    Office. One patent is granted in 2021. He is a Treasurer of
                    IEEE Bombay Section and Mentor for Startup Incubation &amp;
                    Intellectual Asset Creation. He is a recipient of P.R. Bapat
                    IEEE Bombay Section Outstanding Volunteer Award 2019.
                  </li>
                </p>
              </div>
              <div className="bg-red-500 mt-5 px-5 py-3">
                <span className="text-2xl font-bold">Reviews</span>
                {/* {course.enrolled.includes(user._id) && 
                <button
                  className="text-xl px-4 py-2 bg-blue-500 relative left-3 font-bold hover:text-white hover:bg-black transition ease-in-out duration-500 rounded-lg"
                  onClick={submitReviewToggle}
                >
                  Submit Review
                </button>
                }  */}
                <button
                  className="text-xl px-4 py-2 bg-blue-500 relative left-3 font-bold hover:text-white hover:bg-black transition ease-in-out duration-500 rounded-lg"
                  onClick={submitReviewToggle}
                >
                  Submit Review
                </button>
                {course.reviews && course.reviews[0] ? (
                  <div className="bg-red-500 mt-5 px-5 divide-y divide-black">
                    {course.reviews &&
                      course.reviews.map((review) => (
                        <ReviewCard review={review} />
                      ))}
                  </div>
                ) : (
                  <p className="mt-2 text-lg">No Reviews yet</p>
                )}
              </div>
            </div>
          </div>

{flag === true ? (
    <Dialog open={open} onClose={submitReviewToggle}>
      <DialogTitle>Write Review</DialogTitle>
      <DialogContent className="flex flex-col">
        <div className="flex items-center justify-between">
          <Rating
            className=""
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />
          <Button onClick={() => setRating(0)} color="secondary">
            Cancel
          </Button>
        </div>
        <textarea
          className="submitDialogTextArea resize-none outline-none border-2 p-2 pl-4 mt-5"
          cols="30"
          rows="5"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write here..."
        ></textarea>
        {/* <DialogContentText>
        To subscribe to this website, please enter your email address
        here. We will send updates occasionally.
      </DialogContentText> */}
        {/* <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
      /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={submitReviewToggle} color="secondary">
          Cancel
        </Button>
        <Button onClick={reviewSubmitHandler} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  ) : (
    <Dialog open={open} onClose={submitReviewToggle}>
      <DialogTitle>Write Review</DialogTitle>
      <DialogContent className="flex flex-col">
        <DialogContentText>
          Please Enroll in the Course first
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={submitReviewToggle}>Okay</Button>
      </DialogActions>
    </Dialog>
  )}