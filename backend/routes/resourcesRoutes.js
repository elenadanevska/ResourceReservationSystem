const express = require('express');
const router = express.Router();
const Resource = require("../models/resource");
const { checkValidationResult, resourceValidator } = require("../validators/resourceValidator");
const { authMiddleware } = require("../middlewares/authMiddleware");

//get all resources
router.get("/", authMiddleware(), (req, res) => {
    Resource.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

//get resource by id
router.get("/:id", authMiddleware(), (req, res) => {
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
router.post("/", authMiddleware(true), resourceValidator, checkValidationResult, (req, res) => {
    const resourceName = req.body.name;
    const resourceDescription = req.body.description;
    const resourceNote = req.body.note;
    const groups = req.body.groups;
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
        .then(() => {
            res.status(200).json({ message: "The resource have been saved successfully" });
        })
        .catch((err) => {
            res.status(400).json({ error: err })
        })
});

//update resource
router.put("/:id", authMiddleware(true), (req, res) => {
    const id = req.params.id.toString().trim();
    Resource.findByIdAndUpdate(id, { $set: req.body }).then((result) => {
        res.status(201).json({ sucess: true, message: "The resource has been updated sucessfully", resource: result })
    }).catch((err) => {
        res.status(500).json({ sucess: false, error: "Error occured. The resource can not be updated" });
        console.log(err);
    })
})

//delete resource
router.delete("/:id", authMiddleware(true), (req, res) => {
    const id = req.params.id.toString().trim();
    Resource.findByIdAndDelete(id)
        .then(() => {
            console.log("success");
        })
        .catch((err) => {
            console.log(err);
        })

});

module.exports = router;