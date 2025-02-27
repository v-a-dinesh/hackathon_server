const DiscussionOperations = require('../../operations/discussionoperations');

exports.getDiscussionData = async (req) => {
    if(!req.body.criteria && !req.body.projection){
        return {
            status:"error",
            message:"there is no criteria",
        }
    }
    const criteria = req.body.criteria
    const projection = req.body.projection
    try {
        const discussionData = await DiscussionOperations.find(criteria, projection);
        if(discussionData.status=="ok"){
            return {
                status:"ok",
                message:"data get successfully",
                data:discussionData.data
            }
        }
        else{
            return {
                status:"error",
                message:"error while fetching data",
            }
        }

    } catch (error) {
        return {
            status: "error",
            message: error.message || "Error while fetching discussion data",
            data: null
        };
    }
};