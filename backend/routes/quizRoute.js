const express = require("express");
const { createUserQuizData, getUserQuizData, deleteUserQuizData, updateUserQuizData, getAllQuizDataForUser } = require("../controllers/quizController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/storeUserQuizData/:id").post(isAuthenticatedUser, createUserQuizData);
router.route("/getUserQuizData/:id").get(isAuthenticatedUser, getUserQuizData);
router.route("/getAllQuizDataForUser").get(isAuthenticatedUser, getAllQuizDataForUser);
router.route("/deleteUserQuizData/:id").delete(isAuthenticatedUser, deleteUserQuizData);
router.route("/updateUserQuizData/:id").put(isAuthenticatedUser, updateUserQuizData);

module.exports = router;