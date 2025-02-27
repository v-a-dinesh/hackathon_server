// models/Event.js
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true}, // Event name
    description: { type: String, required: true }, // Event details
    date: { type: Date, required: true }, // Event date
    location: { type: String, required: true }, // Event venue or online link
    createdAt: { type: Date, default: Date.now }, // Creation date
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who created the event (Faculty/Student/Admin)
    updatedAt: { type: Date, default: Date.now } // Last update
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
