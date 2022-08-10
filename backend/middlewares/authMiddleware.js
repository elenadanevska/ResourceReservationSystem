const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
var CryptoJS = require("crypto-js");

exports.authMiddleware = function (adminOnly = false) {
    return async (req, res, next) => {
        let token;
        let user;
        let api_key = req.header('x-api-key');
        if (api_key) {
            let keyParts = api_key.split(".")
            user = await User.findOne({ 'apiKey.publicPart': "admin_fri_627f7988ffd149baf9c3b966" }); //change public part?
            if (user) {
                var decryptedSecret = CryptoJS.AES.decrypt(user.apiKey.secretPart, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8);
                if (decryptedSecret != keyParts.join("", 1)) {
                    return res.status(401).json({ error: "Authentication faild" });
                }
            }
        }
        else if (req.cookies.auth_token) {
            const decode = jwt.verify(req.cookies.auth_token, process.env.JWT_SECRET);
            user = await User.findById(decode._id);
        }
        else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(' ')[1];
                var bytes = CryptoJS.AES.decrypt(token, process.env.JWT_SECRET);
                var decryptedToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                const verified = jwt.verify(decryptedToken, process.env.JWT_SECRET);
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