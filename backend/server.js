const express = require('express');
const path = require('path');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config({ path: path.join(__dirname, '../.env') });

const port = 3001;
const dbURI = "mongodb+srv://adminUser:test1234@cluster0.u8b72.mongodb.net/resourcesdb?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(port, function () {
        console.log("Server started on port 3001");
    }))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());

//resources routes
app.use("/resources", resourcesRoutes);

//reservations routes
app.use("/reservations", reservationsRoutes);

//users routes
app.use("/users", usersRoutes);