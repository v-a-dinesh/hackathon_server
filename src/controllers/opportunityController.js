const {
    opportunityInsert
} = require("../utils/opportunities/opportunityInsertUtil");

const {
    updateOpportunityData
} = require("../utils/opportunities/opportunityUpdateUtil");

const {
    deleteOpportunityData
} = require("../utils/opportunities/opportunityDeleteUtil");

const {
    getOpportunityData
} = require("../utils/opportunities/opportunityFindUtil");

// Insert Opportunity
exports.opportunityInsert = async (req, res) => {
    try {
        const result = await opportunityInsert(req);
        
        if (result.status === "ok") {
            return res.json(result);
        } else {
            return res.json(result);
        }
    } catch (error) {
        return res.status(200).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
};

// Update Opportunity
exports.opportunityUpdate = async (req, res) => {
    try {
        const result = await updateOpportunityData(req);
        
        if (result.status === "ok") {
            return res.json(result);
        } else {
            return res.json(result);
        }
    } catch (error) {
        return res.status(200).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
};

// Delete Opportunity
exports.opportunityDelete = async (req, res) => {
    try {
        const result = await deleteOpportunityData(req);
        
        if (result.status === "ok") {
            return res.json(result);
        } else {
            return res.json(result);
        }
    } catch (error) {
        return res.status(200).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
};

// Find Opportunity
exports.opportunityFind = async (req, res) => {
    try {
        const result = await getOpportunityData(req);
        
        if (result.status === "ok") {
            return res.json(result);
        } else {
            return res.json(result);
        }
    } catch (error) {
        return res.status(200).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
};