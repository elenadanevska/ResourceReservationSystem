const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const md5 = require('md5');

const UserSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    groups: [{ type: String, required: false }],
    slovenian: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    apiKey: { type: String, default: "", },
}, { timestamps: true });

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.matchApiKey = async function (enteredApiKey) {
    return await bcrypt.compare(enteredApiKey, this.apiKey);
};

// will encrypt password and apiKey everytime its saved
UserSchema.pre("save", async function (next) {  //after the operation is done it moves to the next one
    console.log("Saving changes...")
    if (!this.isModified("password") && !this.isModified("apiKey")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, salt);
    }
    if (this.isModified("apiKey") && this.apiKey != "") {
        this.apiKey = md5(this.apiKey);
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;