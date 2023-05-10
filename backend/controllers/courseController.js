const Course = require("../models/courseModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const fs = require("fs");
const { response } = require("../app");
const User = require("../models/userModel");
const Module = require("../models/moduleModel");
const cloudinary = require("cloudinary");

// Create Course
exports.createCourse = catchAsyncErrors(async (req, res, next) => {
  if(req.body.courseImage){
    const myCloud = await cloudinary.v2.uploader.upload(req.body.courseImage, {
      folder: "courseImages",
      width: 500,
      crop: "scale",
    });
    req.body.courseImages = [
      {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    ];
  }
  req.body.user = req.user.id;
  req.body.author = req.user.name;
  const course = await Course.create(req.body);
  res.status(201).json({
    success: true,
    course,
  });
});

// Get Modules of a Course
exports.getModulesOfCourse = catchAsyncErrors(async (req, res, next) => {
  const modules = await Module.find({courseId: req.params.id})
  res.status(201).json({
    success: true,
    modules,
  });
});

// Get All Courses With Filter
exports.getAllCourses = catchAsyncErrors(async (req, res, next) => {
  // return next(new ErrorHandler("This is Temp Error",500));
  const resultPerPage = 8;
  const courseCount = await Course.countDocuments();

  const apiFeature = new ApiFeatures(Course.find(), req.query)
    .search()
    .filter();

  let courses = await apiFeature.query;

  let filteredCoursesCount = courses.length;

  apiFeature.pagination(resultPerPage);

  courses = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    courses,
    courseCount,
    resultPerPage,
    filteredCoursesCount,
  });
});

// Get All Courses Without Filter
exports.getAllCoursesWithoutFilter = catchAsyncErrors(
  async (req, res, next) => {
    const courses = await Course.find();

    res.status(200).json({
      success: true,
      courses,
    });
  }
);

// Get Single Course Details
exports.getCourseDetails = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 500));
  }
  res.status(200).json({
    success: true,
    course,
  });
});

// Update Course -- Admin
exports.updateCourse = catchAsyncErrors(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 500));
  }
  const newCourseData = {
    courseName: req.body.courseName,
    courseDescription: req.body.courseDescription,
    courseCategory: req.body.courseCategory,
  };

  if (req.body.courseImage!== "") {
    const imageId = course.courseImages[0].public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.courseImage, {
      folder: "courseImages",
      width: 500,
      crop: "scale",
    });

    newCourseData.courseImages = [
      {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    ];
  }
  // console.log(course)
  course = await Course.findByIdAndUpdate(req.params.id, newCourseData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    course,
  });
});

// Delete Course -- Admin
exports.deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 500));
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    message: "Course Removed Successfully",
  });
});

// Create New Review or Update the review
exports.createCourseReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, courseId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const course = await Course.findById(courseId);

  const isReviewed = course.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    course.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    course.reviews.push(review);
    course.numOfReviews = course.reviews.length;
  }

  let avg = 0;

  course.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  course.courseRating = (avg / course.reviews.length).toFixed(1);

  await course.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a Course
exports.getCourseReviews = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 4;

  const apiFeature = new ApiFeatures(Course.findById(req.query.id), req.query);

  // let course = apiFeature.query;

  const course = Course.findById(req.query.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  // const reviewCount = course.reviews.length;
  // apiFeature.pagination(resultPerPage);

  // course = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    reviews: course.reviews,
    // reviewCount,
    // resultPerPage
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.query.courseId);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  const reviews = course.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Course.findByIdAndUpdate(
    req.query.courseId,
    {
      reviews,
      courseRating: ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

//Create Module
exports.createModule = catchAsyncErrors(async (req, res, next) => {
    
  const {name} = req.body;
  const quizData = {};

  const module = {
    name,
    quizData,
  };

  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  course.modules.push(module);

  // const isReviewed = course.reviews.find(
  //   (rev) => rev.user.toString() === req.user._id.toString()
  // );

  // if (isReviewed) {
  //   course.reviews.forEach((rev) => {
  //     if (rev.user.toString() === req.user._id.toString())
  //       (rev.rating = rating), (rev.comment = comment);
  //   });
  // } else {
  //   course.reviews.push(review);
  //   course.numOfReviews = course.reviews.length;
  // }

  // let avg = 0;

  // course.reviews.forEach((rev) => {
  //   avg += rev.rating;
  // });

  // course.courseRating = (avg / course.reviews.length).toFixed(1);

  await course.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    module
  });
});

