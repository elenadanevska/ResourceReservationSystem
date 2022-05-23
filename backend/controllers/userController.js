const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
var CryptoJS = require("crypto-js");

const generateToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
}

//check if given token is valid
const validateToken = asyncHandler(async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        let bytes = CryptoJS.AES.decrypt(token, process.env.JWT_SECRET);
        let decryptedToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (!token) {
            return res.json(false);
        }
        const verified = jwt.verify(decryptedToken, process.env.JWT_SECRET);
        if (!verified) {
            return res.json(false);
        }
        const user = await User.findById(verified._id);
        if (!user) {
            return res.json(false)
        };
        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//create a new user
const createUser = asyncHandler((async (req, res) => {
    const { name, surname, email, password, isAdmin, groups, slovenian } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ sucess: false, error: "User with this email address already exists" });
        }
        const newUser = await User.create({
            name, surname, email, password, isAdmin, groups, slovenian
        });
        if (newUser) {
            const token = generateToken(newUser._id);
            res.cookie("auth_token", token, { httpOnly: true });
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                surname: newUser.surname,
                token: token,
                email: newUser.email,
                groups: newUser.groups,
                slovenian: newUser.slovenian,
                isAdmin: newUser.isAdmin
            });
        } else {
            res.status(400).json({ sucess: false, error: "Unknown error occured. User can not be created" });
        }
        res.status(201).json({ sucess: true, name, email });
    } catch (errpr) {
        res.status(500).json({ sucess: false, error: "Error occured. The user can not be created" });
    }
}));

//update an existing user
const updateUser = asyncHandler((async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(201).json({ sucess: true, message: "The user has been updated sucessfully" })
    } catch (error) {
        res.status(500).json({ sucess: false, error: "Error occured. The user can not be updated" });
        console.log(error);
    }
}));

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ sucess: false, error: "User with this email does not exist" });
        } else {
            if (await user.matchPassword(password)) {
                const token = generateToken(user._id);
                res.cookie("auth_token", token, { httpOnly: true });
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    groups: user.groups,
                    slovenian: user.slovenian,
                    token: CryptoJS.AES.encrypt(JSON.stringify(token), process.env.JWT_SECRET).toString(),
                    isAdmin: user.isAdmin
                });
            } else {
                res.status(401).json({ sucess: false, error: "Invalid email or password" });
            }
        }
    } catch (error) {
        res.status(500).json({ sucess: false, error: "Error occured. The user can not be authenticated" });
    }
});

// get all users
const getUsers = asyncHandler(async (req, res) => {
    User.find()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

//get logged in user by token
const getUserByToken = asyncHandler(async (req, res) => {
    let bytes = CryptoJS.AES.decrypt(req.query.token, process.env.JWT_SECRET);
    let token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified._id);
    res.send({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        groups: user.groups,
        slovenian: user.slovenian,
        isAdmin: user.isAdmin,
        apiKey: user.apiKey
    });
});

//getuser by id
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        groups: user.groups,
        slovenian: user.slovenian,
        isAdmin: user.isAdmin,
        apiKey: user.apiKey
    });
});

//sign out user
const signOutUser = (req, res) => {
    res.clearCookie("auth_token");
    res.json({ sucess: true, message: "User signed out successfully" })
}

module.exports = { createUser, authUser, updateUser, signOutUser, getUsers, validateToken, getUserByToken, getUserById };