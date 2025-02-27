const mongoose = require('mongoose');
const AnnouncementOperations = require('../../operations/announcementoperations');

exports.announcementInsert = async (req) => {
    //console.log(req);
    if (!req.body.title || !req.body.content || !req.body.author) {
        return {
            status: "error",
            message: "Missing required fields. Title, content and author are required",
        }
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.author)) {
            return {
                status: "error",
                message: "Invalid author ID format",
            }
        }

        const announcementData = {
            title: req.body.title,
            content: req.body.content,
            author: new mongoose.Types.ObjectId(req.body.author),
            postedAt: new Date(),
            attachments: req.body.attachments || []
        };

        const result = await AnnouncementOperations.insertMany([announcementData]);

        if (result.status === "ok") {
            return {
                status: "ok",
                message: "Announcement created successfully",
                data: result.data
            }
        } else {
            return {
                status: "error",
                message: "Failed to create announcement",
                data: null
            }
        }

    } catch (error) {
        return {
            status: "error",
            message: error.message || "Error while creating announcement",
            data: null
        };
    }
};