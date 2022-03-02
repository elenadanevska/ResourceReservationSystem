const express = require('express');
const router = express.Router();
const Reservation = require("../models/reservation");
const Resource = require("../models/resource");
const User = require("../models/user");

//get all reservations 
router.get("/", (req, res) => {
    Reservation.find().sort({ date: -1, time: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

//get a reservation by id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const date = new Date(req.query.date);
    console.log(id);
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

//new reservation,given resource id
router.post("/:id", (req, res) => {
    const id = req.params._id;
    const date = new Date(req.body.params.date);
    date.setHours(0, 0, 0, 0);
    Resource.findById(id).then((found_resource) => {
        for (let i = 0; i < req.body.params.selectedTimeSlot.length; i++) {
            const reservation = new Reservation({
                date: date,
                time: req.body.params.selectedTimeSlot[i],
                resource: found_resource,
            });
            reservation.save()
                .then((reservation_resullt) => {
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

//delete reservation with specific id
router.delete("/:id", (req, res) => {
    const id = req.params.id.toString();
    Reservation.findByIdAndDelete(id)
        .then((result) => {
            console.log("Reservation with id " + id + " has been successfully deleted");
        })
        .catch((err) => {
            console.log(err);
        })

});

module.exports = router;