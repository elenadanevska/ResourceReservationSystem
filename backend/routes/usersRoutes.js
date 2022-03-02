const express = require('express');
const router = express.Router();
const { createUser, authUser, signOutUser } = require("../controllers/userController");
const { checkValidationResult, userValidator } = require("../validators/userValidator");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.route("/createUser").post(userValidator, checkValidationResult, createUser);
router.route("/signin").post(authUser);
router.route("/singout").post(signOutUser);

router.get("/secret", authMiddleware, (req, res) => {
    console.log(req.user);
    res.json({ sucess: true, message: "User is authenticated" })
})


module.exports = router;