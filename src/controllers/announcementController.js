const {
    announcementInsert
} = require("../utils/announcements/announcementsInsertUtil");

const {
    updateAnnouncementData
} = require("../utils/announcements/announcementsUpdateUtil");

const {
    deleteAnnouncementData
} = require("../utils/announcements/announcementsDeleteUtil");

const {
    getAnnouncementData
} = require("../utils/announcements/announcementsFindUtil");

// Insert Announcement
exports.announcementInsert = async (req, res) => {
    try {
        const result = await announcementInsert(req);
        
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

// Update Announcement
exports.announcementUpdate = async (req, res) => {
    try {
        const result = await updateAnnouncementData(req);
        
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

// Delete Announcement
exports.announcementDelete = async (req, res) => {
    try {
        const result = await deleteAnnouncementData(req);
        
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

// Find Announcement
exports.announcementFind = async (req, res) => {
    try {
        const result = await getAnnouncementData(req);
        
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