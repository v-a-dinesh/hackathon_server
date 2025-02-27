const EventOperations = require('../../operations/eventoperations');

exports.updateEventData = async (req) => {
    if(!req.body.criteria && !req.body.updatedInfo){
        return {
            status:"error",
            message:"error while updating data, criteria and updatedInfo are required",
        }
    }
    const criteria = req.body.criteria
    const updatedInfo = req.body.updatedInfo
    try {
        const eventData = await EventOperations.updateMany(criteria, updatedInfo);
        if(eventData.status=="ok"){
            return {
                status:"ok",
                message:"data updated successfully",
                data:eventData.data
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
            message: error.message || "Error while updating event data",
            data: null
        };
    }
};