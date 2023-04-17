const { triggerAsyncId } = require("async_hooks");
const { kMaxLength } = require("buffer");
const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  author: {
    type: String,
  },
  courseName: {
    type: String,
    required: [true, "Please Enter Course Name"],
  },
  courseDescription: {
    type: String,
    required: [true, "Please Enter Course Description"],
  },
  // coursePrice: {
  //   type: Number,
  //   required: [true, "Please Enter Course Price"],
  //   maxLength: [8, "Price cannot exceed 8 characters"],
  // },
  courseRating: {
    type: Number,
    default: 0,
  },
  courseImages: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  courseCategory: {
    type: String,
    required: [true, "Please Enter Course Category"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  numOfVideos: {
    type: Number,
    default: 0,
  },
  // modules: [
  //   {
  //     name: {
  //       type: String,
  //       required: true,
  //       unique: true,
  //     },
  //     user: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },
  //     videos: [
  //       {
  //         title: {
  //           type: String,
  //           maxLength: 50,
  //           required: true,
  //           unique: true,
  //         },
  //         views: {
  //           type: Number,
  //           default: 0,
  //         },
  //         vidURL: {
  //           type: String,
  //           required: true,
  //         },
  //         duration: {
  //           type: Number,
  //           required: true,
  //         },
  //         // thumbnail:{
  //         //   data: Buffer,
  //         // },
  //         createdAt: {
  //           type: Date,
  //           default: Date.now,
  //         },
  //       },
  //     ],
  //     quizData: {
  //       // noOfQuestions: {
  //       //   type: Number,
  //       //   default: 0,
  //       // },
  //       questions: [
  //         {
  //           questionType:{
  //             type: String,
  //             enum:["mcq", "scq"],
  //             default: "scq"
  //           },
  //           questionContent: {
  //             type: String,
  //             required:true
  //           },
  //           questionImageUrl:{
  //             type: String,
  //             default:"N/A"
  //           },
  //           timeLimit:{
  //             type: Number,
  //             required:true
  //           },
  //           options:[
  //             {
  //               optionContent:{
  //                 type: String,
  //                 required:true
  //               },
  //               isCorrect:{
  //                 type: Boolean,
  //                 required:true
  //               }
  //             }
  //           ]
  //         },
  //       ],
  //       level:{
  //         type:Number,
  //         enum:[1,2,3],
  //         default: 1
  //       }
  //     },
  //   },
  // ],
  courseDuration: {
    type: Number,
    default: 0,
    // required:true,
  },
  enrolledCount: {
    type: Number,
    default: 0,
  },
  enrolled: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", courseSchema);
