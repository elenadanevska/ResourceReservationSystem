const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    name: { type: String, required: true },
    describtion: { type: String },
    image_name: { type: String },
    note: { type: String },
    groups: [{ type: String }],
}, { timestamps: true });

const Resource = mongoose.model("Resource", ResourceSchema);
module.exports = Resource;