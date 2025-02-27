const mongoose = require('mongoose');
const OpportunityOperations = require('../../operations/opportunityoperations');

exports.opportunityInsert = async (req) => {
    // Validate required fields
    const requiredFields = ['title', 'type', 'company', 'location', 'description', 
                           'requirements', 'applyLink', 'deadline', 'createdBy'];
    
    for (let field of requiredFields) {
        if (!req.body[field]) {
            return {
                status: "error",
                message: `Missing required field: ${field}`,
            }
        }
    }

    try {
        // Validate type enum
        if (!['Internship', 'Job'].includes(req.body.type)) {
            return {
                status: "error",
                message: "Type must be either 'Internship' or 'Job'",
            }
        }

        // Validate createdBy ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.body.createdBy)) {
            return {
                status: "error",
                message: "Invalid createdBy ID format",
            }
        }

        const opportunityData = {
            title: req.body.title,
            type: req.body.type,
            company: req.body.company,
            location: req.body.location,
            description: req.body.description,
            requirements: req.body.requirements,
            stipend: req.body.stipend || "Unpaid",
            applyLink: req.body.applyLink,
            deadline: new Date(req.body.deadline),
            status: req.body.status || "Open",
            createdBy: new mongoose.Types.ObjectId(req.body.createdBy),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await OpportunityOperations.insertMany([opportunityData]);

        if (result.status === "ok") {
            return {
                status: "ok",
                message: "Opportunity created successfully",
                data: result.data
            }
        } else {
            return {
                status: "error",
                message: "Failed to create opportunity",
                data: null
            }
        }

    } catch (error) {
        return {
            status: "error",
            message: error.message || "Error while creating opportunity",
            data: null
        };
    }
};