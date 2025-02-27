// models/Announcement.js
const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the announcement
    content: { type: String, required: true }, // Description/content of the announcement
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to faculty/admin who posted
    postedAt: { type: Date, default: Date.now }, // Timestamp when the announcement was posted
    attachments: [{ type: String }], // Array of file URLs (PDFs, images, etc.)
});

const Announcement = mongoose.model("Announcement", AnnouncementSchema);
module.exports = Announcement;
