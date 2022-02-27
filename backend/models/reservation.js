const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationShema = new Schema({
    date: { type: Date, required: true },
    time:
    {
        type: String, required: true

    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resource: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
}, { timestamps: true });

const Reservation = mongoose.model("Reservation", ReservationShema);
module.exports = Reservation;