const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const generateToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
}

const createUser = asyncHandler((async (req, res) => {
    const { name, surname, email, password, isAdmin, groups } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ sucess: false, error: "User with this email address already exists" });
        }
        const newUser = await User.create({
            name, surname, email, password, isAdmin, groups
        });
        if (newUser) {
            const token = generateToken(newUser._id);
            res.cookie("auth_token", token, { httpOnly: true });
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                surname: newUser.surname,
                email: newUser.email,
                groups: newUser.groups,
            });
        } else {
            res.status(400).json({ sucess: false, error: "Unknown error occured. User can not be created" });
        }
        res.status(201).json({ sucess: true, name, email });
    } catch (errpr) {
        res.status(500).json({ sucess: false, error: "Error occured. The user can not be created" });
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
                    token: token,
                });
            } else {
                res.status(401).json({ sucess: false, error: "Invalid email or password" });
            }
        }
    } catch (error) {
        res.status(500).json({ sucess: false, error: "Error occured. The user can not be authenticated" });
    }
});

//get all resources
const getUsers = asyncHandler(async (req, res) => {
    User.find()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

const signOutUser = (req, res) => {
    res.clearCookie("auth_token");
    res.json({ sucess: true, message: "User signed out successfully" })
}

module.exports = { createUser, authUser, signOutUser, getUsers };