const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { authMiddleware } = require("../middlewares/authMiddleware");
const generateApiKey = require('generate-api-key');


//generates an apiKey for the admin

router.get("/generateApiKey", (req, res) => {
    let apiKey = generateApiKey({ method: 'uuidv4', prefix: 'admin_fri' });
    console.log(apiKey)
    res.send(apiKey)
});

//saves the admin user with the new api key

router.put("/generateApiKey/:userId", authMiddleware(true), async (req, res) => {
    const userId = req.params.userId;
    try {
        User.findByIdAndUpdate(userId, req.body, function (err, user) {
            if (err) {
                return next(err);
            } else {
                user.apiKey = req.body.params.apiKey;
                user.save(function (err, user) {
                    if (err) {
                        res.status(500).send("Error: ", err);
                    } else {
                        res.status(201).json({ sucess: true, message: "The api key has been updated sucessfully" })
                    }
                })
            }
        });
    } catch (error) {
        res.status(500).json({ sucess: false, error: "Error occured. The api key can not be set or updated" });
        console.log(error);
    }
});

module.exports = router;