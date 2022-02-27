const express = require('express');
const router = express.Router();
const Resource = require("../models/resource");

//get all resources
router.get("/", (req, res) => {
    Resource.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

//get resource by id
router.get("/:id", (req, res) => {
    const id = req.params.id.toString().trim();
    Resource.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

//delete resource
router.delete("/:id", (req, res) => {
    const id = req.params.id.toString().trim();
    Resource.findByIdAndDelete(id)
        .then((result) => {
            console.log("success");
        })
        .catch((err) => {
            console.log(err);
        })

});

module.exports = router;