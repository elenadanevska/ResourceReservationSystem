const express = require('express');
const router = express.Router();
const { createUser, authUser, updateUser, signOutUser, getUsers, validateToken } = require("../controllers/userController");
const { checkValidationResult, userValidator } = require("../validators/userValidator");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.route("/createUser").post(userValidator, checkValidationResult, createUser);
router.route("/signin").post(authUser);
router.route("/signout").post(signOutUser);
router.route("/").get(getUsers);
router.route("/update/:id").put(updateUser);

router.get("/authtest", authMiddleware, (req, res) => {
    console.log(req.user);
    res.json({ sucess: true, message: "User is authenticated" })
});

router.route("/tokenIsValid").post(validateToken);

router.get("/getcookies", (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies);
});

module.exports = router;