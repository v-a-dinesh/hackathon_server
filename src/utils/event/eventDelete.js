const EventOperations = require('../../operations/eventoperations');

exports.deleteEventData = async (req) => {
    if(!req.body.criteria){
        return {
            status:"error",
            message:"error while deleting data, criteria is required",
        }
    }
    const criteria = req.body.criteria
    try {
        const eventData = await EventOperations.deleteMany(criteria);
        if(eventData.status=="ok"){
            return {
                status:"ok",
                message:"data deleted successfully",
                data:eventData.data
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
            message: error.message || "Error while deleting event data",
            data: null
        };
    }
};