const DiscussionOperations = require('../../operations/discussionoperations');

exports.deleteDiscussionData = async (req) => {
    if(!req.body.criteria){
        return {
            status:"error",
            message:"error while deleting data, criteria is required",
        }
    }
    const criteria = req.body.criteria
    try {
        const discussionData = await DiscussionOperations.deleteMany(criteria);
        if(discussionData.status=="ok"){
            return {
                status:"ok",
                message:"data deleted successfully",
                data:discussionData.data
            }
        }
        else{
            return {
                status:"error",
                message:"error while deleting data",
            }
        }

    } catch (error) {
        return {
            status: "error",
            message: error.message || "Error while deleting discussion data",
            data: null
        };
    }
};