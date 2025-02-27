const AnnouncementOperations = require('../../operations/announcementoperations');

exports.getAnnouncementData = async (req) => {
    if(!req.body.criteria && !req.body.projection){
        return {
            status:"error",
            message:"there is no criteria",
        }
    }
    const criteria = req.body.criteria
    const projection = req.body.projection
    try {
        const announcementData = await AnnouncementOperations.find(criteria, projection);
        if(announcementData.status=="ok"){
            return {
                status:"ok",
                message:"data get successfully",
                data:announcementData.data
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
            message: error.message || "Error while fetching announcement data",
            data: null
        };
    }
};