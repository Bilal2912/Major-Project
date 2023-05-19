const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Module = require("../models/moduleModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Create Module and Quiz Data
exports.createModule = catchAsyncErrors(async (req, res, next) => {
  const { moduleArray } = req.body;
  // const {name} = req.body;

  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  for (let i = 0; i < moduleArray.length; i++) {
    const module = moduleArray[i];
    module.courseId = req.params.id;
  }
  const createdModules = await Module.insertMany(moduleArray);
  // const obj = new Module(module)
  // await obj.save();

  res.status(200).json({
    success: true,
    createdModules,
  });
});

// Get Modules Of Course
exports.getModulesOfCourse = catchAsyncErrors(async (req, res, next) => {
  const modules = await Module.find({ courseId: req.params.id });

  res.status(200).json({
    success: true,
    modules,
  });
});

// Update Module and Quiz Data - Not Correct
exports.updateModule = catchAsyncErrors(async (req, res, next) => {
  const { moduleArray } = req.body;
  // const {name} = req.body;
  let existingModules = await Module.find({ courseId: req.params.id });
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  console.log(existingModules)
  // existingModules = moduleArray;
  // console.log(existingModules)
  // await existingModules.save()
  res.status(200).json({
    success: true,
    existingModules,
  });
});

// Delete Module
exports.deleteModule = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;

  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  await Module.findOneAndDelete({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
});

// Upload Video
exports.uploadVideo = catchAsyncErrors(async (req, res, next) => {
  const { title, url } = req.body;

  const video = {
    title,
    url,
  };

  const vidData = await Module.findOne({ _id: req.params.id });

  vidData.videos.push(video);

  await vidData.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    vidData,
  });
});

// Delete Video From Module
exports.deleteVideo = catchAsyncErrors(async (req, res, next) => {
  const { videoName } = req.body;

  const module = await Module.findOne({ _id: req.params.id });

  let i = 0;
  for (; i < module.videos.length; i++) {
    if (module.videos[i].title === videoName) {
      break;
    }
  }
  if (i != module.videos.length) {
    module.videos.splice(i, 1);
  }

  await module.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    module,
  });
});

// Update Video
exports.updateVideo = catchAsyncErrors(async (req, res, next) => {
  const { title, url, videoName } = req.body;

  const video = {
    title,
    url,
  };

  const module = await Module.findOne({ _id: req.params.id });

  let i = 0;
  for (; i < module.videos.length; i++) {
    if (module.videos[i].title === videoName) {
      break;
    }
  }
  if (i != module.videos.length) {
    module.videos.splice(i, 1);
    module.videos.splice(i, 0, video);
  }

  await module.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    module,
  });
});

// Create Quiz
exports.createQuiz = catchAsyncErrors(async (req, res, next) => {
  const module = await Module.findOne({ _id: req.params.id });

  const { level } = req.body;

  const quiz = {
    level: level,
  };

  module.quizData = quiz;

  await module.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    module,
  });
});

// Update Quiz
exports.updateQuiz = catchAsyncErrors(async (req, res, next) => {
  const module = await Module.findOne({ _id: req.params.id });

  const { level } = req.body;

  const quiz = {
    level,
  };

  module.quizData = quiz;

  await module.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    module,
  });
});

// Get Quiz
exports.getQuiz = catchAsyncErrors(async (req, res, next) => {
  const module = await Module.findOne({ _id: req.params.id });

  const obj = module.quizData;

  res.status(200).json({
    success: true,
    obj,
  });
});

// Delete Quiz
exports.deleteQuiz = catchAsyncErrors(async (req, res, next) => {
  const module = await Module.findOne({ _id: req.params.id });

  module.quizData = {};

  await module.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    module,
  });
});

// Create Question
exports.createQuestion = catchAsyncErrors(async (req, res, next) => {
  const { qType, question, questionImgUrl, options } = req.body;

  const module = await Module.findOne({ _id: req.params.id });

  const questionData = {
    qType,
    question,
    questionImgUrl,
    options,
  };
  module.quizData.qna.push(questionData);

  await module.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    module,
  });
});

// Update Question
exports.updateQuestion = catchAsyncErrors(async (req, res, next) => {
  const { qType, question, questionImgUrl, options } = req.body;

  const module = await Module.findOne({ _id: req.params.id });

  const questionData = {
    qType,
    question,
    questionImgUrl,
    options,
  };

  let arr = module.quizData.qna;

  let j = 0;
  for (; j < arr.length; j++) {
    if (arr[j]._id.toString() === req.query.qId.toString()) {
      break;
    }
  }
  if (j != arr.length) {
    module.quizData.qna.splice(j, 1);
    module.quizData.qna.splice(j, 0, questionData);
  }

  await module.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    module,
  });
});

// Delete Question
exports.deleteQuestion = catchAsyncErrors(async (req, res, next) => {
  const module = await Module.findOne({ _id: req.params.id });

  let arr = module.quizData.qna;

  let j = 0;
  for (; j < arr.length; j++) {
    if (arr[j]._id.toString() === req.query.qId.toString()) {
      break;
    }
  }
  if (j != arr.length) {
    module.quizData.qna.splice(j, 1);
  }

  await module.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    module,
  });
});

// Get All Questions
exports.getAllQuestion = catchAsyncErrors(async (req, res, next) => {
  const module = await Module.findOne({ _id: req.params.id });

  let arr = module.quizData.qna;

  res.status(200).json({
    success: true,
    arr,
  });
});

// Get Single Question
exports.getSingleQuestion = catchAsyncErrors(async (req, res, next) => {
  const module = await Module.findOne({ _id: req.params.id });

  let arr = module.quizData.qna;

  let j = 0;
  for (; j < arr.length; j++) {
    if (arr[j]._id.toString() === req.query.qId.toString()) {
      break;
    }
  }

  const question = arr[j];

  res.status(200).json({
    success: true,
    question,
  });
});
