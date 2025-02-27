// models/Opportunity.js
const mongoose = require("mongoose");

const OpportunitySchema = new mongoose.Schema({
    title: { type: String, required: true }, // Job or Internship title
    type: { type: String, enum: ["Internship", "Job"], required: true }, // Type of opportunity
    company: { type: String, required: true }, // Company or Organization name
    location: { type: String, required: true }, // Location (Remote/On-Site/Hybrid)
    description: { type: String, required: true }, // Job description & responsibilities
    requirements: { type: [String], required: true }, // List of required skills/qualifications
    stipend: { type: String, default: "Unpaid" }, // Stipend/Salary details
    applyLink: { type: String, required: true }, // Application link or email
    deadline: { type: Date, required: true }, // Application deadline
    status: { type: String, enum: ["Open", "Closed"], default: "Open" }, // Status of the opportunity
    createdAt: { type: Date, default: Date.now }, // Creation date
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who posted the opportunity
    updatedAt: { type: Date, default: Date.now } // Last update
});

const Opportunity = mongoose.model("Opportunity", OpportunitySchema);
module.exports = Opportunity;
