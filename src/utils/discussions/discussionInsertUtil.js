const mongoose = require('mongoose');
const DiscussionOperations = require('../../operations/discussionoperations');

exports.discussionInsert = async (req) => {
    // Validate required fields
    const requiredFields = ['title', 'content', 'author', 'category', 'categoryId'];
    
    for (let field of requiredFields) {
        if (!req.body[field]) {
            return {
                status: "error",
                message: `Missing required field: ${field}`,
            }
        }
    }

    try {
        // Validate category enum
        if (!['Event', 'Club', 'Opportunities'].includes(req.body.category)) {
            return {
                status: "error",
                message: "Category must be either 'Event', 'Club', or 'Opportunities'",
            }
        }

        // Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(req.body.author) || 
            !mongoose.Types.ObjectId.isValid(req.body.categoryId)) {
            return {
                status: "error",
                message: "Invalid ID format for author or categoryId",
            }
        }

        // Set categoryRef based on category
        let categoryRef;
        switch(req.body.category) {
            case 'Event':
                categoryRef = 'Event';
                break;
            case 'Club':
                categoryRef = 'Club';
                break;
            case 'Opportunities':
                categoryRef = 'Opportunity';
                break;
        }

        const discussionData = {
            title: req.body.title,
            content: req.body.content,
            author: new mongoose.Types.ObjectId(req.body.author),
            category: req.body.category,
            categoryId: new mongoose.Types.ObjectId(req.body.categoryId),
            categoryRef: categoryRef,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await DiscussionOperations.insertMany([discussionData]);

        if (result.status === "ok") {
            return {
                status: "ok",
                message: "Discussion created successfully",
                data: result.data
            }
        } else {
            return {
                status: "error",
                message: "Failed to create discussion",
                data: null
            }
        }

    } catch (error) {
        return {
            status: "error",
            message: error.message || "Error while creating discussion",
            data: null
        };
    }
};