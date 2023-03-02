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
} = require("../controllers/courseController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const upload = require("../middleware/video");
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

router.route("/adminNprof/videos/new/:id").post(isAuthenticatedUser, authorizeRoles("admin", "prof"), uploadVideo);

router.route("/adminNprof/videos/update/:id").put(isAuthenticatedUser, authorizeRoles("admin", "prof"), updateVideo);

router.route("/adminNprof/videos/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin", "prof"), deleteVideo);
// imgUpload,

router.route("/adminNprof/modules/new/:id").post(isAuthenticatedUser, authorizeRoles("admin", "prof"), createModule)

router.route("/adminNprof/modules/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin", "prof"), deleteModule)

router.route("/adminNprof/modules/update/:id").put(isAuthenticatedUser, authorizeRoles("admin", "prof"), updateModule)

router.route("/adminNprof/modules/createQuiz/:id").post(isAuthenticatedUser, authorizeRoles("admin", "prof"), createQuiz)

router.route("/adminNprof/modules/updateQuiz/:id").put(isAuthenticatedUser, authorizeRoles("admin", "prof"), updateQuiz)

router.route("/adminNprof/modules/getQuiz/:id").get(isAuthenticatedUser, authorizeRoles("admin", "prof"), getQuiz)

router.route("/adminNprof/modules/deleteQuiz/:id").delete(isAuthenticatedUser, authorizeRoles("admin", "prof"), deleteQuiz)

router.route("/adminNprof/modules/createQuestion/:id").post(isAuthenticatedUser, authorizeRoles("admin", "prof"), createQuestion)

router.route("/adminNprof/modules/deleteQuestion/:id").delete(isAuthenticatedUser, authorizeRoles("admin", "prof"), deleteQuestion)

router.route("/adminNprof/modules/updateQuestion/:id").put(isAuthenticatedUser, authorizeRoles("admin", "prof"), updateQuestion)

router.route("/adminNprof/modules/getAllQuestion/:id").get(isAuthenticatedUser, authorizeRoles("admin", "prof"), getAllQuestion)

router.route("/adminNprof/modules/getSingleQuestion/:id").get(isAuthenticatedUser, authorizeRoles("admin", "prof"), getSingleQuestion)

// router.route("/adminNprof/videos/:id").get(isAuthenticatedUser, authorizeRoles("admin", "prof"), getCourseVideos);

router.route("/course/register/:id").post(isAuthenticatedUser, registerCourse).delete(isAuthenticatedUser, leaveCourse);

module.exports = router;