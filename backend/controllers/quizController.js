const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Module = require("../models/moduleModel");
const Quiz = require("../models/QuizModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Store User Quiz Data
exports.createUserQuizData = catchAsyncErrors(async (req, res, next) => {
    const courseId = req.params.id
    const userId = req.user._id
    const moduleId = req.query.moduleId
    const quizData = {
        level: req.body.level,
        numberOfQuestions: req.body.numberOfQuestions,
        timeLimit: req.body.timeLimit,
        qna: req.body.qna,
        score: req.body.score
    }
    const finalQuizData = new Quiz({
        courseId: courseId,
        userId: userId,
        moduleId: moduleId,
        quizData: quizData
    })
    await finalQuizData.save()
    res.status(200).json({
      success: true,
      finalQuizData
    });
});

// Get User Quiz Data
exports.getUserQuizData = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id
    const quizData = await Quiz.findOne({_id: req.params.id, userId: userId})
    res.status(200).json({
      success: true,
      quizData
    });
});

// Get All Quiz Data For User
exports.getAllQuizDataForUser = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id
    const quizData = await Quiz.find({userId: userId})
    res.status(200).json({
      success: true,
      quizData
    });
});

// Delete User Quiz Data
exports.deleteUserQuizData = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id
    const quizData = await Quiz.findOneAndDelete({_id: req.params.id, userId: userId})
    res.status(200).json({
      success: true,
      quizData
    });

});

// Update User Quiz Data
exports.updateUserQuizData = catchAsyncErrors(async (req, res, next) => {
    const quizId = req.params.id
    const quizData = {
        level: req.body.level,
        qna: req.body.qna,
        score: req.body.score
    }
    const finalQuizData = await Quiz.findOneAndUpdate({_id: quizId}, {quizData: quizData}, {new: true})
    res.status(200).json({
      success: true,
      finalQuizData
    });
});
