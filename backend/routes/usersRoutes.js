const express = require('express');
const router = express.Router();
const { createUser, authUser, updateUser, signOutUser, getUsers, validateToken } = require("../controllers/userController");
const { checkValidationResult, userValidator } = require("../validators/userValidator");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.route("/signin").post(authUser);
router.route("/signout").post(signOutUser);
router.route("/tokenIsValid").post(validateToken);
router.use("/createUser", authMiddleware).route("/createUser").post(userValidator, checkValidationResult, createUser);
router.use("/", authMiddleware).route("/").get(getUsers);
router.use("/update/:id", authMiddleware).route("/update/:id").put(updateUser);

module.exports = router;