const mongoose = require('mongoose');
const EventOperations = require('../../operations/eventoperations');

exports.eventInsert = async (req) => {
    if (!req.body.name || !req.body.description || !req.body.date || !req.body.location || !req.body.createdBy) {
        return {
            status: "error",
            message: "Missing required fields. Name, description, date, location and createdBy are required",
        }
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.createdBy)) {
            return {
                status: "error",
                message: "Invalid createdBy ID format",
            }
        }

        const eventData = {
            name: req.body.name,
            description: req.body.description,
            date: new Date(req.body.date),
            location: req.body.location,
            createdBy: new mongoose.Types.ObjectId(req.body.createdBy),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await EventOperations.insertMany([eventData]);

        if (result.status === "ok") {
            return {
                status: "ok",
                message: "Event created successfully",
                data: result.data
            }
        } else {
            return {
                status: "error",
                message: "Failed to create event",
                data: null
            }
        }

    } catch (error) {
        return {
            status: "error",
            message: error.message || "Error while creating event",
            data: null
        };
    }
};