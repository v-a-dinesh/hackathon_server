const AnnouncementOperations = require('../../operations/announcementoperations');

exports.updateAnnouncementData = async (req) => {
    if(!req.body.criteria && !req.body.updatedInfo){
        return {
            status:"error",
            message:"error while updating data, criteria and updatedInfo are required",
        }
    }
    const criteria = req.body.criteria
    const updatedInfo = req.body.updatedInfo
    try {
        const announcementData = await AnnouncementOperations.updateMany(criteria, updatedInfo);
        if(announcementData.status=="ok"){
            return {
                status:"ok",
                message:"data updated successfully",
                data:announcementData.data
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
            message: error.message || "Error while updating announcement data",
            data: null
        };
    }
};