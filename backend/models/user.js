const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var CryptoJS = require("crypto-js");

const UserSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    groups: [{ type: String, required: false }],
    slovenian: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    apiKey: { publicPart: { type: String, default: "" }, secretPart: { type: String, default: "" } }
}, { timestamps: true });

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
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
    if (this.isModified("apiKey") && this.apiKey != null) {
        const keyParts = this.apiKey.secretPart.split(".");
        const publicPart = keyParts[0]
        this.apiKey.secretPart = CryptoJS.AES.encrypt(keyParts.join("", 1), process.env.JWT_SECRET).toString();
        this.apiKey.publicPart = publicPart;
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;