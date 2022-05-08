const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.js");

exports.authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req.cookies.auth_token) {
        const decode = jwt.verify(req.cookies.auth_token, process.env.JWT_SECRET);
        const user = await User.findById(decode._id);
        if (!user) {
            return res.status(401).json({ error: "Authentication faild" });
        }
        next()
    }
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(verified.id).select('-password');
            next()
        } catch (error) {
            console.log(error);
            return res.status(401).json({ error: "Authentication faild" });
        }
    } else if (!token) {
        return res.status(401).json({ error: "Authentication faild, no token found" });
    }
})