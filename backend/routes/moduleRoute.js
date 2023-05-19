const express = require("express");
const { createModule, updateModule, deleteModule, uploadVideo, deleteVideo, updateVideo, createQuiz, updateQuiz, getQuiz, deleteQuiz, createQuestion, updateQuestion, deleteQuestion, getAllQuestion, getSingleQuestion, getModulesOfCourse } = require("../controllers/moduleController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/adminNprof/modules/new/:id").post(isAuthenticatedUser, authorizeRoles("admin", "prof"), createModule);

router.route("/adminNprof/modules/getModulesOfCourse/:id").get(isAuthenticatedUser, authorizeRoles("admin", "prof"), getModulesOfCourse);

router.route("/adminNprof/videos/new/:id").post(isAuthenticatedUser, authorizeRoles("admin", "prof"), uploadVideo);

router.route("/adminNprof/videos/update/:id").put(isAuthenticatedUser, authorizeRoles("admin", "prof"), updateVideo);

router.route("/adminNprof/videos/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin", "prof"), deleteVideo);
// // imgUpload,

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



module.exports = router;
