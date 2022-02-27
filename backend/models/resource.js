const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    name: { type: String, required: true },
    describtion: { type: String },
    image: {
        data: Buffer,
        contentType: String
    },
    note: { type: String }
}, { timestamps: true });

const Resource = mongoose.model("Resource", ResourceSchema);
module.exports = Resource;