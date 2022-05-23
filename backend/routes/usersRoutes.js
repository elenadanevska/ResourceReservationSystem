const express = require('express');
const router = express.Router();
const { createUser, authUser, updateUser, signOutUser, getUsers, validateToken, getUserByToken, getUserById } = require("../controllers/userController");
const { sendSupportEmail } = require("../utils/sendEmail");
const { checkValidationResult, userValidator } = require("../validators/userValidator");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.route("/signin").post(authUser);
router.route("/signout").post(signOutUser);
router.route("/tokenIsValid").post(validateToken);
router.use("/createUser", authMiddleware(true)).route("/createUser").post(userValidator, checkValidationResult, createUser);
router.use("/", authMiddleware()).route("/").get(getUsers);
router.use("/update/:id", authMiddleware(true)).route("/update/:id").put(updateUser);
router.use("/getUserByToken", authMiddleware()).route("/getUserByToken").get(getUserByToken);
router.use("/:id", authMiddleware()).route("/:id").get(getUserById);

router.use("/sendEmail", authMiddleware()).route("/sendEmail").post(sendSupportEmail);

module.exports = router;