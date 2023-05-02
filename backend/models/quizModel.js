const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  moduleId: 
    {
      type: mongoose.Schema.ObjectId,
      ref: "Module",
      required: true,
    },
  quizData: {
    level: {
      type: Number,
    },
    qna: [
      {
        qType: {
          type: String,
          enum: ["scq", "mcq"],
        },
        question: {
          type: String,
        },
        questionImgUrl: {
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
        userAnswer: [
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
    score: {
      type: Number,
    }
  },
});

module.exports = mongoose.model("Quiz", moduleSchema);
