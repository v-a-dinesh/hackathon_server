const mongoose = require('mongoose');  // Change this line
const ClubOperations = require('../../operations/cluboperations');

exports.clubInsert = async (req) => {
    // Check if required fields are present in request body
    if (!req.body.name || !req.body.description || !req.body.createdBy) {
        return {
            status: "error",
            message: "Missing required fields. Name, description and createdBy are required",
        }
    }

    try {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.body.createdBy)) {
            return {
                status: "error",
                message: "Invalid createdBy ID format",
            }
        }

        // Prepare club data object
        const clubData = {
            name: req.body.name,
            description: req.body.description,
            createdBy: new mongoose.Types.ObjectId(req.body.createdBy),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Insert club data
        const result = await ClubOperations.insertMany([clubData]);

        if (result.status === "ok") {
            return {
                status: "ok",
                message: "Club created successfully",
                data: result.data
            }
        } else {
            return {
                status: "error",
                message: "Failed to create club",
                data: null
            }
        }

    } catch (error) {
        return {
            status: "error",
            message: error.message || "Error while creating club",
            data: null
        };
    }
};