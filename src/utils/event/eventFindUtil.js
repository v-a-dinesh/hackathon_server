const EventOperations = require('../../operations/eventoperations');

exports.getEventData = async (req) => {
    if(!req.body.criteria && !req.body.projection){
        return {
            status:"error",
            message:"there is no criteria",
        }
    }
    const criteria = req.body.criteria
    const projection = req.body.projection
    try {
        const eventData = await EventOperations.find(criteria, projection);
        if(eventData.status=="ok"){
            return {
                status:"ok",
                message:"data get successfully",
                data:eventData.data
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
            message: error.message || "Error while fetching event data",
            data: null
        };
    }
};