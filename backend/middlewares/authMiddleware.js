const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.authMiddleware = async (req, res, next) => {
    const validUser = await verifyToken(req);
    if (!validUser) {
        return res.status(401).json({ error: "Authentication faild" });
    }
    req.user = validUser;
    next();
}

const verifyToken = async (req) => {
    if (!req.cookies.auth_token) {
        return false;
    } else {
        const decode = jwt.verify(req.cookies.auth_token, process.env.JWT_SECRET);
        const user = await User.findById(decode._id);
        return !user ? false : user;
    }
} 