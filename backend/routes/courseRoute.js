const express = require("express");
const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseDetails,
  createCourseReview,
  getCourseReviews,
  deleteReview,
  uploadVideo,
  getCourseVideos,
  registerCourse,
  leaveCourse,
  getInstructorDetails,
  getAllCoursesWithoutFilter,
  createModule,
  deleteVideo,
  updateVideo,
  deleteModule,
  updateModule,
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getAllQuestion,
  getSingleQuestion,
  createQuiz,
  deleteQuiz,
  updateQuiz,
  getQuiz,
  getModulesOfCourse,
} = require("../controllers/courseController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// const upload = require("../middleware/video");
// const { imgUpload, vidUpload } = require("../middleware/video");

const router = express.Router();

router.route("/courses").get(getAllCourses);
router.route("/allCourses").get(getAllCoursesWithoutFilter);
router
  .route("/adminNprof/course/new")
  .post(isAuthenticatedUser, authorizeRoles("admin", "prof"), createCourse);
router
  .route("/adminNprof/course/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin", "prof"), updateCourse)
  .delete(isAuthenticatedUser, authorizeRoles("admin", "prof"), deleteCourse);

router.route("/course/:id").get(getCourseDetails);

// router.route("/course/instructor/:id").get(getInstructorDetails);

router.route("/review").put(isAuthenticatedUser, createCourseReview);

router
  .route("/adminNprof/reviews")
  .get(isAuthenticatedUser, authorizeRoles("admin", "prof"), getCourseReviews);

router.route("/reviews").delete(isAuthenticatedUser, deleteReview);
router.route("/getModulesOfCourse/:id").get(getModulesOfCourse);

// router.route("/adminNprof/videos/:id").get(isAuthenticatedUser, authorizeRoles("admin", "prof"), getCourseVideos);

router.route("/course/register/:id").post(isAuthenticatedUser, registerCourse).delete(isAuthenticatedUser, leaveCourse);

module.exports = router;