// Update Module
exports.updateModule = catchAsyncErrors(async (req, res, next) => {
    
  const {name} = req.body;

  const module = {
    name
  };

  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  let i = 0;
  for (; i < course.modules.length; i++) {
    if(course.modules[i].name === req.query.moduleName){
      break;
    }
    
  }
  if(i!=course.modules.length){
    course.modules.splice(i,1);
    course.modules.splice(i,0,module);
  }
 
  // const isReviewed = course.reviews.find(
  //   (rev) => rev.user.toString() === req.user._id.toString()
  // );

  // if (isReviewed) {
  //   course.reviews.forEach((rev) => {
  //     if (rev.user.toString() === req.user._id.toString())
  //       (rev.rating = rating), (rev.comment = comment);
  //   });
  // } else {
  //   course.reviews.push(review);
  //   course.numOfReviews = course.reviews.length;
  // }

  // let avg = 0;

  // course.reviews.forEach((rev) => {
  //   avg += rev.rating;
  // });

  // course.courseRating = (avg / course.reviews.length).toFixed(1);

  await course.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    module
  });
});

// Delete Module
exports.deleteModule = catchAsyncErrors(async (req, res, next) => {
    
  const {name} = req.body;

  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  let i = 0;
  for (; i < course.modules.length; i++) {
    if(course.modules[i].name === name){
      break;
    }
    
  }
  if(i!=course.modules.length){
    course.modules.splice(i,1);
  }

  // const isReviewed = course.reviews.find(
  //   (rev) => rev.user.toString() === req.user._id.toString()
  // );

  // if (isReviewed) {
  //   course.reviews.forEach((rev) => {
  //     if (rev.user.toString() === req.user._id.toString())
  //       (rev.rating = rating), (rev.comment = comment);
  //   });
  // } else {
  //   course.reviews.push(review);
  //   course.numOfReviews = course.reviews.length;
  // }

  // let avg = 0;

  // course.reviews.forEach((rev) => {
  //   avg += rev.rating;
  // });

  // course.courseRating = (avg / course.reviews.length).toFixed(1);

  await course.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Upload Video
exports.uploadVideo = catchAsyncErrors(async (req, res, next) => {
  const { title, vidURL, duration, moduleName } = req.body;
  // const {courseId} = req.params.id;

  const video = {
    user: req.user._id,
    title,
    vidURL,
    duration,
    // thumbnail:{
    //   data:fs.readFileSync('images/' + req.file.filename),
    // }
  };

  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  // console.log(req.params.id);
  let i = 0;
  for (; i < course.modules.length; i++) {
    if(course.modules[i].name === moduleName){
      break;
    }
    
  }
  if(i!=course.modules.length){
    course.modules[i].videos.push(video);
  }
  // course.numOfVideos = course.modules[i].videos.length;

  // let dur = 0;

  // course.modules.videos.forEach((vid) => {
  //   dur += vid.duration;
  // });
  // course.courseDuration = dur;

  await course.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    video
  });
});

