const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const md5 = require('md5');

exports.authMiddleware = function (adminOnly = false) {
    return async (req, res, next) => {
        let token;
        let user;
        let api_key = req.header('x-api-key');
        if (api_key) {
            hased_api = md5(api_key)
            user = await User.findOne({ apiKey: hased_api });
        }
        else if (req.cookies.auth_token) {
            const decode = jwt.verify(req.cookies.auth_token, process.env.JWT_SECRET);
            user = await User.findById(decode._id);
        }
        else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(' ')[1]
                const verified = jwt.verify(token, process.env.JWT_SECRET);
                user = await User.findById(verified._id);
            } catch (error) {
                console.log(error);
                return res.status(401).json({ error: "Authentication faild" });
            }
        } else if (!token) {
            return res.status(401).json({ error: "Authentication faild, no token found" });
        }
        if (!user || (!user.isAdmin && adminOnly)) {
            return res.status(401).json({ error: "Authentication faild" });
        }
        next()
    }
}