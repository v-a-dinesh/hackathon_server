const DiscussionOperations = require('../../operations/discussionoperations');

exports.updateDiscussionData = async (req) => {
    if(!req.body.criteria && !req.body.updatedInfo){
        return {
            status:"error",
            message:"error while updating data, criteria and updatedInfo are required",
        }
    }
    const criteria = req.body.criteria
    const updatedInfo = {
        ...req.body.updatedInfo,
        $set: {
            ...req.body.updatedInfo.$set,
            updatedAt: new Date()
        }
    }
    try {
        const discussionData = await DiscussionOperations.updateMany(criteria, updatedInfo);
        if(discussionData.status=="ok"){
            return {
                status:"ok",
                message:"data updated successfully",
                data:discussionData.data
            }
        }
        else{
            return {
                status:"error",
                message:"error while updating data",
            }
        }

    } catch (error) {
        return {
            status: "error",
            message: error.message || "Error while updating discussion data",
            data: null
        };
    }
};