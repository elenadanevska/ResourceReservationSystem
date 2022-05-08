const express = require('express');
const router = express.Router();
const Reservation = require("../models/reservation");
const Resource = require("../models/resource");
const User = require("../models/user");
const { authMiddleware } = require("../middlewares/authMiddleware");

//get all reservations 
router.get("/", authMiddleware, (req, res) => {
    Reservation.find().sort({ date: -1, time: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

//get all users's reservations

router.get("/user/:userId", authMiddleware, (req, res) => {
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

//get a reservation by id
router.get("/:id", authMiddleware, (req, res) => {
    const id = req.params.id;
    const date = new Date(req.query.date);
    date.setHours(0, 0, 0, 0);
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

//new reservation,given resource id and user
router.post("/:id", authMiddleware, (req, res) => {
    const resourceId = req.params.id;
    let exactDate = req.body.params.date.toString().substring(0, 10) + "Z"
    const date = new Date(exactDate);
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
                        console.log("Success");
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

//delete reservation with specific id
router.delete("/:id", authMiddleware, (req, res) => {
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

module.exports = router;