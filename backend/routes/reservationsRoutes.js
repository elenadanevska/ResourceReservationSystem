const express = require('express');
const router = express.Router();
const Reservation = require("../models/reservation");
const Resource = require("../models/resource");
const User = require("../models/user");
const { authMiddleware } = require("../middlewares/authMiddleware");

//get all reservations 
router.get("/", authMiddleware(true), (req, res) => {
    Reservation.find().sort({ date: -1, time: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

//get all users's reservations

router.get("/user/:userId", authMiddleware(), (req, res) => {
    const userId = req.params.userId;
    User.findById(userId).then((current_user) => {
        Reservation.find({ user: current_user }).sort({ date: -1, time: -1 })
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                console.log(err);
            })
    });
});

//get specific resource reservations
router.get("/:id", (req, res) => {
    const id = req.params.id;
    let exactDate = req.query.date.toString().substring(0, 10) + "Z"
    const date = new Date(exactDate);
    Resource.findById(id).then((found_resource) => {
        Reservation.find({ 'resource': found_resource, 'date': date })
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }).catch((resErr) => {
        console.log(resErr);
    })
});

//new reservation, given resource id and user
router.post("/:id", authMiddleware(), (req, res) => {
    const resourceId = req.params.id;
    console.log(req.body.params.date.toString())
    let exactDate = req.body.params.date.toString().substring(0, 10) + "Z"
    console.log(exactDate);
    const date = new Date(exactDate);
    console.log(date);
    const userId = req.body.params.userId;
    User.findById(userId).then((current_user) => {
        Resource.findById(resourceId).then((found_resource) => {
            for (let i = 0; i < req.body.params.selectedTimeSlot.length; i++) {
                const reservation = new Reservation({
                    date: date,
                    time: req.body.params.selectedTimeSlot[i],
                    user: current_user,
                    resource: found_resource,
                });
                reservation.save()
                    .then(() => {
                        console.log("The reservation was created")
                    })
                    .catch((reservation_err) => {
                        console.log(reservation_err);
                    })
            }
        })
            .catch((err) => {
                console.log(err);
            });
    });
});

//update reservation
router.put("/:id", authMiddleware(true), (req, res) => {
    const id = req.params.id.toString().trim();
    Reservation.findByIdAndUpdate(id, { $set: req.body }).then((result) => {
        res.status(201).json({ sucess: true, message: "The reservation has been updated sucessfully", reservation: result })
    }).catch((err) => {
        res.status(500).json({ sucess: false, error: "Error occured. The reservation can not be updated" });
        console.log(err);
    })
})

//delete reservation with specific id, given current userId
router.delete("/:id/:userId", authMiddleware(), (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;
    Reservation.findById(id)
        .then((result) => {
            if (userId.trim() == result.user.toString()) {
                Reservation.deleteOne({ _id: result._id }).then((r) => {
                    console.log("Reservation with id " + id + " has been successfully deleted");
                    res.send(r);
                }).catch(
                    (err) => console.log(err)
                )
            } else {
                res.status(401).json({ sucess: false, error: "Error occured. The user can delete only his own reservations" })
            }
        })
        .catch((err) => {
            console.log(err);
        })
});

//delete reservation with specific id, admin only
router.delete("/:id", authMiddleware(true), (req, res) => {
    const id = req.params.id;
    Reservation.findByIdAndDelete(id)
        .then((result) => {
            res.send(result);
            console.log("Reservation with id " + id + " has been successfully deleted");
        })
        .catch((err) => {
            console.log(err);
        })
});

//delete all the reservations
router.delete("/", authMiddleware(true), (req, res) => {
    const id = req.params.id;
    Reservation.deleteMany({})
        .then((result) => {
            res.send(result);
            console.log("All the reservations were removed");
        })
        .catch((err) => {
            console.log(err);
        })
});

module.exports = router;