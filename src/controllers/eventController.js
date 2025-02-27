const {
    eventInsert
} = require("../utils/event/eventInsertUtil");

const {
    updateEventData
} = require("../utils/event/eventUpdateUtil");

const {
    deleteEventData
} = require("../utils/event/eventDelete");

const {
    getEventData
} = require("../utils/event/eventFindUtil");

// Insert Event
exports.eventInsert = async (req, res) => {
    try {
        const result = await eventInsert(req);
        
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

// Update Event
exports.eventUpdate = async (req, res) => {
    try {
        const result = await updateEventData(req);
        
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

// Delete Event
exports.eventDelete = async (req, res) => {
    try {
        const result = await deleteEventData(req);
        
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

// Find Event
exports.eventFind = async (req, res) => {
    try {
        const result = await getEventData(req);
        
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