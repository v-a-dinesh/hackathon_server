const AnnouncementOperations = require('../../operations/announcementoperations');

exports.deleteAnnouncementData = async (req) => {
    if(!req.body.criteria){
        return {
            status:"error",
            message:"error while deleting data, criteria is required",
        }
    }
    const criteria = req.body.criteria
    try {
        const announcementData = await AnnouncementOperations.deleteMany(criteria);
        if(announcementData.status=="ok"){
            return {
                status:"ok",
                message:"data deleted successfully",
                data:announcementData.data
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
            message: error.message || "Error while deleting announcement data",
            data: null
        };
    }
};