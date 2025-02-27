// models/Discussion.js
const mongoose = require("mongoose");

const DiscussionSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Discussion topic/title
    content: { type: String, required: true }, // Main discussion content
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who created the discussion
    category: { 
        type: String, 
        enum: ["Event", "Club", "Opportunities"], 
        required: true 
    }, // Category (Event, Club, Opportunities)
    categoryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        refPath: "categoryRef"
    }, // ID of the linked Event, Club, or Opportunity
    categoryRef: { 
        type: String, 
        enum: ["Event", "Club", "Opportunity"] 
    }, // Reference model name for categoryId
    createdAt: { type: Date, default: Date.now }, // Discussion creation timestamp
    updatedAt: { type: Date, default: Date.now }, // Last update timestamp
});

const Discussion = mongoose.model("Discussion", DiscussionSchema);
module.exports = Discussion;