// Delete Video From Module
exports.deleteVideo = catchAsyncErrors(async (req, res, next) => {
  const { videoName, moduleName } = req.body;

  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  // console.log(req.params.id);
  let i = 0;
  for (; i < course.modules.length; i++) {
    if(course.modules[i].name === moduleName){
      break;
    } 
  }
  if(i!=course.modules.length){
    let j = 0;
    // console.log(course.modules[i].videos.length);
    for (; j < course.modules[i].videos.length; j++) {
      if(course.modules[i].videos[j].title === videoName){
        break;
      } 
    }
    // console.log(j);
    if(j!=course.modules[i].videos.length){
      course.modules[i].videos.splice(j,1);
    }
  }
  // course.numOfVideos = course.modules[i].videos.length;

  // let dur = 0;

  // course.modules.videos.forEach((vid) => {
  //   dur += vid.duration;
  // });
  // course.courseDuration = dur;

  await course.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Update Video
exports.updateVideo = catchAsyncErrors(async (req, res, next) => {
  const { title, vidURL, duration, moduleName } = req.body;
  const user = req.user._id;
  // const {courseId} = req.params.id;

  const video = {
    user,
    title,
    vidURL,
    duration,
    // thumbnail:{
    //   data:fs.readFileSync('images/' + req.file.filename),
    // }
  };

  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  // console.log(req.params.id);
  let i = 0;
  for (; i < course.modules.length; i++) {
    if(course.modules[i].name === moduleName){
      break;
    } 
  }
  console.log(i);
  if(i!=course.modules.length){
    let j = 0;
    // console.log(course.modules[i].videos.length);
    for (; j < course.modules[i].videos.length; j++) {
      if(course.modules[i].videos[j].title === req.query.name){
        break;
      } 
    }
    // console.log(j);
    if(j!=course.modules[i].videos.length){
      course.modules[i].videos.splice(j,1);
      course.modules[i].videos.splice(j,0,video);
    }
  }
  // course.numOfVideos = course.modules[i].videos.length;

  // let dur = 0;

  // course.modules.videos.forEach((vid) => {
  //   dur += vid.duration;
  // });
  // course.courseDuration = dur;

  await course.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    video
  });
});

// Get all Videos of a Course
// exports.getCourseVideos = catchAsyncErrors(async (req, res, next) => {
//   const course = await Course.findById(req.params.id);

//   if (!course) {
//     return next(new ErrorHandler("Course not found", 500));
//   }

//   const getAllVids = await course.videos;

//   res.status(200).json({
//     success: true,
//     getAllVids,
//   });
// });

// Register for Course
exports.registerCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 500));
  }

  const enroll = {
    user: req.user._id,
  };

  let flag = false;

  await course.enrolled.forEach((e) => {
    if (e.user.toString() === req.user._id.toString()) {
      flag = true;
      return res.status(200).json({ success: false, message: "Already Registered" });
    }
  });

  if (!flag) {
    course.enrolled.push(enroll);

    course.enrolledCount = course.enrolled.length;

    await course.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Successfully Enrolled",
    });
  }
});

// Unenroll from Course
exports.leaveCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 500));
  }

  const crs = course.enrolled.filter(
    (e) => e.user.toString() !== req.user._id.toString()
  );

  const noOfStuds = crs.length;

  await Course.findByIdAndUpdate(
    req.params.id,
    {
      enrolled: crs,
      enrolledCount: noOfStuds,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Successfully Unenrolled",
  });
});


// Create Quiz
exports.createQuiz = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  const {level} = req.body;

  let i = 0;
  for (; i < course.modules.length; i++) {
    // console.log(moduleName, course.modules[i].name);
    if(course.modules[i].name === req.query.moduleName){
      break;
    } 
  }  

  const quiz = {
    level: level
  }
  
  if(i!=course.modules.length){
    course.modules[i].quizData = quiz;
    console.log(course.modules[i]);
  }

  await course.save({validateBeforeSave:false})

  res.status(200).json({
    success: true,
    course
  });
});

// Update Quiz
exports.updateQuiz = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  const {level} = req.body;

  let i = 0;
  for (; i < course.modules.length; i++) {
    // console.log(moduleName, course.modules[i].name);
    if(course.modules[i].name === req.query.moduleName){
      break;
    } 
  }  

  const quiz = {
    level
  }

  if(i!=course.modules.length){
    course.modules[i].quizData = quiz;
  }

  await course.save({validateBeforeSave:false})

  res.status(200).json({
    success: true,
    quiz
  });
});

