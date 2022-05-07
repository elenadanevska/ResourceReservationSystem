const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.js");

/*exports.authMiddleware = async (req, res, next) => {
    console.log(req.cookies)
    const validUser = await verifyToken(req);
    if (!validUser) {
        return res.status(401).json({ error: "Authentication faild" });
    }
    req.user = validUser;
    next();
}

const verifyToken = async (req) => {
    const token = req.header("x-auth-token");
    if (!req.cookies.auth_token && !token) {
        return false;
    } else if (req.cookies.auth_token) {
        const decode = jwt.verify(req.cookies.auth_token, process.env.JWT_SECRET);
        const user = await User.findById(decode._id);
        return !user ? false : user;
    } else {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res.status(401).json({ msg: "Token verification failed, authorization denied" });
        const user = await User.findById(verified._id);
        return !user ? false : user;
    }
}
*/

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