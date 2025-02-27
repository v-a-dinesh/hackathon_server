const {
    discussionInsert
} = require("../utils/discussions/discussionInsertUtil");

const {
    updateDiscussionData
} = require("../utils/discussions/discussionUpdateUtil");

const {
    deleteDiscussionData
} = require("../utils/discussions/discussionDeleteUtil");

const {
    getDiscussionData
} = require("../utils/discussions/discussionFindUtil");

// Insert Discussion
exports.discussionInsert = async (req, res) => {
    try {
        const result = await discussionInsert(req);
        
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

// Update Discussion
exports.discussionUpdate = async (req, res) => {
    try {
        const result = await updateDiscussionData(req);
        
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

// Delete Discussion
exports.discussionDelete = async (req, res) => {
    try {
        const result = await deleteDiscussionData(req);
        
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

// Find Discussion
exports.discussionFind = async (req, res) => {
    try {
        const result = await getDiscussionData(req);
        
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