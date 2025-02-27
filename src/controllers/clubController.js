const {
    clubInsert
} = require("../utils/clubs/clubInsertUtil");

const {
    updateClubData
} = require("../utils/clubs/clubUpdateUtil");

const {
    deleteClubData
} = require("../utils/clubs/clubDeleteUtil");

const {
    getClubData
} = require("../utils/clubs/clubFindUtil");

// Insert Club
exports.clubInsert = async (req, res) => {
    try {
        const result = await clubInsert(req);
        
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

// Update Club
exports.clubUpdate = async (req, res) => {
    try {
        const result = await updateClubData(req);
        
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

// Delete Club
exports.clubDelete = async (req, res) => {
    try {
        const result = await deleteClubData(req);
        
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

// Find Club
exports.clubFind = async (req, res) => {
    try {
        const result = await getClubData(req);
        
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