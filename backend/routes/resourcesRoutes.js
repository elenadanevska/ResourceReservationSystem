const express = require('express');
const router = express.Router();
const Resource = require("../models/resource");
const { checkValidationResult, resourceValidator } = require("../validators/resourceValidator");

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

//insert new resource
router.post("/", resourceValidator, checkValidationResult, (req, res) => {
    const resourceName = req.body.name;
    const resourceDescription = req.body.description;
    const resourceNote = req.body.note;
    const groups = req.body.gropus;
    let image;
    if (!req.body.file) {
        image = "";
    }
    const resource = new Resource({
        name: resourceName,
        describtion: resourceDescription,
        image_name: image,
        note: resourceNote,
        groups: groups
    });
    resource.save()
        .then((result) => {
            res.status(200).json({ message: "The resource have been saved successfully" });
        })
        .catch((err) => {
            res.status(400).json({ error: err })
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