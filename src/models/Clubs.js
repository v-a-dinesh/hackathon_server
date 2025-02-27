// models/Club.js
const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
    name: { type: String, required: true, }, // Club name
    description: { type: String, required: true }, // Club details
    createdAt: { type: Date, default: Date.now }, // Creation date
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true }, // Faculty/Student who created the club
    updatedAt: { type: Date, default: Date.now } // Last update
});

const Clubs = mongoose.model("Clubs", ClubSchema);
module.exports = Clubs;