// Get Quiz
exports.getQuiz = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  let i = 0;
  for (; i < course.modules.length; i++) {
    // console.log(moduleName, course.modules[i].name);
    if(course.modules[i].name === req.query.moduleName){
      break;
    } 
  }  

  let obj = {};

  if(i!=course.modules.length){
    obj = course.modules[i].quizData
  }

  res.status(200).json({
    success: true,
    obj
  });
});

// Delete Quiz
exports.deleteQuiz = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  let i = 0;
  for (; i < course.modules.length; i++) {
    // console.log(moduleName, course.modules[i].name);
    if(course.modules[i].name === req.query.moduleName){
      break;
    } 
  }  

  if(i!=course.modules.length){
    course.modules[i].quizData = {};
  }

  await course.save({validateBeforeSave:false})

  res.status(200).json({
    success: true,
  });
});

// Create Question
exports.createQuestion = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  const {moduleName, questionType, questionContent, questionImageUrl, timeLimit, options} = req.body;

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  let i = 0;
  for (; i < course.modules.length; i++) {
    // console.log(moduleName, course.modules[i].name);
    if(course.modules[i].name === moduleName){
      break;
    } 
  }  
  // console.log(i, course.modules.length);
  const question = {
    questionType,
    questionContent,
    questionImageUrl,
    timeLimit,
    options,
  }

  if(i!=course.modules.length){
    course.modules[i].quizData.questions.push(question);
  }

  await course.save({validateBeforeSave:false})

  res.status(200).json({
    success: true,
  });
});

// Update Question
exports.updateQuestion = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  const {questionType, questionContent, questionImageUrl, timeLimit, options} = req.body;

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  let i = 0;
  for (; i < course.modules.length; i++) {
    // console.log(moduleName, course.modules[i].name);
    if(course.modules[i].name === req.query.moduleName){
      break;
    } 
  } 
  
  // console.log(i, course.modules.length);
  const question = {
    questionType,
    questionContent,
    questionImageUrl,
    timeLimit,
    options,
  }

  let arr = course.modules[i].quizData.questions;

  let j = 0;
  for (; j < arr.length; j++) {
    if(arr[j]._id.toString() === req.query.qId.toString()){
      break;
    }  
  }
  if(i!=course.modules.length && j!=arr.length){
    course.modules[i].quizData.questions.splice(j,1);
    course.modules[i].quizData.questions.splice(j,0,question);
  }

  await course.save({validateBeforeSave:false})

  res.status(200).json({
    success: true,
  });
});

// Delete Question
exports.deleteQuestion = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  let i = 0;
  for (; i < course.modules.length; i++) {
    // console.log(moduleName, course.modules[i].name);
    if(course.modules[i].name === req.query.moduleName){
      break;
    } 
  }  
  let arr = course.modules[i].quizData.questions;

  let j = 0;
  for (; j < arr.length; j++) {
    if(arr[j]._id.toString() === req.query.qId.toString()){
      break;
    }  
  }
  if(i!=course.modules.length && j!=arr.length){
    course.modules[i].quizData.questions.splice(j,1);
  }

  await course.save({validateBeforeSave:false})

  res.status(200).json({
    success: true,
  });
});

// Get All Questions
exports.getAllQuestion = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  let i = 0;
  for (; i < course.modules.length; i++) {
    // console.log(moduleName, course.modules[i].name);
    if(course.modules[i].name === req.query.moduleName){
      break;
    } 
  }  
  let arr = course.modules[i].quizData.questions;

  res.status(200).json({
    success: true,
    arr
  });
});

// Get Single Question
exports.getSingleQuestion = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  let i = 0;
  for (; i < course.modules.length; i++) {
    // console.log(moduleName, course.modules[i].name);
    if(course.modules[i].name === req.query.moduleName){
      break;
    } 
  }  
  
  let arr = course.modules[i].quizData.questions;

  let j = 0;
  for (; j < arr.length; j++) {
    if(arr[j]._id.toString() === req.query.qId.toString()){
      break;
    }  
  }

  const question = arr[j];

  res.status(200).json({
    success: true,
    question
  });
});

