const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
  },
  name: {
    type: String,
  },
  videos: [
    {
      title: {
        type: String,
      },
      url: {
        type: String,
      },
      views: {
        type: Number,
        default: 0,
      },
    },
  ],
  quizData: {
    level: {
      type: Number,
    },
    qna: [
      {
        qType:{
          type: String,
          enum:['scq','mcq']
        },
        question: {
          type: String,
        },
        questionImgUrl:{
          type: String,
        },
        options: [
          {
            content: {
              type: String,
            },
            isCorrect: {
              type: Boolean,
            },
          },
        ],
      },
    ],
  },
});

module.exports = mongoose.model("Module", moduleSchema);
